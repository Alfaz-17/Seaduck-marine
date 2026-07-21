import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface BrandsSectionProps {
  brands?: any[]
  tone?: 'light' | 'dark'
}

const STATIC_BRANDS = ['FURUNO', 'JRC', 'NOR SAU', 'TANABE', 'SHELL', 'CASTROL MARINE', 'NANIWA', 'UNIVERSAL MARINE']

const getBrandLogo = (brand: { name: string; image?: string }, isDark: boolean) => {
  const cleanName = brand.name.toUpperCase().trim();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 3, md: 4 },
        py: { xs: 1.5, md: 2 },
        border: '1px solid',
        borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(10,25,47,0.08)',
        borderRadius: 0,
        bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(10,25,47,0.02)',
        color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(10,25,47,0.7)',
        boxShadow: 'none',
        transition: 'all 0.3s ease',
        cursor: 'default',
        height: 64,
        minWidth: 140,
        '&:hover': {
          color: 'secondary.main',
          borderColor: 'secondary.main',
          bgcolor: isDark ? 'rgba(14, 165, 233, 0.05)' : 'rgba(14, 165, 233, 0.05)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      {brand.image ? (
        <Box 
          component="img"
          src={brand.image}
          alt={cleanName}
          sx={{
            maxHeight: 40,
            maxWidth: '100%',
            objectFit: 'contain',
            filter: isDark ? 'brightness(0) invert(1) opacity(0.8)' : 'opacity(0.85)',
            transition: 'all 0.3s ease',
            '&:hover': {
              filter: 'none',
              opacity: 1
            }
          }}
        />
      ) : (
        <Typography sx={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: { xs: '13px', md: '15px' }, fontWeight: 900, letterSpacing: 2, whiteSpace: 'nowrap' }}>
          {cleanName}
        </Typography>
      )}
    </Box>
  )
}

const BrandsSection: FC<BrandsSectionProps> = ({ brands = [], tone = 'light' }) => {
  const isDark = tone === 'dark'
  
  // Use DB brands if populated, otherwise use the static default list
  const brandsList = brands && brands.length > 0 
    ? brands.map(b => ({ name: b.name, image: b.image || b.logo })) 
    : STATIC_BRANDS.map(name => ({ name }));

  return (
    <Box
      sx={{
        backgroundColor: isDark ? 'primary.dark' : 'common.white',
        py: { xs: 6, md: 8 },
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'grey.200',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 5, px: 2 }}>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            color: 'text.secondary', 
            fontWeight: 700, 
            letterSpacing: 2, 
            textTransform: 'uppercase',
            display: 'inline-block',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 40,
              height: 2,
              bgcolor: 'primary.light'
            }
          }}
        >
          We Deal with All Marine Brands
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 2.5, md: 4 },
          alignItems: 'center',
          animation: `scroll ${brandsList.length * 2 * 4.5}s linear infinite`,
          width: 'max-content',
          '@keyframes scroll': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          },
        }}
      >
        {/* Render twice for seamless loop */}
        {[...brandsList, ...brandsList, ...brandsList, ...brandsList].map((brand, index) => (
          <Box key={index} sx={{ mx: 0.5 }}>
            {getBrandLogo(brand, isDark)}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default BrandsSection
