'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Users, Bed, Wifi, Car, Coffee, Star, Check, MapPin, Wallet, ShieldCheck, ChevronRight, Gem, Phone, Mail, Globe, FileText } from 'lucide-react'
import { IMAGES } from '@/config/images'

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    adults: '2',
    children: '0',
    roomType: 'deluxe',
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reservationId, setReservationId] = useState('')
  
  const [inViewRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Hero Scroll Logic
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Hero Animations
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, 400])
  const titleScale = useTransform(scrollYProgress, [0, 0.25], [1, 2.5])
  const heroOpacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 0])
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2])

  const roomTypes = [
    {
      id: 'deluxe',
      name: 'Deluxe Suite',
      price: 450,
      image: IMAGES.booking.rooms.deluxe,
      features: ['Mountain View', 'King Bed', 'Private Balcony']
    },
    {
      id: 'premium',
      name: 'Premium Suite',
      price: 650,
      image: IMAGES.booking.rooms.premium,
      features: ['Panoramic View', 'Living Area', 'Butler Service']
    },
    {
      id: 'presidential',
      name: 'Presidential Suite',
      price: 1200,
      image: IMAGES.booking.rooms.presidential,
      features: ['Penthouse Level', 'Personal Chef', 'Private Dining']
    }
  ]

  const selectedRoom = roomTypes.find(room => room.id === bookingData.roomType)
  const nights = bookingData.checkIn && bookingData.checkOut 
    ? Math.max(1, Math.ceil((new Date(bookingData.checkOut).getTime() - new Date(bookingData.checkIn).getTime()) / (1000 * 60 * 60 * 24)))
    : 1
  const subtotal = selectedRoom ? selectedRoom.price * nights : 0
  const taxes = subtotal * 0.12
  const total = subtotal + taxes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBookingData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (currentStep === 1) {
      if (!bookingData.checkIn || !bookingData.checkOut) {
        alert("Please select your stay dates.");
        return;
      }
    }
    setCurrentStep(prev => prev + 1)
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })
  }

  const handleBack = () => setCurrentStep(prev => prev - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingData.fullName || !bookingData.email || !bookingData.phone) {
      alert("Please complete your guest details.");
      return;
    }
    setIsSubmitting(true)

    try {
      // Simulate API call and generate a mock ID
      const mockId = `RES-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      
      const response = await fetch('/api/leads/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bookingData, reservationId: mockId })
      });
      
      setReservationId(mockId)
      setIsSubmitting(false)
      setCurrentStep(3)
    } catch (error) {
      console.error("Booking submission failed:", error);
      setIsSubmitting(false)
      alert("Failed to submit reservation. Please try again.");
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div ref={containerRef} className="relative bg-[#0d0e12] text-white min-h-[300vh] overflow-x-hidden">
      
      {/* Cinematic Hero - Only visible at start */}
      <div className="cinematic-hero sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0 bg-[#0d0e12]">
        <motion.div 
          className="absolute inset-0 z-0 opacity-40 blur-[2px]"
          style={{ opacity: heroOpacity, scale: imageScale }}
        >
          <img 
            src={IMAGES.booking.hero}
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
            {currentStep === 3 ? 'Confirmed' : 'Reserve'}
          </motion.span>
          <motion.span 
            style={{ y: titleY, scale: titleScale }}
            className="block font-editorial text-[4vw] italic tracking-widest text-luxury-gold"
          >
            {currentStep === 3 ? 'See You Soon' : 'Your Sanctuary'}
          </motion.span>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <section className="booking-content-section relative z-10 py-24 bg-white dark:bg-luxury-dark text-black dark:text-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Step Indicator */}
          {currentStep < 3 && (
            <div className="flex justify-center mb-16">
              <div className="flex items-center gap-4">
                {[1, 2].map(s => (
                  <div key={s} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${currentStep >= s ? 'bg-luxury-gold text-black shadow-lg shadow-luxury-gold/20' : 'bg-gray-100 dark:bg-white/5 text-gray-400'}`}>
                      {currentStep > s ? <Check size={20} /> : s}
                    </div>
                    {s === 1 && <div className={`w-20 h-px transition-colors duration-500 ${currentStep > 1 ? 'bg-luxury-gold' : 'bg-gray-200 dark:bg-white/10'}`} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={`${currentStep === 3 ? 'max-w-3xl mx-auto' : 'grid grid-cols-1 lg:grid-cols-12 gap-16'}`}>
            
            {/* Left Content / Main Form */}
            <div className={currentStep === 3 ? '' : 'lg:col-span-8'}>
              
              {currentStep === 1 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                  <h2 className="text-4xl font-serif font-bold text-gradient">Select Dates & Occupancy</h2>
                  
                  {/* Date Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[0.6rem] uppercase tracking-[0.4em] text-luxury-gold font-bold flex items-center gap-2">
                        <Calendar size={14} /> Check-in
                      </label>
                      <div className="relative border-b border-gray-200 dark:border-white/10 pb-2 group focus-within:border-luxury-gold transition-colors">
                        <input 
                          type="date" 
                          name="checkIn" 
                          value={bookingData.checkIn} 
                          onChange={handleChange} 
                          onClick={(e) => { try { (e.currentTarget as any).showPicker(); } catch(err) {} }}
                          className="w-full bg-transparent text-2xl outline-none cursor-pointer dark:text-white" 
                        />
                        <Calendar className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold opacity-50 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[0.6rem] uppercase tracking-[0.4em] text-luxury-gold font-bold flex items-center gap-2">
                        <Calendar size={14} /> Check-out
                      </label>
                      <div className="relative border-b border-gray-200 dark:border-white/10 pb-2 group focus-within:border-luxury-gold transition-colors">
                        <input 
                          type="date" 
                          name="checkOut" 
                          value={bookingData.checkOut} 
                          onChange={handleChange} 
                          onClick={(e) => { try { (e.currentTarget as any).showPicker(); } catch(err) {} }}
                          className="w-full bg-transparent text-2xl outline-none cursor-pointer dark:text-white" 
                        />
                        <Calendar className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gold opacity-50 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Occupancy Selection */}
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[0.6rem] uppercase tracking-[0.4em] text-luxury-gold font-bold flex items-center gap-2">
                        <Users size={14} /> Adults
                      </label>
                      <select 
                        name="adults" 
                        value={bookingData.adults} 
                        onChange={handleChange} 
                        className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 pb-4 text-xl outline-none focus:border-luxury-gold transition-colors dark:text-white appearance-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n} className="bg-white dark:bg-luxury-charcoal">{n} Adults</option>)}
                        <option value="7+" className="bg-white dark:bg-luxury-charcoal">7+ Adults</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[0.6rem] uppercase tracking-[0.4em] text-luxury-gold font-bold flex items-center gap-2">
                        <Users size={14} /> Children
                      </label>
                      <select 
                        name="children" 
                        value={bookingData.children} 
                        onChange={handleChange} 
                        className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 pb-4 text-xl outline-none focus:border-luxury-gold transition-colors dark:text-white appearance-none cursor-pointer"
                      >
                        {[0, 1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n} className="bg-white dark:bg-luxury-charcoal">{n} Children</option>)}
                        <option value="7+" className="bg-white dark:bg-luxury-charcoal">7+ Children</option>
                      </select>
                    </div>
                  </div>

                  {/* Room Selection */}
                  <div className="space-y-6">
                    <label className="text-[0.6rem] uppercase tracking-[0.4em] text-luxury-gold font-bold">Select Suite</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {roomTypes.map((room) => (
                        <label key={room.id} className={`group cursor-pointer rounded-3xl border-2 p-6 transition-all duration-500 ${bookingData.roomType === room.id ? 'border-luxury-gold bg-luxury-gold/5' : 'border-gray-100 dark:border-white/5 hover:border-luxury-gold/30'}`}>
                          <input type="radio" name="roomType" value={room.id} checked={bookingData.roomType === room.id} onChange={handleChange} className="sr-only" />
                          <div className="aspect-video rounded-2xl overflow-hidden mb-6 shadow-xl">
                            <img src={room.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          </div>
                          <div className="flex justify-between items-end">
                            <div>
                              <h3 className="text-xl font-bold font-serif mb-1">{room.name}</h3>
                              <p className="text-luxury-gold font-bold">${room.price} <span className="text-xs text-gray-400 font-normal">/ Night</span></p>
                            </div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${bookingData.roomType === room.id ? 'bg-luxury-gold text-black' : 'bg-gray-100 dark:bg-white/5 text-transparent'}`}>
                              <Check size={18} />
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button onClick={handleNext} className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-6 rounded-2xl text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl">
                    Continue to Details
                  </button>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                  <button onClick={handleBack} className="text-luxury-gold flex items-center gap-2 font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all">
                    ← Back to selection
                  </button>
                  <h2 className="text-4xl font-serif font-bold text-gradient">Guest Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[0.6rem] uppercase tracking-[0.4em] text-luxury-gold font-bold">Full Name</label>
                      <input type="text" name="fullName" placeholder="John Doe" value={bookingData.fullName} onChange={handleChange} className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 pb-4 text-xl outline-none focus:border-luxury-gold transition-colors dark:text-white" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[0.6rem] uppercase tracking-[0.4em] text-luxury-gold font-bold">Email</label>
                      <input type="email" name="email" placeholder="john@example.com" value={bookingData.email} onChange={handleChange} className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 pb-4 text-xl outline-none focus:border-luxury-gold transition-colors dark:text-white" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[0.6rem] uppercase tracking-[0.4em] text-luxury-gold font-bold">WhatsApp / Phone</label>
                      <input type="tel" name="phone" placeholder="+91 00000 00000" value={bookingData.phone} onChange={handleChange} className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 pb-4 text-xl outline-none focus:border-luxury-gold transition-colors dark:text-white" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[0.6rem] uppercase tracking-[0.4em] text-luxury-gold font-bold">Special Requests</label>
                      <textarea name="specialRequests" placeholder="Any specific needs?" value={bookingData.specialRequests} onChange={handleChange} className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 pb-4 text-xl outline-none focus:border-luxury-gold transition-colors dark:text-white resize-none" rows={1} />
                    </div>
                  </div>

                  <button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-luxury-gold text-black font-bold py-6 rounded-2xl text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl">
                    {isSubmitting ? 'Securing Sanctuary...' : 'Confirm Reservation'}
                  </button>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pb-20 no-print">
                  {/* Matches Step 3 UI with the Printable Design */}
                  <div className="reservation-card-container relative bg-white text-black p-8 md:p-12 rounded-[2rem] shadow-2xl border-[12px] border-double border-luxury-gold/20 max-w-4xl mx-auto overflow-hidden">
                    
                    {/* Header: Logo & Contact */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12 border-b border-gray-100 pb-10">
                      <div className="flex-shrink-0">
                        <img src={IMAGES.logo} alt="The Indian Kargil" className="h-24 w-auto object-contain" />
                      </div>
                      <div className="text-right space-y-2 text-[0.7rem] uppercase tracking-widest text-gray-500">
                        <div className="flex items-center justify-end gap-2"><MapPin size={12} className="text-luxury-gold" /> Kargil, Ladakh, J&K, India</div>
                        <div className="flex items-center justify-end gap-2"><Phone size={12} className="text-luxury-gold" /> +91 12345 67890</div>
                        <div className="flex items-center justify-end gap-2"><Mail size={12} className="text-luxury-gold" /> info@theindiankargil.com</div>
                        <div className="flex items-center justify-end gap-2"><Globe size={12} className="text-luxury-gold" /> www.theindiankargil.com</div>
                      </div>
                    </div>

                    {/* Title Section */}
                    <div className="text-center mb-12">
                      <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-4 text-luxury-charcoal flex items-center justify-center gap-4">
                        <span className="h-px w-12 bg-luxury-gold/30" /> RESERVATION CONFIRMATION <span className="h-px w-12 bg-luxury-gold/30" />
                      </h2>
                      <div className="inline-block bg-luxury-gold text-white px-10 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-4 shadow-lg shadow-luxury-gold/20">
                        Reservation Confirmed
                      </div>
                      <p className="text-xs text-gray-400 font-mono">Confirmation ID: <span className="text-black font-bold">{reservationId}</span></p>
                    </div>

                    {/* Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-12">
                      {/* Guest Details */}
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold"><Users size={20} /></div>
                        <div>
                          <p className="text-[0.6rem] uppercase tracking-widest text-luxury-gold font-bold mb-1">Guest Details</p>
                          <p className="font-bold text-lg leading-tight">{bookingData.fullName}</p>
                          <p className="text-xs text-gray-400 mt-1">{bookingData.email}</p>
                          <p className="text-xs text-gray-400">{bookingData.phone}</p>
                        </div>
                      </div>

                      {/* Check-In */}
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold"><Calendar size={20} /></div>
                        <div>
                          <p className="text-[0.6rem] uppercase tracking-widest text-luxury-gold font-bold mb-1">Check-In</p>
                          <p className="font-bold text-lg leading-tight">{bookingData.checkIn}</p>
                          <p className="text-xs text-gray-400 mt-1">After 2:00 PM</p>
                        </div>
                      </div>

                      {/* Accommodation */}
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold"><Bed size={20} /></div>
                        <div>
                          <p className="text-[0.6rem] uppercase tracking-widest text-luxury-gold font-bold mb-1">Accommodation</p>
                          <p className="font-bold text-lg leading-tight">{selectedRoom?.name}</p>
                          <p className="text-xs text-gray-400 mt-1">{bookingData.adults} Adults, {bookingData.children} Children</p>
                        </div>
                      </div>

                      {/* Check-Out */}
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold"><Calendar size={20} /></div>
                        <div>
                          <p className="text-[0.6rem] uppercase tracking-widest text-luxury-gold font-bold mb-1">Check-Out</p>
                          <p className="font-bold text-lg leading-tight">{bookingData.checkOut}</p>
                          <p className="text-xs text-gray-400 mt-1">Before 11:00 AM</p>
                        </div>
                      </div>
                    </div>

                    {/* Pricing Summary Box */}
                    <div className="relative bg-white border border-luxury-gold/20 rounded-2xl p-8 mb-12 shadow-sm">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6">
                         <h3 className="text-sm font-serif font-bold text-luxury-gold flex items-center gap-4">
                            <span className="h-px w-6 bg-luxury-gold/30" /> PRICING SUMMARY <span className="h-px w-6 bg-luxury-gold/30" />
                         </h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest">
                          <span>Description</span>
                          <span>Amount</span>
                        </div>
                        <div className="h-px bg-gray-100" />
                        <div className="flex justify-between text-sm">
                          <span>{nights} Nights Stay</span>
                          <span className="font-bold">${subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400 italic">
                          <span>Taxes & Fees (12%)</span>
                          <span>${taxes.toLocaleString()}</span>
                        </div>
                        <div className="h-px bg-gray-100" />
                        <div className="flex justify-between items-end">
                          <span className="font-serif text-lg font-bold">TOTAL AMOUNT</span>
                          <span className="text-2xl font-serif font-bold text-luxury-gold">${total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-gray-50 rounded-2xl p-6 mb-12">
                      <div className="flex items-center gap-3 mb-4 text-luxury-gold">
                        <FileText size={18} />
                        <h4 className="text-xs font-bold uppercase tracking-widest">Important Notes</h4>
                      </div>
                      <ul className="text-[0.7rem] text-gray-500 space-y-2 list-disc pl-4">
                        <li>Check-in requires valid photo ID for all guests.</li>
                        <li>Early check-in is subject to availability upon arrival.</li>
                        <li>Cancellation policy as per hotel terms & conditions.</li>
                      </ul>
                    </div>

                    {/* Footer Mountain Graphic Placeholder */}
                    <div className="text-center pt-8 border-t border-gray-100 relative">
                       <p className="font-serif italic text-2xl text-luxury-gold mb-2">Thank you</p>
                       <p className="text-[0.6rem] uppercase tracking-[0.4em] text-gray-400">for choosing Hotel The Indian Kargil.</p>
                       <div className="mt-4 flex justify-center opacity-10">
                          <img src={IMAGES.booking.hero} className="h-20 w-full object-cover rounded-full blur-[2px]" />
                       </div>
                    </div>

                    {/* Page Controls - Hidden in print */}
                    <div className="mt-12 flex flex-col md:flex-row justify-center gap-4 no-print">
                      <button onClick={handlePrint} className="flex items-center justify-center gap-2 px-10 py-4 bg-luxury-gold text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                        Print Confirmation
                      </button>
                      <Link href="/" className="flex items-center justify-center gap-2 px-10 py-4 bg-luxury-charcoal text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                        Back to Home
                      </Link>
                    </div>

                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Side Summary - Hidden in Step 3 */}
            {currentStep < 3 && (
              <div className="lg:col-span-4 relative">
                <div className="sticky top-32 space-y-8">
                  <div className="bg-white dark:bg-luxury-charcoal rounded-3xl p-8 border border-gray-100 dark:border-white/5 shadow-2xl space-y-8">
                    <div className="flex gap-4 pb-6 border-b border-gray-100 dark:border-white/5">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg">
                        <img src={selectedRoom?.image} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{selectedRoom?.name}</h4>
                        <p className="text-xs text-gray-400">{nights} Night{nights > 1 ? 's' : ''}</p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Accommodation</span>
                        <span>${subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Taxes (12%)</span>
                        <span>${taxes.toLocaleString()}</span>
                      </div>
                      <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex justify-between font-bold text-xl">
                        <span>Total</span>
                        <span className="text-luxury-gold">${total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final Printable Receipt - Isolated from animations - Matches the UI above */}
      <div id="printable-receipt" className="hidden print:block bg-white text-black p-0 w-full">
         <div className="reservation-card-container relative bg-white text-black p-12 border-[12px] border-double border-luxury-gold/20 w-full max-w-4xl mx-auto overflow-hidden">
                    
            {/* Header: Logo & Contact */}
            <div className="flex justify-between items-start mb-12 border-b border-gray-100 pb-10">
              <div className="flex-shrink-0">
                <img src={IMAGES.logo} alt="The Indian Kargil" className="h-24 w-auto object-contain" />
              </div>
              <div className="text-right space-y-1 text-[0.65rem] uppercase tracking-widest text-gray-500">
                <p>Kargil, Ladakh, J&K, India</p>
                <p>+91 12345 67890</p>
                <p>info@theindiankargil.com</p>
                <p>www.theindiankargil.com</p>
              </div>
            </div>

            {/* Title Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold tracking-tight mb-4 text-luxury-charcoal">
                RESERVATION CONFIRMATION
              </h2>
              <div className="inline-block bg-luxury-gold text-white px-10 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-4">
                Reservation Confirmed
              </div>
              <p className="text-xs text-gray-400 font-mono">Confirmation ID: <span className="text-black font-bold">{reservationId}</span></p>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-10 mb-12">
              <div>
                <p className="text-[0.6rem] uppercase tracking-widest text-luxury-gold font-bold mb-2">Guest Details</p>
                <p className="font-bold text-lg">{bookingData.fullName}</p>
                <p className="text-xs text-gray-500 mt-1">{bookingData.email}</p>
                <p className="text-xs text-gray-500">{bookingData.phone}</p>
              </div>
              <div>
                <p className="text-[0.6rem] uppercase tracking-widest text-luxury-gold font-bold mb-2">Check-In</p>
                <p className="font-bold text-lg">{bookingData.checkIn}</p>
                <p className="text-xs text-gray-500 mt-1">After 2:00 PM</p>
              </div>
              <div>
                <p className="text-[0.6rem] uppercase tracking-widest text-luxury-gold font-bold mb-2">Accommodation</p>
                <p className="font-bold text-lg">{selectedRoom?.name}</p>
                <p className="text-xs text-gray-500 mt-1">{bookingData.adults} Adults, {bookingData.children} Children</p>
              </div>
              <div>
                <p className="text-[0.6rem] uppercase tracking-widest text-luxury-gold font-bold mb-2">Check-Out</p>
                <p className="font-bold text-lg">{bookingData.checkOut}</p>
                <p className="text-xs text-gray-500 mt-1">Before 11:00 AM</p>
              </div>
            </div>

            {/* Pricing Summary Box */}
            <div className="relative border border-luxury-gold/20 rounded-2xl p-8 mb-12">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6">
                 <h3 className="text-[0.6rem] font-serif font-bold text-luxury-gold uppercase tracking-[0.3em]">Pricing Summary</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-[0.6rem] text-gray-400 uppercase tracking-widest">
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{nights} Nights Stay</span>
                  <span className="font-bold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Taxes & Fees (12%)</span>
                  <span>${taxes.toLocaleString()}</span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex justify-between items-end">
                  <span className="font-serif text-lg font-bold">TOTAL AMOUNT</span>
                  <span className="text-xl font-serif font-bold text-luxury-gold">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-gray-50 rounded-xl p-6 mb-12">
              <h4 className="text-[0.6rem] font-bold uppercase tracking-widest text-luxury-gold mb-3">Important Notes</h4>
              <ul className="text-[0.65rem] text-gray-500 space-y-1 list-disc pl-4">
                <li>Check-in requires valid photo ID.</li>
                <li>Early check-in subject to availability.</li>
                <li>Cancellation as per hotel terms.</li>
              </ul>
            </div>

            {/* Footer */}
            <div className="text-center pt-8 border-t border-gray-100">
               <p className="font-serif italic text-xl text-luxury-gold mb-1">Thank you</p>
               <p className="text-[0.6rem] uppercase tracking-[0.4em] text-gray-400">for choosing Hotel The Indian Kargil.</p>
            </div>
          </div>
      </div>

      <style jsx global>{`
        @media print {
          /* Kill everything else */
          body > *:not(#printable-receipt) {
            display: none !important;
          }
          nav, footer, .no-print, .cinematic-hero, .booking-content-section {
            display: none !important;
          }
          
          /* Force receipt to show */
          #printable-receipt {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          html, body {
            background: white !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
