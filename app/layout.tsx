import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'
import { ThemeProvider } from '@/context/ThemeContext'
import SmoothScroll from '@/components/ui/SmoothScroll'

export const metadata: Metadata = {
  title: 'RealEstate RD - Premium Properties',
  description: 'Discover premium real estate opportunities with RealEstate RD. Quality properties, exceptional service, and trusted expertise in real estate.',
  keywords: 'real estate, premium properties, property investment, real estate rd, property sales',
  icons: {
    icon: '/images/hotel_the_inidan_kargil_logo-removebg-preview.png',
    apple: '/images/hotel_the_inidan_kargil_logo-removebg-preview.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body suppressHydrationWarning className="bg-luxury-dark text-white transition-colors antialiased">
        <ThemeProvider>
          <SmoothScroll>
            <ClientLayout>{children}</ClientLayout>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
