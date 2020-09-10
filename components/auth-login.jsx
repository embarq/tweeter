import { useCallback, useEffect, useState } from 'react'
import fire from '../core/firebase'
import StyledInput from './styled-input'
import ManagedForm from './form'
import FormField from './form-field'
import Button from './button'

export default function AuthLogin(props) {
  const [state, setState] = useState({ loading: false, success: false, error: null })
  const handleSubmit = useCallback(async (formValue) => {
    setState({
      ...state,
      loading: true,
      error: null,
    })

    try {
      let res = await fire.auth().signInWithEmailAndPassword(formValue.email, formValue.password)
      console.log('signInWithEmailAndPassword', res);
      setState({
        ...state,
        loading: false,
        success: true,
      })
    } catch(err) {
      console.log(err);
      setState({
        ...state,
        loading: false,
        error: err.message,
      })
    }
  })

  useEffect(() => {
    if (state.success) {
      props.onLoginSuccess()
    }
  }, [state.success])

  return (
    <ManagedForm onSubmit={handleSubmit} className="w-full max-w-sm md:ml-10">
    {(_, updateFieldState) => (
      <>
        <FormField label="Email" labelFor="email">
          <StyledInput>
            <input onChange={updateFieldState} id="email" type="text" placeholder="example@mail.com" autoComplete="username" required />
          </StyledInput>
        </FormField>
        <FormField label="Password" labelFor="password">
          <StyledInput>
            <input onChange={updateFieldState} id="password" type="password" placeholder="********" autoComplete="current-password" required />
          </StyledInput>
        </FormField>
        <div className="-mt-4 mb-4 text-right">
          <Button onClick={() => props.goToLogin()} kind="clear" type="button">
            <span className="text-sm">Forgot password?</span>
          </Button>
        </div>
        <div className="md:flex md:flex-col md:items-center">
          <div className="w-full flex flex-col-reverse mt-4 md:mt-0 md:flex-row md:justify-between md:pl-10">
            <Button onClick={props.goToSignup} type="button" kind="clear" className="mt-2 md:mt-0">
              <span className="text-sm">Don't have account? <b>Sign up!</b></span>
            </Button>
            <Button type="submit" className="w-1/3 md:w-auto mx-auto md:mx-0 justify-center" loading={state.loading}>
              Log in
            </Button>
          </div>
        </div>
      </>
    )}
    </ManagedForm>
  )
}
