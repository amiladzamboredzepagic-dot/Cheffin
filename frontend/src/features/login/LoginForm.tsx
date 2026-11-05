import React, { useState } from 'react'
import { Alert, IconButton } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { Flex } from '../../components/ui/Flex'
import { FormTextField } from '../../components/ui/FormTextField'
import { SubmitButton } from '../../components/ui/SubmitButton'
import { useAuth } from '../../context/useAuth'

interface LoginFormProps {
  onSubmit?: (values: { email: string; password: string }) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
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
        Log in
      </SubmitButton>
    </Flex>
  )
}
