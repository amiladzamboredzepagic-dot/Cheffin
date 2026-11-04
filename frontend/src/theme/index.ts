import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1b4332',
      light: '#2d6a4f',
      dark: '#081c15',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#70e000',
      light: '#9ef01a',
      dark: '#38b000',
      contrastText: '#1b4332',
    },
    background: {
      default: '#F8F5EE',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1d2a44',
      secondary: '#52607d',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F8F5EE',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.04)',
        },
      },
    },
  },
})
