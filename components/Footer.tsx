'use client'

import { motion } from 'framer-motion'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ]

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
    { name: 'Booking', href: '/booking' },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-luxury-charcoal border-t border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-gradient">
              Hotel Kargil
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Experience unparalleled luxury and comfort at our premium resort in Ladakh. 
              Where every moment becomes a cherished memory.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-luxury-gold/20 rounded-full flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-white transition-all duration-300"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-luxury-gold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-luxury-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-luxury-gold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <MapPin size={18} className="text-luxury-gold" />
                <span>Main Market Kargil, Ladakh</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Phone size={18} className="text-luxury-gold" />
                <span>+91 1985 232022</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Mail size={18} className="text-luxury-gold" />
                <span>info@theindiankargil.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-luxury-gold">Newsletter</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Subscribe to receive exclusive offers and updates.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-luxury-gold transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-luxury"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2026 Hotel Kargil. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-luxury-gold text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-luxury-gold text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
