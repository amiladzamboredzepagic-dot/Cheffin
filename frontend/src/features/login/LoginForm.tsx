import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import {
  CircleUserRound,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from 'lucide-react'
import { Flex } from '../../components/ui/layout/Flex'
import { FormTextField } from '../../components/ui/forms/FormTextField'
import { SegmentedToggle } from '../../components/ui/forms/SegmentedToggle'
import { StatusAlert } from '../../components/ui/feedback/StatusAlert'
import { useAuth } from '../../context/useAuth'
import { useTranslation } from 'react-i18next'
import { AUTH_MODE, type AuthMode, submitLoginForm } from './loginForm.utils'

interface LoginFormProps {
  authMode: AuthMode
  onAuthModeChange: (mode: AuthMode) => void
  onSubmit?: (values: { email: string; password: string }) => void
}

export function LoginForm({
  authMode,
  onAuthModeChange,
  onSubmit,
}: LoginFormProps) {
  const { t } = useTranslation()
  const { login, register } = useAuth()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
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
      firstName,
      lastName,
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
      id="login-form"
      component="form"
      noValidate
      onSubmit={handleSubmit}
      direction="column"
      align="stretch"
      justify="flex-start"
      gap={3}
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
          onAuthModeChange(mode)
          setError(null)
          setSuccess(null)
        }}
        ariaLabel={t('auth.modeLabel')}
      />

      {authMode === AUTH_MODE.SIGNUP && (
        <Flex
          direction={{ xs: 'column', sm: 'row' }}
          align="flex-start"
          gap={2}
          sx={{ width: '100%' }}
        >
          <FormTextField
            id="first-name"
            name="first_name"
            type="text"
            required
            label={t('auth.firstName')}
            placeholder={t('auth.firstNamePlaceholder')}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            startAdornment={<CircleUserRound aria-hidden="true" />}
            autoComplete="given-name"
            sx={{ flex: 1, minWidth: 0 }}
          />
          <FormTextField
            id="last-name"
            name="last_name"
            type="text"
            required
            label={t('auth.lastName')}
            placeholder={t('auth.lastNamePlaceholder')}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            startAdornment={<CircleUserRound aria-hidden="true" />}
            autoComplete="family-name"
            sx={{ flex: 1, minWidth: 0 }}
          />
        </Flex>
      )}
      <Flex direction="column" align="stretch" gap={2} sx={{ width: '100%' }}>
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
          startAdornment={<Mail aria-hidden="true" />}
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
          startAdornment={<LockKeyhole aria-hidden="true" />}
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
                <EyeOff aria-hidden="true" />
              ) : (
                <Eye aria-hidden="true" />
              )}
            </IconButton>
          }
        />
      </Flex>
    </Flex>
  )
}
