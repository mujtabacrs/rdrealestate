'use client'

import { motion } from 'framer-motion'
import { IMAGES } from '@/config/images'
import DNAHelixGallery from '@/components/gallery/DNAHelixGallery'

export default function Gallery() {
  // Gallery images data - Ladakh themed
  const galleryImages = IMAGES.gallery


  return (
    <div className="min-h-screen pt-20 bg-black">
      {/* Hero Section */}
      <section className="relative py-24 text-center bg-gradient-to-b from-luxury-dark to-black overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_50%)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gradient mb-6">
              Discover Ladakh
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-4">
              Experience the majestic beauty of the Himalayas through an immersive 3D journey
            </p>
            <p className="text-sm text-gray-400">
              Scroll to explore • Hover to interact • Click to view fullscreen
            </p>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </section>

      {/* DNA Helix Gallery */}
      <DNAHelixGallery images={galleryImages} />

      {/* Bottom Section */}
      <section className="relative py-16 bg-gradient-to-t from-luxury-dark to-black">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gradient mb-6">
              Ready to Experience the Himalayas?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Book your stay and create unforgettable memories in the heart of Ladakh
            </p>
            <motion.a
              href="/booking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-luxury inline-block text-lg px-12 py-4"
            >
              Book Your Stay
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
