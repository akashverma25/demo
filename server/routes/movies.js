var express = require('express');
var router = express.Router();

const controller = require('../controllers/movieController');

router.get('/', controller.findAllMovies);

router.get('/:movieId', controller.findByMovieId);

router.post('/add', controller.addNewMovie);

router.delete('/delete/:id', controller.deleteMovie);

module.exports = router;