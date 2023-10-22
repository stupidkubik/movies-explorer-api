const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser } = require('../controllers/users');
const { REGEX_EMAIL } = require('../utils/regex');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().pattern(REGEX_EMAIL),
    password: Joi.string().required().min(2),
  }),
}), createUser);

module.exports = router;
