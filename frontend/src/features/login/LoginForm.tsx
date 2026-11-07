import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { Flex } from '../../components/ui/Flex'
import { FormTextField } from '../../components/ui/FormTextField'
import { SegmentedToggle } from '../../components/ui/SegmentedToggle'
import { SubmitButton } from '../../components/ui/SubmitButton'
import { StatusAlert } from '../../components/ui/StatusAlert'
import { useAuth } from '../../context/useAuth'
import { useTranslation } from 'react-i18next'
import { AUTH_MODE, type AuthMode, submitLoginForm } from './loginForm.utils'

interface LoginFormProps {
  onSubmit?: (values: { email: string; password: string }) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const { t } = useTranslation()
  const { login, register, loginLoading, registerLoading } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [authMode, setAuthMode] = useState<AuthMode>(AUTH_MODE.LOGIN)

  const authModes = [
    { value: AUTH_MODE.LOGIN, label: t('auth.login') },
    { value: AUTH_MODE.SIGNUP, label: t('auth.createAccount') },
  ] as const

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    return submitLoginForm({
      form: e.currentTarget,
      email,
      password,
      authMode,
      login,
      register,
      onSubmit,
      setError,
      setSuccess,
    })
  }

  return (
    <Flex
      component="form"
      noValidate
      onSubmit={handleSubmit}
      direction="column"
      gap="20px"
      sx={{
        width: '100%',
      }}
    >
      {error && <StatusAlert severity="error">{t(error)}</StatusAlert>}
      {success && <StatusAlert severity="success">{t(success)}</StatusAlert>}
      <SegmentedToggle
        value={authMode}
        options={authModes}
        onChange={(mode) => {
          setAuthMode(mode)
          setError(null)
          setSuccess(null)
        }}
        ariaLabel={t('auth.modeLabel')}
      />
      <FormTextField
        id="email"
        name="email"
        type="email"
        required
        label={t('auth.email')}
        placeholder={t('auth.emailPlaceholder')}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          setSuccess(null)
        }}
        startAdornment={<EmailOutlinedIcon />}
      />

      <FormTextField
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        required
        minLength={authMode === AUTH_MODE.SIGNUP ? 8 : undefined}
        helperText={
          authMode === AUTH_MODE.SIGNUP
            ? t('auth.passwordRequirement')
            : undefined
        }
        label={t('auth.password')}
        placeholder={t('auth.passwordPlaceholder')}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          setSuccess(null)
        }}
        startAdornment={<LockOutlinedIcon />}
        endAdornment={
          <IconButton
            aria-label={
              showPassword ? t('auth.hidePassword') : t('auth.showPassword')
            }
            onClick={() => setShowPassword((prev) => !prev)}
            edge="end"
            disableRipple
          >
            {showPassword ? (
              <VisibilityOffOutlinedIcon />
            ) : (
              <VisibilityOutlinedIcon />
            )}
          </IconButton>
        }
      />
      <SubmitButton loading={loginLoading || registerLoading}>
        {authMode === AUTH_MODE.LOGIN
          ? t('auth.login')
          : t('auth.createAccount')}
      </SubmitButton>
    </Flex>
  )
}
