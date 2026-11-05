import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SubmitButtonRoot = styled(Button)(({ theme }) => ({
  boxSizing: 'border-box',
  padding: '0 19px',
  width: '100%',
  maxWidth: '496px',
  height: '46px',
  minWidth: 0,
  flex: 'none',
  alignSelf: 'center',
  flexGrow: 0,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.light,
  border: `1px solid ${theme.palette.primary.light}`,
  borderRadius: '10px',
  ...theme.typography.button,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.primary.light,
  },
}))
