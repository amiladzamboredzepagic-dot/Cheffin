import React, { useState } from 'react'
import { Alert, IconButton } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { Flex } from '../../components/ui/Flex'
import { FormTextField } from '../../components/ui/FormTextField'
import { SegmentedToggle } from '../../components/ui/SegmentedToggle'
import { SubmitButton } from '../../components/ui/SubmitButton'
import { useAuth } from '../../context/useAuth'

const AUTH_MODES = [
  { value: 'login', label: 'Log in' },
  { value: 'signup', label: 'Create an account' },
] as const

interface LoginFormProps {
  onSubmit?: (values: { email: string; password: string }) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authMode, setAuthMode] = useState<(typeof AUTH_MODES)[number]['value']>(
    'login',
  )

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    if (authMode === 'signup') {
      setError('Account creation is not available yet.')
      return
    }

    try {
      await login(email, password)
      onSubmit?.({ email, password })
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : 'Login failed',
      )
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
      {error && <Alert severity="error">{error}</Alert>}
      <SegmentedToggle
        value={authMode}
        options={AUTH_MODES}
        onChange={(mode) => {
          setAuthMode(mode)
          setError(null)
        }}
        ariaLabel="Authentication mode"
      />
      <FormTextField
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        startAdornment={<EmailOutlinedIcon />}
      />

      <FormTextField
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        startAdornment={<LockOutlinedIcon />}
        endAdornment={
          <IconButton
            aria-label="toggle password visibility"
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
      <SubmitButton>
        {authMode === 'login' ? 'Log in' : 'Create an account'}
      </SubmitButton>
    </Flex>
  )
}
