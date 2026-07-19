import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  product: any
  tone?: 'dark' | 'light'
}

const ProductCard: FC<ProductCardProps> = ({ product, tone = 'dark' }) => {
  const isLight = tone === 'light'
  let categoryText = ''
  if (typeof product.category === 'object' && product.category) {
    if (product.category.mainCategory) {
      categoryText = `${product.category.mainCategory} / ${product.category.name}`
    } else {
      categoryText = product.category.name
    }
  }

  return (
    <Link href={`/products/${product.slug || product._id}`} passHref>
      <Box
        component="a"
        sx={{
          display: 'block',
          textDecoration: 'none',
          p: { xs: 1.5, sm: 2, md: 2.5 },
          mb: 0,
          bgcolor: isLight ? 'common.white' : 'rgba(255, 255, 255, 0.01)',
          border: '1px solid',
          borderColor: isLight ? 'divider' : 'rgba(255,255,255,0.08)',
          position: 'relative',
          zIndex: 1,
          transition: 'all 0.3s ease',
          // Corner technical accents
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -1, left: -1, width: 8, height: 8,
            borderTop: '2px solid', borderLeft: '2px solid',
            borderColor: 'secondary.main',
            transition: 'all 0.3s ease',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -1, right: -1, width: 8, height: 8,
            borderBottom: '2px solid', borderRight: '2px solid',
            borderColor: 'secondary.main',
            transition: 'all 0.3s ease',
          },
          '&:hover': {
            borderColor: 'secondary.main',
            bgcolor: isLight ? 'rgba(14, 165, 233, 0.05)' : 'rgba(14, 165, 233, 0.05)',
            transform: 'translateY(-4px)',
            '&::before': { width: 16, height: 16 },
            '&::after': { width: 16, height: 16 },
            '& .product-img': {
              transform: 'scale(1.05)',
            },
            '& .view-more-action': {
              color: 'secondary.main',
            },
            '& .view-more-arrow': {
              transform: 'translateX(4px)',
            }
          },
        }}
      >

        <Box
          sx={{
            lineHeight: 0,
            overflow: 'hidden',
            mb: { xs: 1.5, md: 2 },
            position: 'relative',
            height: { xs: 180, sm: 160, md: 200 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: isLight ? 'background.default' : 'rgba(0,0,0,0.2)',
            border: '1px solid',
            borderColor: isLight ? 'divider' : 'rgba(255,255,255,0.05)',
          }}
        >
          {product.image || product.images?.[0] ? (
            <Box sx={{ position: 'absolute', inset: '8px' }}>
              <Image
                className="product-img"
                src={product.image || product.images[0]}
                alt={`Buy ${product.title}`}
                title={product.title}
                layout="fill"
                objectFit="contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                  transition: 'transform 0.4s ease',
                  filter: isLight ? 'none' : 'contrast(1.1) brightness(0.9)',
                }}
              />
            </Box>
          ) : (
            <Typography sx={{ color: isLight ? 'text.secondary' : 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
              No Image Available
            </Typography>
          )}
        </Box>
        <Box sx={{ mb: { xs: 0.25, md: 0 } }}>
          {/* Category tag */}
          {categoryText && (
            <Typography sx={{
              fontSize: { xs: '0.65rem', sm: '0.65rem', md: '0.7rem' }, fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: { xs: 0.5, md: 1 }, color: 'secondary.main', mb: 0.5, fontFamily: 'Inter, monospace'
            }}>
              {categoryText}
            </Typography>
          )}

          <Typography
            className="product-title"
            component="h3"
            variant="h5"
            sx={{
              fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1.1rem' },
              fontWeight: 700,
              mb: { xs: 0.5, md: 1 },
              color: isLight ? 'text.primary' : 'common.white',
              fontFamily: '"Space Grotesk", sans-serif',
              lineHeight: 1.3,
              minHeight: '2.6rem'
            }}
          >
            {product.title}
          </Typography>

          {/* View Details Action */}
          <Box 
            className="view-more-action"
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              mt: 1.5, 
              color: 'text.secondary',
              fontWeight: 600, 
              fontSize: { xs: '0.75rem', md: '0.8rem' },
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontFamily: 'Inter, monospace',
              transition: 'all 0.3s ease',
            }}
          >
            ENQUIRE NOW 
            <Box component="span" className="view-more-arrow" sx={{ transition: 'transform 0.3s ease' }}>
              →
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

export default ProductCard
