import React from "react";
import styled from "styled-components";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../../Components/Config";

const MovieImg = styled.img`
  width: 160px;
  height: 250px;
  margin-right: 30px;
  background-size: cover;
  border-radius: 4px;
  transition: all 0.1s linear 0s;
  margin-bottom: 10px;
`;

const Title = styled.span`
  font-weight: 700;
  text-align: center;
  display: block;
  margin-bottom: 3px;
  margin-right: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RecommendatinMovie = ({ movie, id }) => {
  return (
    <a href={`/movie/${id}`}>
      <MovieImg
        src={
          movie.poster_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
            : "https://www.movienewz.com/img/films/poster-holder.jpg"
        }
      />
      <Title>
        {movie.title.length > 12
          ? `${movie.title.substring(0, 8)}...`
          : movie.title}
      </Title>
    </a>
  );
};

export default RecommendatinMovie;
