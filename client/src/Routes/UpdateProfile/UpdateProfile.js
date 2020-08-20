import React, { useState, useEffect } from "react";
import { Typography, Form, Input } from "antd";

import Button from "@material-ui/core/Button";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { LOCAL_SERVER } from "../../Components/Config";
import "antd/dist/antd.css";

const { Title } = Typography;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

function UpdateProfile(props) {
  const [updatePasswordConfirm, setUpdatePasswordConfirm] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [FilePath, setFilePath] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [UpdateName, setUpdateName] = useState("");
  

  useEffect(() => {
    Axios.post("/api/users/getUserInfo", {
      userId: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.data.success) {
        setCurrentEmail(response.data.user[0].email);
        setCurrentName(response.data.user[0].name);
        setCurrentImage(response.data.user[0].image);
      } else {
        alert("user 정보를 갖고오는데 실패했습니다.")
      }
    })
  }, [])

  const onDrop = (files) => {
    let formData = new FormData()
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    Axios.post("/api/image/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        setFilePath(response.data.filePath);
      } else {
        alert("failed to save the video in server")
      }
    })
  }

  const handleChangeCurrentName = (event) => {
    setUpdateName(event.currentTarget.value)
  }

  const handleChangeUpdatePassword = (event) => {
    setUpdatePassword(event.currentTarget.value)
  }

  const handleChangeUpdatePasswordConfirm = (event) => {
    setUpdatePasswordConfirm(event.currentTarget.value)
  }

  const onSubmit = event => {
    event.preventDefault(); //페이지 refresh 방지
    let variable = {
      id: window.localStorage.getItem("userId"),
      password: currentPassword,
      newName: UpdateName !== "" ? UpdateName : currentName,
      newPassword: updatePassword !== "" ? updatePassword : currentPassword,
      newImage: FilePath !== "" ? FilePath : currentImage,
    }
    if (currentEmail.includes("(google)") || currentEmail.includes("(kakao)")) {
      alert("소셜 계정입니다!")
    }
    if (updatePassword === updatePasswordConfirm) {
      Axios.post("/api/users/updateProfile", variable).then(response => {
        if (response.data.success) {
          alert("변경되었습니다.")
          props.history.push("/")
        } else {
          alert("잘못된 입력입니다.")
        }
      })
    } else {
      alert("비밀번호가 일치하지 않습니다!")
    }
  }

  return (
    <>
      <div>
        <Form
          {...formItemLayout}
          style={{
            border: "3px solid mediumslateblue",
            margin: "10rem auto",
            boxShadow: "0 1.5rem 2rem rgba(156, 136, 255, 0.2)",

            textAlign: "center",
            width: "40%",
            padding: "30px",
            backgroundColor: "black",
            borderRadius: "10px",
          }}
        >
          <Title style={{ color: "white" }}>회원정보 수정</Title>
          <h3 style={{ color: "white" }}>회원님의 소정한 정보를 안전하게 관리하세요.</h3>
          <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "10rem",
                  height: "10rem",
                  border: "1px solid black",

                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  top: "10px",
                  left: "5px",
                  margin: "0 auto",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <img
                  style={{
                    display: "flex",
                    borderRadius: "60%",
                    justifyContent: "center",
                  }}
                  src={
                    FilePath
                      ? `${LOCAL_SERVER}${FilePath}`
                      : currentImage
                      ? `${LOCAL_SERVER}${currentImage}`
                      : `${LOCAL_SERVER}uploads/default.png`
                  }
                  alt="haha"
                  width="110px"
                  height="110px"
                />
              </div>
            )}
          </Dropzone>
          <br />
          <Form.Item
            style={{ backgroundColor: "mediumslateblue", border: "2px solid mediumslateblue", boxShadow: "0 1.5rem 2rem rgba(156, 136, 255, 0.2)",borderRadius:"5px" }}
            label="이메일"
            hasFeedback
            validateStatus="success"
          >
            <Input value={currentEmail} disabled />
          </Form.Item>

          <Form.Item
            style={{ backgroundColor: "mediumslateblue", border: "2px solid mediumslateblue", boxShadow: "0 1.5rem 2rem rgba(156, 136, 255, 0.2)",borderRadius:"5px" }}
            label="이름"
            hasFeedback
            validateStatus="success"
          >
            <Input
              placeholder={currentName}
              value={UpdateName}
              onChange={handleChangeCurrentName}
            />
          </Form.Item>

          <Form.Item
             style={{ backgroundColor: "mediumslateblue", border: "2px solid mediumslateblue", boxShadow: "0 1.5rem 2rem rgba(156, 136, 255, 0.2)", borderRadius:"5px" }}
            label="새 비밀번호"
            hasFeedback
            validateStatus="success"
          >
            <Input
              placeholder="새 비밀번호 입력"
              value={updatePassword}
              onChange={handleChangeUpdatePassword}
              type="password"
              id="newPassword"
            />
          </Form.Item>

          <Form.Item
             style={{ backgroundColor: "mediumslateblue", border: "2px solid mediumslateblue", boxShadow: "0 1.5rem 2rem rgba(156, 136, 255, 0.2)",borderRadius:"5px" }}
            label="새 비밀번호 재입력"
            hasFeedback
            validateStatus="success"
          >
            <Input
              style={{ color: "white" }}
              placeholder="새 비밀번호 재입력"
              type="password"
              value={updatePasswordConfirm}
              onChange={handleChangeUpdatePasswordConfirm}
              id="newPasswordConfirm"
            />
          </Form.Item>
          <br />
          <br />

          <Button
            style={{
              backgroundColor: "mediumslateblue",
              borderRadius: "5px",
              boxShadow: "0 1.5rem 2rem rgba(156, 136, 255, 0.2)",
            }}
            type="primary"
            size="large"
            onClick={onSubmit}
          >
            Update Profile
          </Button>
        </Form>
      </div>
    </>
  )
}

export default withRouter(UpdateProfile)
