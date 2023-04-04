require('dotenv').config();

const { NODE_ENV = 'production' } = process.env;
const { PORT = '3000' } = process.env;
const { JWT_SECRET } = process.env;
const { LOCALHOST = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  LOCALHOST,
  JWT_SECRET,
};

// const LOCALHOST = 'mongodb://localhost:27017/mestodb';