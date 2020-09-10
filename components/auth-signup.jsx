import { useCallback, useEffect, useState } from 'react'
import { signupWithCredentials } from '../core/auth'
import StyledInput from './styled-input'
import ManagedForm from './form'
import FormField from './form-field'
import Button from './button'

export default function AuthSignup(props) {
  const [state, setState] = useState({ loading: false, success: false, error: null })
  const handleSubmit = useCallback(async (formValue) => {
    setState({
      ...state,
      loading: true,
      error: null,
    })

    try {
      let payload = { ...formValue }
      delete payload.confirmPassword
      let res = await signupWithCredentials(payload)
      console.log('signupWithCredentials', res);
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
      props.onSignupSuccess()
    }
  }, [state.success])

  return (
    <ManagedForm onSubmit={handleSubmit} className="w-full max-w-sm md:ml-10">
    {({ value, controls }, updateFieldState) => (<>
      <FormField label="Full name" labelFor="fullname">
        <StyledInput>
          <input onChange={updateFieldState} id="fullname" type="text" autoComplete="name" required />
        </StyledInput>
      </FormField>
      <FormField label="Username" labelFor="username">
        <StyledInput>
          <input onChange={updateFieldState} id="username" type="text" autoComplete="username" required />
        </StyledInput>
      </FormField>
      <FormField label="Email" labelFor="email">
        <StyledInput>
          <input onChange={updateFieldState} id="email" type="text" placeholder="example@mail.com" autoComplete="email" required />
        </StyledInput>
      </FormField>
      <FormField label="Password" labelFor="password">
        <StyledInput>
          <input onChange={updateFieldState} id="password" type="password" placeholder="********" autoComplete="current-password" required min="8" />
        </StyledInput>
      </FormField>
      <FormField label="Confirm Password" labelFor="confirmPassword">
        <StyledInput>
          <input onChange={updateFieldState} id="confirmPassword" type="password" placeholder="********" autoComplete="current-password" required />
        </StyledInput>
      </FormField>
      {(value.password !== value.confirmPassword && controls.confirmPassword?.dirty) &&
        <p className="md:-mt-4 md:mb-4 text-red-400 text-right">Passwords don't match</p>
      }
      <div className="md:flex md:items-center">
        <div className="w-full flex flex-col-reverse mt-4 md:mt-0 md:flex-row md:justify-between md:pl-10">
          <Button onClick={() => props.goToLogin()} kind="clear" type="button">
            <span className="text-sm">Already have an account? <b>Login</b></span>
          </Button>
          <Button type="submit" className="w-1/3 md:w-auto mx-auto md:mx-0 justify-center" loading={state.loading}>
            Sign up
          </Button>
        </div>
      </div>
    </>)}
    </ManagedForm>
  )
}
