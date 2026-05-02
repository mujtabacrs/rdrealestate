import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'
import { ThemeProvider } from '@/context/ThemeContext'
import SmoothScroll from '@/components/ui/SmoothScroll'

export const metadata: Metadata = {
  title: 'Hotel Kargil - Luxury Redefined',
  description: 'Experience unparalleled luxury at Hotel Kargil. Premium accommodations, world-class amenities, and exceptional service in the heart of Ladakh.',
  keywords: 'luxury hotel kargil, hotel kargil, ladakh accommodation, premium resort kargil',
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
