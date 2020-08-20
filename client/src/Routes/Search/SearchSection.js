import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 60px;
  }
  margin: 0 auto;
  width: 90%;
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
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 100px;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const SearchSection = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    <Grid>{children}</Grid>
  </Container>
);
SearchSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default SearchSection;
