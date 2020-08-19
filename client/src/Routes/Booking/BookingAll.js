import React, { useState, useEffect } from "react";
// import { Grid, TextField, MenuItem } from "@material-ui/core";
import axios from "axios";
import styled from "styled-components";
// import Paypal from "../../utils/Paypal";
import "../Reservation/style.css";
import {
  ContinentsAll,
  SeatA2,
  SeatB2,
  SeatC2,
  SeatD2,
  SeatE2,
  SeatF2,
  SeatG2,
  SeatF,
  SeatG,
  SeatE,
  SeatD,
  SeatA,
  SeatB,
  SeatC,
} from "../Reservation/Modal/Context";
import { useDispatch } from "react-redux";
import { addToMovie } from "../../_actions/user_action";
import Select from "react-select";
import { IMAGE_BASE_URL, CLIENT } from "../../Components/Config";

const PriceTag = styled.div`
  font-size: 20px;
  font-weight: 30px;
`;

const Small = styled.div`
  font-size: 20px;
  color: white;
`;

//------------------------------------------------------------------------------------------
const Wrapper = styled.div`
  float: left;
  height: 100%;
`;

const SeatWrapper = styled.div`
  float: right;
  height: 100%;
`;
const SelectWrapper = styled.div`
  background-color: #242333;
  color: #fff;
  /* display: flex;
  flex-direction: row;
  //align-items: center;
  justify-content: flex-end; */
  /* width: 50%; */
  font-family: "Lato", sans-serif;
`;
const InnerWrapper = styled.div`
  background-color: #242333;
  color: #fff;
  /* display: flex;
  flex-direction: row;
  //align-items: center;
  justify-content: flex-end; */
  /* width: 50%; */
  font-family: "Lato", sans-serif;
`;

