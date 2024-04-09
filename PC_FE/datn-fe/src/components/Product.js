import React, { useState, useEffect } from "react";
import { getAllProducts, filterProducts } from "../api/ProductApi";
import { NavLink } from "react-router-dom";
import "./sidebar/sidebar.css";

const categories = [
  {
    display_name: "Linh Kiện Máy Tính",
    value: "1",
    icon: "bx bx-category-alt",
  },
  {
    display_name: "Màn Hình Máy Tính",
    value: "2",
    icon: "bx bx-category-alt",
  },
  {
    display_name: "Máy Tính - Máy Chủ",
    value: "3",
    icon: "bx bx-category-alt",
  },
  {
    display_name: "LAPTOP",
    value: "4",
    icon: "bx bx-category-alt",
  },
  {
    display_name: "Loa, Tai Nghe, WebCam",
    value: "5",
    icon: "bx bx-category-alt",
  },
  {
    display_name: "Thiết Bị Mạng",
    value: "6",
    icon: "bx bx-category-alt",
  },
  {
    display_name: "Gaming Gear",
    value: "7",
    icon: "bx bx-category-alt",
  },
];

const prices = [
  {
    display_name: "Dưới 1 triệu",
    value: "0",
    icon: "bx bx-category-alt",
    min: 0,
    max: 1000000,
  },
  {
    display_name: "1.000.000 - 3.000.000",
    value: "1",
    icon: "bx bx-category-alt",
    min: 1000000,
    max: 3000000,
  },
  {
    display_name: "3.000.000 - 6.000.000",
    value: "2",
    icon: "bx bx-category-alt",
    min: 3000000,
    max: 6000000,
  },
  {
    display_name: "6.000.000 - 9.000.000",
    value: "3",
    icon: "bx bx-category-alt",
    min: 6000000,
    max: 9000000,
  },
  {
    display_name: "Trên 9 triệu",
    value: "4",
    icon: "bx bx-category-alt",
    min: 9000000,
    max: 10000000,
  },
];

const count = 6;
const defaultBrand = [1, 2, 3, 4, 5, 6, 7];
const defaultCategory = [1, 2, 3, 4, 5, 6, 7];

const Product = (props) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState({});

  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [brand1, setBrand1] = useState([]);
  const [price, setPrice] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000000);

  var rows = new Array(total).fill(0).map((zero, index) => (
    <li className={page === index + 1 ? "page-item active" : "page-item"} key={index}>
      <button className="page-link" onClick={() => onChangePage(index + 1)}>
        {index + 1}
      </button>
    </li>
  ));

  useEffect(() => {
    if (category.length === 0 && brand.length === 0 && price.length === 0) {
      getAllProducts(page, count, true).then((response) => {
        setProducts(response.data.content);
        console.log(response.data.content)
        setTotal(response.data.totalPages);
      }).catch(error => console.log(error));
    } else {
      console.log(category);
      const data = {
        page: page,
        count: count,
        category: category.length > 0 ? category : defaultCategory,
        brand: brand.length > 0 ? brand : defaultBrand,
        min: min,
        max: max,
      };
      console.log(data);
      filterProducts(data).then((resp) => {
        setProducts(resp.data.content);
        setTotal(resp.data.totalPages);
      });
    }
    props.changeHeaderHandler(2);
  }, [page, category, brand, price]);

  const onChangePage = (page) => {
    setPage(page);
  };

  const chooseCategoryHandler = (value) => {

    const index = category.indexOf(value);
    if (index > -1) {
      setCategory(category.filter((i) => i !== value));
    } else {
      setCategory([...category, value]);
    }
    onChangePage(1);
  };

  const chooseBrandHandler = (value) => {

    const index = brand.indexOf(value);
    console.log(index);
    if (index > -1) {
      setBrand(brand.filter((i) => i !== value));
    } else {
      setBrand([...brand, value]);
    }
    onChangePage(1);
  };

  const choosePriceHandler = (value) => {
    const index = price.indexOf(value);
    let temp = [];
    if (index > -1) {
      temp = price.filter((i) => i !== value);
      setPrice(price.filter((i) => i !== value));
    } else {
      temp = [...price, value];
      setPrice([...price, value]);
    }
    if (temp.length > 0) {
      temp.sort();
      setMin(prices[temp[0]].min);
      setMax(prices[temp[temp.length - 1]].max);
    } else {
      setMin(0);
      setMax(10000000);
    }
    onChangePage(1);
  };

  return (
    <div>
      <div className="mt-5">
        <div className="row">
          <div className="col-2.5">
            <div className="col mini-card">
              <h4 className="text-danger fw-bolder">Danh Mục</h4>
              <ul className="list-group">
                {categories.map((item, index) => (
                  <div className="sidebar__item" key={index}>
                    <div
                      className={category.includes(item.value) ? `sidebar__item-inner active` : `sidebar__item-inner`}
                      onClick={() => chooseCategoryHandler(item.value)}
                    >
                      <i className={item.icon}></i>
                      <span>{item.display_name}</span>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
            <div className="col mt-3 mini-card">
              <h4 className="text-danger fw-bolder">Giá</h4>
              <ul className="list-group">
                {prices.map((item, index) => (
                  <div className="sidebar__item" key={index}>
                    <div
                      className={price.includes(item.value) ? `sidebar__item-inner active` : `sidebar__item-inner`}
                      onClick={() => choosePriceHandler(item.value)}
                    >
                      <i className={item.icon}></i>
                      <span>{item.display_name}</span>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>

          <div className="col">
            <div className="container-fluid padding">
              <div className="container-fluid padding">
                <div className="row welcome mini-card">
                  <h4 className="title text-danger">Sản phẩm </h4>
                </div>
              </div>
              <div className="row padding">
                {products &&
                  products.map((item, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                      <div className="card h-100">
                        <NavLink to={`/product-detail/${item.id}`}>
                          <img src={require(`../static/images/${item?.image}`)} style={{ width: 100, height: 100 }} alt="" />
                        </NavLink>
                        <div className="card-body px-2 pb-2 pt-1">
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="h4 text-primary">{(item.price - (item.price * (item.discount / 100))).toLocaleString()} Đ</p>
                            </div>
                          </div>
                          <p className="mb-0">
                            <strong>
                              <NavLink to={`/product-detail/${item.id}`} className="text-secondary">
                                {item.name}
                              </NavLink>
                            </strong>
                          </p>
                          <p className="mb-1">
                            <small>
                              <NavLink to="#" className="text-secondary">
                                {item.brand}
                              </NavLink>
                            </small>
                          </p>
                          <div className="d-flex mb-3 justify-content-between">
                            <div>
                              <p className="mb-0 small">
                                <b>Giá gốc: </b> {item.price.toLocaleString()} Đ
                              </p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="col px-0">
                              <NavLink to={`/product-detail/${item.id}`} exact className="btn btn-outline-primary btn-block">
                                Thêm vào giỏ
                                <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <nav aria-label="Page navigation example">
            <ul className="pagination offset-5">
              <li className={page === 1 ? "page-item disabled" : "page-item"}>
                <button className="page-link" onClick={() => onChangePage(1)}>
                  First
                </button>
              </li>
              {rows}
              <li className={page === total ? "page-item disabled" : "page-item"}>
                <button className="page-link" onClick={() => onChangePage(total)}>
                  Last
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Product;
