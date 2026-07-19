import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import Head from 'next/head'
import { StyledButton } from '@/components/styled-button'

interface Exp {
  label: string
  value: string
}
interface ExpItemProps {
  item: Exp
}

const defaultExps: Array<Exp> = [
  {
    label: 'Years Experience',
    value: '17+',
  },
  {
    label: 'Product Categories',
    value: '6',
  },
  {
    label: 'Genuine Equipment',
    value: '100%',
  },
]

const ExpItem: FC<ExpItemProps> = ({ item }) => {
  const { value, label } = item
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: { xs: 'center', md: 'flex-start' }, 
      justifyContent: 'flex-start',
      flexDirection: 'column',
      gap: 0.5,
      py: { xs: 0.5, md: 0 }
    }}>
      <Typography
        sx={{ color: 'secondary.main', fontFamily: '"Space Grotesk", sans-serif', fontSize: { xs: 24, md: 32 }, fontWeight: 800, lineHeight: 1 }}
      >
        {value}
      </Typography>
      <Typography sx={{ color: 'secondary.light', fontFamily: 'Inter, monospace', fontSize: { xs: '0.62rem', sm: '0.75rem' }, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, textAlign: { xs: 'center', md: 'left' }, lineHeight: 1.2 }}>
        {label}
      </Typography>
    </Box>
  )
}

interface HomeHeroProps {
  data?: any
}

const HomeHero: FC<HomeHeroProps> = ({ data }) => {
  const headline = data?.heroHeadline || "Marine Radars, Automation & Lubricating Oils"
  const subtitle = data?.heroSubtitle || "Trusted B2B distributor and supplier of genuine ship spares, reconditioned automation panels, and marine engine consumables in Bhavnagar since 2009."
  const stats = data?.heroStats || defaultExps

  return (
    <>
      <Head>
        <link rel="preload" href="/videos/hero-poster.jpg" as="image" />
      </Head>
      <Box id="hero" sx={{ 
        position: 'relative', 
        minHeight: { xs: '100svh', md: '100vh' },
        height: { xs: '100svh', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 11.5, sm: 12.5, md: 8 },
        pb: { xs: 2.5, md: 2 },
        overflow: 'hidden',
        backgroundColor: 'primary.dark',
      }}>
        {/* Background hero video — supports webm and mp4 fallbacks */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'left center',
            top: 0,
            left: 0,
            zIndex: 1,
            opacity: 0.85,
          }}
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      {/* Cinematic gradient overlay for premium look & text readability */}
      <Box sx={{ 
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        top: 0, 
        left: 0, 
        background: {
          xs: 'linear-gradient(to bottom, rgba(11, 16, 24, 0.4) 0%, rgba(11, 16, 24, 0.65) 100%)',
          md: 'linear-gradient(to right, rgba(11, 16, 24, 0.6) 0%, rgba(11, 16, 24, 0.4) 50%, rgba(11, 16, 24, 0.05) 100%)'
        },
        zIndex: 2 
      }} />
      <Container maxWidth="lg" sx={{ 
        position: 'relative',
        zIndex: 3,
        height: { md: '100%' }, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between' 
      }}>
        <Grid container spacing={0} sx={{ 
          flexDirection: 'row', 
          flex: { md: 1 }, 
          alignItems: 'center',
          justifyContent: 'flex-start',
          pt: { xs: 6, md: 12 },
          pb: 0
        }}>
          <Grid item xs={12} md={9} lg={8}>
            <Box
              sx={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: 'center',
                width: '100%',
                mt: 0,
              }}
            >
              <Typography
                component="h1"
                sx={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: { xs: '1.4rem', sm: '1.9rem', md: '2.3rem', lg: '2.7rem' },
                  fontWeight: 800,
                  lineHeight: { xs: 1.2, md: 1.1 },
                  letterSpacing: -0.5,
                  color: 'common.white',
                  mb: 2,
                  maxWidth: '100%',
                  textAlign: { xs: 'center', md: 'left' },
                  textShadow: '0px 2px 10px rgba(0,0,0,0.5)',
                }}
              >
                <span dangerouslySetInnerHTML={{ 
                  __html: headline
                    .replace('Navigation', '<span style="color:#0EA5E9">Navigation</span>')
                    .replace('Automation', '<span style="color:#0EA5E9">Automation</span>')
                    .replace('Communication', '<span style="color:#0EA5E9">Communication</span>') 
                }} />
              </Typography>

              <Typography 
                sx={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: '#F8FAFC',
                  lineHeight: 1.6,
                  fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.95rem' },
                  fontWeight: 400,
                  mt: 0,
                  mb: 4,
                  maxWidth: 600,
                  textAlign: { xs: 'center', md: 'left' },
                  textShadow: '0px 1px 4px rgba(0,0,0,0.6)',
                }}
              >
                {subtitle}
              </Typography>


              <Box sx={{ display: 'flex', flexDirection: 'row', width: 'auto', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' }, gap: { xs: 1.25, sm: 2 } }}>
                <Link href="/products" passHref>
                  <StyledButton color="primary" size="large" variant="contained" sx={{
                    borderRadius: 0,
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    textTransform: 'uppercase',
                    fontFamily: 'Inter, monospace',
                    fontWeight: 700,
                    letterSpacing: 1,
                    fontSize: { xs: '0.68rem', md: '0.75rem' },
                    px: { xs: 2.4, md: 4.5 },
                    py: { xs: 0.8, md: 1 },
                    width: 'auto',
                    minWidth: { xs: 128, sm: 140 },
                    backgroundColor: 'secondary.main',
                    color: 'common.white',
                    '&:hover': { 
                      transform: 'translateY(-2px)', 
                      backgroundColor: 'secondary.dark',
                      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' 
                    }
                  }}>
                    Explore
                  </StyledButton>
                </Link>
                <Link href="/contact" passHref>
                  <StyledButton size="large" variant="outlined" sx={{
                    borderRadius: 0,
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    color: 'common.white',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(5px)',
                    textTransform: 'uppercase',
                    fontFamily: 'Inter, monospace',
                    fontWeight: 700,
                    letterSpacing: 1,
                    fontSize: { xs: '0.68rem', md: '0.75rem' },
                    px: { xs: 2.4, md: 4.5 },
                    py: { xs: 0.8, md: 1 },
                    width: 'auto',
                    minWidth: { xs: 128, sm: 140 },
                    '&:hover': { 
                      transform: 'translateY(-2px)', 
                      borderColor: 'secondary.main', 
                      backgroundColor: 'rgba(14, 165, 233, 0.12)' 
                    }
                  }}>
                    Contact
                  </StyledButton>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        {/* Experience Stats - Card-less Clean Text */}
        <Box sx={{ 
          py: 2, 
          mt: { xs: 2, md: 2 },
          mb: { xs: 0, md: 2 },
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Grid container spacing={{ xs: 1, md: 2 }} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
            {stats.map((item: any) => (
              <Grid key={item.label} item xs={4} md={3} lg={2.5}>
                <ExpItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
    </>
  )
}

export default HomeHero
