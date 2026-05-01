'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/leads/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (!response.ok) throw new Error(result.error || 'Failed to submit')
      
      setIsSubmitting(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
      alert('Thank you for your message! We will get back to you soon on WhatsApp.')
    } catch (error) {
      setIsSubmitting(false)
      alert('Failed to send message. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['Main Market Kargil', 'Ladakh, UT, India 194103'],
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 97961 11172'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['admin.thindiankargil@gmail.com', 'bookings.thindiankargil@gmail.com'],
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['24/7 Concierge Service', 'Check-in: 3:00 PM', 'Check-out: 11:00 AM'],
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-luxury-dark">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-luxury-charcoal">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1590523278191-995cbcda646b?auto=format&fit=crop&q=80"
            alt="Contact Background"
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
        >
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-luxury-gold mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed uppercase tracking-[0.3em]">
            Himalayan Hospitality Awaits
          </p>
        </motion.div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-white dark:bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="glass rounded-3xl p-8 md:p-12"
            >
              <h2 className="text-3xl font-serif font-bold text-gradient mb-8">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-luxury-gold font-medium mb-2">
                    Full Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-luxury-gold focus:bg-white dark:focus:bg-white/15 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-luxury-gold font-medium mb-2">
                    Email Address
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-luxury-gold focus:bg-white/15 transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-luxury-gold font-medium mb-2">
                    WhatsApp Number
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      setFormData({ ...formData, phone: val.slice(0, 10) });
                    }}
                    required
                    maxLength={10}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-luxury-gold focus:bg-white/15 transition-all duration-300"
                    placeholder="Enter 10-digit number"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-luxury-gold font-medium mb-2">
                    Message
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-luxury-gold focus:bg-white/15 transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-luxury flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-serif font-bold text-gradient mb-8">
                Get in Touch
              </h2>

              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass rounded-xl p-6 hover:bg-white/15 transition-colors duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon size={24} className="text-luxury-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-300 mb-1">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="glass rounded-xl overflow-hidden h-64"
              >
                <div className="w-full h-full bg-gradient-to-br from-luxury-gold/20 to-luxury-dark flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={48} className="text-luxury-gold mx-auto mb-4" />
                    <p className="text-white text-lg font-semibold">Interactive Map</p>
                    <p className="text-gray-300 text-sm">Find us in Paradise City</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 dark:bg-luxury-charcoal">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-6">
              Ready to Experience Luxury?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Don't wait to create unforgettable memories. Book your stay today and discover 
              what makes Hotel Kargil the ultimate luxury destination.
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
