'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { IMAGES } from '@/config/images'

// Variants for staggered text reveal
const charVariants = {
  hidden: { y: 20, opacity: 0, filter: 'blur(10px)' },
  visible: (custom: { i: number; delayBase: number }) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      delay: custom.delayBase + (custom.i * 0.05),
      duration: 0.8,
      ease: [0.35, 0.35, 0, 1]
    }
  })
}

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Only affect the sinking text as requested
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 500]) // Sinks DOWN until it unpins at 0.5
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0]) // Gentle fade as it sinks

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // The 'Arc First' Layover - Modified to be wider on mobile
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      `inset(20% ${isMobile ? '10%' : '30%'} 0% ${isMobile ? '10%' : '30%'} round 15vw 15vw 0 0)`,
      'inset(0% 0% 0% 0% round 0vw 0vw 0 0)'
    ]
  )

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[#12141a] z-10 block">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Blured Background Image Layer */}
        <div className="absolute inset-0 z-0 flex w-full h-full">
          <div className="absolute inset-0 bg-black/40 z-10 backdrop-blur-md" />
          <img
            src={IMAGES.home.hero.backdrop}
            alt="RealEstate RD Architectural Backdrop"
            className="w-full h-full object-cover blur-sm brightness-75 scale-105"
          />
        </div>

        {/* Sharp 'Arc Layover' Foregound */}
        <motion.div
          style={{ clipPath }}
          className="absolute inset-0 z-10"
        >
          <div className="absolute inset-0 bg-black/40 z-20" />
          <img
            src={IMAGES.home.hero.backdrop}
            alt="RealEstate RD Architectural Reveal"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Animated Decorative Path */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-20">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 1080"
            preserveAspectRatio="none"
          >
            <motion.path
              fill="none"
              stroke="url(#hero-path-gradient)"
              strokeWidth="1"
              d="M0,905.7C291,1634.7,657.7-336.8,214,245.7-110,671.2,233,23.1,802,9.8c195.6-4.6,555,182.9,328,583.1-62.6,110.4-140.3-92.5,310-86.1"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="hero-path-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--c-gold)" />
                <stop offset="0.5" stopColor="#c6a76a" />
                <stop offset="1" stopColor="var(--c-gold)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Typography Overlay */}
        <div className="relative z-30 w-full h-full px-6 md:px-20 flex flex-col justify-between py-20 pointer-events-none">

          {/* Top Detail */}
          <div className="text-center">
            <span className="uppercase tracking-[0.5em] text-[0.6rem] text-white">
              Experience Kargil
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between w-full h-full relative">

            {/* Left Block */}
            <div className="max-w-[15rem] text-left hidden md:block absolute left-0 top-1/2 -translate-y-1/2">
              <p className="text-[0.65rem] uppercase tracking-widest leading-relaxed text-white">
                Hotel The Indian Kargil is your premium gateway to the majestic landscapes of Ladakh.
              </p>
            </div>

            {/* Right Block */}
            <div className="max-w-[15rem] text-right hidden md:block absolute right-0 top-1/2 -translate-y-1/2">
              <p className="text-[0.65rem] uppercase tracking-widest leading-relaxed text-white">
                We blend modern luxury with traditional Ladakhi warmth for an unforgettable stay.
              </p>
            </div>

            {/* Massive Bottom title spanning the base */}
            <div className="absolute bottom-[12vh] md:bottom-[5vh] left-1/2 -translate-x-1/2 w-[120vw] flex justify-center z-30 pointer-events-none">
              <motion.h1
                style={{ y: titleY, opacity: titleOpacity }}
                className="font-editorial text-[14vw] md:text-[12vw] text-white leading-none whitespace-nowrap opacity-90 drop-shadow-2xl"
              >
                Hotel Kargil
              </motion.h1>
            </div>

          </div>


          {/* Mobile Text (Fallback) */}
          <div className="md:hidden text-center mt-auto">
            <p className="text-[0.6rem] uppercase tracking-widest text-white/60">
              Speculative Hospitality
            </p>
          </div>
        </div>


      </div>

      <style jsx>{`
        .group-scroll-reveal {
          opacity: calc(var(--progress) * 2);
        }
      `}</style>
    </section>
  )
}

export default HeroSection
