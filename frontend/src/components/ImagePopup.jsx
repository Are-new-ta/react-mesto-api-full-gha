import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_data_image ${card.bool ? 'popup_opened' : ''}`} >
      <div className="popup__container-image">
        <button
          className="popup__button-close popup__button-close_data_image "
          name="popupImageButtonClose"
          type="button"
          aria-label="Закрыть"
          onClick={onClose} />
        <figure className="popup__image-box">
          <img
            src={card.src}
            alt={card.alt}
            className="popup__image" />
          <figcaption
            className="popup__caption">
            {card.alt}
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;
