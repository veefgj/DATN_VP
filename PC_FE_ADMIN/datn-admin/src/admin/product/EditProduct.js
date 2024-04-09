import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../image/CardProfile.css";
import { getBrands } from "../../api/BrandApi";
import { getSale } from "../../api/SaleApi";
import { getCategory } from "../../api/CategoryApi";
import { getProductById, modifyProduct } from "../../api/ProductApi";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";

const EditProduct = () => {
  const [brand, setBrand] = useState([]);
  const [sale, setSale] = useState([]);
  const [cate, setCate] = useState([]);
  const [item, setItem] = useState();
  const [attributes, setAttributes] = useState([]);
  const [flag, setFlag] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const [count, setCount] = useState(0);
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    onLoad();
  }, []);

  const changeCountHandler = (value) => {
    setCount(value);
  };

  const onLoad = () => {
    getBrands(1, 20)
      .then((resp) => setBrand(resp.data.content))
      .catch((error) => console.log(error));

    getSale(1, 8)
      .then((resp) => setSale(resp.data.content))
      .catch((error) => console.log(error));

    getProductById(id)
      .then((res) => {
        setItem(res.data);
        setFlag(res.data.category);
        setAttributes(res.data.attributes);
        setCount(res.data.attributes.length);
        getCategory(1, 20)
          .then((resp) => setCate(resp.data.content))
          .catch((error) => console.log(error));

        reset(res.data);
      })
      .catch((error) => console.log(error));
  };
  const submitHandler = (data) => {
    const nums = [data.size1];
    const newNums = nums.slice(0, count);
    const hasDuplicate = newNums.some((x) => newNums.indexOf(x) !== newNums.lastIndexOf(x));
    if (hasDuplicate) {
      toast.warning("Nhập trùng thông tin. Vui lòng nhập lại!");
    } else {
      const flag = {
        id: id,
        name: data.name,
        code: data.code,
        description: data.description,
        brandId: data.brandId,
        saleId: data.saleId,
        categoryId: data.category,
        attribute: [
          {
            size: 40,
            price: data.price1,
            stock: data.quantity1,
          },
        ].slice(0, count),
      };
      modifyProduct(flag)
        .then(() => {
          toast.success("Cập nhật thành công!");
          history.push("/products");
        })
        .catch((error) => console.log(error.response.data));
    }
  };
  return (
    <div className="pb-3 container-fluid card">
      <div className="col-10 offset-1 text-center">
        <h1 className="text-danger">Cập Nhật Sản phẩm</h1>
      </div>
      <div className="row card">
        <form className="needs-validation pro-form" onSubmit={handleSubmit(submitHandler)}>
          <div className="col-10">
            <div className="row g-3">
              <div className="col-sm-6">
                <label className="form-label">Tên sản phẩm</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("name", {
                    required: true,
                    pattern: /^\s*\S+.*/,
                  })}
                />
                {errors.name && (
                  <div className="alert alert-danger" role="alert">
                    Tên sản phẩm không hợp lệ!
                  </div>
                )}
              </div>
              <div className="col-sm-6">
                <label className="form-label">Code</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("code", {
                    required: true,
                    pattern: /^\s*\S+.*/,
                  })}
                />
                {errors.code && (
                  <div className="alert alert-danger" role="alert">
                    Code không hợp lệ!
                  </div>
                )}
              </div>
              <div className="col-12 mt-5">
                <label className="form-label">Mô tả sản phẩm</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  {...register("description", {
                    required: true,
                    pattern: /^\s*\S+.*/,
                  })}
                />
                {errors.description && (
                  <div className="alert alert-danger" role="alert">
                    Mô tả không hợp lệ!
                  </div>
                )}
              </div>
              <div className="col-sm-6 mt-5">
                <label className="form-label">Thương hiệu</label>
                <select className="form-control" {...register("brandId", { required: true })}>
                  {brand &&
                    brand.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-sm-6 mt-5">
                <label className="form-label">Chương trình giảm giá</label>
                <select className="form-control" {...register("saleId", { required: true })}>
                  {sale &&
                    sale.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.name} - {item.discount} %
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-12 mt-5 mb-5">
                <label className="form-label mb-3">Loại sản phẩm</label> <br />
                {cate &&
                  cate.map((i, index) => (
                    <div className="col-2 form-check form-check-inline mr-5" key={index}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue={i.id}
                        defaultChecked={flag.includes(i.id)}
                        {...register("category", { required: true })}
                      />
                      <label className="form-check-label">{i.name}</label>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-10 row">
            {/* <div className="card mr-5 col-10">
              <h4 className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-dark">Chi tiết sản phẩm</span> <br />
              </h4>
              <span className="text-dark">Số loại thống số Size</span>{" "}
              <select class="form-control mb-2" onChange={(e) => changeCountHandler(e.target.value)} value={count}>
                {numbers.map((item, index) => (
                  <option value={item} key={index} disabled={item < attributes.length} hidden={item < attributes.length}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <br />
            </div> */}

            {count >= 1 && (
              <div className="card mr-3">
                <div className="form-row">
                  {/* <div className="form-group col-md-6">
                    <label>Size</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={item.attributes[0] && item.attributes[0].size}
                      {...register("size10", {
                        required: true,
                        min: 36,
                        max: 45,
                      })}
                    />
                    {errors.size10 && <p className="text-danger mt-2">Size giày trong khoảng 36-45</p>}
                  </div> */}
                  <div className="form-group col-md-6">
                    <label>Giá</label>
                    <input
                      type="number"
                      className="form-control price_update"
                      defaultValue={item.attributes[0] && item.attributes[0].price}
                      {...register("price1", {
                        required: true,
                        min: 1,
                      })}
                    />
                    {errors.price1 && <p className="text-danger mt-2">Giá sản phẩm lớn hơn 0</p>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-10">
                    <label>Số lượng</label>
                    <input
                      type="number"
                      className="form-control price_update"
                      defaultValue={item.attributes[0] && item.attributes[0].stock}
                      {...register("quantity1", {
                        required: true,
                        min: 1,
                      })}
                    />
                    {errors.quantity1 && <p className="text-danger mt-2">Số lượng sản phẩm lớn hơn 1</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
          <button className="btn btn-primary btn-lg mt-5 mb-5" type="submit" style={{ marginLeft: 70, borderRadius: 50 }}>
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
