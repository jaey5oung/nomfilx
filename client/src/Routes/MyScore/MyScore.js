import React, { useEffect, useState, useRef } from "react";
import { API_URL, API_KEY } from "../../Components/Config";
import Helmet from "react-helmet";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import MyScoreSection from "./MyScoreSection";
import MyScorePoster from "./MyScorePoster";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  background-color: black;
  border: 1px solid black;
  visibility: hidden;
`;

const Progress = styled.div`
  width: 70%;
  height: 100px;
  align-items: center;
  padding-top: 25px;
  margin-left: 15%;
`;

const Select = styled.span`
  width: 100%;
  height: 50px;
  margin-left: 50%;
  text-align: center;
  font-size: 40px;
  font-weight: 500;
`;

function MyScore() {
  const buttonRef = useRef(null);
  const [Movies, setMovies] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(parseInt(Math.random() * 100));
  const [count, setCount] = useState(0);

  useEffect(() => {
    //1. 처음 api 불러오기
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=${CurrentPage}&region=KR`;
    fetchMovies(endpoint);
    window.addEventListener("scroll", handleScroll);

    axios
      .post("/api/myscore/myCount", {
        userFrom: localStorage.getItem("userId"),
      })
      .then((response) => {
        if (response.data.success) {
          setCount(response.data.obj.length);
        } else {
          alert("fail");
        }
      });
  }, []);

  const fetchMovies = (endpoint) => {
    //2. 영화불러오는 func
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        let temp = result.results;
        let newResult = temp.filter((item) => item.adult === false);
        setMovies([...Movies, ...newResult]);
        setCurrentPage(result.page);
      }, setLoading(false))
      .catch((error) => console.error("Error:", error));
  };

  const loadMoreItems = () => {
    let endpoint = "";
    setLoading(true);
    if (CurrentPage < 101) {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
        CurrentPage + 1
      }`;
    } else {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=0`;
    }
    fetchMovies(endpoint);
  };

  const handleScroll = () => {
    //scroll처리
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom > docHeight - 1) {
      if (buttonRef.current === null) {
        return 0;
      } else {
        buttonRef.current.click();
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Score | Nomflix</title>
      </Helmet>
      {Loading ? (
        <Loader />
      ) : (
        <Container>
          <Select>{count}</Select>
          <Progress>
            <ProgressBar
              completed={count}
              borderRadius={"50px"}
              bgcolor={"rgba(156, 136, 255)"}
              labelColor={"rgba(156, 136, 255)"}
            />
          </Progress>
          {Movies && Movies.length > 0 && (
            <MyScoreSection title="My Score">
              {Movies.map((movie, index) => (
                <MyScorePoster
                  key={index}
                  movieId={movie.id}
                  genres={movie.genre_ids[0]}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  count={count}
                  setCount={setCount}
                  isMovie={true}
                />
              ))}
            </MyScoreSection>
          )}

          {Loading && <div>Loading...</div>}
          <br />
          <Button ref={buttonRef} className="loadMore" onClick={loadMoreItems}>
            Load More
          </Button>
        </Container>
      )}
    </>
  );
}

export default MyScore;
