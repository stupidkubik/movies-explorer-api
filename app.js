require('dotenv').config();
// Подключаем модули
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
// Экспортируем файлы
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');
const limiter = require('./middlewares/limiter');
const router = require('./routes');

const { PORT, NODE_ENV, DB_URL } = process.env;
const { DEV_DB_URL } = require('./utils/constants');

// Подключаем БД
mongoose
  .connect(NODE_ENV === 'production' ? DB_URL : DEV_DB_URL, {
    useNewUrlParser: true,
  });
// Создаем сервер
const app = express();

// const corsOptions = {
//   origin: [
//     'http://localhost:3000',
//     'http://mydomain.nomoredomainsrocks.ru',
//     'https://mydomain.nomoredomainsrocks.ru'],
//   optionsSuccessStatus: 200,
//   credentials: true,
// };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors(corsOptions));
app.use(cors());

app.disable('x-powered-by');
app.use(helmet());

app.use(requestLogger);
app.use(limiter);

app.use(router);
// Подключаем обработку ошибок
app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT);
