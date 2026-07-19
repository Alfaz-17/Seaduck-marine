import React from 'react'
import { GetStaticProps } from 'next'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import dynamic from 'next/dynamic'
import { alpha } from '@mui/material/styles'

import { NextPageWithLayout } from '@/interfaces/layout'
import { MainLayout } from '@/components/layout'
import { SEO } from '@/components/seo/SEO'
import ProductCard from '@/components/product-card'
import { connectToDatabase, disconnectFromDatabase } from '@/lib/db'
import { Product } from '@/lib/models'
import { CtaBand } from '@/components/home'

const PageHero = dynamic(() => import('@/components/page-hero'))

interface NewArrivalsProps {
  products: any[]
}

const NewArrivals: NextPageWithLayout<NewArrivalsProps> = ({ products }) => {
  return (
    <>
      <SEO 
        title="New Arrivals"
        description="Discover the latest marine electronics, navigation aids, and communication systems acquired by Sea Duck Marine Service."
        canonicalUrl="/new-arrivals"
      />

      <PageHero 
        title="New Arrivals" 
        subtitle="Explore the latest additions to our inventory of reconditioned marine equipment."
        image="/images/new_arrivals_hero_technical.png"
        compact
      />

      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default', position: 'relative' }}>
        {/* Subtle background glow */}
        <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100vw', height: '500px', background: (theme) => `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.05)} 0%, rgba(245,247,250,0) 70%)`, zIndex: 0, pointerEvents: 'none' }} />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6 }}>
            <Box>
              <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', mb: 1.5, display: 'block' }}>
                Latest Inventory
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 800, color: 'text.primary' }}>
                Recently Added Equipment
              </Typography>
            </Box>
            <Typography sx={{ color: 'text.secondary', fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
              Showing {products.length} latest items
            </Typography>
          </Box>

          {products.length > 0 ? (
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <ProductCard product={product} tone="light" />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ py: 10, textAlign: 'center', bgcolor: 'background.paper', border: '1px dashed', borderColor: 'divider', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                No recent arrivals found. Please check back later.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>

      <CtaBand tone="dark" />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    await connectToDatabase()
    
    // Fetch the 15 most recently created products
    const products = await Product.find({})
      .populate('category', 'name')
      .populate('brand', 'name')
      .sort({ createdAt: -1 })
      .limit(15)
      .lean()
      
    const serializedProducts = JSON.parse(JSON.stringify(products))

    return {
      props: {
        products: serializedProducts || [],
      },
      revalidate: 60, // ISR: revalidate every 60 seconds
    }
  } catch (error) {
    console.error("Error fetching new arrivals:", error)
    return {
      props: {
        products: [],
      },
      revalidate: 60,
    }
  } finally {
    await disconnectFromDatabase()
  }
}

NewArrivals.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>

export default NewArrivals
