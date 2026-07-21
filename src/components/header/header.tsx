import React, { FC, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Logo } from '@/components/logo'
import { Navigation } from '@/components/navigation'
import { useTheme } from '@mui/material/styles'
import Menu from '@mui/icons-material/Menu'
import Close from '@mui/icons-material/Close'
import WhatsApp from '@mui/icons-material/WhatsApp'
import LinkedIn from '@mui/icons-material/LinkedIn'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

const Header: FC = () => {
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false)
  const [scrollState, setScrollState] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const searchContainerRef = useRef<HTMLDivElement>(null)

  const { breakpoints } = useTheme()
  const matchMobileView = useMediaQuery(breakpoints.down('md'))
  const router = useRouter()
  const isHomePage = router.pathname === '/'
  const isScrolled = isHomePage ? scrollState : true

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fetch dynamic categories for products dropdown
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCategories(data)
      })
      .catch(err => console.error("Error fetching categories:", err))
  }, [])

  // Fetch search results automatically when typing
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }
    const timer = setTimeout(() => {
      setIsSearching(true)
      fetch(`/api/products?search=${encodeURIComponent(searchQuery.trim())}&limit=5`)
        .then(res => res.json())
        .then(data => {
          setSearchResults(data || [])
          setIsSearching(false)
        })
        .catch(() => setIsSearching(false))
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    const handleScroll = () => {
      setScrollState(window.scrollY > 20)
      
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const links = [
    { label: 'Home', path: '/' },
    { 
      label: 'About Us', 
      path: '/about',
    },
    { 
      label: 'Products', 
      path: '/products',
      children: categories.length > 0 
        ? categories.map(cat => ({ label: cat.name, path: `/products?category=${cat._id}` }))
        : [{ label: 'All Products', path: '/products' }]
    },
    { label: 'New Arrivals', path: '/new-arrivals' },
    { label: 'Contact Us', path: '/contact' },
  ]

  return (
    <Box sx={{ 
      position: 'fixed',
      top: { xs: isScrolled ? 8 : 0, md: isScrolled ? 20 : 0 },
      left: 0,
      right: 0,
      zIndex: 999,
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      px: { xs: 1, sm: 1.5, md: 4 },
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Box sx={{
        width: '100%',
        maxWidth: 1400,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        border: '2px solid',
        borderColor: isScrolled ? 'primary.dark' : 'transparent',
        borderRadius: isScrolled ? { xs: 2, md: 50 } : 0,
        boxShadow: isScrolled ? '0 12px 40px rgba(30, 95, 166, 0.15)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        py: { xs: 0.75, md: isScrolled ? 1.5 : 2 },
        px: { xs: 1, sm: 1.5, md: 4 },
      }}>
        {/* Desktop Navigation */}
        {!matchMobileView ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logo isScrolled={isScrolled} />
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Navigation isScrolled={isScrolled} items={links} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { md: 1.5, lg: 2 } }}>
              
              {/* Compact Search Bar with Fast Typeahead */}
              <Box 
                ref={searchContainerRef}
                sx={{ 
                  position: 'relative',
                  display: 'flex', 
                  alignItems: 'center', 
                  backgroundColor: isScrolled ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.1)', 
                  borderRadius: 50, 
                  px: 1.5, 
                  py: 0.5, 
                  transition: 'all 0.3s ease',
                  border: '1px solid',
                  borderColor: isScrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.2)',
                  '&:focus-within': {
                    backgroundColor: isScrolled ? 'common.white' : 'rgba(255,255,255,0.2)',
                    borderColor: 'primary.main',
                    boxShadow: isScrolled ? '0 0 0 2px rgba(30, 95, 166, 0.1)' : '0 0 0 2px rgba(255,255,255,0.3)'
                  }
                }}
              >
                <SearchIcon sx={{ color: isScrolled ? 'text.secondary' : 'white', fontSize: 18 }} />
                <InputBase 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowResults(true)
                  }}
                  onFocus={() => { if (searchQuery.trim()) setShowResults(true) }}
                  onKeyDown={handleSearch}
                  sx={{ 
                    ml: 1, 
                    width: { md: 80, lg: 100 }, 
                    transition: 'width 0.3s ease', 
                    '&:focus-within': { width: { md: 160, lg: 220 } }, 
                    color: isScrolled ? 'text.primary' : 'white', 
                    fontSize: '0.85rem',
                    '& input::placeholder': {
                      color: isScrolled ? 'text.secondary' : 'rgba(255,255,255,0.7)',
                      opacity: 1
                    }
                  }} 
                />

                {/* Search Results Dropdown */}
                {showResults && searchQuery.trim() && (
                  <Paper 
                    elevation={6}
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      mt: 1.5,
                      width: { xs: 240, md: 280, lg: 320 },
                      maxHeight: 380,
                      overflowY: 'auto',
                      zIndex: 1000,
                      borderRadius: 2,
                      backgroundColor: 'background.paper',
                      overflow: 'hidden'
                    }}
                  >
                    {isSearching ? (
                      <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">Searching catalog...</Typography>
                      </Box>
                    ) : searchResults.length > 0 ? (
                      <List disablePadding>
                        {searchResults.map((product) => (
                          <ListItem 
                            key={product._id} 
                            onClick={() => {
                              setShowResults(false)
                              setSearchQuery('')
                              router.push(`/products/${product._id}`)
                            }}
                            sx={{ 
                              borderBottom: '1px solid', 
                              borderColor: 'divider', 
                              '&:last-child': { borderBottom: 'none' },
                              cursor: 'pointer',
                              transition: 'background-color 0.2s',
                              '&:hover': { backgroundColor: 'action.hover' }
                            }}
                          >
                            {product.images && product.images.length > 0 ? (
                              <Box component="img" src={product.images[0]} sx={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 1, mr: 1.5 }} />
                            ) : (
                              <Box sx={{ width: 44, height: 44, backgroundColor: 'grey.100', borderRadius: 1, mr: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <SearchIcon color="disabled" fontSize="small" />
                              </Box>
                            )}
                            <ListItemText 
                              primary={product.name} 
                              secondary={product.category?.name || 'Equipment'}
                              primaryTypographyProps={{ variant: 'body2', fontWeight: 600, noWrap: true }}
                              secondaryTypographyProps={{ variant: 'caption', noWrap: true }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">No products found</Typography>
                      </Box>
                    )}
                  </Paper>
                )}
              </Box>

              {/* Social Icons */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton 
                  component="a" 
                  href="https://www.ebay.com/usr/Sea Duck_marine" 
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{ '&:hover': { opacity: 0.8 } }}
                >
                  <img src="/images/ebay.png" alt="eBay" style={{ height: '22px', width: '22px', objectFit: 'contain', borderRadius: '4px' }} />
                </IconButton>
                <IconButton 
                  component="a" 
                  href="https://www.linkedin.com/in/Sea Duck-marine-25120b335/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{ 
                    color: '#0A66C2',
                    backgroundColor: isScrolled ? 'rgba(10, 102, 194, 0.1)' : 'rgba(255,255,255,0.1)',
                    '&:hover': { opacity: 0.8, backgroundColor: isScrolled ? 'rgba(10, 102, 194, 0.2)' : 'rgba(255,255,255,0.2)' }
                  }}
                >
                  <LinkedIn fontSize="small" />
                </IconButton>
                <IconButton 
                  component="a" 
                  href="https://wa.me/918401303078" 
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{ 
                    color: '#25D366',
                    backgroundColor: isScrolled ? 'rgba(37, 211, 102, 0.1)' : 'rgba(255,255,255,0.1)',
                    '&:hover': { opacity: 0.8, backgroundColor: isScrolled ? 'rgba(37, 211, 102, 0.2)' : 'rgba(255,255,255,0.2)' }
                  }}
                >
                  <WhatsApp fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ) : (
          /* Mobile Navigation (Centered Logo, Left Hamburguer trigger) */
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', minHeight: { xs: 66, sm: 76 } }}>
            <IconButton 
              onClick={() => setVisibleMenu(!visibleMenu)} 
              size="small"
              sx={{ color: isScrolled ? 'text.primary' : 'common.white', width: 40, height: 40 }}
            >
              <Menu />
            </IconButton>
            <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              <Logo isScrolled={isScrolled} />
            </Box>
            <Box sx={{ width: 40 }} /> {/* Spacing spacer to balance flex box */}

            {/* Mobile Navigation Drawer with Overlay */}
            {visibleMenu && (
              <>
                {/* Backdrop Overlay */}
                <Box
                  onClick={() => setVisibleMenu(false)}
                  sx={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(2, 6, 23, 0.4)',
                    backdropFilter: 'blur(6px)',
                    zIndex: 9999,
                    animation: 'fadeIn 0.3s ease',
                    '@keyframes fadeIn': {
                      from: { opacity: 0 },
                      to: { opacity: 1 }
                    }
                  }}
                />
                
                {/* Drawer Container */}
                <Box
                  sx={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '85%',
                    maxWidth: 340,
                    backgroundColor: 'background.paper',
                    zIndex: 10000,
                    boxShadow: '-8px 0 32px rgba(2, 6, 23, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    '@keyframes slideIn': {
                      from: { transform: 'translateX(100%)' },
                      to: { transform: 'translateX(0)' }
                    }
                  }}
                >
                  {/* Drawer Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Logo isScrolled={true} />
                    <IconButton 
                      onClick={() => setVisibleMenu(false)}
                      sx={{ 
                        border: '1px solid', 
                        borderColor: 'divider', 
                        borderRadius: 1, 
                        p: 0.75,
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.03)' }
                      }}
                    >
                      <Close size={20} />
                    </IconButton>
                  </Box>

                  {/* Navigation Links Area */}
                  <Box sx={{ flex: 1, overflowY: 'auto', py: 3, px: 2 }}>
                    <Navigation isScrolled={true} items={links} onNavigate={() => setVisibleMenu(false)} />
                  </Box>

                  {/* Drawer Footer (Contacts & Socials) */}
                  <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'rgba(0,0,0,0.01)' }}>
                    <Typography sx={{ fontFamily: 'Inter, monospace', fontSize: '0.68rem', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1, mb: 1.5 }}>
                      Connect With Us
                    </Typography>
                    
                    {/* Social Buttons */}
                    <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
                      <IconButton 
                        component="a" 
                        href="https://www.ebay.com/usr/Sea Duck_marine" 
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5, p: 0.75, '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
                      >
                        <img src="/images/ebay.png" alt="eBay" style={{ height: '20px', width: '20px', objectFit: 'contain' }} />
                      </IconButton>
                      <IconButton 
                        component="a" 
                        href="https://www.linkedin.com/in/Sea Duck-marine-25120b335/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5, p: 0.75, color: '#0A66C2', '&:hover': { bgcolor: 'rgba(10, 102, 194, 0.05)' } }}
                      >
                        <LinkedIn fontSize="small" />
                      </IconButton>
                      <IconButton 
                        component="a" 
                        href="https://wa.me/918401303078" 
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5, p: 0.75, color: '#25D366', '&:hover': { bgcolor: 'rgba(37, 211, 102, 0.05)' } }}
                      >
                        <WhatsApp fontSize="small" />
                      </IconButton>
                    </Box>

                    {/* Quick Contacts */}
                    <Typography variant="caption" display="block" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>
                      Email: info@seaduckmarine.com
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      Phone: +91 84013 03078
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Header
