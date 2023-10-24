const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { REGEX_EMAIL } = require('../utils/regex');
const {
  getSelf,
  updateUser,
} = require('../controllers/users');
// Отправляем текущие данные юзера
router.get('/me', getSelf);
// Обновляем данные юзера
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().pattern(REGEX_EMAIL),
  }),
}), updateUser);

module.exports = router;
