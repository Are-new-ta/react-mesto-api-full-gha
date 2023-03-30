import PopupWithForm from "./PopupWithForm";

function ConfirmationDeleteCardPopup({ isOpen, onClose, isLoading, onCardDelete }) {

  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete()
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="popup_data_delete-card"
      isOpen={isOpen ? 'popup_opened' : ''}
      buttonText={isLoading ? 'Сохранение...' : 'Да'}
      onSubmit={handleSubmit}
      onClose={onClose} />
  )
}

export default ConfirmationDeleteCardPopup;
