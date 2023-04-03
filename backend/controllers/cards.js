const Card = require('../models/card');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const { STATUS_CREATED } = require('../errors/errors');

// создаем карточку
// убрала data: ... и в send только аругмент и добавила .populate('owner')
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id: userId } = req.user;

  Card.create({ name, link, owner: userId })
    .then((card) => res.status(STATUS_CREATED).send(card))
    .catch(next);
};

// возвращает все карточким
// убрала data: ... и в send только аругмент
const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

// поставить лайк карточке
// убрала data: ... и в send только аругмент и добавила .populate(['owner', 'likes'])
const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      throw new NotFoundError('Карточка с указанным id не найдена');
    })
    .catch(next);
};

// убрать лайк с карточки
// убрала data: ... и в send только аругмент и добавила .populate(['owner', 'likes'])
const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      throw new NotFoundError('Карточка с указанным id не найдена');
    })
    .catch(next);
};

// удаление карточки
// убрала data: ... и в send только аругмент
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;
  // const { owner: cardOwnerId } = card;

  Card.findById({ _id: cardId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным id не найдена');
      }
      const { owner: cardOwnerId } = card;
      if (userId !== cardOwnerId.valueOf()) {
        throw new ForbiddenError('Нельзя удалять карточки других пользователей');
      }
      return card.remove()
        .then(() => res.send(card));
    })
    .catch(next);
};

module.exports = {
  createCard,
  getCards,
  likeCard,
  dislikeCard,
  deleteCard,
};
