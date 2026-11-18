import { createTheme, type PaletteMode } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    highlight: string
  }
  interface PaletteOptions {
    highlight?: string
  }
  interface TypeBackground {
    input?: string
    inputActive?: string
    secondary: string
    accent: string
    planner: string
    mealSlot: string
  }
  interface TypeText {
    detail: string
    label?: string
    placeholder?: string
  }
  interface TypographyVariants {
    fontFamilySerif: string
  }
  interface TypographyVariantsOptions {
    fontFamilySerif?: string
  }
}

export function createAppTheme(mode: PaletteMode = 'light') {
  const isDark = mode === 'dark'

  return createTheme({
  palette: {
    mode,
    primary: {
      main: isDark ? '#D28A9D' : '#54233A',
      light: isDark ? '#E6B2BF' : '#78354F',
      dark: isDark ? '#A95A73' : '#321421',
      contrastText: isDark ? '#321421' : '#ffffff',
    },
    secondary: {
      main: isDark ? '#78354F' : '#D28A9D',
      light: isDark ? '#A95A73' : '#E6B2BF',
      dark: isDark ? '#54233A' : '#A95A73',
      contrastText: isDark ? '#FFFFFF' : '#321421',
    },
    error: {
      main: isDark ? '#F28B82' : '#B42318',
      light: isDark ? '#442422' : '#FDECEA',
      dark: isDark ? '#FFB4AB' : '#7A271A',
      contrastText: isDark ? '#241315' : '#ffffff',
    },
    warning: {
      main: isDark ? '#F2C66D' : '#946200',
      light: isDark ? '#3A3020' : '#FFF4CC',
      dark: isDark ? '#FFE0A3' : '#704B00',
      contrastText: isDark ? '#241D11' : '#ffffff',
    },
    success: {
      main: isDark ? '#8DC9A1' : '#356B4B',
      light: isDark ? '#23352A' : '#E8ECEA',
      dark: isDark ? '#B7E2C3' : '#1B4332',
      contrastText: isDark ? '#142219' : '#ffffff',
    },
    highlight: isDark ? '#E6A0B4' : '#A34867',
    background: {
      default: isDark ? '#171316' : '#F8F5EE',
      paper: isDark ? '#211A1E' : '#FFFFFF',
      input: isDark ? '#2B2227' : '#FFFDF8',
      inputActive: isDark ? '#382A31' : '#E8ECEA',
      secondary: isDark ? '#30232A' : '#F1EADC',
      accent: isDark ? '#3D2731' : '#F5E5EA',
      planner: isDark ? '#28312B' : '#E7ECDD',
      mealSlot: isDark ? '#2A2420' : '#F5F1E8',
    },
    divider: isDark ? '#493942' : '#DEDCCE',
    text: {
      primary: isDark ? '#F5EBEF' : '#2C2025',
      secondary: isDark ? '#C6B7BE' : '#787A6B',
      detail: isDark ? '#B7A7AE' : '#686D5D',
      label: isDark ? '#F1E2E8' : '#3E2530',
      placeholder: isDark ? '#B9AAB0' : '#666D5A',
    },
  },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontFamilySerif: '"Lora", Georgia, serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: '2.5rem', // 40px
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem', // 32px
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h3: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
      lineHeight: 1.35,
    },
    subtitle1: {
      fontSize: '1rem', // 16px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.8125rem', // 13px
      fontWeight: 400,
      lineHeight: '16px',
    },
    button: {
      fontSize: '0.8125rem', // 13px
      fontWeight: 600,
      lineHeight: '16px',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          slotProps: {
            paper: {
              sx: (theme) => ({
                mt: 1,
                boxSizing: 'border-box',
                width: 560,
                height: 268,
                maxWidth: 'calc(100vw - 32px)',
                maxHeight: 'calc(100vh - 32px)',
                overflow: 'hidden',
                p: 0,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '10px',
                backgroundColor: theme.palette.background.input,
                boxShadow: '0px 10px 28px rgba(41, 62, 48, 0.14)',
              }),
            },
            list: {
              sx: {
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflowY: 'auto',
                gap: '2px',
                px: 0,
                py: '4px',
              },
            },
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: isDark ? '#171316' : '#F8F5EE',
          color: isDark ? '#F5EBEF' : '#2C2025',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          borderRadius: 16,
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0px 4px 20px rgba(0, 0, 0, 0.2)'
              : '0px 4px 20px rgba(0, 0, 0, 0.04)',
        }),
      },
    },
    // --- Input Design System Overrides ---
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          position: 'relative',
          transform: 'none',
          fontSize: '12px',
          fontWeight: 500,
          lineHeight: '15px',
          color: theme.palette.text.label || '#293E30',
          marginBottom: '9px',
          '&.Mui-focused': {
            color: theme.palette.text.label || '#293E30',
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: '50px',
          backgroundColor: theme.palette.background.input || '#FFFDF8',
          borderRadius: '10px',
          paddingLeft: '15px',
          paddingRight: '15px',
          gap: '10px',
          fontSize: '13px',
          fontWeight: 400,
          lineHeight: '16px',
          color: theme.palette.text.secondary,
          '&.MuiInputBase-multiline': {
            height: 'auto',
            alignItems: 'flex-start',
            paddingTop: theme.spacing(1.5),
            paddingBottom: theme.spacing(1.5),
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
            borderWidth: '1px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.background.inputActive,
          },
          '& input:-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.input} inset !important`,
            WebkitTextFillColor: theme.palette.text.secondary,
            caretColor: theme.palette.text.secondary,
          },
          '& input:-webkit-autofill:focus, & input:-webkit-autofill:active': {
            WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.inputActive} inset !important`,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
            borderWidth: '1px',
          },
        }),
        input: ({ theme }) => ({
          padding: 0,
          height: '100%',
          boxSizing: 'border-box',
          color: theme.palette.text.secondary,
          '&.MuiInputBase-inputMultiline': {
            height: 'auto',
          },
          '&::placeholder': {
            color: theme.palette.text.secondary,
            opacity: 1,
          },
        }),
        adornedStart: ({ theme }) => ({
          marginRight: 0,
          color: theme.palette.text.secondary,
          '& svg': {
            width: '17px',
            height: '17px',
          },
        }),
        adornedEnd: ({ theme }) => ({
          marginLeft: 0,
          color: theme.palette.text.secondary,
          '& svg': {
            width: '17px',
            height: '17px',
          },
        }),
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%',
          maxWidth: '496px',
        },
      },
    },
  },
})
}
