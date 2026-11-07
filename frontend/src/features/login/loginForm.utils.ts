import { AuthRequestError } from '../../context/auth-context'

export const AUTH_MODE = {
  LOGIN: 'login',
  SIGNUP: 'signup',
} as const

export type AuthMode = (typeof AUTH_MODE)[keyof typeof AUTH_MODE]

interface LoginFormSubmissionOptions {
  form: HTMLFormElement
  email: string
  password: string
  authMode: AuthMode
  login: (email: string, password: string) => Promise<unknown>
  register: (email: string, password: string) => Promise<unknown>
  onSubmit?: (values: { email: string; password: string }) => void
  setError: (error: string | null) => void
  setSuccess: (success: string | null) => void
}

export async function submitLoginForm({
  form,
  email,
  password,
  authMode,
  login,
  register,
  onSubmit,
  setError,
  setSuccess,
}: LoginFormSubmissionOptions): Promise<void> {
  setError(null)
  setSuccess(null)

  if (!email.trim() || !password) {
    setError('auth.missingCredentials')
    return
  }

  if (authMode === AUTH_MODE.SIGNUP && password.length < 8) {
    setError('auth.passwordTooShort')
    return
  }

  if (authMode === AUTH_MODE.SIGNUP && !/\p{Lu}/u.test(password)) {
    setError('auth.passwordNeedsUppercase')
    return
  }

  if (authMode === AUTH_MODE.SIGNUP && !/[\p{P}\p{S}]/u.test(password)) {
    setError('auth.passwordNeedsSpecial')
    return
  }

  if (!form.reportValidity()) {
    return
  }

  try {
    if (authMode === AUTH_MODE.SIGNUP) {
      await register(email, password)
      setSuccess('auth.signupSuccess')
    } else {
      await login(email, password)
    }
    onSubmit?.({ email, password })
  } catch (authError) {
    setSuccess(null)
    console.error(
      `${authMode === AUTH_MODE.SIGNUP ? 'Registration' : 'Login'} request failed:`,
      authError,
    )
    setError(
      authMode === AUTH_MODE.SIGNUP
        ? authError instanceof AuthRequestError && authError.status === 409
          ? 'auth.emailExists'
          : 'auth.signupFailed'
        : 'auth.loginFailed',
    )
  }
}
