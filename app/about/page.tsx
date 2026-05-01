'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Users, Globe, Heart } from 'lucide-react'
import { IMAGES } from '@/config/images'

export default function About() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ownerRef, ownerInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('${IMAGES.about.hero}')`
          }}
        />
        
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gradient mb-6">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
            A legacy of luxury, crafted with passion and dedication to create unforgettable experiences
          </p>
        </motion.div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 bg-luxury-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <motion.div
              ref={storyRef}
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-8">
                Who We Are
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  For over three decades, Hotel Kargil has been synonymous with unparalleled luxury and exceptional hospitality. 
                  What began as a vision to create the world's most extraordinary resort experience has evolved into a legacy 
                  that continues to set new standards in luxury travel.
                </p>
                <p className="text-lg">
                  Nestled in one of the world's most breathtaking locations, our resort combines timeless elegance with 
                  modern sophistication. Every detail has been carefully curated to ensure that our guests experience 
                  nothing short of perfection.
                </p>
                <p className="text-lg italic text-luxury-gold/90 border-l-2 border-luxury-gold/30 pl-6">
                  The property has been recently renovated by Kiffayat Jaffri Constructions and Services (72) Private Limited 
                  and was taken over by Tabasum Kiffayat in April 2026.
                </p>
                <p className="text-lg">
                  From our award-winning spa and world-class dining to our meticulously designed suites and personalized 
                  service, we believe that luxury is not just about amenities—it's about creating moments that last a lifetime.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={IMAGES.about.interior}
                  alt="Luxury hotel interior"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              {/* Floating Card */}
              <motion.div
                whileHover={{ y: -10 }}
                className="absolute -bottom-8 -left-8 glass p-6 rounded-xl hidden md:block"
              >
                <h4 className="text-xl font-serif font-semibold text-luxury-gold mb-2">
                  Excellence Recognized
                </h4>
                <p className="text-gray-200 text-sm">
                  Consistently rated among the world's top luxury resorts
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats - Single Line underneath */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Award, number: '50+', label: 'Awards Won' },
              { icon: Users, number: '100K+', label: 'Happy Guests' },
              { icon: Globe, number: '80+', label: 'Countries Served' },
              { icon: Heart, number: '30+', label: 'Years of Excellence' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={storyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center glass p-8 rounded-2xl border border-white/5"
              >
                <stat.icon size={32} className="text-luxury-gold mx-auto mb-4" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-xs md:text-sm uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner's Message */}
      <section className="py-24 bg-luxury-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ownerRef}
            initial={{ opacity: 0, y: 50 }}
            animate={ownerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-12">
              From the Owner's Desk
            </h2>
            
            <div className="glass rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden ring-4 ring-luxury-gold/30 flex-shrink-0">
                  <img
                    src={IMAGES.about.owner}
                    alt="Owner"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="text-left">
                  <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-6 italic font-light">
                    "When I envisioned Hotel Kargil, I dreamed of creating more than just a hotel. 
                    I wanted to craft a sanctuary where every guest feels like royalty, where every moment 
                    is infused with magic, and where memories are born that last a lifetime. Today, 
                    seeing the joy on our guests' faces, I know we've achieved something truly special."
                  </blockquote>
                  
                  <div className="text-right">
                    <div className="text-luxury-gold font-serif text-2xl mb-1">
                      Tabasum Kiffayat
                    </div>
                    <div className="text-gray-400">
                      Owner
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-luxury-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={missionRef}
            initial={{ opacity: 0, y: 50 }}
            animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-6">
              Mission & Vision
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass rounded-2xl p-8"
            >
              <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mb-6">
                <Heart size={32} className="text-luxury-gold" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-luxury-gold mb-4">
                Our Mission
              </h3>
              <p className="text-gray-300 leading-relaxed">
                To provide an unparalleled luxury experience that exceeds expectations through exceptional 
                service, world-class amenities, and attention to every detail. We are committed to creating 
                magical moments and lasting memories for every guest who walks through our doors.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass rounded-2xl p-8"
            >
              <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mb-6">
                <Globe size={32} className="text-luxury-gold" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-luxury-gold mb-4">
                Our Vision
              </h3>
              <p className="text-gray-300 leading-relaxed">
                To be recognized as the world's premier luxury resort destination, setting the gold standard 
                for hospitality excellence. We envision a future where Hotel Kargil becomes synonymous with 
                the ultimate luxury travel experience, inspiring wanderlust and creating lifelong connections.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
