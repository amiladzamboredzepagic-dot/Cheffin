import { createTheme } from '@mui/material/styles'

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

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1b4332',
      light: '#356B4B',
      dark: '#081c15',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#70e000',
      light: '#9ef01a',
      dark: '#38b000',
      contrastText: '#1b4332',
    },
    error: {
      main: '#B42318',
      light: '#FDECEA',
      dark: '#7A271A',
    },
    warning: {
      main: '#946200',
      light: '#FFF4CC',
      dark: '#704B00',
    },
    success: {
      main: '#356B4B',
      light: '#E8ECEA',
      dark: '#1B4332',
    },
    highlight: '#AC674B',
    background: {
      default: '#F8F5EE',
      paper: '#FFFFFF',
      input: '#FFFDF8',
      inputActive: '#E8ECEA',
      secondary: '#F1EADC',
      accent: '#F2E0D4',
      planner: '#E7ECDD',
      mealSlot: '#F5F1E8',
    },
    divider: '#DEDCCE',
    text: {
      primary: '#1d2a44',
      secondary: '#787A6B',
      detail: '#686D5D',
      label: '#293E30',
      placeholder: '#666D5A',
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
                p: 0,
              },
            },
          },
        },
      },
    },
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
          color: theme.palette.text.secondary, // #787A6B
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
