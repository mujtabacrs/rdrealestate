'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Calendar, Users, Bed, Wifi, Car, Coffee, Star, Check, MapPin, 
  Phone, Mail, Globe, FileText, ChevronRight, ShieldCheck, 
  CarFront, Map, Activity, Utensils, Scissors, Plus, Minus
} from 'lucide-react'
import { IMAGES } from '@/config/images'

// Tariff Data Interfaces
interface TariffItem {
  name: string;
  tag?: string;
  prices: {
    EP: number | string;
    CP: number | string;
    MAP: number | string;
    AP: number | string;
  };
}

interface TariffCategory {
  category: string;
  items: TariffItem[];
}

// Tariff Data from Image 2
const TARIFF_DATA: TariffCategory[] = [
  {
    category: 'Rooms',
    items: [
      { 
        name: 'Luxury Double', 
        tag: 'Pet Included',
        prices: { EP: 2800, CP: 3100, MAP: 3600, AP: 3850 } 
      },
      { 
        name: 'Deluxe Double', 
        prices: { EP: 2500, CP: 2800, MAP: 3400, AP: 3600 } 
      },
    ]
  },
  {
    category: 'Extra Bed',
    items: [
      { 
        name: 'Extra Bed (Above 7 Yrs)', 
        prices: { EP: 1200, CP: 1400, MAP: 1600, AP: 1840 } 
      },
      { 
        name: 'Extra Bed (Below 7 Yrs)', 
        prices: { EP: 'FREE', CP: 350, MAP: 500, AP: 800 } 
      },
    ]
  }
]

const PLANS = [
  { id: 'EP', name: 'EP', desc: 'European Plan (Room Only)' },
  { id: 'CP', name: 'CP', desc: 'Continental Plan (+ Breakfast)' },
  { id: 'MAP', name: 'MAP', desc: 'Modified American Plan (+ Breakfast & Dinner)' },
  { id: 'AP', name: 'AP', desc: 'American Plan (All Meals Included)' },
]


