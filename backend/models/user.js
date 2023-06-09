const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema(
  {
    name: {
      required: false,
      default: 'Жак-Ив Кусто',
      type: String,
      validate: {
        validator: ({ length }) => length >= 2 && length <= 30,
        message: 'Имя пользователя должно быть длиной от 2 до 30 символов',
      },
    },

    about: {
      required: false,
      default: 'Исследователь',
      type: String,
      validate: {
        validator: ({ length }) => length >= 2 && length <= 30,
        message:
          'Информация о пользователе должна быть длиной от 2 до 30 символов',
      },
    },

    avatar: {
      required: false,
      type: String,
      default:
        'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
      validate: {
        validator: (url) => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
          url,
        ),
        message: 'Введите корректный URL адрес',
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => /.+@.+\..+/.test(email),
        message: 'Введите корректный URL адрес',
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
      validate: {
        validator: ({ length }) => length >= 6,
        message: 'Пароль должен состоять минимум из 6 символов',
      },
    },
  },

  {
    versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email })
          .select('+password')
          .then((user) => {
            if (user) {
              return bcrypt.compare(password, user.password).then((matched) => {
                if (matched) return user;
                return Promise.reject(
                  new UnauthorizedError('Необходима авторизация 1'),
                );
              });
            }
            return Promise.reject(
              new UnauthorizedError('Необходима авторизация 2'),
            );
          });
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
