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
      className="relative pt-[calc(25vh-10px)] pb-40 min-h-screen z-30 bg-[#12141a] -mt-[100vh]"
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center text-center">

        <motion.span
          style={{ y: headingY, opacity: headingOpacity }}
          className="font-editorial text-6xl md:text-9xl text-foreground-rgb mb-20 drop-shadow-md"
        >
          Our Services
        </motion.span>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left w-full">

          {[
            { 
              title: "Buy Properties", 
              text: "Find your dream home or perfect investment property with our extensive portfolio of premium residential and commercial properties in prime locations.",
              image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80"
            },
            { 
              title: "Sell", 
              text: "Maximize your property's value with our expert marketing strategies, professional photography, and extensive network of qualified buyers.",
              image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
            },
            { 
              title: "Rent", 
              text: "Discover exceptional rental properties that meet your lifestyle needs, from luxury apartments to spacious family homes in desirable neighborhoods.",
              image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            },
            { 
              title: "Lease", 
              text: "Secure the perfect commercial space for your business with flexible leasing options and prime locations that drive success and growth.",
              image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 1.2, ease: [0.35, 0.35, 0, 1] }}
              className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-yellow-500/30 transition-all duration-300 group"
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              {/* Card Content */}
              <div className="p-6">
                <span className="text-sm md:text-lg font-bold uppercase tracking-[0.2em] text-yellow-500/90 mb-3 block">{item.title}</span>
                <p className="text-sm leading-relaxed text-foreground-rgb/80">
                  {item.text}
                </p>
              </div>
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
