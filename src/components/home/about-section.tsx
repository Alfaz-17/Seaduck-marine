import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

const categories = [
  {
    title: 'Navigation Systems',
    image: '/images/about/nav_system.png',
    description: 'Advanced radar, ECDIS, and gyroscopic compasses for precise voyage planning.',
    link: '/products'
  },
  {
    title: 'Automation & Control',
    image: '/images/about/auto_control.png',
    description: 'Intelligent autopilot and bridge monitoring systems to optimize vessel operations.',
    link: '/products'
  },
  {
    title: 'Communication',
    image: '/images/about/comm_system.png',
    description: 'Reliable satellite terminals, VHF radios, and global maritime distress systems.',
    link: '/products'
  }
]

const AboutSection: FC = () => {
  return (
    <Box sx={{ py: { xs: 7, md: 12 }, backgroundColor: 'background.default', position: 'relative', overflow: 'hidden' }}>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

        <Grid container spacing={4}>
          {categories.map((cat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Link href={cat.link} passHref>
                <Box 
                  component="a"
                  sx={{
                    display: 'block',
                    textDecoration: 'none',
                    borderRadius: 0,
                    overflow: 'hidden',
                    position: 'relative',
                    minHeight: { xs: 220, sm: 260, md: 340 },
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0, left: 0, width: 12, height: 12,
                      borderTop: '2px solid', borderLeft: '2px solid',
                      borderColor: 'secondary.main',
                      transition: 'all 0.3s ease',
                      zIndex: 2,
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0, right: 0, width: 12, height: 12,
                      borderBottom: '2px solid', borderRight: '2px solid',
                      borderColor: 'secondary.main',
                      transition: 'all 0.3s ease',
                      zIndex: 2,
                    },
                    '&:hover': {
                      borderColor: 'secondary.main',
                      '&::before': { width: 24, height: 24 },
                      '&::after': { width: 24, height: 24 },
                      '& .category-img': {
                        transform: 'scale(1.05)'
                      },
                      '& .overlay': {
                        background: 'rgba(2, 6, 23, 0.4)'
                      }
                    }
                  }}
                >
                  {/* Image Background */}
                  <Box 
                    className="category-img"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${cat.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                  
                  {/* Overlay */}
                  <Box 
                    className="overlay"
                    sx={{ 
                      position: 'absolute', 
                      inset: 0, 
                      background: 'rgba(2, 6, 23, 0.65)', 
                      transition: 'background 0.4s ease' 
                    }} 
                  />

                  {/* Content */}
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      inset: 0, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      p: { xs: 3, md: 4 }
                    }}
                  >
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontWeight: 700, 
                        fontSize: { xs: '1.45rem', sm: '1.65rem', md: '1.85rem' },
                        color: 'common.white', 
                        textAlign: 'center',
                        textShadow: '0px 4px 20px rgba(0,0,0,0.8)'
                      }}
                    >
                      {cat.title}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default AboutSection
