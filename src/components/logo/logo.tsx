import React, { FC } from 'react'
import Box from '@mui/material/Box'

interface Props {
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  isScrolled?: boolean
}

const Logo: FC<Props> = ({ onClick, isScrolled, variant = 'primary' }) => {
  const logoWidth = { xs: isScrolled ? 110 : 135, sm: isScrolled ? 130 : 155, md: isScrolled ? 145 : 180 }

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
          maxHeight: { xs: 110, sm: 120, md: 140 },
          objectFit: 'contain',
          transition: 'all 0.3s ease-in-out',
        }}
      />
    </Box>
  )
}

export default Logo
