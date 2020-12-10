import { useState } from "react"
import AuthLogin from './auth-login'
import AuthSignup from './auth-signup'

const Pages = {
  Login: 'auth_login_subpage',
  Signup: 'auth_signup_subpage',
  ResetPassword: 'auth_reset_password_subpage',
}

export default function Auth(props) {
  const [activePage, setActivePage] = useState(Pages.Login)

  switch (activePage) {
    case Pages.Login: return (
      <AuthLogin
        goToSignup={() => setActivePage(Pages.Signup)}
        goToResetPassword={() => setActivePage('reset_password')} />
    )
    case Pages.Signup: return (
      <AuthSignup goToLogin={() => setActivePage(Pages.Login)} />
    )
    case Pages.ResetPassword: return <p>Reset password</p>
  }
}
