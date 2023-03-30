import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from "./Card";

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete, cards, onConfurmationDeleteCardPopup }) {

  //подписываемся на контент CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content root__main">
      {/* <!--Profile--> */}
      <section className="profile">
        <div className="profile__container">
          <div className="profile__image-box">
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__image"
              id="avatar"
              onClick={onEditAvatar} />
          </div>
          <div className="profile__info-box">
            <div className="profile__box-button">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                name="profileEditButton"
                aria-label="Редактировать"
                onClick={onEditProfile} />
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          name="profileAddButton"
          aria-label="Добавить"
          onClick={onAddPlace} />
      </section>

      {/* <!--cards --> */}
      <section className="cards" >
        {cards.map((card) => (

          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            onConfurmationDeleteCardPopup={onConfurmationDeleteCardPopup}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;







