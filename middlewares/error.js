const {
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = require('http2').constants;
const { INTERNAL_SERVER_ERR } = require('../utils/constants');
// Централизованный обработчки ошибок
const error = (err, req, res, next) => {
  const { statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message: statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR
      ? INTERNAL_SERVER_ERR
      : message,
  });
  next();
};

module.exports = error;
