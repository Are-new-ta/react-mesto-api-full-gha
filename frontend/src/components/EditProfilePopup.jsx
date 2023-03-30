import React, { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormAndValidation } from "../hooks/useFormAndValidation";


function EditProfilePopup({ isOpen, onClose, isLoading, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext);
  const { values, error, isValid, setValues, handleChange, resetForm } = useFormAndValidation()

  useEffect(() => {
    setValues({
      name: currentUser.name || '',
      about: currentUser.about || ''
    });
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about
    })
  }

  function closePopupAndResetForm() {
    onClose();
    resetForm();
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen ? 'popup_opened' : ''}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
      onClose={closePopupAndResetForm}>
      <input
        type="text"
        name="name"
        id="popup__error_data_name"
        className="popup__input popup__input_data_name"
        minLength='2'
        maxLength='40'
        placeholder="Имя"
        required
        value={values.name || ' '}
        onChange={handleChange} />
      <span className={`popup__error  ${!isValid ? 'popup__error_data_name-error' : ''} `} >{error.name}</span>
      <input
        type="text"
        name="about"
        id="popup__error_data_job"
        placeholder="О себе"
        className="popup__input popup__input_data_job"
        minLength='2'
        maxLength='200'
        required
        value={values.about || ' '}
        onChange={handleChange} />
      <span className={` popup__error ${!isValid ? 'popup__error_data_job-error' : ''} `} >{error.about}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
