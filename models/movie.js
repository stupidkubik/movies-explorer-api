const mongoose = require('mongoose');
const { REGEX_URL } = require('../utils/regex');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле не может быть пустым'],
  },
  director: {
    type: String,
    required: [true, 'Поле не может быть пустым'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле не может быть пустым'],
  },
  year: {
    type: String,
    required: [true, 'Поле не может быть пустым'],
  },
  description: {
    type: String,
    required: [true, 'Поле не может быть пустым'],
  },
  image: {
    type: String,
    required: [true, 'Поле не может быть пустым'],
    validate: {
      validator(str) {
        return REGEX_URL.test(str);
      },
      message: 'Введите действительный URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле не может быть пустым'],
    validate: {
      validator(str) {
        return REGEX_URL.test(str);
      },
      message: 'Введите действительный URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле не может быть пустым'],
    validate: {
      validator(str) {
        return REGEX_URL.test(str);
      },
      message: 'Введите действительный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // id фильма, который содержится в ответе сервиса MoviesExplorer
  movieId: {
    type: Number,
    required: [true, 'Поле не может быть пустым'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле не может быть пустым'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле не может быть пустым'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
