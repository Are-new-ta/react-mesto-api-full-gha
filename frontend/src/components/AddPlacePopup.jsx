import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AddPlacePopup({ isOpen, onClose, isLoading, onAddPlace }) {

  const { values, error, isValid, handleChange, resetForm } = useFormAndValidation()

  useEffect(() => {
    resetForm()
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.inputCardName,
      link: values.inputCardLink
    });
  }

  function closePopupAndResetForm() {
    onClose();
    resetForm();
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      isOpen={isOpen ? 'popup_opened' : ''}
      buttonText={isLoading ? 'Сохранение...' : 'Создать'}
      onSubmit={handleSubmit}
      onClose={closePopupAndResetForm}>
      <input
        type="text"
        name="inputCardName"
        id="popup__error_data_name-card"
        placeholder="Название"
        className="popup__input popup__input_data_name-card"
        minLength="2"
        maxLength="30"
        required
        value={values.inputCardName || ''}
        onChange={handleChange} />
      <span className={`popup__error  ${!isValid ? 'popup__error_data_name-card-error' : ''} `} >{error.inputCardName}</span>
      <input
        type="url"
        name="inputCardLink"
        id="popup__error_data_link"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_data_link"
        required
        value={values.inputCardLink || ''}
        onChange={handleChange} />
      <span className={`popup__error  ${!isValid ? 'popup__error_data_link-error' : ''} `} >{error.inputCardLink}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;