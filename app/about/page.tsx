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
            About R.D Properties
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
            Building dreams, creating value, and transforming communities through exceptional real estate solutions
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
                  For over a decade, R.D Properties has been at the forefront of real estate excellence, transforming 
                  the way people buy, sell, rent, and lease properties. What began as a vision to create transparent, 
                  client-focused real estate services has evolved into a trusted name in premium property solutions.
                </p>
                <p className="text-lg">
                  Located in prime real estate markets, our company combines deep market knowledge with 
                  innovative technology and personalized service. Every transaction is handled with meticulous 
                  attention to detail, ensuring our clients achieve their property goals with confidence.
                </p>
                <p className="text-lg italic text-luxury-gold/90 border-l-2 border-luxury-gold/30 pl-6">
                  R.D Properties specializes in residential, commercial, and investment properties, offering 
                  comprehensive real estate services tailored to meet diverse client needs and market demands.
                </p>
                <p className="text-lg">
                  From luxury homes and commercial spaces to investment opportunities and property management, 
                  we believe that real estate is not just about transactions—it's about building relationships 
                  and creating lasting value for our clients and communities.
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
                  alt="Modern real estate office"
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
                  Market Leadership
                </h4>
                <p className="text-gray-200 text-sm">
                  Consistently ranked among the top real estate firms in the region
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats - Single Line underneath */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Award, number: '50+', label: 'Properties Sold' },
              { icon: Users, number: '100+', label: 'Happy Clients' },
              { icon: Globe, number: '15+', label: 'Locations Served' },
              { icon: Heart, number: '5+', label: 'Years of Excellence' },
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
              Founder's Wise Words
            </h2>
            
            <div className="glass rounded-3xl p-8 md:p-12">
              <div className="text-center">
                <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-6 italic font-light">
                  "When I founded R.D Properties, I envisioned creating more than just a real estate company. 
                  I wanted to build a trusted partner that helps families find their perfect homes and investors 
                  discover valuable opportunities. Today, seeing our clients achieve their property dreams, 
                  I know we've built something truly meaningful in the real estate industry."
                </blockquote>
                
                <div className="text-center mt-8">
                  <div className="text-luxury-gold font-serif text-2xl mb-1">
                    R.D Properties Team
                  </div>
                  <div className="text-gray-400">
                    Founders & Real Estate Experts
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
                To provide exceptional real estate services that exceed client expectations through market expertise, 
                personalized guidance, and unwavering integrity. We are committed to helping individuals and families 
                find their perfect properties while ensuring every transaction is smooth, transparent, and successful.
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
                To be recognized as the premier real estate company in our region, setting the gold standard 
                for property services and client satisfaction. We envision a future where R.D Properties becomes 
                synonymous with trust, excellence, and successful property investments, creating lasting relationships 
                with clients and contributing to thriving communities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
