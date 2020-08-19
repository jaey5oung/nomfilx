import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Popup from "reactjs-popup";
import "../style.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {
  Continents,
  SeatA,
  SeatB,
  SeatC,
  SeatD,
  SeatE,
  SeatF,
  SeatG,
} from "./Context";
import Reservation from "../../Booking/Reservation";
import { CLIENT } from "../../../Components/Config";
const Button = styled.button`
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  border-radius: 3px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  transition: all 0.5s;
  color: white;
  border-color: white;
  background: transparent;
  margin-left: 5px;
`;

const Cover = styled.div`
  width: 95%;
  height: 60%;
  background-image: url(${props => props.bgImage});

  background-position: center center;

  background-size: cover;

  border-radius: 5px;
  box-shadow: 2px 6px 20px 0 rgba(0, 0, 0, 0.65);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const SideFlex = styled.div`
  width: 100%;
  background-position: center center;
  box-shadow: 2px 6px 20px 0 rgba(0, 0, 0, 0.65);
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const SideWrapper = styled.div`
  background-color: #242333;
  color: #fff;
  display: flex;
  flex-direction: row;
  //align-items: center;
  justify-content: space-between;
  height: 80vh;
  width: 35%;
  font-family: "Lato", sans-serif;
  margin: 0;
  border: 1px solid white;
`;

const Wrapper = styled.div`
  background-color: #242333;
  //color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  //justify-content: flex-end;
  height: 80vh;
  width: 80%;
  font-family: "Lato", sans-serif;
  margin: 0;
`;

const Container = styled.div`
  margin: 20px 0;
`;
const Header = styled.div`
  margin: 0 auto;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-top: 30px;
`;

const Select = styled.select`
  margin: 20px 0;
  background-color: #fff;
  border: 0;
  border-radius: 5px;
  font-size: 14px;
  /* margin-left: 10px; */
  padding: 5px 50px 5px 15px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
`;

const Small = styled.div`
  font-size: 20px;
  color: white;
`;

