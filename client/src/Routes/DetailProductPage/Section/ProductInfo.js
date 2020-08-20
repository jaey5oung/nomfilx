import React from "react";
import { Descriptions } from "antd";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../_actions/user_action";

function ProductInfo(props) {
  const dispatch = useDispatch();

  const clickHandler = () => {
    //카트에 넣으면 필요한 정보를 넣어준다.
    dispatch(addToCart(props.detail._id));
    alert("장바구니에 상품이 담겼습니다.")
  };
  return (
    <div style={{ height:"50%", marginLeft:"5%", marginTop:"10%"}}>
      <table style={{ borderCollapse: "collapse", width:"100%", height:"100%", borderTop:"1px solid white" }}>
            <tbody>
              <tr style={{}}>
                <th style={{ color: "#f7f7f7", fontSize:"20px", width:"50%", verticalAlign:"middle",borderBottom:"1px solid white" }}>가격</th>
                <td style={{ verticalAlign:"middle", fontSize:"20px", textAlign:"center",borderBottom:"1px solid white" }}>
                {props.detail.price}
                </td>
              </tr>
              <tr>
                <th style={{ color: "#f7f7f7", fontSize:"20px", width:"50%", verticalAlign:"middle",borderBottom:"1px solid white" }}>Sold</th>
                <td style={{ verticalAlign:"middle", fontSize:"20px", textAlign:"center",borderBottom:"1px solid white" }}>{props.detail.sold}</td>
              </tr>
              <tr>
                <th style={{ color: "#f7f7f7", fontSize:"20px", width:"50%", verticalAlign:"middle",borderBottom:"1px solid white" }}>View</th>
                <td style={{ verticalAlign:"middle", fontSize:"20px", textAlign:"center",borderBottom:"1px solid white" }}>{props.detail.views}</td>
              </tr>
              <tr>
                <th style={{ color: "#f7f7f7", fontSize:"20px", width:"50%", verticalAlign:"middle",borderBottom:"1px solid white" }}>Description</th>
                <td style={{ verticalAlign:"middle", fontSize:"20px", textAlign:"center",borderBottom:"1px solid white" }}>
                {props.detail.description}
                </td>
              </tr>
            </tbody>
          </table>

      <br />
      <br />
      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={clickHandler}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
