import axios from "axios";
import { API_KEY } from "./Components/Config";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: API_KEY,
    language: "ko-KR",
    page: 1,
    region: "KR"
  },
});

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  genre: () => api.get("genre/movie/list"),
  movieDetail: id =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: term =>
    api.get("search/movie", {
      params: {
        query: term,
      },
    }),
  cast: id =>
    api.get(`movie/${id}/credits`, {
      params: {
        append_to_response: "videos",
      },
    }),
  videos: id =>
    api.get(`movie/${id}/videos`, {
      params: {
        language: "en-US",
      },
    }),
  recommendationMovie: id =>
    api.get(`/movie/${id}/recommendations`, {
      params: {
        page : 1,
      },
    }),
 
};
