import React, { FC } from 'react'
import Box from '@mui/material/Box'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import type { Navigation as NavType } from '@/interfaces/navigation'
import { navigations } from './navigation.data'

interface NavigationProps {
  isScrolled?: boolean
  items?: NavType[]
  onNavigate?: () => void
}

const Navigation: FC<NavigationProps> = ({ isScrolled, items, onNavigate }) => {
  const router = useRouter()
  const activeItems = items || navigations

  const linkStyles = (isActive: boolean) => ({
    position: 'relative',
    color: isScrolled 
      ? (isActive ? 'primary.main' : 'text.secondary')
      : (isActive ? 'common.white' : 'rgba(255, 255, 255, 0.72)'),
    cursor: 'pointer',
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: { xs: '100%', md: 'auto' },
    px: { xs: 2, md: 3 },
    py: { xs: 1, md: 1 },
    mb: { xs: 0.25, md: 0 },
    fontSize: { xs: '0.9rem', md: '0.95rem' },
    fontFamily: '"Space Grotesk", sans-serif',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    textDecoration: 'none',
    transition: 'color 0.3s ease-in-out',
    '&::before': {
      content: '"["',
      position: 'absolute',
      left: { xs: 8, md: 12 },
      color: 'secondary.main',
      opacity: isActive ? 1 : 0,
      transform: isActive ? 'translateX(0)' : 'translateX(10px)',
      transition: 'all 0.3s ease',
      fontFamily: 'Inter, monospace',
    },
    '&::after': {
      content: '"]"',
      position: 'absolute',
      right: { xs: 8, md: 12 },
      color: 'secondary.main',
      opacity: isActive ? 1 : 0,
      transform: isActive ? 'translateX(0)' : 'translateX(-10px)',
      transition: 'all 0.3s ease',
      fontFamily: 'Inter, monospace',
    },
    '&:hover': {
      color: isScrolled ? 'primary.main' : 'common.white',
      '&::before, &::after': {
        opacity: 1,
        transform: 'translateX(0)',
      },
    },
    '&.current': {
      color: isScrolled ? 'primary.main' : 'common.white',
    },
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', width: { xs: '100%', md: 'auto' }, maxWidth: { xs: 360, md: 'none' } }}>
      {activeItems.map(({ path: destination, label, children }) => {
        const isActive = router.pathname === destination

        return (
          <Box key={destination} sx={{ position: 'relative', width: { xs: '100%', md: 'auto' }, '&:hover .dropdown-menu': { display: 'block', opacity: 1, transform: 'translateY(0)' } }}>
            <NextLink href={destination} passHref>
              <Box
                component="a"
                sx={linkStyles(isActive)}
                onClick={onNavigate}
              >
                {label}
                {children && <Box component="span" sx={{ ml: 0.5, fontSize: '0.6rem', opacity: 0.7 }}>▼</Box>}
              </Box>
            </NextLink>

            {children && (
              <Box
                className="dropdown-menu"
                sx={{
                  display: { xs: 'block', md: 'none' },
                  opacity: { xs: 1, md: 0 },
                  transform: { xs: 'none', md: 'translateY(10px)' },
                  position: { xs: 'static', md: 'absolute' },
                  top: '100%',
                  left: { xs: '50%', md: 0 },
                  transformOrigin: 'top',
                  minWidth: { md: 220 },
                  width: { xs: '100%', md: 'auto' },
                  bgcolor: { xs: 'rgba(2, 132, 199, 0.05)', md: 'background.paper' },
                  boxShadow: { xs: 'none', md: '0 4px 20px rgba(0,0,0,0.1)' },
                  borderRadius: 0,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderTop: '2px solid',
                  borderTopColor: 'secondary.main',
                  py: { xs: 0.5, md: 1 },
                  mb: { xs: 0.75, md: 0 },
                  zIndex: 999,
                  transition: 'all 0.3s ease',
                }}
              >
                {children.map((child, idx) => (
                  <NextLink key={idx} href={child.path} passHref>
                    <Box
                      component="a"
                      onClick={onNavigate}
                      sx={{
                        display: 'block',
                        px: 3,
                        py: { xs: 1, md: 1.5 },
                        color: 'text.secondary',
                        textDecoration: 'none',
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: { xs: '0.8rem', md: '0.85rem' },
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        transition: 'all 0.2s',
                        borderLeft: '2px solid transparent',
                        '&:hover': {
                          bgcolor: 'rgba(14, 165, 233, 0.05)',
                          color: 'primary.main',
                          borderLeftColor: 'secondary.main',
                          pl: 3.5,
                        }
                      }}
                    >
                      {child.label}
                    </Box>
                  </NextLink>
                ))}
              </Box>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

export default Navigation
