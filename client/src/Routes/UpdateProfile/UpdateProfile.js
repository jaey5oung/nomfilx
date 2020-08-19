// import React from "react";
// import { Grid, withStyles } from "@material-ui/core";
// import AccountProfile from "./AccountProfile/AccountProfile";
// import AccountDetails from "./AccountDetails/AccountDetails";
// const styles = (theme) => ({
//   root: {
//     padding: theme.spacing(4),
//   },
// });

// function UpdateProfile(props) {
//   return (
//     <div>
//       <Grid container spacting={4}>
//         <Grid item lg={4} md={6} xl={4} xs={12}>
//           <AccountProfile ap={props.user.userData && props.user.userData} />
//         </Grid>
//         <Grid item lg={8} md={6} xl={8} xs={12}>
//           <AccountDetails ad={props.user.userData && props.user.userData} />
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default withStyles(styles)(UpdateProfile);

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
};

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
    }).then(response => {
      if (response.data.success) {
        console.log(99, response.data);
        setCurrentEmail(response.data.user[0].email);
        setCurrentName(response.data.user[0].name);
        // console.log(response.data.user[0].image);
        setCurrentImage(response.data.user[0].image);
      } else {
        alert("user 정보를 갖고오는데 실패했습니다.");
      }
    });
  }, []);

  const onDrop = files => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    console.log(files);
    formData.append("file", files[0]);

    Axios.post("/api/image/uploadfiles", formData, config).then(response => {
      if (response.data.success) {
        console.log(response.data);

        setFilePath(response.data.filePath);
      } else {
        alert("failed to save the video in server");
      }
    });
  };

  const handleChangeCurrentName = event => {
    setUpdateName(event.currentTarget.value);
  };

  const handleChangeUpdatePassword = event => {
    setUpdatePassword(event.currentTarget.value);
  };

  const handleChangeUpdatePasswordConfirm = event => {
    setUpdatePasswordConfirm(event.currentTarget.value);
  };

  const onSubmit = event => {
    event.preventDefault(); //페이지 refresh 방지
    console.log("들어왔다");
    let variable = {
      id: window.localStorage.getItem("userId"),
      password: currentPassword,
      newName: UpdateName !== "" ? UpdateName : currentName,
      newPassword: updatePassword !== "" ? updatePassword : currentPassword,
      newImage: FilePath !== "" ? FilePath : currentImage,
    };
    if (currentEmail.includes("(google)") || currentEmail.includes("(kakao)")) {
      alert("소셜 계정입니다!");
    }
    if (updatePassword === updatePasswordConfirm) {
      // console.log("2222222");
      Axios.post("/api/users/updateProfile", variable).then(response => {
        console.log(response.data);
        if (response.data.success) {
          alert("변경되었습니다.");
          props.history.push("/");
        } else {
          alert("잘못된 입력입니다.");
        }
      });
    } else {
      alert("비밀번호가 일치하지 않습니다!");
    }
  };

  return (
    <>
      <div>
        <Form
          {...formItemLayout}
          style={{
            border: "1px solid white",
            margin: "2rem auto",
            textAlign: "center",
            width: "50%",
            backgroundColor: "white",
            borderRadius: "20px",
          }}
        >
          <Title style={{ color: "black" }}>회원정보 수정</Title>
          <h3 style={{ color: "black" }}>
            회원님의 소정한 정보를 안전하게 관리하세요.
          </h3>
          <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "6rem",
                  height: "6rem",
                  border: "1px solid black",

                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  top: "5px",
                  left: "5px",
                  margin: "0 auto",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />

                {/* <UserOutlined style={{ color: "white", fontSize: "1rem" }} /> */}
                {/* <img
                  style={{
                    borderRadius: "70%",
                    overflow: "hidden",
                    objectFit: "cover",
                    justifyContent: "center",
                  }}
                  src={
                    currentImage
                      ? `http://localhost:5000/${currentImage.image}`
                      : "http://localhost:5000/uploads/default.png"
                  }
                  alt="haha"
                  width="80rem"
                  height="90rem"
                /> */}
                <img
                  style={{
                    display: "flex",
                    borderRadius: "30%",
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
            style={{ color: "white" }}
            label="이메일"
            hasFeedback
            validateStatus="success"
          >
            <Input value={currentEmail} disabled />
          </Form.Item>

          <Form.Item
            style={{ color: "white" }}
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
            style={{ color: "white" }}
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
            style={{ color: "white" }}
            label="새 비밀번호 재입력"
            hasFeedback
            validateStatus="success"
          >
            <Input
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
  );
}

export default withRouter(UpdateProfile);
