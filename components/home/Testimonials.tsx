'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Travel Blogger',
    text: 'Hotel Kargil exceeded every expectation. The attention to detail, the breathtaking views, and the impeccable service made our anniversary truly unforgettable. This is luxury redefined.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Michael Chen',
    role: 'Business Executive',
    text: 'As someone who travels frequently for business, I can confidently say Hotel Kargil sets the gold standard. The spa treatments and fine dining are world-class.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Emma Rodriguez',
    role: 'Fashion Designer',
    text: 'Every corner of this resort is Instagram-worthy, but more importantly, it feels like home. The staff anticipated our every need. Pure perfection.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'David Thompson',
    role: 'Photographer',
    text: 'The architecture and design are stunning. As a photographer, I was captivated by every detail. The sunset views from our suite were absolutely magical.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Elena Rossi',
    role: 'Wellness Enthusiast',
    text: 'The yoga retreats here are life-changing. Waking up to the Himalayan peaks and practicing in the crisp mountain air is an experience that stays with you.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  }
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="relative py-40 bg-black overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-c-gold/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-[0.6rem] uppercase tracking-[0.5em] text-foreground-rgb/40 mb-6 block">
              Guest Experiences
            </span>
            <h2 className="font-editorial text-5xl md:text-8xl text-foreground-rgb leading-none">
              Client <span className="italic text-c-gold">Narratives</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={prev}
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-c-gold transition-all duration-500 group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={next}
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-c-gold transition-all duration-500 group"
            >
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative h-[450px] md:h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: [0.35, 0.35, 0, 1] }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center h-full"
            >
              {/* Image Column */}
              <div className="lg:col-span-2 relative h-[300px] md:h-full lg:h-[450px]">
                <div className="absolute inset-0 rounded-2xl overflow-hidden ring-1 ring-white/10">
                  <motion.img
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>
                
                {/* Float Card */}
                <div className="absolute -bottom-6 -right-6 glass p-6 rounded-xl border border-white/10 shadow-2xl z-20">
                   <Quote className="text-c-gold mb-4" size={24} />
                   <p className="text-[0.6rem] uppercase tracking-[0.3em] font-bold text-white mb-1">
                      {testimonials[currentIndex].name}
                   </p>
                   <p className="text-[0.5rem] uppercase tracking-[0.2em] text-white/40">
                      {testimonials[currentIndex].role}
                   </p>
                </div>
              </div>

              {/* Text Column */}
              <div className="lg:col-span-3 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <p className="font-editorial text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-12">
                    &ldquo;{testimonials[currentIndex].text}&rdquo;
                  </p>
                  
                  <div className="flex items-center gap-12">
                    <div className="flex flex-col">
                       <span className="text-[0.5rem] uppercase tracking-[0.5em] text-c-gold mb-2">Authenticated Guest</span>
                       <div className="flex gap-1">
                         {[...Array(5)].map((_, i) => (
                           <div key={i} className="w-1.5 h-1.5 bg-c-gold rounded-full" />
                         ))}
                       </div>
                    </div>
                    
                    <div className="h-px flex-1 bg-white/10" />
                    
                    <span className="text-[0.7rem] text-white/20 font-mono">
                      0{currentIndex + 1} / 0{testimonials.length}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-4 mt-20">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1 transition-all duration-500 rounded-full ${
                i === currentIndex ? 'w-12 bg-c-gold' : 'w-4 bg-white/10 hover:bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
