import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";


function EditAvatarPopup({ isOpen, onClose, isLoading, onUpdateUser }) {

  const { values, error, isValid, handleChange, resetForm } = useFormAndValidation()

  useEffect(() => {
    resetForm()
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      avatar: values.avatar,
    });
  }

  function closePopupAndResetForm() {
    onClose();
    resetForm();
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatarForm"
      isOpen={isOpen ? 'popup_opened' : ''}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
      onClose={closePopupAndResetForm}>
      <input
        type="url"
        name='avatar'
        id="popup__error_data_avatar"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_data_avatar"
        minLength="2"
        required
        value={values.avatar || ''}
        onChange={handleChange} />
      <span className={`popup__error  ${!isValid ? 'popup__error_data_avatar-error' : ''} `} >{error.avatar}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;