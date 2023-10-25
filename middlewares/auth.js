const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

require('dotenv').config();
// Константы окружения
const { JWT_SECRET, NODE_ENV } = process.env;
const { DEV_KEY, UNAUTHORIZED_USER_ERR, UNAUTHORIZED_TOKEN_ERR } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // Проверяем наличие токена
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(UNAUTHORIZED_USER_ERR);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  // Проверяем токен и тип среды окружения
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_KEY);
  } catch (err) {
    throw new UnauthorizedError(UNAUTHORIZED_TOKEN_ERR);
  }
  req.user = payload;
  next();
};
