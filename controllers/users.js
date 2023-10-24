require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;
const DEV_KEY = 'string';
const SALT_ROUNDS = 10;

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
} = require('http2').constants;

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const userModel = require('../models/user');
// Функция создания нового юзера
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  return bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => userModel.create({
      name, email, password: hash,
    })
      .then((newUser) => res.status(HTTP_STATUS_CREATED).send({
        name: newUser.name,
        email: newUser.email,
      }))
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError(`${email} already exist`));
        }
        if (err instanceof mongoose.Error.ValidationError) {
          next(new BadRequestError(err.message));
        }
        next(err);
      }))
    .catch(next);
};
// Функция авторизации юзера
const LoginUser = (req, res, next) => {
  const { email, password } = req.body;

  userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : DEV_KEY,
        { expiresIn: '7d' },
      );
      res.status(HTTP_STATUS_OK).send({ token });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};
// Функция передачи даных юзера
const getSelf = (req, res, next) => userModel.findById(req.user._id)
  .then((data) => res.status(HTTP_STATUS_OK).send(data))
  .catch(next);
// Функция обновления данных юзера
const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  return userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: 'true', runValidators: true },
    )
    .orFail()
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('User not found'));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  LoginUser,
  getSelf,
  updateUser,
};
