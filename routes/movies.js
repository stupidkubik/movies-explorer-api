const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { REGEX_URL } = require('../utils/regex');
// Отправляем список всех добавленных фильмов
router.get('/', getMovies);
// Сохраняем новый фильм
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(REGEX_URL),
    trailerLink: Joi.string().required().pattern(REGEX_URL),
    thumbnail: Joi.string().required().pattern(REGEX_URL),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
}), createMovie);
// Удаляем фильм по id из БД
router.delete('/:movie_id', celebrate({
  params: Joi.object().keys({
    movie_id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