const Cover = styled.div`
  width: 90%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
  box-shadow: 2px 6px 20px 0 rgba(0, 0, 0, 0.65);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

//------------------------------------------------------------------------------------------
function BookingAll({
  id,
  title,
  bgImage,
  userFrom,
  selectDay,
  time,
  theater,
}) {
  const dispatch = useDispatch();
  const [Continent, setContinent] = useState(0);
  const [Seat, setSeat] = useState([]);
  const [Price, setPrice] = useState(0);
  const [Distinct, setDistinct] = useState([]);
  const [subCount, setSubCount] = useState(0);
  const [selectedArr, setSelectedArr] = useState([]);
  // const [Test, setTest] = useState("");
  // const [Url, setUrl] = useState("");
  const movieTitle = {
    title: title,
  };

  useEffect(() => {
    axios
      .post("/api/reservation/findSeat", movieTitle)
      .then(response => {
        if (response.data.success) {
          let seatlist = [];
          response.data.seats.forEach(obj => {
            if (
              obj.time[0].time === time.time &&
              obj.selectDay[0].day === selectDay.day &&
              obj.selectDay[0].month === selectDay.month &&
              obj.selectDay[0].year === selectDay.year &&
              obj.theater === theater
            ) {
              seatlist.push(obj.seat);
            }
          });
          const flatlist = seatlist.flat(); //평탄화 함수!!!
          setDistinct(flatlist);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  //seat 색 변경
  const onSeatChange = e => {
    // console.log("eeeee", e.target);
    var container = document.querySelector("div .container");
    var unselected = container.querySelectorAll("div .seat"); //NodeList 반환

    if (
      Continent >= Seat.length + 1 &&
      !e.target.classList.contains("occupied") &&
      !e.target.classList.contains("selected")
    ) {
      let arr;
      if (Seat.length === 0) {
        arr = [];
      }
      arr = [...Seat];
      //인원이 좌석수보다 크거나 같을때

      //   if (
      //     //빈좌석
      //     !e.target.classList.contains("occupied") &&
      //     !e.target.classList.contains("selected")
      //   ) {
      //     e.target.classList.add("selected"); //누른게 선택좌석으로
      //     setSeat([...Seat, e.target.textContent]); //저장
      //   } else if (e.target.classList.contains("selected")) {
      //     //인원수와 좌석수가 같을때
      //     //선택된좌석은 삭제
      //     e.target.classList.remove("selected");
      //     const SeatFiltered = Seat.filter(seat => seat !== e.target.textContent); //text삭제
      //     setSeat(SeatFiltered);
      //   }
      // } else {
      //   if (Continent === Seat.length) {
      //     e.target.classList.remove("selected");

      //     const SeatFiltered = Seat.filter(seat => seat !== e.target.textContent); //text삭제
      //     setSeat(SeatFiltered);
      //     if (!Seat.includes(e.target.textContent)) {
      //       alert("선택한 인원수보다 좌석을 많이 선택하셨습니다.");
      //     }
      //   }

      // console.log(
      //   "sdfsdfsd",
      //   (document.querySelector("div .container"))
      // );

      // console.log("@222@", unselected.length)

      let temp;
      let sub = subCount;
      //arr 빈배열에 선택된 수(count) 만큼 push하는 과정
      unselected.forEach((seat, index) => {
        if (seat.innerHTML === e.target.textContent) {
          console.log("seat", seat.innerHTML, index);
          arr.push(seat.innerHTML);
          sub = sub + 1;
          setSubCount(subCount => sub);
          temp = index;
        } else if (seat.className === "seat occupied") {
          console.log("seat", seat.innerHTML, index);
        } else if (
          index > temp &&
          Continent - sub > 0 &&
          index === unselected.length - 1
        ) {
          console.log("seat", seat.innerHTML, index);
          arr.push(seat.innerHTML);
          sub = sub + 1;
          setSubCount(subCount => sub);
        } else if (index > temp && Continent - sub > 0) {
          console.log("seat", seat.innerHTML, index);
          arr.push(seat.innerHTML);
          sub = sub + 1;
          setSubCount(subCount => sub);
        }
      });
      // console.log(arr);
      // e.target.classList.add("selected"); //누른게 선택좌석으로

      // console.log("unselected",unselected)
      unselected.forEach(item => {
        // console.log(item)
        if (arr.includes(item.innerHTML)) {
          // console.log(2222)
          item.className = "seat selected";
        }
      });
      setSeat([...arr]); //옆테이블 예매 정보창 좌석 정보 설정(전개연산자 사용)
      setSelectedArr(arr); //선택 좌석 설정
      // setSeat([...Seat, e.target.textContent]); //저장
    } else if (
      Continent >= Seat.length + 1 &&
      e.target.classList.contains("selected")
    ) {
      console.log("1111111111111");
      console.log(selectedArr);
      unselected.forEach(item => {
        // console.log(item)
        if (selectedArr.includes(item.innerHTML)) {
          // console.log(2222)
          item.className = "seat";
        }
      });
      setSelectedArr([]);
      setSeat([]);
      setSubCount(0);
    } else if (e.target.classList.contains("selected")) {
      console.log("222222222222222");
      console.log(selectedArr);
      unselected.forEach(item => {
        // console.log(item)
        if (selectedArr.includes(item.innerHTML)) {
          // console.log(2222)
          item.className = "seat";
        }
      });
      setSelectedArr([]);
      setSeat([]);
      setSubCount(0);
    }
  };

  const onCount = event => {
    console.log("event", event);
    setContinent(event.key);
    setPrice(event.key * 6000);
  };

  //결제후 DB저장
  const transactionSuccess = () => {
    const body = {
      userFrom: userFrom,
      id: id,
      title: title,
      selectDay: selectDay,
      time: time,
      continent: Continent,
      seat: Seat,
      price: Price,
      theater: theater,
    };

    axios.post("/api/reservation", body).then(response => {
      if (response.data.success) {
        alert("예매 성공");

        window.location.href = `${CLIENT}mymovie`;

        //개인 영화 구매정보
        dispatch(addToMovie(response.data.doc._id));
      } else {
        alert("예매 실패");
        return false;
      }
    });
  };
  ////////////////////////////////////////////////////////////////

  const colourStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: "white",
      borderRadius: "1rem",
      fontSize: "1.1rem",
      width: "250px",
      // marginTop: "25px",
      height: "35px",
      border: "1px solid #9c88ff",
      boxShadow: "0 1.5rem 2rem rgba(156, 136, 255, 0.2)",
      color: "#2e2e2e",
      fontWeight: "400",
    }),
    option: (styles, { data, isDisabled, isFocused }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "#f7f7f7",
        backgroundColor: isFocused ? "#D8CEF6" : "#f7f7f7",
        color: "#151515",
        fontSize: "1.1rem",
        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
  };
  const groupedOptions = [
    {
      options: ContinentsAll,
    },
  ];

  const onKaKaoPay = () => {
    console.log("kakao");
    var IMP = window.IMP; // 생략가능
    IMP.init("imp10561880");
    // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용

    IMP.request_pay(
      {
        pg: "inicis", // version 1.1.0부터 지원.
        pay_method: "card",
        merchant_uid: "merchant_" + new Date().getTime(),
        name: title,
        amount: Price,
        buyer_email: "iamport@siot.do",
        buyer_name: "구매자이름",
        buyer_tel: "010-1234-5678",
        buyer_addr: "서울특별시 강남구 삼성동",
        buyer_postcode: "123-456",
        m_redirect_url: "https://www.yourdomain.com/payments/complete",
      },
      function (rsp) {
        if (rsp.success) {
          var msg = "결제가 완료되었습니다.";
          msg += "고유ID : " + rsp.imp_uid;
          msg += "상점 거래ID : " + rsp.merchant_uid;
          msg += "결제 금액 : " + rsp.paid_amount;
          // msg += "카드 승인번호 : " + rsp.apply_num;
          transactionSuccess(); //결제 후 예매 내역 db 저장
        } else {
          msg = "결제에 실패하였습니다.";
          msg += "에러내용 : " + rsp.error_msg;
        }
        alert(msg);
      }
    );
  };

  //--------------------------------------------------------------------------

  return (
    <>
      {/* <Wrapper style={{ marginRight: "20px" }}> */}
      <Wrapper>
        <SelectWrapper>
          <Select
            options={groupedOptions}
            placeholder="  인원을 선택해주세요"
            // defaultValue="인원을 선택해주세요"
            styles={colourStyles}
            onChange={onCount}
          />
        </SelectWrapper>

        {/* <Nav> */}
        <InnerWrapper style={{ height: "300px", marginTop: "20px" }}>
          {/* <SideFlex> */}
          <Cover bgImage={`${IMAGE_BASE_URL}original${bgImage}`} />
        </InnerWrapper>

        <InnerWrapper
          style={{
            height: "200px",
            display: "flex",
            flexDirection: "column",
            fontSize: "13px",
            padding: "10px",
            color: "#D8D8D8",
          }}
        >
          <table style={{ height: "50%" }}>
            <tbody>
              <tr>
                <th style={{ color: "white" }}>날짜</th>
                <td>
                  {selectDay &&
                    `${selectDay.year}-${selectDay.month}-${selectDay.day}`}
                </td>
              </tr>

              <tr>
                <th style={{ color: "white" }}>시간</th>
                <td>{time.time}</td>
              </tr>

              <tr>
                <th style={{ color: "white" }}>인원</th>
                <td>{Continent}</td>
              </tr>

              <tr>
                <th style={{ color: "white" }}>좌석</th>
                <td style={{ width: "75%" }}>
                  {Seat.map((seat, index) => {
                    if (index < Seat.length - 1) {
                      return seat + ", ";
                    } else {
                      return seat;
                    }
                  })}
                </td>

                <td></td>
              </tr>
            </tbody>
          </table>
          <hr style={{ color: "white", borderColor: "white", width: "100%" }} />
          <PriceTag>{Price}원</PriceTag>
          {/* <Paypal onSuccess={transactionSuccess} Price={Price} /> */}
          <img
            src={require("../../img/kakaoPay.png")}
            alt="kakaoPay"
            style={{ width: "20%", height: "25px", float: "right" }}
            onClick={onKaKaoPay}
          />

          {/* </SideFlex>
        </SideWrapper> */}
        </InnerWrapper>
      </Wrapper>
      {/* **************************************************************************************** */}
      {theater % 2 === 1 ? (
        <SeatWrapper>
          {/* <InnerWrapper style={{ marginBottom: "30px", marginTop: "2px" }}> */}
          <ul className="showcase">
            <li>
              <div className="seat"></div> <Small>빈좌석</Small>
            </li>
            <li>
              <div className="seat selected"></div> <Small>선택좌석</Small>
            </li>
            <li>
              <div className="seat occupied"></div> <Small>선택완료</Small>
            </li>
          </ul>
          {/* </InnerWrapper> */}
          <hr
            style={{ color: "white", borderColor: "white", marginLeft: "20px" }}
          />
          {/* {DBtime === time.time && ( */}
          {/* <InnerWrapper> */}
          <div className="container">
            <div className="screen"></div>
            {/* 좌석 */}
            {
              <div className="row">
                {SeatA.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>
            }
            {
              <div className="row">
                {SeatB.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>
            }
            {
              <div className="row">
                {SeatC.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>
            }
            {
              <div className="row">
                {SeatD.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>
            }
            {
              <div className="row">
                {SeatE.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>
            }
            {
              <div className="row">
                {SeatF.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>
            }
            {
              <div className="row">
                {SeatG.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>
            }
          </div>
          {/* </InnerWrapper> */}
          {/* )} */}
        </SeatWrapper>
      ) : (
        <SeatWrapper>
          {/* <InnerWrapper style={{ marginBottom: "30px", marginTop: "2px" }}> */}
          <ul className="showcase">
            <li>
              <div className="seat"></div> <Small>빈좌석</Small>
            </li>
            <li>
              <div className="seat selected"></div> <Small>선택좌석</Small>
            </li>
            <li>
              <div className="seat occupied"></div> <Small>선택완료</Small>
            </li>
          </ul>
          {/* </InnerWrapper> */}
          <hr
            style={{ color: "white", borderColor: "white", marginLeft: "20px" }}
          />
          {/* {DBtime === time.time && ( */}
          {/* <InnerWrapper> */}
          <div className="container">
            <div className="screen"></div>
            {/* 좌석 */}
            {
              <div className="row">
                {SeatA2.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>
            }
            {
              <div className="row">
                {SeatB2.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>
            }
            {
              <div className="row">
                {SeatC2.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>
            }
            {
              <div className="row">
                {SeatD2.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>
            }
            {
              <div className="row">
                {SeatE2.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>
            }
            {
              <div className="row">
                {SeatF2.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>
            }
            {
              <div className="row">
                {SeatG2.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onSeatChange}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>
            }
          </div>
          {/* </InnerWrapper> */}
          {/* )} */}
        </SeatWrapper>
      )}
      {/* </Nav> */}
    </>
  );
}

export default BookingAll;
