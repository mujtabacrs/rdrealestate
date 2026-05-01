/**
 * Central Image Configuration
 * 
 * This file serves as a single source of truth for all images used in the application.
 * Updated to use local images from public/images/
 */

export const IMAGES = {
  // Common / Shared
  logo: '/images/hotel_the_inidan_kargil_logo-removebg-preview.png',
  
  // Home Page Sections
  home: {
    hero: {
      backdrop: '/images/khg1.jpeg',
    },
    origin: '/images/khg2.jpeg',
    videoTour: '/images/ladakh is calling (1).mp4',
    videoPreview: '/images/khg3.jpeg',
    glimpse: [
      {
        src: '/GLIMPSE/LADAKH SENERY 2.jpg',
        title: 'Lamayuru Monastery',
        description: 'The Moonland of Ladakh, where ancient architecture meets rugged terrain.'
      },
      {
        src: '/GLIMPSE/LADAKH SENERY 3.jpg',
        title: 'Pangong Tso',
        description: 'The sapphire blue waters reflecting the high-altitude Himalayan peaks.'
      },
      {
        src: '/GLIMPSE/LADAKH SENERY 4.jpg',
        title: 'Maitreya Buddha',
        description: 'The protector of Nubra Valley, standing tall against the snow-capped range.'
      },
      {
        src: '/GLIMPSE/LADAKH SENERY 5.jpg',
        title: 'The High Road',
        description: 'Journey through the highest motorable passes in the world.'
      },
      {
        src: '/GLIMPSE/LADAKH SENERY 6.jpg',
        title: 'Crystal Waters',
        description: 'The vibrant turquoise hues of Ladakh\'s high-altitude saline lakes.'
      },
      {
        src: '/GLIMPSE/LADAKH SENERY 7.jpg',
        title: 'Azure Horizons',
        description: 'Where the deep blue of the sky meets the clear mountain waters.'
      },
      {
        src: '/GLIMPSE/LADAKH SENERY 8.jpg',
        title: 'Gata Loops',
        description: '21 hair-raising bends on the highway, a testament to engineering and endurance.'
      },
      {
        src: '/GLIMPSE/LADAKH SENERY 9.jpg',
        title: 'Bactrian Camels',
        description: 'The unique double-humped inhabitants of the Hunder sand dunes.'
      },
      {
        src: '/GLIMPSE/NUBRA VALLEY.jpg',
        title: 'Nubra Sunset',
        description: 'The golden hour painting the Shyok River and the surrounding valley.'
      }
    ]
  },

  // Gallery Page (10 local images as requested)
  gallery: [
    {
      src: '/images/khg8.jpeg',
      title: 'Himalayan Sunrise',
      category: 'Nature'
    },
    {
      src: '/images/khg9.jpeg',
      title: 'Luxury Suite',
      category: 'Rooms'
    },
    {
      src: '/images/khg10.jpeg',
      title: 'Traditional Architecture',
      category: 'Culture'
    },
    {
      src: '/images/khg11.jpeg',
      title: 'Monastery View',
      category: 'Culture'
    },
    {
      src: '/images/khg12.jpeg',
      title: 'Zen Garden',
      category: 'Amenities'
    },
    {
      src: '/images/khg13.jpeg',
      title: 'Panoramic Lounge',
      category: 'Rooms'
    },
    {
      src: '/images/khg14.jpeg',
      title: 'Crystal Clear Lakes',
      category: 'Landscapes'
    },
    {
      src: '/images/khg15.jpeg',
      title: 'Fine Dining',
      category: 'Dining'
    },
    {
      src: '/images/khg16.jpeg',
      title: 'Himalayan Peak',
      category: 'Nature'
    },
    {
      src: '/images/khg17.jpeg',
      title: 'Night Sky',
      category: 'Nature'
    },
  ],

  // Booking Page
  booking: {
    hero: '/images/khg1.jpeg',
    rooms: {
      deluxe: '/images/khg8.jpeg',
      premium: '/images/khg9.jpeg',
      presidential: '/images/khg10.jpeg',
    }
  },

  // About Page
  about: {
    hero: '/images/about us image hero .jpeg',
    interior: '/images/about us .jpeg',
    owner: '/images/kiffayat-jaffri.jpg',
  }
}
