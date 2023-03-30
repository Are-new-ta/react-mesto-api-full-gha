import AuthForm from "./AuthForm";

function Login({ login }) {
  return (
    <section className="registration">
      <AuthForm
        title='Вход'
        buttonText='Войти'
        onSubmit={login} />
    </section>
  )
}

export default Login;