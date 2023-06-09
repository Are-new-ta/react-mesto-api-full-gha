require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const routeSignup = require('./routes/signup');
const routeSignin = require('./routes/signin');
const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');
const { errorHandler } = require('./errors/errors');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, LOCALHOST } = require('./config');
const auth = require('./middlewares/auth');

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

app.use(limiter);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', routeSignup);
app.use('/', routeSignin);
app.use(auth);
app.use('/users', routeUsers);
app.use('/cards', routeCards);

app.use((req, res, next) => next(new NotFoundError('Страницы не существует')));
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
