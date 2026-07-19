import React from 'react'
import dynamic from 'next/dynamic'
import { GetStaticProps } from 'next'
import { NextPageWithLayout } from '@/interfaces/layout'
import { MainLayout } from '@/components/layout'
import { connectToDatabase, disconnectFromDatabase } from '@/lib/db'
import { Product, Brand } from '@/lib/models'
import { client } from '@/lib/sanity'

import { SEO } from '@/components/seo/SEO'

const DynamicHomeHero = dynamic(() => import('@/components/home/hero'))
const DynamicMainCategories = dynamic(() => import('@/components/home/main-categories'))
const DynamicStatsBand = dynamic(() => import('@/components/home/stats'))
const DynamicAboutSection = dynamic(() => import('@/components/home/about-section'))
const DynamicBrandsSection = dynamic(() => import('@/components/home/brands-section'))
const DynamicKeyFacts = dynamic(() => import('@/components/home/key-facts'))
const DynamicFeaturedProducts = dynamic(() => import('@/components/home/featured-products'))
const DynamicCustomerReviews = dynamic(() => import('@/components/home/customer-reviews'))
const DynamicWhyChoose = dynamic(() => import('@/components/home/why-choose'))
const DynamicCtaBand = dynamic(() => import('@/components/home/cta-band'))

interface HomeProps {
  featuredProducts: any[]
  brands: any[]
  homePageData: any
}

const Home: NextPageWithLayout<HomeProps> = ({ featuredProducts, brands, homePageData }) => {
  return (
    <>
      <SEO 
        title="Sea Duck Marine Service – Marine Radar & Equipment Supplier, Bhavnagar" 
        description="Trusted supplier of marine radar, automation, lubricants & ship spares in Bhavnagar, Gujarat since 2009. Get a quote today."
        canonicalUrl="/"
      />
      <DynamicHomeHero data={homePageData} />
      <DynamicMainCategories />
      <DynamicFeaturedProducts products={featuredProducts} />
      <DynamicWhyChoose />
      <DynamicStatsBand data={homePageData} />
      <DynamicBrandsSection brands={brands} />
      <DynamicCtaBand />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    await connectToDatabase()
    
    const [products, brands, homePageData] = await Promise.all([
      Product.find({ featured: true }).populate('category').limit(10).lean(),
      Brand.find({}).lean(),
      Promise.resolve(null)
    ])
    
    // Properly serialize Mongoose documents for Next.js props
    const serializedProducts = JSON.parse(JSON.stringify(products))
    const serializedBrands = JSON.parse(JSON.stringify(brands))

    return {
      props: {
        featuredProducts: serializedProducts,
        brands: serializedBrands,
        homePageData: homePageData || null,
      },
      revalidate: 60, // ISR: revalidate every 60 seconds
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error)
    return {
      props: {
        featuredProducts: [],
        brands: [],
        homePageData: null,
      },
      revalidate: 60,
    }
  } finally {
    await disconnectFromDatabase()
  }
}

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default Home
