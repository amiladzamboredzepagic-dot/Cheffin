import { styled } from '@mui/material/styles'
import { Flex } from '../../../components/ui/layout/Flex'

export const HeaderContainer = styled(Flex)(({ theme }) => ({
  width: '100%',
  height: '88px',
  paddingInline: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up('md')]: {
    paddingInline: theme.spacing(8),
  },
  [theme.breakpoints.down('md')]: {
    height: 'auto',
    minHeight: 88,
    paddingBlock: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    paddingInline: theme.spacing(1),
  },
}))
