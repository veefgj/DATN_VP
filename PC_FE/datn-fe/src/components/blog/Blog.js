import React, { useEffect } from "react";
import "./Blog.css";

const Blog = (props) => {
  useEffect(() => {
    props.changeHeaderHandler(4);
  }, [props]);

  return (
    <div className="col-10 offset-1 card">
      <h4 className="text-uppercase text-primary">Cam kết sản phẩm</h4>
      <p>Tất cả sản phẩm PC bán ra 100% là Chính Hãng .</p>
      <hr />
      <h4 className="text-uppercase text-primary">HỖ TRỢ MUA HÀNG</h4>
      <p>Bảo Hành Cho Quý Khách.</p>
      <h6 className="fw-fw-bolder"> Liên hệ </h6>
      <p>Quý khách liên hệ số điện thoại Hotline : 0967.810.888</p>
    </div>
  );
};

export default Blog;
