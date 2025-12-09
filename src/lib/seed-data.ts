// Database seed data for initial product setup

import { Product, Category } from '@/lib/types'

export const seedCategories: Omit<Category, '_id' | 'createdAt' | 'updatedAt'>[] = [
  {
    id: 1,
    name: 'Bedroom',
    slug: 'bedroom',
    description: 'Complete bedroom furniture collection including beds, wardrobes, and storage',
    image: '/images/categories/bedroom-hero.jpg',
    itemCount: 45,
    isActive: true
  },
  {
    id: 2,
    name: 'Living Room',
    slug: 'living-room',
    description: 'Comfortable and stylish living room furniture for your home',
    image: '/images/categories/living-room-hero.jpg',
    itemCount: 38,
    isActive: true
  },
  {
    id: 3,
    name: 'Dining',
    slug: 'dining',
    description: 'Elegant dining sets and furniture for memorable meals',
    image: '/images/categories/dining-hero.jpg',
    itemCount: 28,
    isActive: true
  },
  {
    id: 4,
    name: 'Office',
    slug: 'office',
    description: 'Professional office furniture for productivity and comfort',
    image: '/images/categories/office-hero.jpg',
    itemCount: 22,
    isActive: true
  },
  {
    id: 5,
    name: 'Kids',
    slug: 'kids',
    description: 'Fun and functional furniture designed for children',
    image: '/images/categories/kids-hero.jpg',
    itemCount: 18,
    isActive: true
  },
  {
    id: 6,
    name: 'Outdoor',
    slug: 'outdoor',
    description: 'Weather-resistant outdoor furniture for your garden and patio',
    image: '/images/categories/outdoor-hero.jpg',
    itemCount: 15,
    isActive: true
  }
]

