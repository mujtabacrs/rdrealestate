'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import QuickEnquiry from '@/components/ui/QuickEnquiry'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="relative" style={{ position: 'relative' }}>{children}</main>
      <Footer />
      <QuickEnquiry />
    </>
  )
}