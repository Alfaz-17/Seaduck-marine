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

// Icons for Core Services
import EngineeringIcon from '@mui/icons-material/Engineering'
import SettingsIcon from '@mui/icons-material/Settings'
import PublicIcon from '@mui/icons-material/Public'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import BuildIcon from '@mui/icons-material/Build'
import BoltIcon from '@mui/icons-material/Bolt'
import HandshakeIcon from '@mui/icons-material/Handshake'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'

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

const expertiseItems = [
  {
    title: 'Marine Machinery & Engine Spares',
    description: 'Genuine and OEM spare parts supply, including main engines, auxiliary engines, air compressors, and marine pumps.',
    icon: <EngineeringIcon sx={{ fontSize: 36, color: 'secondary.main' }} />
  },
  {
    title: 'Heat Exchanger Solutions',
    description: 'High-quality plates, gaskets, complete units, and overhaul kits sourced for maximum durability.',
    icon: <CompareArrowsIcon sx={{ fontSize: 36, color: 'secondary.main' }} />
  },
  {
    title: 'Automation & Control Systems',
    description: 'Marine electrical, automation, PLC, control systems, and navigation equipment services.',
    icon: <SettingsIcon sx={{ fontSize: 36, color: 'secondary.main' }} />
  },
  {
    title: 'Onboard Technical Services',
    description: 'Professional installation, commissioning, troubleshooting, onboard repair, and emergency breakdown support.',
    icon: <BuildIcon sx={{ fontSize: 36, color: 'secondary.main' }} />
  },
  {
    title: 'Engineering & Maintenance',
    description: 'Fresh water generator services, hydraulic & pneumatic systems, preventive maintenance, and technical consultation.',
    icon: <BoltIcon sx={{ fontSize: 36, color: 'secondary.main' }} />
  },
  {
    title: 'Global Sourcing & Logistics',
    description: 'Worldwide supply network, expert export packing, and fast dispatch for emergency worldwide delivery.',
    icon: <PublicIcon sx={{ fontSize: 36, color: 'secondary.main' }} />
  }
]

const whyChooseItems = [
  {
    title: 'Experienced Marine Engineering Team',
    description: 'Decades of collective technical knowledge to resolve complex shipboard issues.',
    icon: <EngineeringIcon sx={{ fontSize: 32, color: 'secondary.main' }} />
  },
  {
    title: 'Genuine & OEM Quality Spare Parts',
    description: 'Rigorous quality assurance to ensure reliable, long-lasting performance.',
    icon: <VerifiedUserIcon sx={{ fontSize: 32, color: 'secondary.main' }} />
  },
  {
    title: 'Worldwide Supply Network',
    description: 'Global sourcing and efficient logistics to deliver parts wherever your vessel is located.',
    icon: <PublicIcon sx={{ fontSize: 32, color: 'secondary.main' }} />
  },
  {
    title: 'Active Ports Support',
    description: 'Direct onboard service capabilities at major Indian & UAE ports.',
    icon: <LocalShippingIcon sx={{ fontSize: 32, color: 'secondary.main' }} />
  },
  {
    title: 'Fast Response & 24/7 Support',
    description: 'Dedicated emergency technical support and rapid dispatch to minimize vessel downtime.',
    icon: <SupportAgentIcon sx={{ fontSize: 32, color: 'secondary.main' }} />
  },
  {
    title: 'Competitive Pricing',
    description: 'Cost-effective solutions without compromising on safety, quality, or reliability.',
    icon: <AttachMoneyIcon sx={{ fontSize: 32, color: 'secondary.main' }} />
  }
]

