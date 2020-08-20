import React, { useEffect, useState } from "react";
import axios from "axios";
import MoodIcon from "@material-ui/icons/Mood";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    color: "yellow",
  },
});

function Favorite(props) {
  const isMovie = props.isMovie;
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title
    ? props.movieInfo.title
    : props.movieInfo.original_name;
  const moviePost = props.movieInfo.poster_path;
  const movieYear = props.movieInfo.release_date
    ? props.movieInfo.release_date.substring(0, 4)
    : props.movieInfo.first_air_date.substring(0, 4);
  const movieRating = props.movieInfo.vote_average;
  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variables = {
    isMovie,
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieYear,
    movieRating,
  };

  useEffect(() => {
    axios.post("/api/favorite/favoriteNumber", variables).then(response => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert("숫자 정보를 가져오는데 실패 했습니다.");
      }
    });

    axios.post("/api/favorite/favorited", variables).then(response => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("정보를 가져오는데 실패 했습니다.");
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      axios
        .post("/api/favorite/removeFromFavorite", variables)
        .then(response => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert("Favorite 리스트에서 지우는 걸 실패했습니다.");
          }
        });
    } else {
      axios.post("/api/favorite/addToFavorite", variables).then(response => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Favorite 리스트에서 추가하는 걸 실패했습니다.");
        }
      });
    }
  };
  const classes = useStyles();
  return (
      <>
      &nbsp;
      &nbsp;
      &nbsp;
      <span 
        onClick={onClickFavorite}      
      >
        {Favorited ? (
          <>
            <MoodIcon className={classes.root} />
            {FavoriteNumber}
            
          </>
        ) : (
          <>
            <MoodIcon />
            {FavoriteNumber}
          </>
        )}
      </span>
    </>
  );
}

export default Favorite;
