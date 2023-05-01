const Card = require('../models/card');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

// создаем карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id: userId } = req.user;

  Card
    .create({ name, link, owner: userId })
    .then((card) => {
      card
        .populate('owner')
        .then(() => res.status(201).send(card))
        .catch(next);
    })
    .catch(next);
};

// возвращает все карточким
const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

// поставить лайк карточке
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
const deleteCard = (req, res, next) => {
  const { id: cardId } = req.params;
  const { _id: userId } = req.user;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным id не найдена');
      }
      const { owner: cardOwnerId } = card;
      if (userId !== cardOwnerId.valueOf()) {
        throw new ForbiddenError('Нельзя удалять карточки других пользователей');
      }
      return Card.findByIdAndRemove(cardId);
    })
    .then((card) => {
      res.status(200).send(card);
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
