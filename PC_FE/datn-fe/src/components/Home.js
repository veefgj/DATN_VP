import { NavLink } from "react-router-dom";
import first from "../static/images/unnamed.png";
import second from "../static/images/unnamed.png";
import third from "../static/images/unnamed.png";
import fourth from "../static/images/unnamed.png";
import React, { useState, useEffect } from "react";
import { getAllProducts } from "../api/ProductApi";
import Product from "./Product";
import shadows from "@mui/material/styles/shadows";
import "../static/css/style.css"

const Home = (props) => {
  const [products, setProducts] = useState([]);
  const [productsMH, setProductsMH] = useState([]);
  const [linhkien, setLinhkien] = useState([]);
  const [maytinhmaychu, setMaytinhmaychu] = useState([]);
  const [laptop, setLaptop] = useState([]);
  const [thietbi, setThietbi] = useState([]);
  const [loatn, setLoaTN] = useState([]);
  const [gamegear, setGamegear] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState({});
  const [active, setActive] = useState(true);

  /* var rows = new Array(total).fill(0).map((zero, index) => (
    <li
      className={page === index + 1 ? "page-item active" : "page-item"}
      key={index}
    >
      <button
        className="page-link"
        style={{ borderRadius: 50 }}
        onClick={() => onChangePage(index + 1)}
      >
        {index + 1}
      </button>
    </li>
  ));*/

  useEffect(() => {
    getAllProducts(1, 100, active).then((response) => {
      let MTMC = response.data.content.filter((obj) => {
        return obj.brand === "Máy tính - Máy chủ";
      });
      setProducts(MTMC);
      let Manhinhs = response.data.content.filter((obj) => {
        return obj.brand === "Màn hình máy tính";
      });
      setProductsMH(Manhinhs);
      let Linhkien = response.data.content.filter((obj) => {
        return obj.brand === "Linh kiện máy tính";
      });
      setLinhkien(Linhkien);
      let LapTop = response.data.content.filter((obj) => {
        return obj.brand === "LapTop";
      });
      setLaptop(LapTop);
      var productShows = response.data.content.filter((obj) => {
        return obj.active === true;
      });
      setProducts(productShows);
      //setTotal(1);
    }).catch(error => console.log(error));
    console.log("hello");
  }, []);
  //  props.changeHeaderHandler(1);
  //}, [page]);

  //const onChangePage = (page) => {
  //  setPage(page);
  // };

  return (
    <div>
      {/* Carousel */}
      {/* <div id="slides" className="carousel slide  mb-5" data-ride="carousel">
        <ul className="carousel-indicators">
          <li data-target="#slides" data-slide-to={0} className="active" />
          <li data-target="#slides" data-slide-to={1} />
          <li data-target="#slides" data-slide-to={2} />
          <li data-target="#slides" data-slide-to={3} />
        </ul>
        <div className="carousel-inner mini-card">
          <div className="carousel-item active" style={{ marginLeft: 250 }}>
            <img src={second} alt="" style={{ width: 1000, height: 500 }} />
          </div>
          <div className="carousel-item" style={{ marginLeft: 250 }}>
            <img src={first} alt="" style={{ width: 1000, height: 500 }} />
          </div>
          <div className="carousel-item" style={{ marginLeft: 250 }}>
            <img src={third} alt="" style={{ width: 1000, height: 500 }} />
          </div>
          <div className="carousel-item" style={{ marginLeft: 250 }}>
            <img src={fourth} alt="" style={{ width: 1000, height: 500 }} />
          </div>
        </div>
      </div> */}
      <img src={second} alt="" width="1526px" id="banner-img"/>
      <div className="col-15 container-fluid card">
        <h4 className="title text-primary">Sản phẩm</h4>
        <div className="row padding d-flex">
          {products?.map((item, index) => (
            <div className="col-md-3 mb-6" key={index}>
              <div className="card h-90 mini-pro">
                <div className="d-flex justify-content-between position-absolute w-100"></div>
                <NavLink to={`/product-detail/${item.id}`} onClick="">
                  <img src={require(`../static/images/${item.image}`)} style={{ width: 175, height: 200 }} alt="Product" className="mini-card" />
                </NavLink>
                <div className="card-body px-2 pb-2 pt-1">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="h4 text-primary mini-card">{((item.price * (100 - item.discount)) / 100).toLocaleString()} đ</p>
                    </div>
                  </div>
                  <p className="mb-0">
                    <strong>
                      <NavLink to={`/product-detail/${item.id}`} className="text-secondary ">
                        {item.name}
                      </NavLink>
                    </strong>
                  </p>
                  <p className="mb-1">
                    <small>
                      <NavLink to="#" className="text-secondary ">
                        {item.brand}
                      </NavLink>
                    </small>
                  </p>
                  <div className="d-flex mb-3 justify-content-between">
                    <div>
                      <p className="mb-0 small">
                        <b>Giá gốc: {item.price.toLocaleString()} đ</b>
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="col px-0 ">
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
      <div className="col-15 container-fluid card">
        <h4 className="title text-primary"> Sản phẩm Màn Hình Máy Tính</h4>
        <div className="row padding d-flex">
          {productsMH.map((item, index) => (
            <div className="col-md-3 mb-6" key={index}>
              <div className="card h-90 mini-pro">
                <div className="d-flex justify-content-between position-absolute w-100"></div>
                <NavLink to={`/product-detail/${item.id}`}>
                  <img src={require(`../static/images/${item.image}`)} style={{ width: 175, height: 200 }} alt="Product" className="mini-card" />
                </NavLink>
                <div className="card-body px-2 pb-2 pt-1">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="h4 text-primary mini-card">{((item.price * (100 - item.discount)) / 100).toLocaleString()} đ</p>
                    </div>
                  </div>

                  <p className="mb-0">
                    <strong>
                      <NavLink to={`/product-detail/${item.id}`} className="text-secondary ">
                        {item.name}
                      </NavLink>
                    </strong>
                  </p>
                  <p className="mb-1">
                    <small>
                      <NavLink to="#" className="text-secondary ">
                        {item.brand}
                      </NavLink>
                    </small>
                  </p>
                  <div className="d-flex mb-3 justify-content-between">
                    <div>
                      <p className="mb-0 small">
                        <b>Giá gốc: {item.price.toLocaleString()} đ</b>
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="col px-0 ">
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

      <div className="col-15 container-fluid card">
        <h4 className="title text-primary"> Sản phẩm Linh Kiện Máy Tính</h4>
        <div className="row padding d-flex">
          {linhkien.map((item, index) => (
            <div className="col-md-3 mb-6" key={index}>
              <div className="card h-90 mini-pro">
                <div className="d-flex justify-content-between position-absolute w-100"></div>
                <NavLink to={`/product-detail/${item.id}`}>
                  <img src={require(`../static/images/${item.image}`)} style={{ width: 175, height: 200 }} alt="Product" className="mini-card" />
                </NavLink>
                <div className="card-body px-2 pb-2 pt-1">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="h4 text-primary mini-card">{((item.price * (100 - item.discount)) / 100).toLocaleString()} đ</p>
                    </div>
                  </div>

                  <p className="mb-0">
                    <strong>
                      <NavLink to={`/product-detail/${item.id}`} className="text-secondary ">
                        {item.name}
                      </NavLink>
                    </strong>
                  </p>
                  <p className="mb-1">
                    <small>
                      <NavLink to="#" className="text-secondary ">
                        {item.brand}
                      </NavLink>
                    </small>
                  </p>
                  <div className="d-flex mb-3 justify-content-between">
                    <div>
                      <p className="mb-0 small">
                        <b>Giá gốc: {item.price.toLocaleString()} đ</b>
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="col px-0 ">
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
      <div className="col-15 container-fluid card">
        <h4 className="title text-primary"> Sản phẩm LapTop</h4>
        <div className="row padding d-flex">
          {laptop.map((item, index) => (
            <div className="col-md-3 mb-6" key={index}>
              <div className="card h-90 mini-pro">
                <div className="d-flex justify-content-between position-absolute w-100"></div>
                <NavLink to={`/product-detail/${item.id}`}>
                  <img src={require(`../static/images/${item.image}`)} style={{ width: 175, height: 200 }} alt="Product" className="mini-card" />
                </NavLink>
                <div className="card-body px-2 pb-2 pt-1">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="h4 text-primary mini-card">{((item.price * (100 - item.discount)) / 100).toLocaleString()} đ</p>
                    </div>
                  </div>

                  <p className="mb-0">
                    <strong>
                      <NavLink to={`/product-detail/${item.id}`} className="text-secondary ">
                        {item.name}
                      </NavLink>
                    </strong>
                  </p>
                  <p className="mb-1">
                    <small>
                      <NavLink to="#" className="text-secondary ">
                        {item.brand}
                      </NavLink>
                    </small>
                  </p>
                  <div className="d-flex mb-3 justify-content-between">
                    <div>
                      <p className="mb-0 small">
                        <b>Giá gốc: {item.price.toLocaleString()} đ</b>
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="col px-0 ">
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
      {/*<nav aria-label="Page navigation">
        <ul className="pagination offset-5 mt-3">
          <li className={page === 1 ? "page-item disabled" : "page-item"}>
            <button
              className="page-link"
              style={{ borderRadius: 50 }}
              onClick={() => onChangePage(1)}
            >
              {`<<`}
            </button>
          </li>
          {rows}
          <li className={page === total ? "page-item disabled" : "page-item"}>
            <button
              className="page-link"
              style={{ borderRadius: 50 }}
              onClick={() => onChangePage(total)}
            >
              {`>>`}
            </button>
          </li>
        </ul>
                          </nav>*/}
    </div>
  );
};

export default Home;
