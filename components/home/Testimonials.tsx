'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: "Rajeet Kumar",
    initial: "R",
    color: "bg-blue-600",
    text: "R.D Properties helped us find our dream home in just 3 weeks! Their market knowledge and professional service made the entire buying process smooth and stress-free. Highly recommended for anyone looking for premium properties.",
    rating: 5,
  },
  {
    name: "Rambir Singh",
    initial: "R",
    color: "bg-orange-600",
    text: "Sold my property above asking price thanks to their excellent marketing strategy and negotiation skills. The team at R.D Properties truly understands the real estate market and delivers exceptional results.",
    rating: 5,
  },
  {
    name: "Ashish Sharma",
    initial: "A",
    color: "bg-teal-600",
    text: "Found the perfect rental apartment through R.D Properties. Their attention to detail and personalized service made apartment hunting a breeze. Great location, fair pricing, and professional management.",
    rating: 5,
  },
  {
    name: "Yogender Patel",
    initial: "Y",
    color: "bg-pink-600",
    text: "Excellent commercial leasing experience. R.D Properties secured us a prime office location with flexible terms that perfectly suited our business needs. Professional service from start to finish.",
    rating: 5,
  },
  {
    name: "Ashish Gupta",
    initial: "A",
    color: "bg-indigo-600",
    text: "Outstanding investment advisory services! R.D Properties guided us through multiple property investments with expert market insights. Our portfolio has grown significantly thanks to their strategic guidance.",
    rating: 5,
  }
]

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative py-40 bg-[#0d0e12] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-luxury-gold/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-12">
          <div className="space-y-4">
            <span className="text-[0.6rem] uppercase tracking-[0.6em] text-luxury-gold font-black mb-4 block">
              Client Success Stories
            </span>
            <h2 className="font-editorial text-5xl md:text-7xl text-white leading-none">
              Client <span className="italic text-luxury-gold">Voices</span>
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
               <div className="flex items-center gap-4 mb-1">
                  <div className="flex -space-x-2">
                    {testimonials.slice(0, 4).map((t, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#0d0e12] ${t.color} flex items-center justify-center text-[0.5rem] font-bold`}>
                        {t.initial}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="text-luxury-gold fill-luxury-gold" />
                    ))}
                  </div>
               </div>
               <p className="text-white/40 text-[0.5rem] uppercase font-black tracking-widest">4.9 / 5.0 Global Rating</p>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-4">
               <button 
                onClick={() => scroll('left')}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-luxury-gold hover:text-[#0d0e12] transition-all group shadow-xl"
               >
                 <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
               </button>
               <button 
                onClick={() => scroll('right')}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-luxury-gold hover:text-[#0d0e12] transition-all group shadow-xl"
               >
                 <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>
        </div>

        {/* Horizontal Slider Area - No Scrollbar */}
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-10 no-scrollbar snap-x snap-mandatory -mx-6 px-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="min-w-[300px] md:min-w-[420px] bg-white rounded-[2.5rem] p-8 snap-center flex flex-col justify-between shadow-2xl relative group"
            >
              <div className="absolute top-6 right-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <Quote size={60} className="text-black" />
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-luxury-gold fill-luxury-gold" />
                  ))}
                </div>
                <p className="text-lg md:text-xl font-serif text-[#0b1527] leading-snug italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 relative z-10 border-t border-gray-100 pt-6">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-black text-base shadow-xl`}>
                  {t.initial}
                </div>
                <div>
                  <p className="font-bold text-base text-[#0b1527] leading-none mb-1">{t.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[0.5rem] uppercase font-black tracking-widest text-gray-400">Verified Client on</span>
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" 
                      alt="Google" 
                      className="h-2.5 w-auto grayscale opacity-50" 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
