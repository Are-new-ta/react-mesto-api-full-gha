import { NavLink } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register({ register }) {
  return (
    <section className="registration">
      <AuthForm
        title='Регистрация'
        buttonText='Зарегистрироваться'
        onSubmit={register} />
      <NavLink
        to="/sign-in"
        className="registration__link ">
        Уже зарегистрированы? Войти
      </NavLink>
    </section>
  )
}

export default Register;
