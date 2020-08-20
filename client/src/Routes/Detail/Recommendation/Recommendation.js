import React from "react";
import RecommendatinMovie from "./RecommendatinMovie";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 5rem;
`;

const Test = styled.div`
  margin-top: 10px;
  display: flex;
  overflow-y: hidden;
  overflow-x: auto;
  &::-webkit-scrollbar {
    width: 40px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    opacity: 1;
  }
`;
const Heading = styled.h3`
  color: var(--color-primary-dark);
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  margin-top: 10px;
  color: white;

  @media ${props => props.theme.mediaQueries.medium} {
    font-size: 1.2rem;
  }
`;

const Recommendation = ({ recommendation }) => {
  const movies = recommendation.map(movie => (
    <RecommendatinMovie movie={movie} key={movie.id} id={movie.id} />
  ));
  return (
    <>
      {movies.length !== 0 ? <Heading>RECOMMENDATIONS</Heading> : ""}
      <Wrapper>
        <Test>{movies}</Test>
      </Wrapper>
    </>
  );
};

export default Recommendation;