const PriceTag = styled.div`
  font-size: 20px;
  font-weight: 30px;
`;
// -----------------------------------------------------------------------------------------------
const TimeModal = ({
  selectDay,
  theaters,
  bgImage,
  time,
  id,
  title,
  userFrom,
}) => {
  const [Continent, setContinent] = useState(0);

  const seats = document.querySelectorAll(".row .seat:not(.occupied)");
  const [Seat, setSeat] = useState([]);
  const [Price, setPrice] = useState(0);
  const [distinct, setDistinct] = useState([]);

  // const updateSelectedCount = () => {
  //   const selectedSeats = document.querySelectorAll(".row .seat.selected");

  //   const seatsIndex = [...selectedSeats].map((seat) =>
  //     [...seats].indexOf(seat)
  //   );

  //   localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  // };

  // const populateUI = () => {
  //   const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  //   if (selectedSeats !== null && selectedSeats.length > 0) {
  //     seats.forEach((seat, index) => {
  //       if (selectedSeats.indexOf(index) > -1) {
  //         seat.classList.add("selected");
  //       }
  //     });
  //   }
  // };

  //seat 색 변경
  const onSeatChange = e => {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("occupied")
    ) {
      e.target.classList.toggle("selected");
      setSeat([...Seat, e.target.innerText]);
      console.log("seat", Seat);
    }
  };

  const onCount = event => {
    setContinent(event.currentTarget.value);
    setPrice(event.currentTarget.value * 1);
  };

  //결제후 DB저장
  const transactionSuccess = data => {
    if (!selectDay || !theaters || !time || !id || !title) {
      return alert("모든 값을 넣어주셔야 합니다.");
    }

    const body = {
      user: userFrom,
      id: id,
      title: title,
      theaters: theaters,
      selectDay: selectDay,
      time: time,
      continent: Continent,
      seat: Seat,
      price: Price,
    };

    axios.post("/api/reservation", body).then(response => {
      if (response.data.success) {
        alert("예매 성공");
        window.location.href = `${CLIENT}`;
      } else {
        alert("예매 실패");
        return false;
      }
    });
  };

  //예매된 좌석 확인
  const onFindSeats = () => {
    axios.post("/api/reservation/findSeat").then(response => {
      if (response.data.success) {
        alert("찾기 성공");

        setDistinct(response.data.seats);
        console.log("좌석", distinct);
      } else {
        alert("찾기 실패");
      }
    });
  };

  //좌석과 인원 맞추기
  const onCompareSeat = event => {
    if (Continent < Seat.length + 1) {
      //인원보다 좌석지정이 많을경우
      alert("좌석 지정이 완료 되었습니다.");
      //클릭 못하게
      event.stopPropagation();
    }
  };
  return (
    <>
      <Popup trigger={<Button>다음</Button>} modal closeOnDocumentClick>
        <Reservation />
        {/* <Nav>
          <SideWrapper>
            <SideFlex>
              <Cover bgImage={bgImage} />

              <Title>
                <table>
                  <tbody>
                    <tr>
                      <th>영화관</th>
                      <td>{theaters.theaters}</td>
                    </tr>

                    <tr>
                      <th>날짜</th>
                      <td>
                        {selectDay &&
                          `${selectDay.year}-${selectDay.month}-${selectDay.day}`}
                      </td>
                    </tr>

                    <tr>
                      <th>시간</th>
                      <td>{time.time}</td>
                    </tr>

                    <tr>
                      <th>인원</th>
                      <td>{Continent}</td>
                    </tr>

                    <tr>
                      <th>좌석</th>

                      <td>
                        {Seat.map((seat, index) => {
                          if (index < Seat.length - 1) {
                            return seat + ", ";
                          } else {
                            return seat;
                          }
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                가격<PriceTag>{Price}</PriceTag>
              </Title>

              <Paypal onSuccess={transactionSuccess} Price={Price} />
            </SideFlex>
          </SideWrapper>
          <Wrapper>
            <Small>인원</Small>
            <Header>
              <Select onChange={onCount} value={Continent}>
                {Continents.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.value}
                  </option>
                ))}
              </Select>
            </Header>
            <hr style={{ color: "white", borderColor: "white" }} />

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
            <Container onClick={onSeatChange}>
              <div className="container">
                <div className="screen"></div>

                <div className="row">
                  {SeatA.map((item) => (
                    <div
                      key={item.key}
                      value={Seat}
                      className="seat"
                      onClick={onCompareSeat}
                    >
                      {item.value}
                    </div>
                  ))}
                </div>

                <div className="row">
                  {SeatB.map((item) => (
                    <div
                      key={item.key}
                      value={item.key}
                      className="seat"
                      onClick={onCompareSeat}
                    >
                      {item.value}
                    </div>
                  ))}
                </div>

                <div className="row">
                  {SeatC.map((item) => (
                    <div
                      key={item.key}
                      value={item.key}
                      className="seat"
                      onClick={onCompareSeat}
                    >
                      {item.value}
                    </div>
                  ))}
                </div>

                <div className="row">
                  {SeatD.map((item) => (
                    <div
                      key={item.key}
                      value={item.key}
                      className="seat"
                      onClick={onCompareSeat}
                    >
                      {item.value}
                    </div>
                  ))}
                </div>

                <div className="row">
                  {SeatE.map((item) => (
                    <div
                      key={item.key}
                      value={item.key}
                      className="seat"
                      onClick={onCompareSeat}
                    >
                      {item.value}
                    </div>
                  ))}
                </div>

                <div className="row">
                  {SeatF.map((item) => (
                    <div
                      key={item.key}
                      value={item.key}
                      className="seat"
                      onClick={onCompareSeat}
                    >
                      {item.value}
                    </div>
                  ))}
                </div>

                <div className="row">
                  {SeatG.map((item) => (
                    <div
                      key={item.key}
                      value={item.key}
                      className="seat"
                      onClick={onCompareSeat}
                    >
                      {item.value}
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </Wrapper>
        </Nav> */}
      </Popup>
    </>
  );
};

export default TimeModal;
