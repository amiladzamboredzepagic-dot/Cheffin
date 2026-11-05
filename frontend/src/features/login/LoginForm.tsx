import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { Flex } from '../../components/ui/Flex'
import { FormTextField } from '../../components/ui/FormTextField'

interface LoginFormProps {
  onSubmit?: (values: { email: string; password: string }) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit?.({ email, password })
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
    </Flex>
  )
}
