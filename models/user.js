const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  UNAUTHORIZED_ERR,
  REQUIRED_FIELD_ERR,
  REQUIRED_FIELD_MIN_ERR,
  REQUIRED_FIELD_MAX_ERR,
  REQUIRED_EMAIL_ERR,
  REQUIRED_PASSWORD_ERR,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'New User',
    required: [true, REQUIRED_FIELD_ERR],
    minlength: [2, REQUIRED_FIELD_MIN_ERR],
    maxlength: [30, REQUIRED_FIELD_MAX_ERR],
  },
  email: {
    type: String,
    required: [true, REQUIRED_FIELD_ERR],
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: REQUIRED_EMAIL_ERR,
    },
  },
  password: {
    type: String,
    required: [true, REQUIRED_PASSWORD_ERR],
    select: false,
  },
}, { versionKey: false });
// Хешируем пароль юзера
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(UNAUTHORIZED_ERR);
      }

      return bcrypt.compare(password, user.password)
        .then((isValid) => {
          if (!isValid) {
            throw new UnauthorizedError(UNAUTHORIZED_ERR);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
