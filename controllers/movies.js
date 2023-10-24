const mongoose = require('mongoose');
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
} = require('http2').constants;

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const movieModel = require('../models/movie');
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
      .catch(() => next(new NotFoundError('Movie not found'))))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};
// Функция передачи списка фильмов
const getMovies = (req, res, next) => movieModel.find({})
  .populate(['owner'])
  .then((data) => res.status(HTTP_STATUS_OK).send(data))
  .catch(next);
// Функция удаления фильма по id из БД
const deleteMovie = (req, res, next) => movieModel
  .findById(req.params.movie_id)
  .then((movie) => {
    if (!movie) throw new NotFoundError('Movie not found');
    if (!movie.owner.equals(req.user._id)) throw new ForbiddenError('Invalid user');

    movieModel.deleteOne(movie)
      .orFail()
      .then(() => res.status(HTTP_STATUS_OK).send({ message: 'Movie is deleted' }))
      .catch((err) => {
        if (err instanceof mongoose.Error.DocumentNotFoundError) {
          return next(new NotFoundError('Movie not found'));
        }
        if (err instanceof mongoose.Error.CastError) {
          return next(new BadRequestError('Invalid movie ID'));
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
