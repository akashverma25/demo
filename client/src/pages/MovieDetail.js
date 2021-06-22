import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button } from "reactstrap";

function MovieDetail() {
    const [details, setDetails] = useState({});
    const { movieId } = useParams();
    const history = useHistory();
    useEffect(() => {
        getMovieDetails();
    }, [])

    const getMovieDetails = async () => {
        const response = await axios({
            url: `http://localhost:4000/movies/${movieId}`,
            method: 'get'
        });

        setDetails(response.data);
    }

    const goBack = () => {
        history.push("/");
    };

    const deleteMovie = async () => {
        const response = await axios({
            url: `http://localhost:4000/movies/delete/${movieId}`,
            method: 'delete'
        });
        goBack();
    }

    const onClickDeleteMovie = () => {
        deleteMovie();
    }

    return (
        <div>
            <h2 >Movie Detail Page</h2>
            <span ><Button color="danger" onClick={onClickDeleteMovie}>Delete</Button></span>
            <Button style={{ marginLeft: "10%" }} color="dark" onClick={goBack}>
                Go Back
            </Button>
            <p>{details.title}</p>
            <img src={details.poster} alt="Movie Poster" />
        </div>
    )
}

export default MovieDetail