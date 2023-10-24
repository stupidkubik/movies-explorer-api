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

const { PORT = 3003, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
// Подключаем БД
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  });
// Создаем сервер
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
