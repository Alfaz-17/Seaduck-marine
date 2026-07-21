import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const categories = [
  {
    name: 'Engine Spares',
    image: '/images/categories/Automation.png',
    description: 'Pistons, liners, valves, compressor spares, and rebuild kits for propulsion systems.',
  },
  {
    name: 'Deck Equipment',
    image: '/images/categories/Navigation.jpg',
    description: 'High-quality winches, anchors, chains, valves, pumps, and deck fittings for cargo operations.',
  },
  {
    name: 'Navigation Equipment',
    image: '/images/categories/Navigation.jpg',
    description: 'Marine radars, GPS systems, echo sounders, gyrocompasses, and complete communication consoles.',
  },
  {
    name: 'Electrical Items',
    image: '/images/categories/Automation.png',
    description: 'Reconditioned automation panels, alarm monitoring sensors, contactors, relays, and bridge controllers.',
  },
  {
    name: 'Consumables',
    image: '/images/categories/Communication.jpg',
    description: 'Premium marine lubricants (Shell, Castrol), packings, seals, filters, and daily engine room supplies.',
  },
  {
    name: 'Packing & Worldwide Delivery',
    image: '/images/categories/Communication.jpg',
    description: 'Secure wooden crate packing, custom documentation, and rapid dispatch to major global ports.',
  }
]

const CategoryCard = ({ category }: { category: any }) => (
  <Link href={`/products?category=${encodeURIComponent(category.name)}`} passHref>
    <Box
      component="a"
      sx={{
        textDecoration: 'none',
        display: 'flex',
        position: 'relative',
        borderRadius: 0,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        height: { xs: 190, md: 280 },
        alignItems: 'flex-end',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
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
          '& .bg-image': {
            transform: 'scale(1.05)',
            filter: 'contrast(1.1) brightness(0.9)',
          },
          '& .overlay': {
            opacity: 0.85,
          },
          '& .explore-btn': {
            opacity: 1,
            transform: 'translateY(0)',
          }
        }
      }}
    >
      <Box
        className="bg-image"
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${category.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'all 0.5s ease',
        }}
      />
      <Box
        className="overlay"
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(2, 6, 23, 0.95) 0%, rgba(2, 6, 23, 0.6) 40%, transparent 100%)',
          opacity: 0.9,
          transition: 'opacity 0.4s ease',
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1, p: { xs: 2, md: 4 }, width: '100%' }}>
        <Typography variant="h4" component="h3" sx={{ color: 'common.white', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, mb: { xs: 1, md: 2 }, fontSize: { xs: '0.95rem', md: '1.35rem' } }}>
          {category.name}
        </Typography>
        <Box 
          className="explore-btn"
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            color: 'secondary.main', 
            fontWeight: 600,
            fontFamily: 'Inter, monospace',
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontSize: { xs: '0.65rem', md: '0.75rem' },
            opacity: { xs: 1, md: 0 },
            transform: { xs: 'translateY(0)', md: 'translateY(10px)' },
            transition: 'all 0.4s ease',
          }}
        >
          VIEW_PRODUCTS <ArrowForwardIcon sx={{ fontSize: { xs: 13, md: 16 } }} />
        </Box>
      </Box>
    </Box>
  </Link>
)

const MainCategories: FC = () => {
  return (
    <Box id="main-categories" sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
          <Typography variant="caption" sx={{ color: 'secondary.main', fontFamily: 'Inter, monospace', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', display: 'block', mb: 2 }}>
            OUR SERVICE SOLUTIONS
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: 'text.primary', position: 'relative', display: 'inline-block' }}>
            Our Marine{' '}
            <Box component="span" sx={{ position: 'relative', display: 'inline-block', pb: 1, borderBottom: '4px solid', borderBottomColor: 'secondary.main' }}>
              Solutions
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {categories.map((category, idx) => (
            <Grid item xs={6} sm={6} md={4} key={idx}>
              <CategoryCard category={category} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default MainCategories

