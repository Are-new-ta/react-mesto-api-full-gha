import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onConfurmationDeleteCardPopup }) {

  //подписываемся на контент CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);


  const handleCardClick = () => {
    onCardClick(card)
  }

  const handleLikeClick = () => {
    onCardLike(card)
  }

  const handleDeleteClick = () => {
    //вызываю запросудаления карточки
    onConfurmationDeleteCardPopup(card);
  }

  return (
    <article className="card">
      <button
        className={`card__delete ${isOwn ? '' : 'card__delete_hidden'}`}
        aria-label="Удалить"
        type="button"
        onClick={handleDeleteClick} />
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="card__card-container">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            className={`card__like ${isLiked ? 'card__like_active' : ''}`}
            aria-label="Нравится"
            type="button"
            onClick={handleLikeClick}
          />
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
