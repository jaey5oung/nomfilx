// import React, { useState } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import Popup from "reactjs-popup";
// import "../style.css";
// import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import Reservation from "../../Booking/Reservation";

// const Button = styled.button`
//   -webkit-border-radius: 3px;
//   -moz-border-radius: 3px;
//   -ms-border-radius: 3px;
//   border-radius: 3px;
//   -webkit-transition: all 0.5s;
//   -moz-transition: all 0.5s;
//   -ms-transition: all 0.5s;
//   transition: all 0.5s;
//   color: white;
//   border-color: white;
//   background: transparent;
//   margin-left: 5px;
// `;
// // -----------------------------------------------------------------------------------------------
// const TimeModal = ({
//   selectDay,
//   theaters,
//   time,
//   id,
//   title,
//   userFrom,
// }) => {
//   const [Continent, setContinent] = useState(0);
//   const [Seat, setSeat] = useState([]);
//   const [Price, setPrice] = useState(0);
//   const [distinct, setDistinct] = useState([]);

//   //seat 색 변경
//   const onSeatChange = (e) => {
//     if (
//       e.target.classList.contains("seat") &&
//       !e.target.classList.contains("occupied")
//     ) {
//       e.target.classList.toggle("selected");
//       setSeat([...Seat, e.target.innerText]);
//     }
//   };

//   const onCount = (event) => {
//     setContinent(event.currentTarget.value);
//     setPrice(event.currentTarget.value * 1);
//   };

//   //결제후 DB저장
//   const transactionSuccess = (data) => {
//     if (!selectDay || !theaters || !time || !id || !title) {
//       return alert("모든 값을 넣어주셔야 합니다.");
//     }

//     const body = {
//       user: userFrom,
//       id: id,
//       title: title,
//       theaters: theaters,
//       selectDay: selectDay,
//       time: time,
//       continent: Continent,
//       seat: Seat,
//       price: Price,
//     };

//     axios.post("/api/reservation", body).then((response) => {
//       if (response.data.success) {
//         alert("예매 성공");
//         window.location.href = "http://localhost:3000/";
//       } else {
//         alert("예매 실패");
//         return false;
//       }
//     });
//   };

//   //예매된 좌석 확인
//   const onFindSeats = () => {
//     axios.post("/api/reservation/findSeat").then((response) => {
//       if (response.data.success) {
//         alert("찾기 성공");
//         setDistinct(response.data.seats);
//       } else {
//         alert("찾기 실패");
//       }
//     });
//   };

//   //좌석과 인원 맞추기
//   const onCompareSeat = (event) => {
//     if (Continent < Seat.length + 1) {
//       //인원보다 좌석지정이 많을경우
//       alert("좌석 지정이 완료 되었습니다.");
//       //클릭 못하게
//       event.stopPropagation();
//     }
//   };
//   return (
//     <>
//       <Popup trigger={<Button>다음</Button>} modal closeOnDocumentClick>
//         <Reservation />
//       </Popup>
//     </>
//   );
// };

// export default TimeModal;
