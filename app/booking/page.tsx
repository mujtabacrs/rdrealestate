'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Users, Bed, Wifi, Car, Coffee, Star, Check, MapPin, Wallet, ShieldCheck, ChevronRight, Gem } from 'lucide-react'

export default function Booking() {
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    adults: '2',
    children: '1',
    roomType: 'deluxe'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [inViewRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Hero Scroll Logic
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Hero Animations (Sinking Zoom)
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, 400])
  const titleScale = useTransform(scrollYProgress, [0, 0.25], [1, 2.5])
  const heroOpacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 0])
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2])

  const roomTypes = [
    {
      id: 'deluxe',
      name: 'Deluxe Suite',
      price: 450,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      features: ['Ocean View', 'King Bed', 'Private Balcony', 'Marble Bathroom']
    },
    {
      id: 'premium',
      name: 'Premium Suite',
      price: 650,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      features: ['Panoramic View', 'King Bed', 'Living Area', 'Jacuzzi', 'Butler Service']
    },
    {
      id: 'presidential',
      name: 'Presidential Suite',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      features: ['Penthouse Level', 'Master Bedroom', 'Private Dining', 'Personal Chef', 'Helicopter Access']
    }
  ]

  const selectedRoom = roomTypes.find(room => room.id === bookingData.roomType)
  const nights = bookingData.checkIn && bookingData.checkOut 
    ? Math.ceil((new Date(bookingData.checkOut).getTime() - new Date(bookingData.checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 1
  const subtotal = selectedRoom ? selectedRoom.price * nights : 0
  const taxes = subtotal * 0.12
  const total = subtotal + taxes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setBookingData(prev => ({ ...prev, [name]: value }))
  }

  const scrollToStep01 = () => {
    document.getElementById('step-01')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/leads/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      
      if (!response.ok) throw new Error('Network error');
      
      setIsSubmitting(false)
      alert('Experience Reserved. A concierge will contact you shortly via WhatsApp or Phone.')
    } catch (error) {
      console.error("Booking submission failed:", error);
      setIsSubmitting(false)
      alert("Failed to submit reservation. Please try again.");
    }
  }

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    try {
      (e.currentTarget as any).showPicker();
    } catch (err) {
      console.warn('Native picker not supported.');
    }
  }

  return (
    <div ref={containerRef} className="relative bg-[#0d0e12] text-white min-h-[350vh] overflow-x-hidden">
      
      {/* Cinematic Hero */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0 bg-[#0d0e12]">
        <motion.div 
          className="absolute inset-0 z-0 opacity-40 blur-[2px]"
          style={{ opacity: heroOpacity, scale: imageScale }}
        >
          <img 
            src="https://images.unsplash.com/photo-1544070078-a212eda27b49?q=80&w=2070&auto=format&fit=crop"
            alt="Ladakh Background"
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </motion.div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center pointer-events-none"
        >
          <motion.span 
            style={{ y: titleY, scale: titleScale }}
            className="block font-editorial text-[10vw] leading-none uppercase tracking-tighter text-white"
          >
            Reserve
          </motion.span>
          <motion.span 
            style={{ y: titleY, scale: titleScale }}
            className="block font-editorial text-[4vw] italic tracking-widest text-[#d4af37]"
          >
            Your Sanctuary
          </motion.span>
        </motion.div>
      </div>

      {/* Booking Form Content */}
      <section className="relative z-10 py-24 bg-white dark:bg-luxury-dark text-black dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-8">
              <motion.div
                ref={inViewRef}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8 }}
                className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl"
              >
                <div id="step-01" className="scroll-mt-32">
                  <h2 className="text-3xl font-serif font-bold text-gradient mb-8">
                    Reservation Details
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                      <div className="space-y-4">
                        <label className="text-[0.6rem] uppercase tracking-[0.4em] text-luxury-gold font-bold flex items-center gap-2">
                          <Calendar size={14} className="text-luxury-gold" />
                          Check-in
                        </label>
                        <div className="relative border-b border-gray-300 dark:border-white/20 pb-2 group focus-within:border-luxury-gold transition-colors">
                          <input 
                            type="date" 
                            name="checkIn" 
                            value={bookingData.checkIn} 
                            onChange={handleChange}
                            onClick={handleInputClick}
                            className="w-full bg-transparent text-xl outline-none cursor-pointer pr-10 min-h-[40px]" 
                          />
                          <Calendar className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold pointer-events-none opacity-80" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[0.6rem] uppercase tracking-[0.4em] text-luxury-gold font-bold flex items-center gap-2">
                          <Calendar size={14} className="text-luxury-gold" />
                          Check-out
                        </label>
                        <div className="relative border-b border-gray-300 dark:border-white/20 pb-2 group focus-within:border-luxury-gold transition-colors">
                          <input 
                            type="date" 
                            name="checkOut" 
                            value={bookingData.checkOut} 
                            onChange={handleChange}
                            onClick={handleInputClick}
                            className="w-full bg-transparent text-xl outline-none cursor-pointer pr-10 min-h-[40px]" 
                          />
                          <Calendar className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold pointer-events-none opacity-80" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <label className="text-[0.6rem] uppercase tracking-[0.4em] text-luxury-gold font-bold flex items-center gap-2">
                          <Users size={14} />
                          Adults
                        </label>
                        <div className="relative border-b border-gray-300 dark:border-white/20 pb-2 focus-within:border-luxury-gold transition-colors">
                          <select 
                            name="adults" 
                            value={bookingData.adults} 
                            onChange={handleChange}
                            className="w-full bg-transparent text-xl outline-none appearance-none cursor-pointer"
                          >
                            {[1, 2, 3, 4, 5, 6].map(num => <option key={num} value={num} className="bg-white dark:bg-luxury-charcoal text-black dark:text-white">{num} Adults</option>)}
                          </select>
                          <Users className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[0.6rem] uppercase tracking-[0.4em] text-luxury-gold font-bold flex items-center gap-2">
                          <Users size={14} />
                          Children (Below 7)
                        </label>
                        <div className="relative border-b border-gray-300 dark:border-white/20 pb-2 focus-within:border-luxury-gold transition-colors">
                          <select 
                            name="children" 
                            value={bookingData.children} 
                            onChange={handleChange}
                            className="w-full bg-transparent text-xl outline-none appearance-none cursor-pointer"
                          >
                            {[0, 1, 2, 3, 4].map(num => <option key={num} value={num} className="bg-white dark:bg-luxury-charcoal text-black dark:text-white">{num} Children</option>)}
                          </select>
                          <Users className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <label className="text-[0.6rem] uppercase tracking-[0.4em] text-luxury-gold font-bold">Select Your Sanctuary</label>
                      <div className="space-y-4">
                        {roomTypes.map((room) => (
                          <label key={room.id} className={`block cursor-pointer rounded-2xl border-2 p-8 transition-all duration-500 ${bookingData.roomType === room.id ? 'border-luxury-gold bg-luxury-gold/5 dark:bg-luxury-gold/10' : 'border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 shadow-sm hover:border-gray-200 dark:hover:border-white/30'}`}>
                            <input type="radio" name="roomType" value={room.id} checked={bookingData.roomType === room.id} onChange={handleChange} className="sr-only" />
                            <div className="flex flex-col md:flex-row items-center gap-10">
                                <div className="w-full md:w-32 h-24 rounded-xl overflow-hidden shadow-lg">
                                  <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 text-center md:text-left text-black dark:text-white">
                                    <h3 className="text-xl font-bold font-serif">{room.name}</h3>
                                    <div className="text-luxury-gold font-bold text-lg">${room.price.toFixed(2)} / night</div>
                                </div>
                                {bookingData.roomType === room.id && <Check className="text-luxury-gold" size={24} />}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>

            {/* Airbnb-style Manifest */}
            <div className="lg:col-span-4 translate-y-[-2rem] lg:translate-y-0">
              <div className="bg-white dark:bg-luxury-charcoal rounded-3xl p-8 border border-gray-100 dark:border-white/5 shadow-2xl space-y-8 sticky top-32">
                
                {/* Header */}
                <div className="flex gap-6 border-b border-gray-100 dark:border-white/5 pb-8">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                    <img src={selectedRoom?.image} alt={selectedRoom?.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-bold text-lg text-black dark:text-white leading-tight mb-1">{selectedRoom?.name}</h3>
                    <div className="flex items-center gap-1 text-[0.7rem]">
                      <Star className="w-3 h-3 text-luxury-gold fill-luxury-gold" />
                      <span className="font-bold text-black dark:text-white">4.88 (84)</span>
                      <span className="text-gray-400 ml-1">· Guest favourite</span>
                    </div>
                  </div>
                </div>

                <p className="text-[0.75rem] text-black dark:text-gray-300 leading-relaxed italic">
                  This reservation is non-refundable. <span className="underline font-bold cursor-pointer">Full policy</span>
                </p>

                {/* Itemized Blocks */}
                <div className="space-y-6 pt-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="text-[0.8rem] font-bold text-black dark:text-white uppercase tracking-tight">Dates</h4>
                      <div className="text-[0.85rem] text-gray-500 dark:text-gray-400">
                        {bookingData.checkIn || '—'} {bookingData.checkIn && '–'} {bookingData.checkOut || ''}
                      </div>
                    </div>
                    <button onClick={scrollToStep01} className="text-[0.8rem] font-bold underline text-black dark:text-white">Change</button>
                  </div>

                  <div className="flex justify-between items-start pt-4 border-t border-gray-100 dark:border-white/5">
                    <div className="space-y-1">
                      <h4 className="text-[0.8rem] font-bold text-black dark:text-white uppercase tracking-tight">Guests</h4>
                      <div className="text-[0.85rem] text-gray-500 dark:text-gray-400">
                        {bookingData.adults} adult{parseInt(bookingData.adults) > 1 ? 's' : ''}
                        {parseInt(bookingData.children) > 0 ? `, ${bookingData.children} child${parseInt(bookingData.children) > 1 ? 'ren' : ''}` : ''}
                      </div>
                    </div>
                    <button onClick={scrollToStep01} className="text-[0.8rem] font-bold underline text-black dark:text-white">Change</button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="pt-8 space-y-4">
                  <h4 className="text-[0.9rem] font-bold text-black dark:text-white mb-4 italic">Price details</h4>
                  <div className="flex justify-between text-[0.85rem] text-gray-500 dark:text-gray-400">
                    <span>{nights} night{nights > 1 ? 's' : ''} x ${selectedRoom?.price}</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[0.85rem] text-gray-500 dark:text-gray-400">
                    <span className="underline">Taxes</span>
                    <span>${taxes.toLocaleString()}</span>
                  </div>
                  <div className="pt-6 border-t border-gray-100 dark:border-white/10 flex justify-between font-bold text-lg text-black dark:text-white">
                    <span>Total (USD)</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <div className="text-[0.7rem] text-luxury-gold flex items-center gap-1 font-bold pt-2 italic">
                     <Wallet className="w-4 h-4" /> Book Now, Pay at Hotel
                  </div>
                </div>

                {/* Action Button - Updated to Golden Theme */}
                <div className="pt-8 text-center">
                  <motion.button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-luxury-gold to-[#b3912e] text-black font-bold py-4 rounded-full transition-all shadow-xl text-lg relative overflow-hidden group shadow-luxury-gold/20"
                  >
                    <span className="relative z-10">{isSubmitting ? 'Syncing...' : 'Reserve'}</span>
                  </motion.button>
                  <p className="mt-4 text-[0.85rem] text-gray-500 dark:text-gray-400">
                    You won't be charged yet
                  </p>
                </div>

                {/* Security info */}
                <div className="pt-6 flex flex-col gap-4 text-[0.55rem] uppercase tracking-widest text-gray-400 border-t border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-luxury-gold" /> High altitude security encryption
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
