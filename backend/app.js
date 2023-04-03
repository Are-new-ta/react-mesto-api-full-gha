// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
// eslint-disable-next-line no-unused-vars
const cors = require('cors');
const { errors } = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies
const rateLimit = require('express-rate-limit');
const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');
const errorHandler = require('./errors/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const LOCALHOST = 'mongodb://localhost:27017/mestodb';
const { PORT = 3000 } = process.env;

// const { PORT = 3000, LOCALHOST = 'mongodb://localhost:127.0.0.1/mestodb' } = process.env;

mongoose.connect(LOCALHOST);
mongoose.set('strictQuery', true);

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(requestLogger);

app.use(limiter);

app.use('/users', routeUsers);
app.use('/cards', routeCards);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
