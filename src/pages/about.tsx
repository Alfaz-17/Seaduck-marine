import React from 'react'
import Head from 'next/head'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import StarIcon from '@mui/icons-material/Star'
import Image from 'next/image'
import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import { X as CloseIcon } from 'lucide-react'
import { GetStaticProps } from 'next'
import { NextPageWithLayout } from '@/interfaces/layout'
import { MainLayout } from '@/components/layout'
import { SEO } from '@/components/seo/SEO'
import dynamic from 'next/dynamic'
const PageHero = dynamic(() => import('@/components/page-hero'))
import { CtaBand, WhyChoose, BrandsSection } from '@/components/home'
import { connectToDatabase, disconnectFromDatabase } from '@/lib/db'
import { Brand } from '@/lib/models'

import { client, urlFor } from '@/lib/sanity'

interface AboutUsProps {
  brands: any[]
  teamMembers: any[]
}

const defaultTeam = [
  {
    name: 'Mr. Umar Saiyad',
    role: 'Proprietor & Technical Director',
    description: 'Directing technical support, service operations, and customer relations at Sea Duck Marine Service.',
    phone: '+91 84013 03078',
    initials: 'US',
    isFounder: true,
  },
  {
    name: 'Mr. Hanif Saiyad',
    role: 'Partner & Sales Director',
    description: 'Leading global sales, port coordination, and business development for marine spares and equipment.',
    phone: '+91 95747 97483',
    initials: 'HS',
    isFounder: true,
  },
  {
    name: 'Fejal Gundigara',
    role: 'Operations Manager',
    description: 'Overseeing day-to-day operations, ensuring seamless global dispatch and logistics efficiency.',
    phone: '+91 84013 03078',
    initials: 'FG',
    isFounder: false,
  },
  {
    name: 'Javed Deraiya',
    role: 'Service Engineer Manager',
    description: 'Managing technical teams, installations, and critical on-board equipment commissioning.',
    phone: '+91 8306161422',
    initials: 'JD',
    isFounder: false,
  },
  {
    name: 'Sahil Sarmali',
    role: 'Finance & Account Manager',
    description: 'Directing financial planning, accounting compliance, and corporate financial health.',
    phone: '+91 95747 97483',
    initials: 'SS',
    isFounder: false,
  }
]

const AboutUs: NextPageWithLayout<AboutUsProps> = ({ brands, teamMembers }) => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const team = teamMembers?.length > 0 ? teamMembers : defaultTeam;
  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about Sea Duck Marine Service, a trusted supplier of marine navigation and automation equipment from the Alang Shipbreaking Yard since 2009."
        canonicalUrl="/about"
      />

      <PageHero 
        title="About Us" 
        subtitle="Serving the maritime industry with precision and integrity since 2009."
        image="/images/about/about_hero.png"
      />

      {/* SECTION 1: WHO WE ARE */}
      <Box id="who-we-are" sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', height: { xs: 300, md: 450 }, cursor: 'pointer', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}
                onClick={() => setLightboxImage('/images/about/about_office.png')}
              >
                <Image src="/images/about/about_office.png" alt="Sea Duck Marine Service Office Outside" layout="fill" objectFit="cover" />
                {/* Brand color overlay */}
                <Box sx={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(to top right, rgba(6,27,69,0.6) 0%, rgba(10,61,145,0.2) 100%)',
                  mixBlendMode: 'multiply',
                  pointerEvents: 'none'
                }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>

              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, mb: 3, color: 'text.primary', position: 'relative', display: 'inline-block' }}>
                We Are Sea Duck Marine Service
                <Box sx={{ position: 'absolute', bottom: '0px', left: '50%', transform: 'translateX(-50%) rotate(2deg)', '& img': { width: { xs: 70, md: 90 }, opacity: 0.9 }, zIndex: -1 }}>
                  <img src="/images/headline-curve.svg" alt="Headline curve" />
                </Box>
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                Located in Bhavnagar, Gujarat, Sea Duck Marine Service is your go-to supplier for essential marine equipment. From navigation tools like marine radars to automation systems and ship spare parts, we provide everything you need to keep your vessels running smoothly.
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.8 }}>
                Our office is conveniently located near the famous Alang ship-breaking yard. This strategic location allows us to quickly source high-quality, genuine parts and deliver them fast to ship owners and repair yards across the region.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* SECTION 2: OUR STORY & MISSION */}
      <Box id="our-story" sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#0B1018', color: 'common.white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center" direction="row-reverse">
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', height: { xs: 300, md: 450 }, cursor: 'pointer', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}
                onClick={() => setLightboxImage('/images/about/about_workshop.png')}
              >
                <Image src="/images/about/about_workshop.png" alt="Our Story" layout="fill" objectFit="cover" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>

              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, mb: 3 }}>
                Our Story
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                Founded in 2009 by Mr. Umar Saiyad & Mr. Hanif Saiyad, Sea Duck Marine Service started as a small supplier focusing on marine radars. Thanks to our commitment to honesty and hard work, we quickly grew into a trusted provider of a wide range of marine equipment and lubricating oils.
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
                For over 15 years, we have built strong relationships with our customers by ensuring they always get the right parts at the right time. Our deep knowledge of the marine industry means we understand exactly what you need.
              </Typography>
              
              <Box sx={{ borderLeft: '4px solid #0A3D91', pl: 3, py: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Our Mission</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.6 }}>
                  To provide our customers with genuine, high-quality marine equipment at fair prices, delivered on time with friendly and reliable service.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Shared component removed to avoid duplicating the home page summary */}

      {/* SECTION 5: BRANDS */}
      <Box sx={{ py: 8 }}>
        <BrandsSection brands={brands} />
      </Box>

      <CtaBand tone="dark" />

      {/* Image Lightbox */}
      <Dialog 
        open={!!lightboxImage} 
        onClose={() => setLightboxImage(null)}
        maxWidth="xl"
        fullWidth
        PaperProps={{ sx: { bgcolor: 'transparent', boxShadow: 'none', m: 0, p: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' } }}
      >
        <IconButton 
          onClick={() => setLightboxImage(null)} 
          sx={{ 
            position: 'fixed', 
            top: { xs: 16, md: 32 }, 
            right: { xs: 16, md: 32 }, 
            color: 'white', 
            bgcolor: 'rgba(0,0,0,0.7)', 
            border: '2px solid rgba(255,255,255,0.3)',
            width: 56,
            height: 56,
            zIndex: 9999,
            transition: 'all 0.2s',
            '&:hover': { bgcolor: 'primary.main', borderColor: 'white', transform: 'scale(1.1)' } 
          }}
          aria-label="Close"
        >
          <CloseIcon size={32} />
        </IconButton>
        {lightboxImage && (
          <Box sx={{ position: 'relative', width: '90vw', height: '90vh' }}>
            <Image src={lightboxImage} alt="Enlarged view" layout="fill" objectFit="contain" />
          </Box>
        )}
      </Dialog>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    await connectToDatabase()
    const brands = await Brand.find({}).lean()
    
    return {
      props: {
        brands: JSON.parse(JSON.stringify(brands)),
        teamMembers: [],
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      props: {
        brands: [],
        teamMembers: [],
      },
      revalidate: 60,
    }
  } finally {
    await disconnectFromDatabase()
  }
}

AboutUs.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>

export default AboutUs
