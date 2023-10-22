const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { REGEX_EMAIL } = require('../utils/regex');
const {
  getSelf,
  updateUser,
  // getUsers,
  // getUserById,
  // updateUserAvatarById,
} = require('../controllers/users');

router.get('/me', getSelf);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().pattern(REGEX_EMAIL),
  }),
}), updateUser);

// router.get('/', getUsers);

// router.get('/:userID', celebrate({
//   params: Joi.object().keys({
//     userID: Joi.string().length(24).hex().required(),
//   }),
// }), getUserById);

// router.patch('/me/avatar', celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().pattern(REGEX_URL),
//   }),
// }), updateUserAvatarById);

module.exports = router;
