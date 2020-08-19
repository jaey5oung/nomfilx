import React from "react";
import { Carousel } from "antd";
import { LOCAL_SERVER } from "../Components/Config";
function ImageSlider(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index} style={{}}>
            <img
              // style={{ width: "100%", height: "100%", borderRadius:"5px" }}
              style={{ width: "100%", maxHeight: "110px" }}
              src={`${LOCAL_SERVER}${image}`}
              alt="productImage"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
