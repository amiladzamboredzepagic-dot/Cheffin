import type { ReactNode } from 'react'
import { InputAdornment, TextField, type TextFieldProps } from '@mui/material'

export interface FormTextFieldProps extends Omit<TextFieldProps, 'slotProps'> {
  startAdornment?: ReactNode
  endAdornment?: ReactNode
}

const adornmentSx = {
  color: 'text.secondary',
  '& .MuiIconButton-root, & svg': {
    color: 'inherit',
  },
}

export function FormTextField({
  startAdornment,
  endAdornment,
  ...textFieldProps
}: FormTextFieldProps) {
  return (
    <TextField
      {...textFieldProps}
      fullWidth
      slotProps={{
        inputLabel: { shrink: true },
        input: {
          notched: false,
          startAdornment: startAdornment ? (
            <InputAdornment position="start" sx={adornmentSx}>
              {startAdornment}
            </InputAdornment>
          ) : undefined,
          endAdornment: endAdornment ? (
            <InputAdornment position="end" sx={adornmentSx}>
              {endAdornment}
            </InputAdornment>
          ) : undefined,
        },
      }}
    />
  )
}
