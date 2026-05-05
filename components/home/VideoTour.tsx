'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { IMAGES } from '@/config/images'

const VideoTour = () => {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Animation transforms
  const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section ref={containerRef} style={{ position: 'relative' }} className="relative py-16 md:py-40 border-t border-white/5 bg-background-start-rgb overflow-hidden">
      
      {/* Integrative SVG Path */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
          <motion.path 
            d="M-40,100 C200,300 400,-100 720,400 C1040,900 1240,500 1480,700" 
            stroke="var(--c-gold)" 
            strokeWidth="1"
            style={{ pathLength }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side: Typography */}
        <motion.div 
          style={{ opacity }}
          className="text-left lg:pr-10"
        >
          <span className="text-[0.6rem] uppercase tracking-[0.5em] text-foreground-rgb/40 mb-6 block">
            Property Showcase
          </span>
          <h2 className="font-editorial text-5xl md:text-8xl text-foreground-rgb leading-[0.9] mb-12">
            Discover Our <br /> <span className="italic text-c-gold">Properties</span>
          </h2>
          <p className="text-xs md:text-sm text-foreground-rgb/60 uppercase tracking-[0.3em] leading-relaxed max-w-md">
            A cinematic journey through our premium real estate portfolio and architectural excellence. 
            Quality emerges from location, design, and purpose at every property.
          </p>

          {/* Technical Footer Detail */}
          <div className="mt-16 space-y-6 text-[0.5rem] uppercase tracking-[0.4em] text-foreground-rgb/30">
            <div className="flex items-center gap-4">
              <span className="w-8 h-px bg-foreground-rgb/10" />
              <span>Premium Property Tours</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-8 h-px bg-foreground-rgb/10" />
              <span>Virtual Property Experience</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Video Player */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 1.5, ease: [0.35, 0.35, 0, 1] }}
          className="relative w-full group"
        >
          {/* Arch Masked Video Player */}
          <div className="relative aspect-[4/5] md:aspect-[3/4] max-h-[75vh] ml-auto arch-mask overflow-hidden bg-black shadow-2xl ring-1 ring-white/5">
            <video 
              ref={videoRef}
              src={IMAGES.home.videoTour}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />
            
            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={togglePlay}
                className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all scale-90 group-hover:scale-100"
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
              </button>
            </div>

            {/* Bottom Bar: Mute & Info */}
            <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between z-20">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-1 h-1 bg-white rounded-full animate-ping" />
                </div>
                <span className="font-editorial text-xl text-white italic">
                  R.D Properties Showcase
                </span>
              </div>

              <button 
                onClick={toggleMute}
                className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default VideoTour
