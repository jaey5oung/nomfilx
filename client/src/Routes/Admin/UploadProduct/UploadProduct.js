import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../../utils/FileUpload";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "팝콘" },
  { key: 2, value: "음료" },
  { key: 3, value: "스낵" },
];

function UploadProductPage(props) {
  const userFrom = localStorage.getItem("userId");
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [PriceValue, setPriceValue] = useState(0);
  const [ContinentValue, setContinentValue] = useState(1);

  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  const onContinentsSelectChange = (event) => {
    setContinentValue(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    if (
      !TitleValue ||
      !DescriptionValue ||
      !PriceValue ||
      !ContinentValue ||
      !Images
    ) {
      return alert("fill all the fields first!");
    }

    const body = {
      writer: userFrom,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      continents: ContinentValue,
    };

    Axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("상품등록 완료");
        props.history.push("/");
      } else {
        alert("상품등록 실패");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> 매점 상품 등록</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label style={{ color: "black" }}>상품명</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label style={{ color: "black" }}>설명</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label style={{ color: "black" }}>가격($)</label>
        <Input onChange={onPriceChange} value={PriceValue} type="number" />
        <br />
        <br />
        <select onChange={onContinentsSelectChange} value={ContinentValue}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}{" "}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button onClick={onSubmit}><span style={{ color: "black" }}>
          등록
        </span>
        </Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;