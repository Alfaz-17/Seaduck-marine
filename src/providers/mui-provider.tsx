import React, { FC, ReactNode } from 'react'
import { ThemeProvider } from '@mui/material'
import { useRouter } from 'next/router'
import { lightTheme, darkTheme } from '@/config/theme'

interface Props {
  children: ReactNode
}

const MUIProvider: FC<Props> = ({ children }) => {
  const router = useRouter()
  // const isAdmin = router.pathname.startsWith('/admin')
  // We use lightTheme by default for the entire site to enable alternating light/dark sections.
  const activeTheme = lightTheme

  return <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
}

export default MUIProvider
