import { styled } from '@mui/material/styles'
import { Flex } from '../../../components/ui/Flex'

export const HeaderContainer = styled(Flex)(({ theme }) => ({
  width: '100%',
  height: '88px',
  paddingInline: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up('md')]: {
    paddingInline: theme.spacing(8),
  },
}))
