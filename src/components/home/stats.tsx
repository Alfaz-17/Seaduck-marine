import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const defaultFacts = [
  { value: '17+', label: 'Years of Marine Radar & Spares Expertise' },
  { value: '750+', label: 'Vessels Supplied & Serviced in Gujarat' },
  { value: '24hr', label: 'Rapid Spares Delivery to Gujarat Ports' },
]

interface StatsBandProps {
  data?: any
}

const StatsBand: FC<StatsBandProps> = ({ data }) => {
  const facts = data?.keyFacts || defaultFacts;
  
  return (
    <Box
      sx={{
        backgroundColor: '#0B1E40',
        background: 'linear-gradient(135deg, #0B1E40 0%, #020617 100%)',
        py: { xs: 8, md: 10 },
        color: 'common.white',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Background glowing effects */}
      <Box sx={{ 
        position: 'absolute', 
        top: -100, 
        left: -100, 
        width: 300, 
        height: 300, 
        borderRadius: '50%', 
        background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none'
      }} />
      <Box sx={{ 
        position: 'absolute', 
        bottom: -100, 
        right: -100, 
        width: 300, 
        height: 300, 
        borderRadius: '50%', 
        background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none'
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {facts.map((fact: any, idx: number) => {
            const match = fact.value.match(/^([0-9]+)([^0-9]*)$/)
            const numericPart = match ? match[1] : fact.value
            const suffix = match ? match[2] : ''
            
            return (
              <Grid key={idx} item xs={12} sm={6} md={4}>
                <Box sx={{
                  p: { xs: 4, md: 5 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 3,
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: 'secondary.main',
                    backgroundColor: 'rgba(14, 165, 233, 0.04)',
                    boxShadow: '0 12px 40px rgba(14, 165, 233, 0.15)',
                    '& .stat-value': {
                      color: 'secondary.main',
                      textShadow: '0 0 20px rgba(14, 165, 233, 0.5)',
                    }
                  }
                }}>
                  <Typography 
                    className="stat-value"
                    variant="h2" 
                    sx={{ 
                      fontSize: { xs: '3rem', sm: '3.5rem', md: '4rem' }, 
                      fontWeight: 800, 
                      mb: 1.5, 
                      color: 'common.white',
                      fontFamily: '"Space Grotesk", sans-serif',
                      lineHeight: 1,
                      display: 'flex',
                      alignItems: 'baseline',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {numericPart}
                    {suffix && (
                      <Box component="span" sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' }, color: 'secondary.main', ml: 0.5, fontWeight: 700 }}>
                        {suffix}
                      </Box>
                    )}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.6, letterSpacing: 0.5 }}>
                    {fact.label}
                  </Typography>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

export default StatsBand
