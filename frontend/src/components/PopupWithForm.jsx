function PopupWithForm({ isOpen, onClose, onSubmit, name, title, buttonText, children }) {
  return (
    <div className={`popup popup_data_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_data_${name}`}>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_data_${name}`}
          onSubmit={onSubmit}
          name={name}
          method="post"
          noValidate >
          {children}
          <button
            className="popup__button-save"
            type="submit"
            value={buttonText}>
            {buttonText}
          </button>
        </form>
        <button
          className="popup__button-close"
          name="popupProfileButtonClose"
          type="button"
          onClick={onClose}
          aria-label="Закрыть" />
      </div>
    </div>
  )
}

export default PopupWithForm;
