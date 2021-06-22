import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import {
    Container,
    Card, CardBody, CardHeader, Col, Row,
    Form, Input, Button,
    Modal, ModalBody, ModalFooter, ModalHeader,
    Label
} from 'reactstrap';
import axios from 'axios';
import { isEmpty } from 'lodash';

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [movieTitle, setmovieTitle] = useState('');
    const [moviePoster, setmoviePoster] = useState('');
    const [status, setStatus] = useState('');
    const [color, setColor] = useState('text-primary');
    const history = useHistory();


    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {
        getMovies();
    }, [])

    const getMovies = async () => {
        const response = await axios({
            url: `http://localhost:4000/movies?title=${searchText}`,
            method: 'get'
        });
        setMovies(response.data);
        setStatus('');

    }

    const addMovies = async (movieJson) => {
        const response = await axios({
            url: "http://localhost:4000/movies/add/",
            method: 'POST',
            data: movieJson
        });

        if (!isEmpty(response)) {
            setColor('text-primary');
            setStatus("Movie added Succeefully");
            toggle()
            getMovies();
        } else {
            setColor('text-danger');
            setStatus("Movie creation failed");
        }

    }


    const onChangeInput = (event) => {
        setSearchText(event.target.value);
    }

    const onClickSearch = () => {
        getMovies();
    }

    const onClickCard = (movie) => {
        history.push(`/${movie.id}`);
    };

    const onChangeTitleInput = (event) => {
        setmovieTitle(event.target.value);
    }

    const onChangePosterInput = (event) => {
        setmoviePoster(event.target.value);
    }

    const onClickAddMovie = () => {
        const movieJson = {
            "title": movieTitle,
            "poster": moviePoster
        }

        if (movieJson.title === '' || movieJson.poster === '') {
            setColor('text-danger');
            setStatus("All fields are mandatory !");
        }
        else
            addMovies(movieJson);
    }

    return (
        <main>
            <Container>
                <section className="content" style={{
                    marginTop: 25
                }}>
                    <h2>List of Movies</h2>
                    <Form inline>
                        <Input type="text" onChange={onChangeInput} style={{ width: '80%' }} placeholder="Search movie title..." />
                        <Button color="primary" onClick={onClickSearch}>Search</Button>
                    </Form>
                    <Button className="mt-2" color="primary" onClick={toggle}>Add Movie</Button>
                    <Modal isOpen={modal} toggle={toggle} >
                        <ModalHeader toggle={toggle}>Add New Movies</ModalHeader>
                        <ModalBody>
                            <Form className="mt-3 mb-3">
                                <Input type="text" onChange={onChangeTitleInput} style={{ width: '70%' }} placeholder="Title" className="mb-1" />
                                <Input type="text" onChange={onChangePosterInput} style={{ width: '70%' }} placeholder="Image link" className="mb-3" />
                                <Label className={color}>{status}</Label>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={onClickAddMovie}>Add</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <hr />
                    <Row>
                        {movies.map((movie, idx) => (
                            <Col md="4" key={idx}>
                                <Card onClick={() => onClickCard(movie)}>
                                    <CardHeader>
                                        {movie.title}
                                    </CardHeader>
                                    <CardBody>
                                        {movie.title}
                                        <img src={movie.poster} alt="Movie Poster" style={{ width: '100%' }} />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))
                        }
                    </Row>
                </section>
            </Container>
        </main>
    );
}

export default MovieList;