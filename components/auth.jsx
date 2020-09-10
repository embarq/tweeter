import { useState } from "react"
import AuthLogin from './auth-login'
import AuthSignup from './auth-signup'

export default function Auth(props) {
  const [activePage, setActivePage] = useState('login')
  const page = activePage === 'login'
    ? <AuthLogin
        goToSignup={() => setActivePage('signup')}
        goToResetPassword={() => setActivePage('reset_password')}
        onLoginSuccess={() => props.onComplete()} />
    : <AuthSignup
        goToLogin={() => setActivePage('login')}
        onSignupSuccess={() => props.onComplete()} />

  return (
    <>{page}</>
  )
}
