import React, { FC } from 'react'
import Box from '@mui/material/Box'

interface Props {
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  isScrolled?: boolean
}

const Logo: FC<Props> = ({ onClick, isScrolled, variant = 'primary' }) => {
  const logoWidth = { xs: isScrolled ? 90 : 110, sm: isScrolled ? 110 : 130, md: isScrolled ? 130 : 160 }

  return (
    <Box onClick={onClick} sx={{ 
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
    }}>
      <Box
        component="img"
        src="/logo.png"
        alt="Sea Duck Marine Service Logo"
        sx={{
          display: 'block',
          width: logoWidth,
          height: 'auto',
          maxHeight: { xs: 90, sm: 100, md: 120 },
          objectFit: 'contain',
          transition: 'all 0.3s ease-in-out',
        }}
      />
    </Box>
  )
}

export default Logo
