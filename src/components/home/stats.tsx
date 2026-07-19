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
        backgroundColor: '#F4F6F9',
        py: { xs: 8, md: 6 },
        color: '#061B45',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'center' }}>
          {facts.map((fact: any, idx: number) => {
            // Split the label into two lines intuitively for aesthetic look
            const labelWords = fact.label.split(' ')
            const halfLength = Math.ceil(labelWords.length / 2)
            const labelPart1 = labelWords.slice(0, halfLength).join(' ')
            const labelPart2 = labelWords.slice(halfLength).join(' ')
            
            // Extract trailing +, hr, etc. from value if present for styling
            const match = fact.value.match(/^([0-9]+)([^0-9]*)$/)
            const numericPart = match ? match[1] : fact.value
            const suffix = match ? match[2] : ''

            return (
              <Grid key={idx} item xs={12} md={4} sx={{ textAlign: 'center', borderRight: { md: idx < facts.length - 1 ? '1px solid rgba(6, 27, 69, 0.1)' : 'none' } }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '3.5rem', md: '4.5rem' }, fontWeight: 800, mb: 1, color: '#061B45' }}>
                  {numericPart}
                  {suffix && <Typography component="sup" sx={{ fontSize: '1.8rem', color: 'secondary.main', ml: 0.5 }}>{suffix}</Typography>}
                </Typography>
                <Typography variant="body2" sx={{ color: '#4A5568', letterSpacing: 1.5, textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>
                  {labelPart1}<br />{labelPart2}
                </Typography>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

export default StatsBand