export default function Booking() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    adults: '2',
    children: '0',
    roomType: '',
    roomPlan: '',
    extraBedType: '',
    extraBedPlan: '',
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reservationId, setReservationId] = useState('')
  const [error, setError] = useState('')

  const showError = (msg: string) => {
    setError(msg)
    setTimeout(() => setError(''), 4000)
  }

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Only allow numbers for phone field
    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '')
      setBookingData(prev => ({ ...prev, [name]: numericValue.slice(0, 10) }))
      return
    }

    setBookingData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectTariff = (category: string, name: string, plan: string) => {
    if (category === 'Rooms') {
      setBookingData(prev => ({ ...prev, roomType: name, roomPlan: plan }))
    } else {
      // Toggle extra bed selection
      if (bookingData.extraBedType === name && bookingData.extraBedPlan === plan) {
        setBookingData(prev => ({ ...prev, extraBedType: '', extraBedPlan: '' }))
      } else {
        setBookingData(prev => ({ ...prev, extraBedType: name, extraBedPlan: plan }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingData.fullName || !bookingData.phone || !bookingData.checkIn || !bookingData.checkOut) {
      showError("Complete all guest details")
      return
    }

    if (bookingData.phone.length !== 10) {
      showError("Enter 10-digit number")
      return
    }

    if (!bookingData.roomType || !bookingData.roomPlan) {
      const tariffSection = document.getElementById('room-tariff')
      if (tariffSection) {
        tariffSection.scrollIntoView({ behavior: 'smooth' })
        showError("Select a room first")
      }
      return
    }
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/leads/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      })

      const result = await response.json()

      if (!response.ok) throw new Error(result.error || 'Failed to submit')
      
      const mockId = `RES-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      setReservationId(mockId)
      setIsSubmitting(false)
      setCurrentStep(2)
    } catch (error) {
      setIsSubmitting(false)
      showError("Submission failed")
    }
  }

  const handlePrint = () => window.print()

  // Confirmation view is now rendered as a modal at the bottom of the component


  return (
    <div ref={containerRef} className="relative bg-[#0d0e12] text-white min-h-[300vh] overflow-x-hidden selection:bg-luxury-gold selection:text-white no-print">

      {/* Error Toast Notification */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-10 right-10 z-[200] bg-red-600 text-white px-8 py-4 rounded-2xl shadow-[0_20px_50px_rgba(220,38,38,0.3)] flex items-center gap-4 border border-white/20 backdrop-blur-md"
        >
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <p className="text-xs font-black uppercase tracking-[0.2em]">{error}</p>
        </motion.div>
      )}

      
      {/* Cinematic Hero - Original Section Restored */}
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
            Reserve
          </motion.span>
          <motion.span 
            style={{ y: titleY, scale: titleScale }}
            className="block font-editorial text-[4vw] italic tracking-widest text-luxury-gold"
          >
            Your Sanctuary
          </motion.span>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 bg-[#0b1527]">
        
        {/* Header / Hero Section (Image 1 Style - now below cinematic hero) */}
        <section className="relative py-20 px-4 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-10">
          <div className="space-y-2">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-luxury-gold tracking-[0.4em] text-sm font-bold uppercase"
            >
              Hotel The
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-7xl font-serif font-bold leading-none tracking-tight"
            >
              INDIAN KARGIL
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 tracking-[0.2em] text-xs uppercase border-t border-luxury-gold/30 pt-4 inline-block"
            >
              Kargil, J&K — Himalayan Hospitality
            </motion.p>
          </div>

          <div className="w-16 h-1 bg-luxury-gold" />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-300 italic leading-relaxed max-w-lg"
          >
            "Nestled under crystal blue skies, cradled in the Himalayan snow-clad mountains of Kargil — your perfect leisure & corporate retreat."
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-luxury-gold/30 p-4 rounded-lg flex items-center justify-center text-sm font-bold tracking-widest bg-white/5">
              12 Luxury Rooms
            </div>
            <div className="border border-luxury-gold/30 p-4 rounded-lg flex items-center justify-center text-sm font-bold tracking-widest bg-white/5">
              12 Deluxe Rooms
            </div>
          </div>

          {/* Features List Box (Image 1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white text-luxury-charcoal p-8 rounded-xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8"
          >
            {[
              'Professional Staff', 'Quality Service', 'Quality Food', 
              'Top Notch Infrastructure', 'Pet Friendly', '24x7 Electricity',
              '24x7 Water Supply (Hot&Cold)', 'Hygienic & Pure'
            ].map((f, i) => (
              <div key={f} className="flex items-center gap-3 text-sm font-bold">
                <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full" />
                {f}
              </div>
            ))}
          </motion.div>

          <div className="flex flex-col gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-gray-400 pt-8">
            <p className="text-luxury-gold font-bold">Lift Service / Adapted Rooms</p>
          </div>
        </div>

        {/* Facilities Section (Image 1 Style) */}
        <div className="lg:sticky lg:top-20 space-y-8">
          <div className="space-y-4">
            <h3 className="text-4xl font-serif font-bold tracking-widest uppercase text-white/90">FACILITIES</h3>
            <div className="w-32 h-1 bg-luxury-gold" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: CarFront, label: 'Free Car Parking' },
              { icon: Wifi, label: 'Free Wi-Fi' },
              { icon: Map, label: 'Taxi for Sightseeing' },
              { icon: Activity, label: 'Doctor on Call' },
              { icon: Scissors, label: 'Laundry Service' },
              { icon: Utensils, label: 'In House Luxury Restaurant' },
            ].map((fac, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ x: 10, borderColor: 'rgba(184, 147, 75, 0.5)', backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                className="flex items-center gap-6 p-6 border border-white/10 rounded-lg bg-white/5 transition-all group cursor-default"
              >
                <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors">
                  <fac.icon className="text-luxury-gold" size={24} />
                </div>
                <span className="text-lg tracking-widest uppercase font-light">{fac.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Tariff Section (Image 2 Style) */}
      <section id="room-tariff" className="bg-white text-luxury-charcoal py-24 px-4 md:px-12 border-t border-luxury-gold/20">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <p className="text-gray-400 tracking-[0.4em] text-xs uppercase font-bold">Hotel The Indian Ladakh — Kargil</p>
            <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-[#0b1527]">ROOM TARIFF</h2>
            <div className="w-24 h-1 bg-luxury-gold mx-auto" />
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto rounded-2xl shadow-2xl border border-gray-100">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="p-8 w-1/4"></th>
                  {PLANS.map(plan => (
                    <th key={plan.id} className="p-4">
                      <div className="bg-[#0b1527] text-white p-6 rounded-xl space-y-2 shadow-xl border-t-2 border-luxury-gold">
                        <p className="text-luxury-gold font-black text-2xl tracking-tighter">{plan.id}</p>
                        <p className="text-[0.6rem] uppercase leading-tight font-bold opacity-80">{plan.desc}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {TARIFF_DATA.map((cat, ci) => (
                  <React.Fragment key={ci}>
                    {cat.items.map((item, ii) => (
                      <tr key={item.name} className="group hover:bg-gray-50/80 transition-colors">
                        <td className="p-8">
                          <div className="space-y-1">
                            {item.tag && <p className="text-orange-600 text-[0.65rem] font-black uppercase tracking-widest">{item.tag}</p>}
                            <p className={`font-serif font-black ${cat.category === 'Extra Bed' ? 'text-green-700 text-lg' : 'text-2xl text-[#0b1527]'}`}>
                              {item.name}
                            </p>
                          </div>
                        </td>
                        {PLANS.map(plan => {
                          const isSelected = cat.category === 'Rooms' 
                            ? (bookingData.roomType === item.name && bookingData.roomPlan === plan.id)
                            : (bookingData.extraBedType === item.name && bookingData.extraBedPlan === plan.id);
                          
                          return (
                            <td 
                              key={plan.id} 
                              onClick={() => handleSelectTariff(cat.category, item.name, plan.id)}
                              className="p-8 text-center group/cell cursor-pointer relative"
                            >
                              <div className={`absolute inset-0 transition-colors ${isSelected ? 'bg-luxury-gold/10' : 'bg-luxury-gold/0 group-hover/cell:bg-luxury-gold/5'}`} />
                              <div className="relative z-10 space-y-3">
                                  <span className={`text-2xl font-serif font-bold transition-transform group-hover/cell:scale-110 block ${item.prices[plan.id as keyof typeof item.prices] === 'FREE' ? 'text-green-600 font-black' : 'text-[#0b1527]'}`}>
                                    {item.prices[plan.id as keyof typeof item.prices] === 'FREE' ? 'FREE' : `₹ ${item.prices[plan.id as keyof typeof item.prices]?.toLocaleString()}`}
                                  </span>
                                  <div className={`inline-block text-[0.6rem] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border transition-all duration-300 ${isSelected ? 'bg-luxury-gold text-white border-luxury-gold shadow-lg shadow-luxury-gold/30' : 'border-gray-200 text-gray-400 group-hover/cell:border-luxury-gold group-hover/cell:text-luxury-gold'}`}>
                                      {isSelected ? 'Selected' : 'Select'}
                                  </div>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-8">
            {TARIFF_DATA.map((cat, ci) => (
              <div key={ci} className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-luxury-gold px-2">
                  {cat.category}
                </h3>
                {cat.items.map((item, ii) => (
                  <div key={item.name} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-6 bg-gray-50 border-b border-gray-100">
                       {item.tag && <p className="text-orange-600 text-[0.6rem] font-black uppercase tracking-widest mb-1">{item.tag}</p>}
                       <h4 className="font-serif font-black text-2xl text-[#0b1527]">{item.name}</h4>
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-3">
                       {PLANS.map(plan => {
                         const isSelected = cat.category === 'Rooms' 
                            ? (bookingData.roomType === item.name && bookingData.roomPlan === plan.id)
                            : (bookingData.extraBedType === item.name && bookingData.extraBedPlan === plan.id);

                         return (
                           <div 
                             key={plan.id}
                             onClick={() => handleSelectTariff(cat.category, item.name, plan.id)}
                             className={`p-4 rounded-2xl border transition-all text-center space-y-1 group active:scale-95 ${isSelected ? 'border-luxury-gold bg-luxury-gold/5 shadow-inner' : 'border-gray-100'}`}
                           >
                             <p className="text-luxury-gold font-black text-[0.6rem] tracking-widest">{plan.id}</p>
                             <p className="text-[0.4rem] uppercase opacity-60 leading-tight font-black h-6 flex items-center justify-center">
                               {plan.id === 'EP' ? 'Room Only' : plan.id === 'CP' ? '+ Breakfast' : plan.id === 'MAP' ? '+ B&D' : 'All Meals'}
                             </p>
                             <p className={`text-lg font-serif font-bold ${item.prices[plan.id as keyof typeof item.prices] === 'FREE' ? 'text-green-600' : 'text-[#0b1527]'}`}>
                               {item.prices[plan.id as keyof typeof item.prices] === 'FREE' ? 'FREE' : `₹${item.prices[plan.id as keyof typeof item.prices]?.toLocaleString()}`}
                             </p>
                             <div className={`text-[0.5rem] font-black uppercase tracking-widest pt-2 transition-colors ${isSelected ? 'text-luxury-gold' : 'text-gray-300'}`}>
                               {isSelected ? '✓ Selected' : 'Tap to Select'}
                             </div>
                           </div>
                         );
                       })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className="text-center text-[0.7rem] text-gray-400 italic uppercase tracking-widest">* Click on any price to select your plan and continue to booking</p>
        </div>
      </section>

      <section id="booking-form" className="py-32 px-4 bg-[#0b1527] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px] -ml-48 -mb-48" />

        <div className="max-w-6xl mx-auto space-y-16 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-serif font-bold text-luxury-gold">Secure Your Stay</h2>
            <div className="w-20 h-1 bg-luxury-gold mx-auto" />
            <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Reservation Request Form</p>
          </div>

          <div className="bg-[#0b1b36] border border-white/10 p-8 md:p-16 rounded-[2rem] shadow-2xl relative overflow-hidden group hover:border-luxury-gold/30 transition-colors duration-700">
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 bg-luxury-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
            {/* Left Side: Stay Details */}
            <div className="space-y-10">
              <div className="space-y-6">
                <label className="text-[0.7rem] uppercase tracking-[0.3em] text-luxury-gold font-black flex items-center gap-2">
                  <Calendar size={14} /> Stay Dates
                </label>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <input 
                      type="text" name="checkIn" required 
                      placeholder="Check-In"
                      onFocus={(e) => e.target.type = 'date'}
                      onBlur={(e) => { if(!e.target.value) e.target.type = 'text' }}
                      value={bookingData.checkIn} onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-luxury-gold transition-colors text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <input 
                      type="text" name="checkOut" required 
                      placeholder="Check-Out"
                      onFocus={(e) => e.target.type = 'date'}
                      onBlur={(e) => { if(!e.target.value) e.target.type = 'text' }}
                      value={bookingData.checkOut} onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-luxury-gold transition-colors text-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-4">
                  <label className="text-[0.7rem] uppercase tracking-[0.3em] text-luxury-gold font-black flex items-center gap-2">
                    <Users size={14} /> Adults
                  </label>
                  <div className="flex items-center gap-4 bg-white/5 p-1 rounded-xl border border-white/10 w-fit">
                    <button 
                      type="button"
                      onClick={() => setBookingData(prev => ({ ...prev, adults: Math.max(1, parseInt(prev.adults) - 1).toString() }))}
                      className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-luxury-gold hover:text-[#0b1527] transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-xl font-bold w-8 text-center">{bookingData.adults}</span>
                    <button 
                      type="button"
                      onClick={() => setBookingData(prev => ({ ...prev, adults: Math.min(10, parseInt(prev.adults) + 1).toString() }))}
                      className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-luxury-gold hover:text-[#0b1527] transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[0.7rem] uppercase tracking-[0.3em] text-luxury-gold font-black flex items-center gap-2">
                    <Users size={14} /> Children
                  </label>
                  <div className="flex items-center gap-4 bg-white/5 p-1 rounded-xl border border-white/10 w-fit">
                    <button 
                      type="button"
                      onClick={() => setBookingData(prev => ({ ...prev, children: Math.max(0, parseInt(prev.children) - 1).toString() }))}
                      className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-luxury-gold hover:text-[#0b1527] transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-xl font-bold w-8 text-center">{bookingData.children}</span>
                    <button 
                      type="button"
                      onClick={() => setBookingData(prev => ({ ...prev, children: Math.min(10, parseInt(prev.children) + 1).toString() }))}
                      className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-luxury-gold hover:text-[#0b1527] transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[0.7rem] uppercase tracking-[0.3em] text-luxury-gold font-black">Selection Summary</label>
                <div className="space-y-3">
                  {bookingData.roomType ? (
                    <div className="p-6 border-2 border-luxury-gold/30 rounded-2xl bg-luxury-gold/5 flex justify-between items-center shadow-lg">
                      <div>
                        <p className="font-serif text-xl font-bold">{bookingData.roomType}</p>
                        <p className="text-[0.7rem] text-gray-400 font-bold uppercase tracking-widest mt-1">
                          {bookingData.roomPlan} Plan selected
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-luxury-gold text-[#0b1527] flex items-center justify-center">
                        <Check size={20} strokeWidth={3} />
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => document.getElementById('room-tariff')?.scrollIntoView({ behavior: 'smooth' })}
                      className="p-6 border-2 border-dashed border-white/10 rounded-2xl bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:border-luxury-gold/50 transition-colors"
                    >
                      <p className="text-[0.7rem] text-gray-500 font-black uppercase tracking-widest">No Room Selected</p>
                      <p className="text-luxury-gold text-[0.6rem] uppercase tracking-widest mt-2 animate-pulse">Click to select a service ↑</p>
                    </div>
                  )}
                  
                  {bookingData.extraBedType && (
                    <div className="p-6 border border-white/10 rounded-2xl bg-white/5 flex justify-between items-center">
                      <div>
                        <p className="font-serif text-lg font-bold">{bookingData.extraBedType}</p>
                        <p className="text-[0.7rem] text-gray-500 font-bold uppercase tracking-widest mt-1">
                          {bookingData.extraBedPlan} Plan added
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-luxury-gold/50 text-luxury-gold flex items-center justify-center">
                        <Check size={16} strokeWidth={3} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Guest Details */}
            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-[0.7rem] uppercase tracking-[0.3em] text-luxury-gold font-black">Full Name</label>
                <input 
                  type="text" name="fullName" placeholder="John Doe" required
                  value={bookingData.fullName} onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/10 pb-4 outline-none focus:border-luxury-gold transition-colors text-xl"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[0.7rem] uppercase tracking-[0.3em] text-luxury-gold font-black">WhatsApp Number</label>
                <input 
                  type="tel" name="phone" placeholder="Enter WhatsApp Number" required
                  inputMode="numeric"
                  maxLength={10}
                  value={bookingData.phone} onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/10 pb-4 outline-none focus:border-luxury-gold transition-colors text-xl"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[0.7rem] uppercase tracking-[0.3em] text-luxury-gold font-black">Special Requests</label>
                <textarea 
                  name="specialRequests" placeholder="Tell us if you have any specific needs..." rows={4}
                  value={bookingData.specialRequests} onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/10 pb-4 outline-none focus:border-luxury-gold transition-colors resize-none text-lg"
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" disabled={isSubmitting}
                className="w-full bg-luxury-gold text-[#0b1527] font-black py-6 rounded-xl text-lg uppercase tracking-widest shadow-2xl disabled:opacity-50 transition-all flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#0b1527]/30 border-t-[#0b1527] rounded-full animate-spin" />
                    Processing...
                  </>
                ) : 'Confirm Reservation Request'}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </section>

      </div>

      {/* Confirmation Modal - Clean Layout Popup */}
      {currentStep === 2 && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#0b1527]/95 backdrop-blur-xl no-print">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white text-black w-full max-w-2xl rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden relative flex flex-col max-h-[90vh]"
          >
            {/* Modal Header / Decoration */}
            <div className="h-2 bg-luxury-gold w-full" />
            
            <div className="p-8 md:p-12 bg-white text-center">
              {/* Screenshot Instruction */}
              <div className="mb-8 bg-luxury-gold/10 py-3 px-6 rounded-full inline-block border border-luxury-gold/20">
                <p className="text-luxury-gold text-[0.7rem] font-black uppercase tracking-[0.2em]">Please take a screenshot of this request</p>
              </div>

              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check size={32} strokeWidth={3} />
              </div>

              <h2 className="text-2xl font-serif font-black text-luxury-charcoal mb-8">Reservation Request Confirmed</h2>

              {/* Request Details for Screenshot */}
              <div className="max-w-md mx-auto bg-gray-50 rounded-3xl p-8 space-y-6 text-left border border-gray-100 shadow-sm mb-10">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="text-[0.6rem] uppercase font-black text-gray-400 tracking-widest">Request No</span>
                  <span className="font-black text-luxury-gold">{reservationId}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="text-[0.6rem] uppercase font-black text-gray-400 tracking-widest">Name</span>
                  <span className="font-bold text-gray-800">{bookingData.fullName}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="text-[0.6rem] uppercase font-black text-gray-400 tracking-widest">Phone</span>
                  <span className="font-bold text-gray-800">{bookingData.phone}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="text-[0.6rem] uppercase font-black text-gray-400 tracking-widest">Guests</span>
                  <span className="font-bold text-gray-800">{parseInt(bookingData.adults) + parseInt(bookingData.children)} Persons</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-[0.6rem] uppercase font-black text-gray-400 tracking-widest pt-1">Service</span>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{bookingData.roomType}</p>
                    <p className="text-[0.6rem] font-black uppercase text-luxury-gold">{bookingData.roomPlan} Plan</p>
                  </div>
                </div>
              </div>

              <div className="no-print">
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="w-full bg-[#0b1527] text-white py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl"
                >
                  Close & Back to Home
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;700;900&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.5;
          cursor: pointer;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(184, 147, 75, 0.3) transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(184, 147, 75, 0.2);
          border-radius: 20px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(184, 147, 75, 0.5);
        }

        @media print {
          /* Force hide the massive 300vh container and everything else */
          .no-print, .cinematic-hero, section, footer, nav {
            display: none !important;
            height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          html, body { 
            height: auto !important; 
            overflow: visible !important;
            background: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Ensure ONLY the printable area is shown and takes zero space from parents */
          #printable-area {
            display: block !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 15mm !important;
            background: white !important;
            z-index: 9999 !important;
            border: none !important;
            box-shadow: none !important;
          }

          /* Clean up the text for ink-saving and sharpness */
          #printable-area * {
            color: black !important;
            text-shadow: none !important;
            box-shadow: none !important;
          }

          /* Force single page at the browser level */
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </div>
  )
}
