'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import { IMAGES } from '@/config/images'

const GlimpseSection = () => {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Smooth scroll progress for parallax effects
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const images = IMAGES.home.glimpse


  // Parallax transforms for images - Wider range for more items
  const xTranslate = useTransform(smoothProgress, [0, 1], [0, -1200])
  const svgScale = useTransform(smoothProgress, [0, 1], [1, 1.2])

  return (
    <section ref={containerRef} style={{ position: 'relative' }} className="relative pt-16 pb-16 md:pb-20 bg-c-black overflow-hidden select-none">

      {/* Sequence Decorative SVG Path (Obsidian Style) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          className="w-full h-full opacity-20"
          viewBox="0 0 1440 1080"
          preserveAspectRatio="none"
        >
          <motion.path
            fill="none"
            stroke="url(#sequence-path-gradient)"
            strokeWidth="1"
            d="M517,1080c246-232.9,804.3-242.7,752-429.1-27.9-99.7-412.5-154.2-649-29.3-228.9,120.8-467.4,88.3-462,49.5,15.1-108.4,394,337.4,527,133.9C924.6,438.3,14,694.9,250,0"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 5, ease: "linear" }}
          />
          <defs>
            <linearGradient id="sequence-path-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#151415" />
              <stop offset="0.5" stopColor="#7b5136" />
              <stop offset="1" stopColor="var(--c-yellow)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">

        {/* Stone texture Masking Background (Obsidian Style) */}
        <motion.div
          style={{ scale: svgScale }}
          className="absolute top-0 w-2/3 aspect-square opacity-10 blur-3xl rounded-full bg-luxury-gold pointer-events-none"
        />

        <div className="w-full max-w-7xl px-6 md:px-20">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
            <div className="flex-1">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-[0.6rem] uppercase tracking-[0.5em] text-white/40 mb-6 block"
              >
                Premium Portfolio
              </motion.span>
              <h2 className="font-editorial text-5xl md:text-8xl text-white leading-none">
                A Glimpse of <br /> <span className="italic ml-12">Excellence</span>
              </h2>
            </div>

            <div className="flex-1 md:max-w-xs relative">
              <p className="text-xs md:text-sm text-white/60 leading-relaxed mb-8">
                A curated selection of our finest properties. Each investment opportunity is carefully chosen for its unique location and exceptional value potential.
              </p>

              <div className="flex items-center justify-between">
                <Link href="/gallery">
                  <button className="text-white/80 hover:text-white text-[0.6rem] uppercase tracking-[0.3em] flex items-center gap-4 transition-colors">
                    <span className="w-8 h-px bg-white/40 block" />
                    View All Properties
                  </button>
                </Link>

                {/* Navigation Arrows */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      const container = document.getElementById('glimpse-scroll-container')
                      if (container) container.scrollBy({ left: -400, behavior: 'smooth' })
                    }}
                    className="w-10 h-10 rounded-full border border-c-gold/30 flex items-center justify-center text-c-gold transition-colors hover:border-c-gold"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      const container = document.getElementById('glimpse-scroll-container')
                      if (container) container.scrollBy({ left: 400, behavior: 'smooth' })
                    }}
                    className="w-10 h-10 rounded-full border border-c-gold/30 flex items-center justify-center text-c-gold transition-colors hover:border-c-gold"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </motion.button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Horizontal Sequence with Arch Masks */}
        <div id="glimpse-scroll-container" className="w-full overflow-x-auto no-scrollbar scroll-smooth">
          <motion.div
            style={{ x: xTranslate }}
            className="flex gap-4 md:gap-8 pl-6 md:pl-20 mb-20 min-w-max"
          >
            {images.map((image, i) => (
              <div key={i} className="flex-shrink-0 w-[60vw] md:w-[18vw] group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden arch-mask mb-6">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-editorial text-lg text-white mb-1">{image.title}</h3>
                    <p className="text-[0.6rem] uppercase tracking-widest text-white/40">{image.description}</p>
                  </div>
                  <span className="font-editorial text-base text-white/20">{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Decorative Arch Gradient Border */}
      <div className="flex justify-center w-full">
        <div className="w-px h-10 md:h-16 bg-gradient-to-b from-luxury-gold to-transparent opacity-30" />
      </div>

    </section>
  )
}

export default GlimpseSection
