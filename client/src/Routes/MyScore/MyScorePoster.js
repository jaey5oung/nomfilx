import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MyScoreRating from "./MyScoreRating";
import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../Components/Config";
const Container = styled.div`
  font-size: 12px;
  min-height: 350px;
  min-width: 250px;
  align-content: center;
`;
const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  width: 260px;
  height: 390px;
  margin-right: 20px;
  background-size: cover;
  transition: all 0.1s linear 0s;
`;
const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
  }
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  &:hover {
    transform: scale(1.03);
    ::after {
      transform: scaleY(1);
      opacity: 1;
    }
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.8rem;
    transform: scaleY(0);
    transform-origin: top;
    opacity: 0;
    background-color: var(--color-primary);
    z-index: -99;
    box-shadow: 0rem 2rem 5rem var(--shadow-color-dark);
    transition: all 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`;
const Title = styled.span`
  font-size: 17px;
`;
const RatingsWrapper = styled.div`
  margin-bottom: 0.5rem;
  text-align: center;
  color: var(--color-primary);
  ${Container}:hover & {
    color: var(--color-primary-lighter);
  }
`;

const MyScorePoster = ({
  movieId,
  imageUrl,
  title,
  count,
  setCount,
  genres,
  isMovie=false
}) => (
  <Container>
    <Link to={isMovie ? `/movie/${movieId}` : `/show/${movieId}`}>
    <ImageContainer>
      <Image
        bgUrl={
          imageUrl
            ? `${IMAGE_BASE_URL}original${imageUrl}`
            : "https://www.movienewz.com/img/films/poster-holder.jpg"
        }
      />
    </ImageContainer>
    </Link>
    <RatingsWrapper>
      <Title>{title.length > 11 ? `${title.substring(0, 11)}...` : title}</Title>
    </RatingsWrapper>
    <MyScoreRating
      movieId={movieId}
      count={count}
      genres={genres}
      setCount={setCount}
      imageUrl={imageUrl}
      title={title}
    />
  </Container>
);

MyScorePoster.propTypes = {
  movieId: PropTypes.number,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default MyScorePoster;
