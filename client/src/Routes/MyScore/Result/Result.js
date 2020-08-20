import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import RecentRating from './RecentRating';
import GenrePreference from './GenrePreference';
import { moviesApi } from '../../../api';

const Result = () => {
    const user = useSelector(state => state.user);
    const [recent, setRecent] = useState([]);
    const [result, setResult] = useState([]);
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        axios.post("/api/myscore/recent", {
            userFrom: localStorage.getItem("userId")
        }).then(response => {
            if (response.data.success) {
                setResult(response.data.obj)
                let arr = response.data.obj.reverse()
                setRecent(arr.slice(0, 5))
            } else {
                alert("fail");
            }
        })
        genreApi();
    }, []);

    async function genreApi() {
        const {
            data: {
                genres
            }
        } = await moviesApi.genre();
        setGenre(genres);
    }

    //선호 장르 순서 정렬
    const arrOfGenres = genre.map((g) => { //count 변수 추가한 장르 배열
        return { id: g.id, name: g.name, count: 0 };
    })

    const arrOfMyRating = result.map((r) => { //내가 평가한 영화 장르 배열
        return r.genres;
    })

    arrOfMyRating.forEach((item) => { //현재 내가 평가한 영화 장르별로 counting
        arrOfGenres.forEach((genre) => {
            if (item === genre.id) {
                genre.count++
            }
        })
    })

    //영화 counting 순서대로 나열
    arrOfGenres.sort(function (a, b) {
        return b.count - a.count;
    })
    const topGenre = arrOfGenres.slice(0, 3)

    return (
        <>
            <RecentRating recent={recent} user={user}/>
            <GenrePreference user={user} topGenre={topGenre} result={result} />
        </>
    );
};

export default Result;