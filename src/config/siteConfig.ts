export const siteConfig = {
  name: 'scaiblu',
  tagline: 'DJ · Sound Curator',
  description: 'scaiblu — DJ and music producer blending genres into unique sonic experiences.',
  ogImage: 'https://scaiblu.com/logo.png',

  links: {
    instagram: 'https://www.instagram.com/scaiblu/',
    youtube: 'https://www.youtube.com/@djscaiblu',
    soundcloud: 'https://soundcloud.com/scaiblu',
  },

  hero: {
    image:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1920&q=85&fm=webp',
    imageFallback:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1920&q=80',
    title: 'scaiblu',
    subtitle: 'DJ · Sound Curator ·  Vibe Creator',
  },

  social: {
    title: 'Social Media',
    carousel: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=1400&q=85&fm=webp',
        alt: 'DJ performing at a night event',
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1400&q=85&fm=webp',
        alt: 'DJ booth with colorful lights',
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1400&q=85&fm=webp',
        alt: 'Crowd at a music festival',
      },
      {
        id: 4,
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1400&q=85&fm=webp',
        alt: 'Music production setup',
      },
    ],
  },

  music: {
    title: 'Music Collection',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1400&q=85&fm=webp',
    alt: 'Music collection and vinyl records',
  },

  contact: {
    title: 'Contact',
    image: '',
    alt: 'Contact background',
    email: 'hello@scaiblu.com',
    location: 'Amsterdam, NL',
    bookingText: 'Available for bookings, collaborations & events.',
  },

  footer: {
    privacyUrl: '/privacy',
    confidentialityUrl: '/confidentiality',
  },

} as const;
