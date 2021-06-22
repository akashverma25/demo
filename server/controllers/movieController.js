const { lodash, isEmpty } = require('lodash');
const { Op } = require('sequelize');
const { Movie } = require('../models');

const findAllMovies = async (req, res) => {
    const { title } = req.query;

    if (title) {
        const movies = await Movie.findAll({
            where: {
                title: {
                    [Op.or]: {
                        [Op.substring]: title
                    }
                }
            }
        });
        return res.json(movies);
    }
    else {
        const movies = await Movie.findAll({ raw: true });
        return res.json(movies);
    }

}

const findByMovieId = async (req, res) => {
    const { movieId } = req.params;

    const movie = await Movie.findOne({
        where: {
            id: Number(movieId)
        }
    })
    if (!movie) {
        return res.status(404).json({
            message: "Movie Id not found!"
        });
    }
    res.json(movie);
}


const addNewMovie = async (req, res) => {
    const { title, poster } = req.body;

    const movieRecord = {
        title,
        poster
    }

    const result = await Movie.create(movieRecord);
    console.log(result.toJSON());

    if (!isEmpty(result)) {
        res.json(result);
    } else {
        res.send({ error: "Movie creation Failed" });
    }

};

const deleteMovie = async (req, res) => {
    const { id } = req.params;

    const result = await Movie.destroy({
        where: {
            id
        }
    });

    if (result) res.send({ success: "Movie deleted Successfully.." });
    else res.send({ error: "movie deletion failed" });
}


module.exports = {
    findAllMovies,
    findByMovieId,
    addNewMovie,
    deleteMovie
}