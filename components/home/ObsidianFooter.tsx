'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const ObsidianFooter = () => {
  return (
    <footer className="relative bg-background-start-rgb">
      
      {/* Arch Section Joiner (Connects OriginSection to Footer) */}
      <div className="absolute top-0 left-0 w-full h-32 overflow-hidden -translate-y-full z-20 pointer-events-none">
        <svg 
          viewBox="0 0 1440 200" 
          className="w-full h-full fill-background-start-rgb" 
          preserveAspectRatio="none"
        >
          <path d="M0,200 Q720,0 1440,200 L1440,200 L0,200 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-40 relative">
        
        {/* Connective Gold Strokes weaving through the links */}
        <div className="absolute inset-x-0 top-0 h-full pointer-events-none opacity-40">
           <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none">
              <motion.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
                d="M-20,100 Q400,300 1460,50" 
                stroke="var(--c-gold)" 
                strokeWidth="0.5"
              />
              <motion.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 4, ease: "easeInOut", delay: 1 }}
                d="M-40,400 Q720,200 1500,500" 
                stroke="var(--c-gold)" 
                strokeWidth="0.5"
              />
           </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">
          
          <div className="md:col-span-4">
            <h3 className="font-editorial text-4xl text-foreground-rgb mb-8">Hotel Kargil</h3>
            <p className="text-[0.6rem] uppercase tracking-[0.4em] text-foreground-rgb/40 leading-loose max-w-xs">
              Independent practice operating <br /> across locations of unparalleled <br /> tranquility.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-4">
            <span className="text-[0.5rem] uppercase tracking-[0.4em] text-foreground-rgb/30 mb-2">Explore</span>
            <Link href="/gallery" className="text-xs uppercase tracking-widest text-foreground-rgb hover:text-c-gold transition-colors">The Collection</Link>
            <Link href="/about" className="text-xs uppercase tracking-widest text-foreground-rgb hover:text-c-gold transition-colors">Our Origin</Link>
            <Link href="/booking" className="text-xs uppercase tracking-widest text-foreground-rgb hover:text-c-gold transition-colors">Availability</Link>
          </div>

          <div className="md:col-span-4 flex flex-col items-end text-right">
             <span className="text-[0.5rem] uppercase tracking-[0.4em] text-foreground-rgb/30 mb-4">Inquiries</span>
              <a href="mailto:admin.hoteltheindiankargil@gmail.com" className="font-editorial text-xl text-foreground-rgb hover:text-c-gold transition-colors italic">
                admin.hoteltheindiankargil@gmail.com
              </a>
              <a href="mailto:bookings.hoteltheindiankargil@gmail.com" className="font-editorial text-xl text-foreground-rgb hover:text-c-gold transition-colors italic mt-1">
                bookings.hoteltheindiankargil@gmail.com
              </a>
             <a href="tel:+919796111172" className="font-editorial text-xl text-foreground-rgb hover:text-c-gold transition-colors mt-2">
               +91 97961 11172
             </a>
          </div>

        </div>

        {/* Floating Rocky Texture / Brand Mark */}
        <div className="mt-40 pt-20 border-t border-foreground-rgb/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[0.5rem] uppercase tracking-[0.4em] text-foreground-rgb/30">
            &copy; 2026 Hotel Kargil. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8">
            <span className="text-[0.5rem] uppercase tracking-[0.4em] text-foreground-rgb/30">Experience Kargil</span>
            {/* Rocky Texture Asset Placeholder */}
            <div className="w-12 h-12 bg-c-black arch-mask opacity-20 grayscale" />
          </div>
        </div>

      </div>

    </footer>
  )
}

export default ObsidianFooter
