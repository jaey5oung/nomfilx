import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "../../Components/Message";
import Poster from "./SearchPoster";
import SearchSection from "./SearchSection";
const Container = styled.div`
  padding: 20px;
`;
const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;
const Input = styled.input`
all: unset;
    width: 100%;
    font-size: 28px;
    line-height: 28px;
    text-indent: 15px;
    padding: 5px 0px;
    background: rgba(255, 255, 255, 0.1);
`;
const SearchPresenter = ({
  movieResults,
  loading,
  searchTerm,
  handleSubmit,
  error,
  updateTerm
}) => (
  <Container>
    <Helmet>
      <title>Search | Nomflix</title>
    </Helmet>
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="검색어를 입력해주세요."
        value={searchTerm}
        onChange={updateTerm}
      />
    </Form>
    {loading ? (
      <Loader />
    ) : (
      <>
        {movieResults && movieResults.length > 0 && (
          <SearchSection title="Movie Results">
            {movieResults.map((movie, index) => (
              <Poster
              key={index}
                id={movie.id}
                imageUrl={movie.poster_path}
                title={movie.original_title}
                rating={movie.vote_average}
                year={movie.release_date && movie.release_date.substring(0, 4)}
                isMovie={true}
              />
            ))}
          </SearchSection>
        )}
        {error && <Message color="#e74c3c" text={error} />}
        {movieResults &&
          movieResults.length === 0 && (
            <Message text="검색결과가 없습니다" color="#95a5a6"  />
          )}
      </>
    )}
  </Container>
);
SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  error: PropTypes.string,
  searchTerm: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateTerm: PropTypes.func.isRequired
};
export default SearchPresenter;