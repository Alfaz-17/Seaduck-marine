import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

interface PageHeroProps {
  title: string
  subtitle?: string
  image?: string
  compact?: boolean
  children?: React.ReactNode
}

const PageHero: FC<PageHeroProps> = ({ title, subtitle, image = '/images/marine-bridge.jpg', compact = false, children }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: compact ? { xs: 200, md: 280 } : { xs: 350, md: 450 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'primary.main',
        pt: compact ? { xs: 12, md: 15 } : { xs: 14, md: 20 },
        pb: compact ? { xs: 4, md: 5 } : { xs: 7, md: 9 },
        color: 'common.white',
        overflow: 'hidden',
        borderBottom: '1px solid',
        borderColor: 'primary.light',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundSize: '40px 40px',
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          zIndex: 1,
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{
              borderLeft: '4px solid',
              borderColor: 'secondary.main',
              pl: 3,
              position: 'relative'
            }}>
              <Typography variant="overline" sx={{ fontFamily: 'Inter, monospace', color: 'secondary.light', letterSpacing: 2 }}>
                SYSTEM_{title.toUpperCase().replace(/\s+/g, '_')}
              </Typography>
              <Typography variant="h1" sx={{ 
                fontSize: compact ? { xs: '1.75rem', md: '2.5rem' } : { xs: '2.35rem', md: '3.5rem' }, 
                fontWeight: 700, 
                mb: 2, 
                mt: 1,
                letterSpacing: -1,
                fontFamily: '"Space Grotesk", sans-serif'
              }}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400, maxWidth: 680, lineHeight: 1.7, fontFamily: 'Inter' }}>
                  {subtitle}
                </Typography>
              )}
              {children}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
             <Box sx={{
                position: 'relative',
                width: '100%',
                height: compact ? { xs: 200, md: 250 } : { xs: 250, md: 350 },
                border: '1px solid',
                borderColor: 'primary.light',
                p: 1,
                bgcolor: 'rgba(255,255,255,0.02)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -5, left: -5, width: 10, height: 10, borderTop: '2px solid', borderLeft: '2px solid', borderColor: 'secondary.main'
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -5, right: -5, width: 10, height: 10, borderBottom: '2px solid', borderRight: '2px solid', borderColor: 'secondary.main'
                }
             }}>
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'contrast(1.1) saturate(0.8)',
                  }}
                />
             </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default PageHero

