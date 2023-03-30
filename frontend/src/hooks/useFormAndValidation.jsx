import { useState, useCallback } from "react";

export function useFormAndValidation() {

  // Стейт, в котором содержится значение инпута
  const [values, setValues] = useState({});
  const [error, setError] = useState({});
  const [isValid, setIsValid] = useState(true);

  // Обработчик изменения инпута обновляет стейт
  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setError({ ...error, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  }

  //сброс полей формы и
  const resetForm = useCallback((
    updatedValues = {},
    updatedError = {},
    updatedIsValid = false) => {
    setValues(updatedValues);
    setError(updatedError);
    setIsValid(updatedIsValid);
  }, [setValues, setError, setIsValid]);

  return { values, error, isValid, setValues, handleChange, resetForm }
}
