import React from "react";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";

const Container = styled.div`
  float: bottom;
  width: 90%;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 18px;
`;

const SectionTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  margin-top: 15px;
  margin-bottom: 15px;
  color: #f7f7f7;
  position: relative;
`;
const Nothing = styled.div`
  font-size: 20px;
  color: black;
  width: 100%;
  height: 100%;
  text-align: center;
  display: table;
`;
const ChartWrapper = styled.div`
  margin-bottom:10px;
`;
const GenrePreference = ({ user, topGenre, result }) => {
  const expData = {
    labels: topGenre.map((item) => item.name),
    datasets: [
      {
        labels: topGenre.map((item) => item.name),
        data: topGenre.map((item) => item.count),
        borderWidth: 3,
        backgroundColor: [
          "rgba(62, 96, 111)",
          "rgba(25, 52, 65)",
          "rgba(145, 170, 157)",
        ],
        fill: true,
        borderColor:"#d5d5d5"
      },
    ],
  };

  return (
    <Container>
      <SectionTitle>
        {user.userData && user.userData.name}님의 선호 장르
      </SectionTitle>

      {result.length === 0 ? (
        <Nothing>
          <span
            style={{
              color: "#f7f7f7",
              display: "table-cell",
              verticalAlign: "middle",
            }}
          >
            분석 결과 없음
          </span>
        </Nothing>
      ) : (
        <ChartWrapper>

        <Doughnut
          options={{
            legend: {
              display: true,
              position: "bottom",
              labels: {
                fontColor: 'white',
                fontSize: 17,
                padding: 15
             }
            },
          }}
          data={expData}
          height={100}
          />
          </ChartWrapper>
      )}
    </Container>
  );
};

export default GenrePreference;
