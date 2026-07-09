import type { Navigation } from '@/interfaces/navigation'

export const navigations: Navigation[] = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'About Us',
    path: '/about',
  },
  {
    label: 'Products & Services',
    path: '/products',
    children: [
      { label: 'Marine Radar', path: '/products?category=Navigation' },
      { label: 'Marine Automation', path: '/products?category=Automation' },
      { label: 'Lubricants & Spares', path: '/products?category=Communication' },
    ]
  },
  {
    label: 'Why Choose Us',
    path: '/#why-choose-us',
  },
  {
    label: 'Gallery',
    path: '/gallery',
  },
  {
    label: 'Contact Us',
    path: '/contact',
  },
]
