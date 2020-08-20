import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

function LogoutContainer(props) {
  const onClickHandler = () => {
    axios.get("/api/users/logout").then(response => {
      if (response.data.success) {
        props.history.push("/sign-in");
      } else {
        alert("로그아웃 하는데 실패 했습니다.");
      }
    });
  };
  return (
    <div>
      <h3>정말로 로그아웃 하시겠습니까?</h3>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default withRouter(LogoutContainer);
