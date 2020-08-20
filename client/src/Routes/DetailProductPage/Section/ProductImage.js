import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { LOCAL_SERVER } from "../../../Components/Config";

function ProductImage(props) {
  const [Images, setImages] = useState([]);
  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = [];

      props.detail.images.forEach(item => {
        images.push({
          original: `${LOCAL_SERVER}${item}`,
          thumbnail: `${LOCAL_SERVER}${item}`,
        });
      });
      setImages(images);
    }
  }, [props.detail]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}

export default ProductImage;