const AboutUs: NextPageWithLayout<AboutUsProps> = ({ brands, teamMembers }) => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const team = teamMembers?.length > 0 ? teamMembers : defaultTeam;
  return (
    <>
      <SEO 
        title="About Us"
        description="Seaduck Marine Service (S.D.M.S.) is a trusted marine engineering partner specializing in global spare parts supply, service, repair, and technical solutions."
        canonicalUrl="/about"
      />

      <PageHero 
        title="About Us" 
        subtitle="Your Trusted Marine Engineering & Ship Spare Parts Partner for Global Maritime Solutions."
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
                Welcome to Seaduck Marine Service
                <Box sx={{ position: 'absolute', bottom: '0px', left: '50%', transform: 'translateX(-50%) rotate(2deg)', '& img': { width: { xs: 70, md: 90 }, opacity: 0.9 }, zIndex: -1 }}>
                  <img src="/images/headline-curve.svg" alt="Headline curve" />
                </Box>
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                Seaduck Marine Service (S.D.M.S.) is a trusted marine engineering company specializing in the global supply, service, repair, maintenance, and technical solutions for commercial ships and offshore vessels. Headquartered in Bhavnagar, Gujarat, we are committed to delivering reliable marine support with high-quality products, experienced technical expertise, and swift response times to customers worldwide.
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.8 }}>
                With years of industry experience and a strong network of trusted marine partners, we provide fast, dependable, and cost-effective solutions to ship owners, ship management companies, technical superintendents, and marine purchasing departments across the globe. Our strategic proximity to the Alang ship-recycling hub allows us to source genuine and OEM marine spare parts efficiently, minimizing vessel downtime and reducing operational costs.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* SECTION 2: WHY CHOOSE US */}
      <Box id="why-choose" sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#0B1018' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 2 }}>
              <Box sx={{ width: 24, height: 2, bgcolor: 'secondary.main' }} />
              <Typography variant="caption" sx={{ color: 'secondary.main', fontFamily: 'Inter, monospace', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                Our Advantages
              </Typography>
              <Box sx={{ width: 24, height: 2, bgcolor: 'secondary.main' }} />
            </Box>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: 'common.white', mb: 3 }}>
              Why Choose Seaduck Marine Service?
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 2, md: 4 }}>
            {whyChooseItems.map((item, index) => (
              <Grid item xs={6} sm={6} key={index}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'stretch' },
                  gap: { xs: 2, sm: 3 }, 
                  p: { xs: 2.25, md: 3.5 }, 
                  backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                  borderRadius: 2, 
                  border: '1px solid',
                  borderColor: 'rgba(255, 255, 255, 0.07)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
                    borderColor: 'secondary.main',
                    backgroundColor: 'rgba(14, 165, 233, 0.04)',
                    transform: 'translateY(-2px)'
                  }
                }}>
                  <Box sx={{ flexShrink: 0 }}>
                    <Box sx={{ 
                      width: { xs: 42, md: 48 }, 
                      height: { xs: 42, md: 48 }, 
                      borderRadius: '50%', 
                      backgroundColor: 'rgba(14, 165, 233, 0.15)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      {React.cloneElement(item.icon, { sx: { fontSize: { xs: 22, md: 32 } } })}
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontSize: { xs: '0.92rem', md: '1.15rem' }, fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: 'common.white', mb: { xs: 1, md: 1 }, lineHeight: 1.3 }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.95rem' }, lineHeight: 1.5 }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* SECTION 3: OUR EXPERTISE & SERVICES */}
      <Box id="expertise" sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 2 }}>
              <Box sx={{ width: 24, height: 2, bgcolor: 'secondary.main' }} />
              <Typography variant="caption" sx={{ color: 'secondary.main', fontFamily: 'Inter, monospace', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                Core Capabilities
              </Typography>
              <Box sx={{ width: 24, height: 2, bgcolor: 'secondary.main' }} />
            </Box>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: 'text.primary', mb: 3 }}>
              Our Expertise & Services
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: '800px', mx: 'auto', lineHeight: 1.8 }}>
              We offer comprehensive marine support, combining technical expertise with high-quality supplies to keep your vessels operating safely and efficiently.
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 2, md: 4 }}>
            {expertiseItems.map((item, index) => (
              <Grid item xs={6} sm={6} md={4} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
                    borderColor: 'secondary.main',
                    '& .icon-wrapper': {
                      backgroundColor: 'secondary.main',
                      color: 'common.white',
                      '& svg': {
                        color: 'common.white',
                        transform: 'scale(1.1)'
                      }
                    }
                  }
                }}>
                  <CardContent sx={{ p: { xs: 2.25, md: 4 }, flexGrow: 1 }}>
                    <Box 
                      className="icon-wrapper"
                      sx={{ 
                        width: { xs: 46, md: 64 }, 
                        height: { xs: 46, md: 64 }, 
                        borderRadius: '12px', 
                        backgroundColor: 'rgba(14, 165, 233, 0.1)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        mb: { xs: 2, md: 3 },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {React.cloneElement(item.icon, { sx: { fontSize: { xs: 24, md: 36 } } })}
                    </Box>
                    <Typography variant="h5" sx={{ fontSize: { xs: '0.92rem', md: '1.25rem' }, fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, mb: { xs: 1, md: 2 }, color: 'primary.main', lineHeight: 1.3 }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.95rem' }, lineHeight: 1.5 }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* SECTION 4: OUR STORY & MISSION & VISION */}
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
                Founded in 2009 by Mr. Umar Saiyad & Mr. Hanif Saiyad, Sea Duck Marine Service started as a dedicated marine equipment and radar supplier. Driven by our core values of honesty, hard work, and technical excellence, we have grown into a leading marine engineering and ship spare parts partner. Today, we offer complete onboard repair services, machinery maintenance, and customized engineering solutions for vessels of all types.
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
                For over 15 years, we have built a strong reputation for providing genuine and OEM marine spares, marine automation systems, and dependable maintenance support. Our experienced marine engineering team understands the operational challenges of the maritime industry, working closely with clients to improve vessel performance and reduce operational costs.
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}>
                <Box sx={{ borderLeft: '4px solid #0EA5E9', pl: 3, py: 0.5 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: 'secondary.main', fontSize: '1.25rem' }}>Our Mission</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.98rem', lineHeight: 1.6 }}>
                    To deliver high-quality marine products and professional engineering services that ensure safe, efficient, and uninterrupted vessel operations while building long-term relationships through trust, integrity, and customer satisfaction.
                  </Typography>
                </Box>
                
                <Box sx={{ borderLeft: '4px solid #0EA5E9', pl: 3, py: 0.5 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: 'secondary.main', fontSize: '1.25rem' }}>Our Vision</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.98rem', lineHeight: 1.6 }}>
                    To become a globally recognized marine engineering and ship spare parts partner, known for technical excellence, dependable service, and innovative maritime solutions.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* SECTION 5: QUALITY COMMITMENT & PARTNERS */}
      <Box id="quality-partners" sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                height: '100%', 
                backgroundColor: 'primary.main', 
                color: 'primary.contrastText',
                borderRadius: 3, 
                p: { xs: 2, md: 4 },
                position: 'relative',
                overflow: 'hidden'
              }}>
                <Box sx={{ 
                  position: 'absolute', 
                  top: -50, 
                  right: -50, 
                  width: 200, 
                  height: 200, 
                  borderRadius: '50%', 
                  background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(0,0,0,0) 70%)' 
                }} />
                
                <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography variant="h4" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, mb: 3 }}>
                    Commitment to Quality
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: 1.8, mb: 4 }}>
                    Quality, safety, and reliability are at the core of everything we do. Every product we supply and service we deliver is executed with strict attention to international marine industry standards, ensuring our customers receive dependable solutions they can trust.
                  </Typography>
                  <Box sx={{ borderLeft: '4px solid', borderColor: 'secondary.main', pl: 3, py: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'secondary.main', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: 1 }}>
                      Our Promise
                    </Typography>
                    <Typography sx={{ color: 'common.white', fontSize: '1.2rem', fontWeight: 600, fontStyle: 'italic' }}>
                      "Supplying Quality. Delivering Reliability. Engineering Marine Solutions."
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ 
                height: '100%', 
                borderRadius: 3, 
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                p: { xs: 2, md: 4 }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                    <HandshakeIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
                    <Typography variant="h4" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: 'primary.main' }}>
                      Our Marine Partners
                    </Typography>
                  </Box>
                  <Typography sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.8, mb: 3 }}>
                    Seaduck Marine Service works closely with a global network of trusted marine manufacturers, authorized suppliers, ship repair yards, logistics partners, and technical experts.
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.8 }}>
                    Together, we provide efficient procurement, reliable engineering support, and comprehensive marine solutions that keep your fleet moving with confidence across the global maritime industry.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* SECTION 6: BRANDS */}
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
