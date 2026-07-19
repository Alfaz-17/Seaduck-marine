import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const facts = [
  { label: 'Founded', value: '2009' },
  { label: 'Location', value: 'Bhavnagar, India' },
  { label: 'Experience', value: '15+ Years' },
  { label: 'Products in Stock', value: '500+ Items' },
  { label: 'Delivery Time', value: 'Within 24 Hours' },
  { label: 'Brands Available', value: '18+ Brands' },
  { label: 'Markets Served', value: 'Global' },
  { label: 'IndiaMART Rating', value: '4.4 / 5 Stars' },
]

const KeyFacts: FC = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'primary.dark' }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box>
              <Typography variant="caption" sx={{ color: 'secondary.main', fontFamily: 'Inter, monospace', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', display: 'block', mb: 2 }}>
                SYS_VISION
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: 'common.white', mb: 3 }}>
                Our{' '}
                <Box component="span" sx={{ position: 'relative', display: 'inline-block', pb: 1, borderBottom: '4px solid', borderBottomColor: 'secondary.main' }}>
                  Vision
                </Box>
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'Inter, sans-serif', fontSize: '1.05rem', lineHeight: 1.8 }}>
                We want to be the go-to partner for every shipping company, fleet manager, and ship engineer looking for marine electronics. Our vision is to build a connected, trusted global network — where any vessel, anywhere in the world, can get the right equipment quickly and confidently.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box sx={{ 
              position: 'relative',
              bgcolor: 'primary.main', 
              color: 'common.white', 
              borderRadius: 0, 
              p: { xs: 3, sm: 5 },
              border: '1px solid',
              borderColor: 'primary.light',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -1, left: -1, width: 12, height: 12,
                borderTop: '2px solid', borderLeft: '2px solid', borderColor: 'secondary.main'
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -1, right: -1, width: 12, height: 12,
                borderBottom: '2px solid', borderRight: '2px solid', borderColor: 'secondary.main'
              }
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif', mb: 4, color: 'common.white' }}>
                Key Facts At A Glance
              </Typography>
              <Grid container spacing={3}>
                {facts.map((fact, idx) => (
                  <Grid item xs={6} sm={4} key={idx}>
                    <Box sx={{ borderLeft: '2px solid', borderColor: 'secondary.main', pl: 2, py: 0.5 }}>
                      <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, monospace', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1, mb: 0.5 }}>
                        {fact.label}
                      </Typography>
                      <Typography sx={{ fontWeight: 700, fontFamily: 'Inter, sans-serif', fontSize: '1.1rem' }}>
                        {fact.value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default KeyFacts
