import React from "react";
import "../static/css/style.css";
import { NavLink, useHistory } from "react-router-dom";
import user_image from "../static/images/default.png";
import Dropdown from "../admin/dropdown/Dropdown";
import { toast } from "react-toastify";
import { GoSearch } from "react-icons/go";
const user_menu = [
  {
    icon: "bx bx-user",
    content: "Tài khoản",
    url: "/profile",
  },
  {
    icon: "bx bx-log-out-circle bx-rotate-180",
    content: "Đăng xuất",
    url: "/",
  },
];

const not_menu = [
  {
    icon: "bx bx-user",
    content: "Đăng nhập",
    url: "/sign-in",
  },
  {
    icon: "bx bx-cog",
    content: "Đăng kí",
    url: "/register",
  },
];

const Header = (props) => {
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    props.searchHandler(e.target.keyword.value);
    history.push("/search-page");
  };

  const curr_user = {
    display_name: props.user ? props.user.fullName : "Tài khoản",
    image: user_image,
  };

  const renderUserToggle = (user) => (
    <div className="topnav__right-user">
      <div className="topnav__right-user__image">
        <img src={user.image} alt="" />
      </div>
      <div className="topnav__right-user__name">{user.display_name}</div>
    </div>
  );

  const renderUserMenu = (item, index) => (
    <NavLink to={item.url} key={index} exact onClick={item.url === "/" ? signOutHandler : ""}>
      <div className="notification-item">
        <i className={item.icon}></i>
        <span>{item.content}</span>
      </div>
    </NavLink>
  );

  const signOutHandler = () => {
    props.refresh(false);
    toast.success("Tài khoản đã được đăng xuất.");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    props.userHandler(null);
  };

  return (
    <div className="mini-card">
      {/* Navigation */}
      <nav className="navbar navbar-expand-md col-12">
        <div className="collapse navbar-collapse col">
          <ul className="navbar-nav mini-ul">
            <li className={props.header === 1 ? "nav-item mr-2  mini-item active" : "nav-item mr-2  mini-item"}>
              <NavLink className="nav-link" to="/" exact>
                Trang chủ
              </NavLink>
            </li>
            <li className={props.header === 2 ? "nav-item mr-2  mini-item active" : "nav-item mr-2  mini-item"}>
              <NavLink className="nav-link" to="/store" exact>
                Danh Mục
              </NavLink>
            </li>
            <li className={props.header === 3 ? "nav-item mr-2  mini-item active" : "nav-item mr-2  mini-item"}>
              <NavLink className="nav-link" to="/cart" exact>
                Giỏ hàng
              </NavLink>
            </li>
            {props.user && (
              <li className={props.header === 5 ? "nav-item mr-2  mini-item active" : "nav-item mr-2  mini-item"}>
                <NavLink className="nav-link" to="/order" exact>
                  Đơn hàng
                </NavLink>
              </li>
            )}
            <li className={props.header === 4 ? "nav-item mr-2  mini-item active" : "nav-item mr-2  mini-item"}>
              <NavLink className="nav-link" to="/blog" exact>
                Chính sách
              </NavLink>
            </li>
            {props.user && <li className={props.header === 6 ? "nav-item mr-2  mini-item active" : "nav-item mr-2  mini-item"}></li>}
          </ul>
          <form className="form-inline my-2 my-lg-0 mr-3" onSubmit={(e) => submitHandler(e)}>
            <input className="form-control mr-sm-2  header__search-input" type="search" aria-label="Search" name="keyword" placeholder=" Tìm kiếm sản phẩm " />
            <button className=" header__search-btn">
              {" "}
              <GoSearch className="header__search-btn-icon" />
            </button>
          </form>
          {props.user && (
            <Dropdown customToggle={() => renderUserToggle(curr_user)} contentData={user_menu} renderItems={(item, index) => renderUserMenu(item, index)} />
          )}
          {!props.user && (
            <Dropdown customToggle={() => renderUserToggle(curr_user)} contentData={not_menu} renderItems={(item, index) => renderUserMenu(item, index)} />
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
