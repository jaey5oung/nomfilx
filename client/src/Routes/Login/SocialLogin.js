import React from "react";
import GoogleLogin from "react-google-login";
import KaKaoLogin from "react-kakao-login";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { GOOGLE_KEY, GOOGLE_LOGO, KAKAO_KEY } from "../../Components/Config";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const GoGo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`;
const KaKaoBtn = styled(KaKaoLogin)`
  width: 17%;
  height: 52px;
  line-height: 44px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 130px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;
function SocialLogin(props) {
  const responseGoogle = response => {
    const data = {
      tokenId: response.tokenId,
    };
    Axios.post("/api/users/googlelogin", data).then(response => {
      if (response.data.loginSuccess) {
        window.localStorage.setItem("userId", response.data.userId);
        props.history.push("/");
      } else {
        alert("로그인 실패");
      }
    });
  };
  const responseKaKao = response => {
    const data = response;
    Axios.post("/api/users/kakaologin", data).then(response => {
      if (response.data.loginSuccess) {
        window.localStorage.setItem("userId", response.data.userId);
        props.history.push("/");
      } else {
        alert("로그인 실패");
      }
    });
  };
  return (
    <Container>
      <GoGo>
        <GoogleLogin
          clientId={GOOGLE_KEY}
          render={renderProps => (
            <button
              className="c-flex"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              style={{
                width: "17%",
                borderRadius: "100%",
              }}
            >
              <img
                src={GOOGLE_LOGO}
                style={{ width: "100%", height: "45px", borderRadius: "100%" }}
                alt="Google Logo"
              />
            </button>
          )}
          buttonText=""
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          scope="email"
        />
        <KaKaoBtn
          //styled component 통해 style을 입혀 줄 예정
          jsKey={KAKAO_KEY}
          //카카오에서 할당받은 jsKey를 입력
          buttonText="Kakao"
          //로그인 버튼의 text를 입력
          onSuccess={responseKaKao}
          //성공했을때 불러올 함수로서 fetch해서 localStorage에 저장할 함수를 여기로 저장
          getProfile={true}
        />
      </GoGo>
    </Container>
  );
}
export default withRouter(SocialLogin);
