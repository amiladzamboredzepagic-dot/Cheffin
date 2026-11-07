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

interface LoginFormProps {
  onSubmit?: (values: { email: string; password: string }) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const { t } = useTranslation()
  const { login, loginLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const authModes = [
    { value: 'login', label: t('auth.login') },
    { value: 'signup', label: t('auth.createAccount') },
  ] as const

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    if (authMode === 'signup') {
      setError('auth.signupUnavailable')
      return
    }

    try {
      await login(email, password)
      onSubmit?.({ email, password })
    } catch (loginError) {
      console.error('Login request failed:', loginError)
      setError('auth.loginFailed')
    }
  }

  return (
    <Flex
      component="form"
      onSubmit={handleSubmit}
      direction="column"
      gap="20px"
      sx={{
        width: '100%',
      }}
    >
      {error && <StatusAlert severity="error">{t(error)}</StatusAlert>}
      <SegmentedToggle
        value={authMode}
        options={authModes}
        onChange={(mode) => {
          setAuthMode(mode)
          setError(null)
        }}
        ariaLabel={t('auth.modeLabel')}
      />
      <FormTextField
        id="email"
        name="email"
        type="email"
        label={t('auth.email')}
        placeholder={t('auth.emailPlaceholder')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        startAdornment={<EmailOutlinedIcon />}
      />

      <FormTextField
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        label={t('auth.password')}
        placeholder={t('auth.passwordPlaceholder')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
      <SubmitButton loading={loginLoading}>
        {authMode === 'login' ? t('auth.login') : t('auth.createAccount')}
      </SubmitButton>
    </Flex>
  )
}
