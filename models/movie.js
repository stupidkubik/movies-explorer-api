const mongoose = require('mongoose');
const { REGEX_URL } = require('../utils/regex');
const { REQUIRED_FIELD_ERR, REQUIRED_URL_ERR } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, REQUIRED_FIELD_ERR],
  },
  director: {
    type: String,
    required: [true, REQUIRED_FIELD_ERR],
  },
  duration: {
    type: Number,
    required: [true, REQUIRED_FIELD_ERR],
  },
  year: {
    type: String,
    required: [true, REQUIRED_FIELD_ERR],
  },
  description: {
    type: String,
    required: [true, REQUIRED_FIELD_ERR],
  },
  image: {
    type: String,
    required: [true, REQUIRED_FIELD_ERR],
    validate: {
      validator(str) {
        return REGEX_URL.test(str);
      },
      message: REQUIRED_URL_ERR,
    },
  },
  trailerLink: {
    type: String,
    required: [true, REQUIRED_FIELD_ERR],
    validate: {
      validator(str) {
        return REGEX_URL.test(str);
      },
      message: REQUIRED_URL_ERR,
    },
  },
  thumbnail: {
    type: String,
    required: [true, REQUIRED_FIELD_ERR],
    validate: {
      validator(str) {
        return REGEX_URL.test(str);
      },
      message: REQUIRED_URL_ERR,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, REQUIRED_FIELD_ERR],
  },
  nameRU: {
    type: String,
    required: [true, REQUIRED_FIELD_ERR],
  },
  nameEN: {
    type: String,
    required: [true, REQUIRED_FIELD_ERR],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
