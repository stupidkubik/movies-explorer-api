const DEV_DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const DEV_KEY = 'string';
const SALT_ROUNDS = 10;

const NOT_FOUND_ERR = 'Page not found';
const USER_NOT_FOUND_ERR = 'User not found';
const MOVIE_NOT_FOUND_ERR = 'Movie not found';
const INVALID_USER_ERR = 'Invalid user';
const INVALID_MOVIE_ID_ERR = 'Invalid movie ID';
const UNAUTHORIZED_ERR = 'Wrong email or password';
const UNAUTHORIZED_USER_ERR = 'Problem with authorization';
const UNAUTHORIZED_TOKEN_ERR = 'Problem with token';
const INTERNAL_SERVER_ERR = 'Server Error';
const REQUIRED_FIELD_ERR = 'Поле не может быть пустым';
const REQUIRED_URL_ERR = 'Введите действительный URL';
const REQUIRED_FIELD_MIN_ERR = 'Имя должно быть не меньше двух букв';
const REQUIRED_FIELD_MAX_ERR = 'Имя должно быть короче 30 букв';
const REQUIRED_EMAIL_ERR = 'Введите email';
const REQUIRED_PASSWORD_ERR = 'Введите email';

module.exports = {
  DEV_DB_URL,
  DEV_KEY,
  SALT_ROUNDS,
  NOT_FOUND_ERR,
  USER_NOT_FOUND_ERR,
  MOVIE_NOT_FOUND_ERR,
  INVALID_USER_ERR,
  INVALID_MOVIE_ID_ERR,
  UNAUTHORIZED_ERR,
  UNAUTHORIZED_USER_ERR,
  UNAUTHORIZED_TOKEN_ERR,
  INTERNAL_SERVER_ERR,
  REQUIRED_FIELD_ERR,
  REQUIRED_URL_ERR,
  REQUIRED_FIELD_MIN_ERR,
  REQUIRED_FIELD_MAX_ERR,
  REQUIRED_EMAIL_ERR,
  REQUIRED_PASSWORD_ERR,
};
