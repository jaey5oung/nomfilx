import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Popup from "reactjs-popup";
import Result from "./Result/Result";

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 60px;
  }
  margin: 0 auto;
  width: 88%;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: 600;
  padding: 0px 0px 10px;
  position: relative;
`;

const Grid = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 270px);
  grid-gap: 60px;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const PopUpButton = styled.button`
  color: #9c88ff;
  border: 3px solid #9c88ff;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  background-color: #151515;
  margin-left: 20px;
  padding: 6px;
  box-shadow: 0 1.5rem 2rem rgba(156, 136, 255, 0.2);
`;

const MyScoreSection = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    <Popup
      trigger={<PopUpButton>RESULT</PopUpButton>}
      modal
      closeOnDocumentClick
      contentStyle={{ backgroundColor: "#5D5D5D", minWidth: "950px" }}
    >
      {(close) => <Result close={close} />}
    </Popup>
    <Grid>{children}</Grid>
  </Container>
);

MyScoreSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default MyScoreSection;
