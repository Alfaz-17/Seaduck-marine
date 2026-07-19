import { PaletteOptions } from '@mui/material'

const paletteBase: Partial<PaletteOptions> = {
  primary: {
    light: '#1E3A8A',       // Blue 800
    main: '#0B1E40',        // Deep Corporate Navy
    dark: '#020617',        // Slate 950 (Keep ultra dark for borders/accents)
    contrastText: '#FFFFFF',
  },
  secondary: {
    light: '#38BDF8',       // Sky 400
    main: '#0EA5E9',        // Sky 500
    dark: '#0284C7',        // Sky 600
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F8FAFC',     // Slate 50 (Light Gray for alternating sections)
    paper: '#FFFFFF',
  }
}

export default paletteBase
