import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

interface WhyChooseProps {
  tone?: 'light' | 'dark'
}

const WhyChoose: FC<WhyChooseProps> = ({ tone = 'dark' }) => {
  const isLight = tone === 'light'
  
  return (
    <Box id="why-choose-us" sx={{ minHeight: { xs: 'auto', md: 560 }, bgcolor: isLight ? 'background.default' : 'primary.dark', display: 'flex' }}>
      <Grid container>
        {/* Content Side */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: isLight ? 'background.paper' : 'transparent',
              padding: { xs: '56px 20px', sm: '64px 32px', md: '80px 64px' },
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderRight: { md: '1px solid' },
              borderColor: isLight ? 'divider' : 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box sx={{ width: 24, height: 2, bgcolor: 'secondary.main' }} />
              <Typography variant="caption" sx={{ color: 'secondary.main', fontFamily: 'Inter, monospace', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                ABOUT US
              </Typography>
            </Box>

            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontFamily: '"Space Grotesk", sans-serif', color: isLight ? 'text.primary' : 'common.white', fontWeight: 700, lineHeight: 1.18, mb: 2 }}>
              Who We Are & <br />
              <Typography component="span" sx={{ color: 'secondary.main', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', position: 'relative', display: 'inline-block', pb: 1, borderBottom: '4px solid', borderBottomColor: 'secondary.main' }}>
                What We Do
              </Typography>
            </Typography>

            <Typography sx={{ color: isLight ? 'text.secondary' : 'rgba(255, 255, 255, 0.7)', fontFamily: 'Inter, sans-serif', lineHeight: 1.7, mb: 5 }}>
              Since 2009, we have been supplying reliable marine equipment and spare parts to ships and repair yards. We make it easy for you to get the parts you need quickly and at a fair price.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Item 1 */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Typography sx={{ fontSize: '14px', fontFamily: 'Inter, monospace', color: 'secondary.main', minWidth: 24, fontWeight: 800 }}>
                  01
                </Typography>
                <Box>
                  <Typography sx={{ fontSize: '15px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: isLight ? 'text.primary' : 'common.white', mb: 1 }}>
                    Years of Experience
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '0', bgcolor: 'secondary.main', mt: 1, flexShrink: 0 }} />
                    <Typography sx={{ fontSize: '13.5px', fontFamily: 'Inter, sans-serif', color: isLight ? 'text.secondary' : 'rgba(255, 255, 255, 0.6)', lineHeight: 1.65 }}>
                      We have over 15 years of experience helping customers find the right parts for their ships.
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Item 2 */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Typography sx={{ fontSize: '14px', fontFamily: 'Inter, monospace', color: 'secondary.main', minWidth: 24, fontWeight: 800 }}>
                  02
                </Typography>
                <Box>
                  <Typography sx={{ fontSize: '15px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: isLight ? 'text.primary' : 'common.white', mb: 1 }}>
                    Good Prices, Real Parts
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '0', bgcolor: 'secondary.main', mt: 1, flexShrink: 0 }} />
                    <Typography sx={{ fontSize: '13.5px', fontFamily: 'Inter, sans-serif', color: isLight ? 'text.secondary' : 'rgba(255, 255, 255, 0.6)', lineHeight: 1.65 }}>
                      We sell genuine products and are always honest about our prices. No hidden fees.
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Item 3 */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Typography sx={{ fontSize: '14px', fontFamily: 'Inter, monospace', color: 'secondary.main', minWidth: 24, fontWeight: 800 }}>
                  03
                </Typography>
                <Box>
                  <Typography sx={{ fontSize: '15px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: isLight ? 'text.primary' : 'common.white', mb: 1 }}>
                    Fast Shipping
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '0', bgcolor: 'secondary.main', mt: 1, flexShrink: 0 }} />
                    <Typography sx={{ fontSize: '13.5px', fontFamily: 'Inter, sans-serif', color: isLight ? 'text.secondary' : 'rgba(255, 255, 255, 0.6)', lineHeight: 1.65 }}>
                      Our location near the Alang shipyard allows us to find parts quickly and ship them to you fast.
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Item 4 */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Typography sx={{ fontSize: '14px', fontFamily: 'Inter, monospace', color: 'secondary.main', minWidth: 24, fontWeight: 800 }}>
                  04
                </Typography>
                <Box>
                  <Typography sx={{ fontSize: '15px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: isLight ? 'text.primary' : 'common.white', mb: 1 }}>
                    Friendly Support
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '0', bgcolor: 'secondary.main', mt: 1, flexShrink: 0 }} />
                    <Typography sx={{ fontSize: '13.5px', fontFamily: 'Inter, sans-serif', color: isLight ? 'text.secondary' : 'rgba(255, 255, 255, 0.6)', lineHeight: 1.65 }}>
                      You work directly with our small, friendly team who is always ready to answer your questions and help.
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Item 5 */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Typography sx={{ fontSize: '14px', fontFamily: 'Inter, monospace', color: 'secondary.main', minWidth: 24, fontWeight: 800 }}>
                  05
                </Typography>
                <Box>
                  <Typography sx={{ fontSize: '15px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: isLight ? 'text.primary' : 'common.white', mb: 1 }}>
                    Service Bases in India & UAE
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '0', bgcolor: 'secondary.main', mt: 1, flexShrink: 0 }} />
                    <Typography sx={{ fontSize: '13.5px', fontFamily: 'Inter, sans-serif', color: isLight ? 'text.secondary' : 'rgba(255, 255, 255, 0.6)', lineHeight: 1.65 }}>
                      With active bases in India and UAE (Dubai), we coordinate worldwide supply and service across all ports on time, every time.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Image Side */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              minHeight: { xs: 280, sm: 360, md: '100%' },
              backgroundColor: 'primary.main',
              backgroundImage: 'url(/images/about-us-home.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              borderLeft: '4px solid',
              borderColor: 'secondary.main',
            }}
          >
            {/* Fallback gradient */}
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(11, 30, 64, 0.85) 0%, rgba(14, 165, 233, 0.3) 100%)' }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default WhyChoose
