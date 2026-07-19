import { createTheme as createMuiTheme, Theme } from '@mui/material/styles'

import typography from './typography'
import paletteBase from './palette-base'
import paletteLight from './palette-light'
import paletteDark from './palette-dark'
import shadows from './shadows'

// default
const createTheme = (darkMode?: boolean): Theme => {
  const palette = darkMode ? { ...paletteBase, ...paletteDark } : { ...paletteBase, ...paletteLight }
  return createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    palette,
    typography,
    shadows,
    shape: {
      borderRadius: 0,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: palette.background?.default,
            color: palette.text?.primary,
            textRendering: 'optimizeLegibility',
          },
          '::selection': {
            backgroundColor: 'rgba(14, 165, 233, 0.18)',
          },
          a: {
            color: 'inherit',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            boxShadow: 'none',
            fontWeight: 700,
            letterSpacing: 0,
            textTransform: 'none',
            minHeight: 44,
            paddingLeft: 22,
            paddingRight: 22,
          },
          contained: {
            '&:hover': {
              boxShadow: '0 14px 28px rgba(10,31,64,0.18)',
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: 20,
            paddingRight: 20,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            border: '1px solid #DDE5EF',
            boxShadow: '0 16px 40px rgba(10,31,64,0.08)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: {
            borderRadius: 0,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            backgroundColor: '#FFFFFF',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            fontWeight: 700,
          },
        },
      },
    },
  })
}

export const lightTheme = createTheme(false)
export const darkTheme = createTheme(true)

export { createTheme, paletteBase, paletteLight, paletteDark, typography, shadows }
export default darkTheme
