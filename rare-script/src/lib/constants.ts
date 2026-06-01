export const BRAND = {
  name: 'Rare Script',
  tagline: 'Faith Worn Rare',
  subTagline: 'Luxury Apparel for the Called',
  description:
    'Premium faith-based lifestyle brand crafting elevated apparel for those who walk with purpose.',
  email: 'hello@rarescript.com',
  phone: '+1 (888) 727-3724',
  address: '1 Faith Avenue, Nashville, TN 37201',
  social: {
    instagram: 'https://instagram.com/rarescript',
    tiktok: 'https://tiktok.com/@rarescript',
    pinterest: 'https://pinterest.com/rarescript',
    youtube: 'https://youtube.com/@rarescript',
  },
}

export const SCRIPTURES = [
  {
    text: 'For we are His workmanship, created in Christ Jesus for good works.',
    ref: 'Ephesians 2:10',
  },
  {
    text: 'She is clothed with strength and dignity, and she laughs without fear of the future.',
    ref: 'Proverbs 31:25',
  },
  {
    text: 'But you are a chosen people, a royal priesthood, a holy nation.',
    ref: '1 Peter 2:9',
  },
  {
    text: 'I can do all things through Christ who strengthens me.',
    ref: 'Philippians 4:13',
  },
]

export const MEMBERSHIP_TIERS = {
  STANDARD: {
    name: 'Standard',
    price: 0,
    description: 'Begin your Rare Script journey',
    perks: [
      'Member pricing on select items',
      'Birthday discount',
      'Early access to newsletter drops',
    ],
    color: 'stone',
  },
  RARE_CIRCLE: {
    name: 'Rare Circle',
    price: 19.99,
    description: 'Elevated access for the devoted',
    perks: [
      'Everything in Standard',
      '48-hour early access to all drops',
      'Member-exclusive colorways',
      '10% off every order',
      'Loyalty points on purchases',
      'Private faith community access',
    ],
    color: 'gold',
  },
  FOUNDERS_CIRCLE: {
    name: "Founder's Circle",
    price: 49.99,
    description: 'For those called to lead the movement',
    perks: [
      'Everything in Rare Circle',
      '72-hour early access + private previews',
      'Custom scripture-engraved packaging',
      '20% off every order',
      '2x loyalty points',
      'Exclusive Founder\'s-only capsule releases',
      'Personal style concierge',
      'Annual gift box',
    ],
    color: 'deepBrown',
  },
}

export const CATEGORIES = [
  { name: 'Leisurewear', slug: 'leisurewear', icon: '✦' },
  { name: 'T-Shirts', slug: 't-shirts', icon: '✦' },
  { name: 'Jackets', slug: 'jackets', icon: '✦' },
  { name: 'Caps', slug: 'caps', icon: '✦' },
  { name: 'Limited Drops', slug: 'limited-drops', icon: '✦' },
]

export const SHIPPING_RATES = [
  { name: 'Standard Shipping (5-7 days)', price: 8.99, minDays: 5, maxDays: 7 },
  { name: 'Express Shipping (2-3 days)', price: 18.99, minDays: 2, maxDays: 3 },
  { name: 'Overnight Shipping', price: 39.99, minDays: 1, maxDays: 1 },
]

export const FREE_SHIPPING_THRESHOLD = 150

export const TAX_RATE = 0.0875 // 8.75% default

export const LOYALTY_POINTS_PER_DOLLAR = 10
export const LOYALTY_POINTS_REDEMPTION_RATE = 100 // 100 points = $1
