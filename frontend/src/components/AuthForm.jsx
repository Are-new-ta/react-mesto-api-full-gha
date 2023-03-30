import { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AuthForm({ title, onSubmit, buttonText }) {

  const { values, error, isValid, handleChange, resetForm } = useFormAndValidation()

  useEffect(() => {
    resetForm();
  }, [resetForm])

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(
      values.email,
      values.password
    )
  }

  return (
    <form className="auth-form__form"
      onSubmit={handleSubmit}>
      <h1 className="auth-form__title">{title}</h1>

      <label className="auth-form__label">
        <input
          type="email"
          name="email"
          placeholder="Email"
          id="input_data_email"
          className="auth-form__input auth-form__input_data_email"
          minLength='2'
          maxLength='40'
          required
          value={values.email || ''}
          onChange={handleChange} />
        <span className={`popup__error  ${!isValid ? 'popup__error_type_active' : ''} `}
          id="span_data_email-error"
        >{error.email}</span>
      </label>

      <label className="auth-form__label">
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          id="input_data_password"
          className="auth-form__input auth-form__input_data_password"
          minLength='4'
          maxLength='40'
          required
          value={values.password || ''}
          onChange={handleChange} />
        <span className={`popup__error  ${!isValid ? 'popup__error_type_active' : ''} `}
          id="span_data_password-error"
        >{error.password}</span>
      </label>

      <button
        className="auth-form__button-submit "
        type="submit"
        aria-label="Submit"
        value={buttonText}
        disabled={!isValid} > {buttonText} </button>
    </form>
  );
}

export default AuthForm;




