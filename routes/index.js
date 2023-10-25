const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');
const signupRouter = require('./signupRouter');
const signinRouter = require('./signinRouter');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { NOT_FOUND_ERR } = require('../utils/constants');

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
// Защищием роуты авторизацией
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERR));
});

module.exports = router;