export const seedProducts: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>[] = [
  // Bedroom Products
  {
    id: 1,
    name: 'Royal Platform Bed with Storage',
    category: 'Bedroom',
    subCategory: 'Platform Beds',
    price: '₹45,999',
    originalPrice: '₹55,999',
    description: 'Elegant platform bed with built-in storage drawers and premium upholstery',
    images: ['/images/products/bedroom/platform-bed-1.jpg', '/images/products/bedroom/platform-bed-2.jpg'],
    rating: 4.8,
    reviews: 124,
    has360View: true,
    isNew: false,
    specifications: {
      material: 'Engineered Wood with Fabric Upholstery',
      dimensions: '208 x 188 x 35 cm (King Size)',
      weight: '85 kg',
      color: 'Charcoal Grey',
      warranty: '2 Years'
    },
    stock: 15
  },
  {
    id: 2,
    name: 'Premium 4-Door Wardrobe',
    category: 'Bedroom',
    subCategory: 'Wardrobes',
    price: '₹38,999',
    originalPrice: '₹48,999',
    description: 'Spacious 4-door wardrobe with mirror and organized compartments',
    images: ['/images/products/bedroom/wardrobe-1.jpg', '/images/products/bedroom/wardrobe-2.jpg'],
    rating: 4.6,
    reviews: 89,
    has360View: true,
    isNew: false,
    specifications: {
      material: 'Plywood with Laminate Finish',
      dimensions: '240 x 60 x 210 cm',
      weight: '120 kg',
      color: 'Walnut Brown',
      warranty: '3 Years'
    },
    stock: 8
  },
  {
    id: 3,
    name: 'Modern Nightstand Set',
    category: 'Bedroom',
    subCategory: 'Nightstands',
    price: '₹12,999',
    originalPrice: '₹16,999',
    description: 'Set of 2 modern nightstands with wireless charging dock',
    images: ['/images/products/bedroom/nightstand-1.jpg', '/images/products/bedroom/nightstand-2.jpg'],
    rating: 4.7,
    reviews: 156,
    has360View: true,
    isNew: true,
    specifications: {
      material: 'Solid Wood with Metal Accents',
      dimensions: '50 x 40 x 55 cm (Each)',
      weight: '18 kg (Set)',
      color: 'Natural Oak',
      warranty: '1 Year'
    },
    stock: 25
  },

  // Living Room Products
  {
    id: 4,
    name: 'Luxury Sectional Sofa',
    category: 'Living Room',
    subCategory: 'Sectional Sofas',
    price: '₹89,999',
    originalPrice: '₹109,999',
    description: 'Premium L-shaped sectional sofa with reclining seats and cup holders',
    images: ['/images/products/living-room/sectional-sofa-1.jpg', '/images/products/living-room/sectional-sofa-2.jpg'],
    rating: 4.9,
    reviews: 203,
    has360View: true,
    isNew: false,
    specifications: {
      material: 'Genuine Leather with Hardwood Frame',
      dimensions: '320 x 180 x 95 cm',
      weight: '150 kg',
      color: 'Cognac Brown',
      warranty: '5 Years'
    },
    stock: 6
  },
  {
    id: 5,
    name: 'Smart TV Entertainment Unit',
    category: 'Living Room',
    subCategory: 'TV Units',
    price: '₹32,999',
    originalPrice: '₹42,999',
    description: 'Modern TV unit with cable management and LED lighting',
    images: ['/images/products/living-room/tv-unit-1.jpg', '/images/products/living-room/tv-unit-2.jpg'],
    rating: 4.5,
    reviews: 78,
    has360View: true,
    isNew: true,
    specifications: {
      material: 'High-Grade MDF with Glass Shelves',
      dimensions: '180 x 45 x 55 cm',
      weight: '45 kg',
      color: 'Matte Black',
      warranty: '2 Years'
    },
    stock: 12
  },
  {
    id: 6,
    name: 'Designer Coffee Table',
    category: 'Living Room',
    subCategory: 'Coffee Tables',
    price: '₹18,999',
    originalPrice: '₹24,999',
    description: 'Elegant glass-top coffee table with wooden base and storage',
    images: ['/images/products/living-room/coffee-table-1.jpg', '/images/products/living-room/coffee-table-2.jpg'],
    rating: 4.4,
    reviews: 92,
    has360View: true,
    isNew: false,
    specifications: {
      material: 'Tempered Glass with Solid Wood Base',
      dimensions: '120 x 60 x 45 cm',
      weight: '35 kg',
      color: 'Clear Glass / Natural Wood',
      warranty: '1 Year'
    },
    stock: 18
  },

  // Dining Products
  {
    id: 7,
    name: 'Teak Wood Dining Set',
    category: 'Dining',
    subCategory: 'Teak Dining Sets',
    price: '₹75,999',
    originalPrice: '₹95,999',
    description: '6-seater teak wood dining set with cushioned chairs',
    images: ['/images/products/dining/teak-dining-set-1.jpg', '/images/products/dining/teak-dining-set-2.jpg'],
    rating: 4.8,
    reviews: 145,
    has360View: true,
    isNew: false,
    specifications: {
      material: 'Solid Teak Wood with Fabric Cushions',
      dimensions: '180 x 90 x 75 cm (Table)',
      weight: '120 kg (Complete Set)',
      color: 'Natural Teak Finish',
      warranty: '5 Years'
    },
    stock: 5
  },
  {
    id: 8,
    name: 'Glass Top Dining Table',
    category: 'Dining',
    subCategory: 'Glass Tables',
    price: '₹42,999',
    originalPrice: '₹52,999',
    description: 'Modern glass dining table with chrome legs for 4 people',
    images: ['/images/products/dining/glass-table-1.jpg', '/images/products/dining/glass-table-2.jpg'],
    rating: 4.3,
    reviews: 67,
    has360View: true,
    isNew: true,
    specifications: {
      material: 'Tempered Glass with Chrome Steel Base',
      dimensions: '140 x 80 x 75 cm',
      weight: '55 kg',
      color: 'Clear Glass / Chrome',
      warranty: '2 Years'
    },
    stock: 10
  },

  // Office Products
  {
    id: 9,
    name: 'Executive Office Chair',
    category: 'Office',
    subCategory: 'Office Chairs',
    price: '₹25,999',
    originalPrice: '₹32,999',
    description: 'Ergonomic executive chair with lumbar support and adjustable height',
    images: ['/images/products/office/executive-chair-1.jpg', '/images/products/office/executive-chair-2.jpg'],
    rating: 4.7,
    reviews: 189,
    has360View: true,
    isNew: false,
    specifications: {
      material: 'Genuine Leather with Metal Frame',
      dimensions: '65 x 70 x 110-120 cm',
      weight: '28 kg',
      color: 'Black Leather',
      warranty: '3 Years'
    },
    stock: 20
  },
  {
    id: 10,
    name: 'L-Shaped Office Desk',
    category: 'Office',
    subCategory: 'Office Desks',
    price: '₹35,999',
    originalPrice: '₹45,999',
    description: 'Spacious L-shaped desk with built-in drawers and cable management',
    images: ['/images/products/office/l-desk-1.jpg', '/images/products/office/l-desk-2.jpg'],
    rating: 4.6,
    reviews: 112,
    has360View: true,
    isNew: false,
    specifications: {
      material: 'Engineered Wood with Metal Legs',
      dimensions: '150 x 120 x 75 cm',
      weight: '65 kg',
      color: 'Mahogany Brown',
      warranty: '2 Years'
    },
    stock: 7
  }
]