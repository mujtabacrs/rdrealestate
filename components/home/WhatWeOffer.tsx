'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const WhatWeOffer = () => {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Scroll-linked slide-down effect for the primary heading
  const headingY = useTransform(scrollYProgress, [0, 0.25], [-150, 0])
  const headingOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1])

  // Fade in the background color to create a seamless overlap with the hero
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["rgba(18, 20, 26, 0)", "rgba(18, 20, 26, 1)"]
  )

  return (
    <motion.section
      ref={containerRef}
      className="relative pt-[25vh] pb-40 min-h-screen z-30 bg-[#12141a] -mt-[100vh]"
    >
      {/* The Arc Layover requested by the user */}
      <div className="absolute top-0 left-0 w-full h-[100px] md:h-[150px] -translate-y-[99%] z-30 pointer-events-none">
        <svg viewBox="0 0 1440 100" className="w-full h-full fill-[#12141a]" preserveAspectRatio="none">
          <path d="M0,100 C720,0 1440,100 1440,100 L0,100 Z" />
        </svg>
      </div>
      {/* Principle Decorative SVG Path (Obsidian Style) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          className="w-full h-full opacity-30"
          viewBox="0 0 1440 1080"
          preserveAspectRatio="none"
        >
          <motion.path
            fill="none"
            stroke="url(#principle-path-gradient)"
            strokeWidth="1"
            d="M1440,237.1c-147.7,267.7-476.1,512-685.9,571.5-239.2,67.8-248-544.9-24.1-728.5,431-353.3,468,740.5,564,790.4,96,49.9,154-723.2-1294,199.5"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="principle-path-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--c-yellow)" />
              <stop offset="0.4" stopColor="#c5a584" />
              <stop offset="0.8" stopColor="#c8a989" />
              <stop offset="1" stopColor="var(--c-yellow)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">

        <motion.span
          style={{ y: headingY, opacity: headingOpacity }}
          className="font-editorial text-6xl md:text-9xl text-foreground-rgb mb-12 drop-shadow-md"
        >
          The Principles
        </motion.span>

        <motion.h3
          style={{ y: headingY, opacity: headingOpacity }}
          className="font-editorial text-2xl md:text-3xl text-foreground-rgb leading-tight mb-20 max-w-2xl"
        >
          Luxury is not designed first and placed later. It is formed within specific places and only remains truly authentic there.
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 text-left">

          {[
            { title: "Wellness & Spa", text: "Rejuvenate your senses with our world-class treatments. A curriculum of silence and restoration." },
            { title: "Culinary Arts", text: "Savor exquisite cuisine crafted by our award-winning chefs. Material and use at the point of origin." },
            { title: "Premium Suites", text: "Elegantly appointed rooms with breathtaking views. Form results from context and local material." },
            { title: "Mountain Retreat", text: "Experience thrilling activities from skiing to climbing. Adventure as a circulate independently after release." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 1.2, ease: [0.35, 0.35, 0, 1] }}
              className="flex flex-col gap-4"
            >
              <span className="text-[0.6rem] uppercase tracking-[0.4em] text-foreground-rgb/40">{item.title}</span>
              <p className="text-sm leading-relaxed text-foreground-rgb/80">
                {item.text}
              </p>
            </motion.div>
          ))}

        </div>

      </div>

      {/* Concave Divider (Obsidian Style) */}
      <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 200"
          className="w-full h-full fill-background-start-rgb"
          style={{ transform: 'scaleY(-1)' }}
          preserveAspectRatio="none"
        >
          <path d="M0,0 Q720,200 1440,0 L1440,200 L0,200 Z" />
        </svg>
      </div>

    </motion.section>
  )
}

export default WhatWeOffer
