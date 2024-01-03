const mongoose = require('mongoose');
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
} = require('http2').constants;

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const movieModel = require('../models/movie');
const { MOVIE_NOT_FOUND_ERR, INVALID_USER_ERR, INVALID_MOVIE_ID_ERR } = require('../utils/constants');
// Функция создания нового фильма
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;

  return movieModel
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      nameRU,
      nameEN,
      movieId,
      owner: req.user._id,
    })
    .then((movie) => movieModel.findById(movie._id)
      .populate('owner')
      .then(((newMovie) => res.status(HTTP_STATUS_CREATED).send(newMovie)))
      .catch(() => next(new NotFoundError(MOVIE_NOT_FOUND_ERR))))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};
// Функция передачи списка фильмов
const getMovies = (req, res, next) => movieModel.find({ owner: req.user._id })
  .orFail()
  .then((data) => res.status(HTTP_STATUS_OK).send(data))
  .catch(next);
// Функция удаления фильма по id из БД
const deleteMovie = (req, res, next) => movieModel
  .findById(req.params._id)
  .then((movie) => {
    if (!movie) throw new NotFoundError('Movie not found');
    if (!movie.owner.equals(req.user._id)) throw new ForbiddenError(INVALID_USER_ERR);

    movieModel.deleteOne(movie)
      .orFail()
      .then(() => res.status(HTTP_STATUS_OK).send({ message: 'Movie is deleted' }))
      .catch((err) => {
        if (err instanceof mongoose.Error.DocumentNotFoundError) {
          return next(new NotFoundError(MOVIE_NOT_FOUND_ERR));
        }
        if (err instanceof mongoose.Error.CastError) {
          return next(new BadRequestError(INVALID_MOVIE_ID_ERR));
        }
        return next(err);
      });
  })
  .catch(next);

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
