import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi } from "api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;

    this.state = {
      castResult: null,
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
      modalOpened: false,
      video: null,
      recommendations: null,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: {
        push,
      },
    } = this.props;

    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    let castResult = null;
    let video = null;
    let recommendations = null;
    try {
      ({ data: result } = await moviesApi.movieDetail(parsedId)); 
      ({ data: castResult } = await moviesApi.cast(parsedId));
      ({ data: video } = await moviesApi.videos(parsedId));
      ({ data: recommendations } = await moviesApi.recommendationMovie(
        parsedId
      ));
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {

      this.setState({
        loading: false,
        result,
        castResult,
        video,
        recommendations,
      });
    }
  }


  render() {
    const {
      result,
      error,
      loading,
      castResult,
      isMovie,
      video,
      recommendations,
    } = this.state;

    return (
      <DetailPresenter
        isMovie={isMovie}
        result={result}
        castResult={castResult}
        error={error}
        loading={loading}
        video={video}
        recommendations={recommendations}
      />
    );
  }
}
