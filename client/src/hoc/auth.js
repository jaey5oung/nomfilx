import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        //로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option === true) {
            props.history.push("/sign-in");
          }
        } else {
          //로그인 한 상태
          if (adminRoute === true && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            //로그인한 사람이 못들어가는 페이지 로그인,회원가입
            if (option === false) props.history.push("/");
          }
        }
      });
    }, []);
    return <SpecificComponent {...props} user={user} />;
  }

  return AuthenticationCheck;
}
