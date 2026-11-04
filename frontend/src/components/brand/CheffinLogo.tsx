import { styled } from '@mui/material/styles'

const LogoImage = styled('img')(({ theme }) => ({
  height: 32,
  width: 'auto',
  display: 'block',
  [theme.breakpoints.up('sm')]: {
    height: 40,
  },
}))

export default function CheffinLogo() {
  return <LogoImage src="cheffin/logo.svg" alt="Cheffin Logo" />
}
