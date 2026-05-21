export const EID_DATE = new Date(2026, 4, 27, 0, 0, 0)
export const WHATSAPP_NUMBER = '923001234567'
export const WHATSAPP_DISPLAY = '03XX-XXXXXXX'

export type AnimalType = 'bakra' | 'bachra' | 'dumba' | 'oont'

export const ANIMALS: {
  id: AnimalType
  name: string
  nameUrdu: string
  emoji: string
  description: string
  time: string
  price: string
  tag?: string
}[] = [
  {
    id: 'bakra',
    name: 'Bakra / Bakri',
    nameUrdu: 'بکرا / بکری',
    emoji: '🐐',
    description: 'Small Animal — Perfect for a Single Family',
    time: '~1.5 to 2 hours',
    price: 'PKR 3,000',
    tag: 'Most Popular',
  },
  {
    id: 'bachra',
    name: 'Bachra / Gaye',
    nameUrdu: 'بچھڑا / گائے',
    emoji: '🐄',
    description: 'Medium Animal — Great for Joint Families',
    time: '~2 to 3 hours',
    price: 'PKR 6,000',
  },
  {
    id: 'dumba',
    name: 'Dumba / Mesh',
    nameUrdu: 'دنبہ / میش',
    emoji: '🐑',
    description: 'Premium Sheep — Sunnah Choice',
    time: '~1.5 to 2 hours',
    price: 'PKR 4,500',
    tag: 'Premium',
  },
  {
    id: 'oont',
    name: 'Oont',
    nameUrdu: 'اونٹ',
    emoji: '🐪',
    description: 'Large Animal — For Big Gatherings',
    time: '~4 to 5 hours',
    price: 'PKR 15,000',
    tag: 'Special Arrangement',
  },
]

export const CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Peshawar',
  'Faisalabad',
  'Multan',
  'Other',
] as const

export const EID_DAYS = [
  { value: '2026-05-27', label: '27 May', sublabel: 'Eid Day 1' },
  { value: '2026-05-28', label: '28 May', sublabel: 'Day 2' },
  { value: '2026-05-29', label: '29 May', sublabel: 'Day 3' },
] as const

export const TIME_SLOTS = [
  { value: 'early', label: 'Early Morning', sublabel: '5am – 8am' },
  { value: 'morning', label: 'Morning', sublabel: '8am – 11am' },
  { value: 'afternoon', label: 'Afternoon', sublabel: '11am – 2pm' },
  { value: 'evening', label: 'Evening', sublabel: '2pm – 5pm' },
] as const

export const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}
