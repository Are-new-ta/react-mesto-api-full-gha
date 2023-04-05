require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');
const routeSignup = require('./routes/signup');
const routeSignin = require('./routes/signin');
const { auth } = require('./middlewares/auth');

const { errorHandler } = require('./errors/errors');
const NotFoundError = require('./errors/NotFoundError');
const { PORT, LOCALHOST } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

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

app.use('/', routeSignup);
app.use('/', routeSignin);
app.use(auth);
app.use('/users', routeUsers);
app.use('/cards', routeCards);
app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
