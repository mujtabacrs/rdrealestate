'use client'

import { Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Properties', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-luxury-charcoal border-t border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-gradient">
              R.D Properties
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Your trusted partner for premium real estate investments and luxury properties. 
              Where every property becomes your perfect home.
            </p>
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
                <span>402 SBC Walk Near Amyra Kurali Road</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Phone size={18} className="text-luxury-gold" />
                <span>+91 80779 62542</span>
              </div>
              <div className="flex flex-col space-y-2 text-gray-600 dark:text-gray-300">
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-luxury-gold" />
                  <a href="mailto:rdpropertiesproperties@gmail.com" className="hover:text-luxury-gold transition-colors text-sm">rdpropertiesproperties@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-center items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2026 R.D Properties. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
