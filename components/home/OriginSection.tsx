'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { IMAGES } from '@/config/images'

const OriginSection = () => {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Smooth floating animation
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 20])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <section ref={containerRef} style={{ position: 'relative' }} className="relative py-60 bg-c-black overflow-hidden flex flex-col items-center justify-center text-center px-6">
      
      {/* Floating 3D Object (Speculative Asset) */}
      <motion.div 
        style={{ y: smoothY, rotate }}
        className="mb-24 relative z-10"
      >
        <div className="w-32 h-32 md:w-48 md:h-48 relative">
          {/* Subtle Glow behind the object */}
          <div className="absolute inset-0 bg-c-gold/20 blur-3xl rounded-full" />
          <img 
            src={IMAGES.home.origin} 
            alt="Origin Object"
            className="w-full h-full object-contain relative z-20 mix-blend-screen grayscale brightness-125"
          />
        </div>
      </motion.div>

      <div className="relative z-20 max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.35, 0.35, 0, 1] }}
          className="font-editorial text-4xl md:text-7xl text-white leading-tight mb-12"
        >
          Each moment is tied to a <span className="italic">specific place</span>, which defines its origin.
        </motion.h2>
        
        <div className="flex justify-center">
           <div className="w-px h-12 bg-c-gold/30" />
        </div>
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-background-start-rgb/10 to-transparent pointer-events-none" />

    </section>
  )
}

export default OriginSection
