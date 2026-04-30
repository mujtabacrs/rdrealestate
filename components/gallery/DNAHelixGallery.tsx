'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface GalleryImage {
  src: string
  title: string
  category: string
}

interface DNAHelixGalleryProps {
  images: GalleryImage[]
}

const DNAHelixGallery = ({ images }: DNAHelixGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Smooth out the scroll progress to eliminate wheel jumpiness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 15,
    mass: 0.5
  })

  // Set mounted state and check mobile
  useEffect(() => {
    setMounted(true)
    setIsMobile(window.innerWidth < 768)
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Tie rotation to smoothed scroll progress
  useEffect(() => {
    // 720 degrees means 2 full spins during the 300vh scroll
    const unsubscribe = smoothProgress.on('change', (latest) => {
      setRotation(latest * 720)
    })
    return () => unsubscribe()
  }, [smoothProgress])

  // Mouse movement parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Calculate helix position for each image
  const getHelixPosition = (index: number, totalImages: number, currentRotation: number, strand: number) => {
    const angleStep = 360 / (totalImages / 2)
    const baseAngle = index * angleStep
    const strandOffset = strand * 180
    const angle = (baseAngle + strandOffset + currentRotation) % 360
    const angleRad = (angle * Math.PI) / 180

    // Helix parameters
    const radius = isMobile ? 140 : 280
    const verticalSpacing = isMobile ? 70 : 100
    
    // Calculate 3D position
    const x = Math.cos(angleRad) * radius
    const z = Math.sin(angleRad) * radius
    const y = (index * verticalSpacing) - ((totalImages / 2) * verticalSpacing / 2)

    // Calculate distance from viewer
    const normalizedZ = (z + radius) / (radius * 2)
    const scale = 0.6 + (normalizedZ * 0.6)
    const opacity = 0.4 + (normalizedZ * 0.6)
    const blur = (1 - normalizedZ) * 3

    return { x, y, z, scale, opacity, blur }
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    }
  }

  return (
    <>
      {/* Main Gallery Container */}
      <div ref={containerRef} className="relative w-full h-[300vh]">
        {/* Sticky Visual Gallery Section */}
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-luxury-dark to-black overflow-hidden">
            {/* Particle Background */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              {mounted && [...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-luxury-gold rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  } as any}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Light Streaks */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-luxury-gold to-transparent" />
              <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-luxury-gold to-transparent" />
            </div>

            {/* 3D Helix Container */}
            <div className="absolute inset-0 h-screen flex items-center justify-center px-4">
              <div
                className="relative w-full max-w-6xl h-full mx-auto"
                style={{
                  perspective: '1500px',
                  perspectiveOrigin: '50% 50%',
                }}
              >
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transformStyle: 'preserve-3d' as const,
                    rotateY: mousePosition.x * 5,
                    rotateX: -mousePosition.y * 5,
                  } as any}
                >
                  {/* DNA Helix - Two Strands */}
                  {images.map((image, index) => {
                    const strand = index % 2
                    const strandIndex = Math.floor(index / 2)
                    const pos = getHelixPosition(strandIndex, images.length, rotation, strand)

                    return (
                      <motion.div
                        key={index}
                        className="absolute cursor-pointer"
                        style={{
                          transformStyle: 'preserve-3d' as const,
                          left: '50%',
                          top: '50%',
                        } as any}
                        animate={{
                          x: pos.x,
                          y: pos.y,
                          z: pos.z,
                          opacity: pos.opacity,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 40,
                          mass: 1
                        }}
                      >
                        <motion.div
                          style={{
                            translateX: '-50%',
                            translateY: '-50%',
                            scale: pos.scale,
                            filter: `blur(${pos.blur}px)`,
                          } as any}
                          onClick={() => setSelectedImage(index)}
                          whileHover={{
                            scale: pos.scale * 1.2,
                            transition: { duration: 0.3 }
                          }}
                          className="relative z-0 hover:z-50"
                        >
                          <motion.div
                            className="relative w-32 h-24 sm:w-40 sm:h-32 md:w-56 md:h-40 rounded-xl overflow-hidden glass-dark shadow-2xl group border-2 border-white/10"
                            style={{
                              transformStyle: 'preserve-3d' as const,
                              backfaceVisibility: 'hidden' as const,
                            } as any}
                          >
                            {/* Image */}
                            <div className="relative w-full h-full">
                              <Image
                                src={image.src}
                                alt={image.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 160px, 224px"
                              />
                            </div>

                            {/* Glow Overlay on Hover */}
                            <div className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />


                            {/* Glow Effect */}
                            <div className="absolute inset-0 border-2 border-luxury-gold/0 group-hover:border-luxury-gold/70 rounded-xl transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]" />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative w-full h-[70vh]">
                <Image
                  src={images[selectedImage].src}
                  alt={images[selectedImage].title}
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 1536px) 100vw, 1536px"
                  priority
                />
              </div>


              {/* Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
              >
                <ChevronRight size={24} />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
              >
                <X size={20} />
              </button>

              {/* Counter */}
              <div className="absolute top-4 left-4 bg-black/50 rounded-full px-4 py-2 text-white text-sm backdrop-blur-sm">
                {selectedImage + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default DNAHelixGallery
