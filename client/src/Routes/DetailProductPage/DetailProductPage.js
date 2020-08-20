import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductImage from "./Section/ProductImage";
import ProductInfo from "./Section/ProductInfo";
import { Row, Col } from "antd";
function DetailProductPage(props) {
  //상품ID 가져오기
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        setProduct(response.data[0]);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div
      style={{ width: "60%", padding: "5rem 4rem", margin:"0 auto", height:"50%" }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <h1 style={{ color: "#f7f7f7", fontSize: "50px", fontWeight:"400" }}>{Product.title}</h1>
      </div>
        <hr style={{borderColor:"white"}}></hr>
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          <ProductImage detail={Product}/>
        </Col>

        <Col lg={12} sm={24}>
          <ProductInfo detail={Product} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
