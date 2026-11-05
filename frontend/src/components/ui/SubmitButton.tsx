import type { ReactNode } from 'react'
import { Button, type ButtonProps } from '@mui/material'
import { ArrowRight } from 'lucide-react'

export interface SubmitButtonProps extends Omit<ButtonProps, 'type'> {
  children: ReactNode
}

export function SubmitButton({ children, sx, ...props }: SubmitButtonProps) {
  return (
    <Button
      {...props}
      type="submit"
      variant="contained"
      sx={[
        {
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          px: '19px',
          py: 0,
          gap: '9px',
          width: '100%',
          maxWidth: '496px',
          height: '46px',
          minWidth: 0,
          flex: 'none',
          alignSelf: 'center',
          flexGrow: 0,
          color: '#FFFFFF',
          backgroundColor: '#356B4B',
          border: '1px solid #356B4B',
          borderRadius: '10px',
          fontSize: '13px',
          fontWeight: 600,
          lineHeight: '16px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#356B4B',
            borderColor: '#356B4B',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
      {children}
    </Button>
  )
}
