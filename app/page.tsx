'use client'

import HeroSection from '@/components/home/HeroSection'
import WhatWeOffer from '@/components/home/WhatWeOffer'
import GlimpseSection from '@/components/home/GlimpseSection'
import Testimonials from '@/components/home/Testimonials'
import VideoTour from '@/components/home/VideoTour'
import ObsidianFooter from '@/components/home/ObsidianFooter'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhatWeOffer />
      <GlimpseSection />
      <VideoTour />
      <Testimonials />
    </div>
  )
}
