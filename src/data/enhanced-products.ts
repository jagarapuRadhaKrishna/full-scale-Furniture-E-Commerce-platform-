// Enhanced Product Data Processor and Integrator
// This script processes the CSV dataset and integrates it into the website

import fs from 'fs'
import path from 'path'

// Enhanced product data structure
export interface EnhancedProduct {
  id: number
  itemGroupId: number
  productId: string
  name: string
  category: string
  subCategory: string
  style: string
  material: string
  color: string
  size: string
  price: string
  originalPrice: string
  images: string[]
  has360View: boolean
  rating: number
  reviews: number
  description: string
  features: string[]
  specifications: string
  isNew?: boolean
  isOnSale?: boolean
  discount?: number
}

// Process CSV data into enhanced product structure
export const enhancedProductsData: EnhancedProduct[] = [
  // BEDROOM FURNITURE
  {
    id: 1,
    itemGroupId: 101,
    productId: "101-SW-K",
    name: "Platform Bed (Solid Wood, King)",
    category: "Bedroom",
    subCategory: "Beds",
    style: "Modern",
    material: "Solid Wood",
    color: "Walnut Finish",
    size: "King",
    price: "₹55,000",
    originalPrice: "₹65,000",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049421450-348cb4d57bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.8,
    reviews: 156,
    description: "Modern king-size platform bed with built-in side tables and LED lighting",
    features: ["Built-in Tables", "LED Lighting", "Storage Drawers", "Premium Wood"],
    specifications: "Dimensions: 183 x 203 x 35 cm, Weight: 85 kg, Warranty: 3 Years",
    isNew: false,
    isOnSale: true,
    discount: 15
  },
  {
    id: 2,
    itemGroupId: 101,
    productId: "101-SW-Q",
    name: "Platform Bed (Solid Wood, Queen)",
    category: "Bedroom",
    subCategory: "Beds",
    style: "Modern",
    material: "Solid Wood",
    color: "Walnut Finish",
    size: "Queen",
    price: "₹52,000",
    originalPrice: "₹61,000",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.7,
    reviews: 142,
    description: "Modern queen-size platform bed with built-in side tables",
    features: ["Built-in Tables", "Storage Drawers", "Premium Wood"],
    specifications: "Dimensions: 152 x 203 x 35 cm, Weight: 75 kg, Warranty: 3 Years",
    isOnSale: true,
    discount: 15
  },
  {
    id: 3,
    itemGroupId: 101,
    productId: "101-SW-KO",
    name: "Platform Bed (Premium Oak, King)",
    category: "Bedroom",
    subCategory: "Beds",
    style: "Modern",
    material: "Solid Wood",
    color: "Oak Finish",
    size: "King",
    price: "₹58,000",
    originalPrice: "₹68,000",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.9,
    reviews: 201,
    description: "Premium oak finish king-size platform bed with premium features",
    features: ["Built-in Tables", "LED Lighting", "USB Charging", "Premium Oak"],
    specifications: "Dimensions: 183 x 203 x 35 cm, Weight: 90 kg, Warranty: 5 Years",
    isNew: true,
    isOnSale: true,
    discount: 15
  },
  {
    id: 4,
    itemGroupId: 101,
    productId: "101-SW-KM",
    name: "Platform Bed (Luxury Mahogany, King)",
    category: "Bedroom",
    subCategory: "Beds",
    style: "Modern",
    material: "Solid Wood",
    color: "Mahogany Finish",
    size: "King",
    price: "₹62,000",
    originalPrice: "₹72,000",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.8,
    reviews: 178,
    description: "Luxury mahogany finish king-size platform bed",
    features: ["Built-in Tables", "LED Lighting", "Premium Mahogany", "Soft Close Drawers"],
    specifications: "Dimensions: 183 x 203 x 35 cm, Weight: 95 kg, Warranty: 5 Years",
    isNew: true,
    isOnSale: true,
    discount: 14
  },
  {
    id: 5,
    itemGroupId: 102,
    productId: "102-MW",
    name: "3-Door Wardrobe (Mirrored)",
    category: "Bedroom",
    subCategory: "Wardrobes",
    style: "Contemporary",
    material: "Engineered Wood",
    color: "Dark Oak",
    size: "Large",
    price: "₹45,000",
    originalPrice: "₹52,000",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: false,
    rating: 4.6,
    reviews: 134,
    description: "Spacious 3-door wardrobe with full-length mirror",
    features: ["Full Mirror", "Adjustable Shelves", "Hanging Rod", "Soft Close"],
    specifications: "Dimensions: 150 x 58 x 210 cm, Weight: 120 kg, Warranty: 2 Years",
    isOnSale: true,
    discount: 13
  },
  {
    id: 6,
    itemGroupId: 102,
    productId: "102-SW-4D",
    name: "4-Door Wardrobe (Solid Wood)",
    category: "Bedroom",
    subCategory: "Wardrobes",
    style: "Traditional",
    material: "Solid Wood",
    color: "Teak Finish",
    size: "Extra Large",
    price: "₹85,000",
    originalPrice: "₹98,000",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.9,
    reviews: 87,
    description: "Premium solid teak 4-door wardrobe with traditional design",
    features: ["Solid Teak", "Brass Hardware", "Hand Carved Details", "Premium Finish"],
    specifications: "Dimensions: 200 x 60 x 220 cm, Weight: 180 kg, Warranty: 10 Years",
    isNew: true,
    isOnSale: true,
    discount: 13
  },

  // LIVING ROOM FURNITURE
  {
    id: 7,
    itemGroupId: 201,
    productId: "201-FG",
    name: "L-Shaped Sofa (Premium Fabric)",
    category: "Living Room",
    subCategory: "Sofas",
    style: "Modern",
    material: "Fabric",
    color: "Charcoal Grey",
    size: "5-Seater",
    price: "₹85,000",
    originalPrice: "₹95,000",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.8,
    reviews: 156,
    description: "Luxurious L-shaped sectional sofa with premium fabric upholstery",
    features: ["Premium Fabric", "Solid Wood Frame", "Removable Cushions", "Storage Compartment"],
    specifications: "Dimensions: 280 x 180 x 85 cm, Weight: 95 kg, Warranty: 3 Years",
    isOnSale: true,
    discount: 11
  },
  {
    id: 8,
    itemGroupId: 201,
    productId: "201-VN",
    name: "L-Shaped Sofa (Luxury Velvet)",
    category: "Living Room",
    subCategory: "Sofas",
    style: "Modern",
    material: "Velvet",
    color: "Navy Blue",
    size: "5-Seater",
    price: "₹92,000",
    originalPrice: "₹105,000",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.9,
    reviews: 189,
    description: "Premium velvet L-shaped sofa with luxurious finish",
    features: ["Premium Velvet", "Solid Wood Frame", "Goose Down Cushions", "Stain Resistant"],
    specifications: "Dimensions: 280 x 180 x 85 cm, Weight: 98 kg, Warranty: 3 Years",
    isNew: true,
    isOnSale: true,
    discount: 12
  },
  {
    id: 9,
    itemGroupId: 201,
    productId: "201-LE-CR",
    name: "L-Shaped Sofa (Genuine Leather)",
    category: "Living Room",
    subCategory: "Sofas",
    style: "Luxury",
    material: "Genuine Leather",
    color: "Cognac",
    size: "5-Seater",
    price: "₹145,000",
    originalPrice: "₹165,000",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.9,
    reviews: 112,
    description: "Luxury genuine leather L-shaped sofa with premium finish",
    features: ["Genuine Leather", "Hand Stitched", "Premium Hardwood Frame", "Lifetime Frame Warranty"],
    specifications: "Dimensions: 280 x 180 x 85 cm, Weight: 110 kg, Warranty: 5 Years",
    isNew: true,
    isOnSale: true,
    discount: 12
  },
  {
    id: 10,
    itemGroupId: 204,
    productId: "204-LR",
    name: "Recliner Chair (Premium Leatherette)",
    category: "Living Room",
    subCategory: "Chairs",
    style: "Contemporary",
    material: "Leatherette",
    color: "Black",
    size: "1-Seater",
    price: "₹35,000",
    originalPrice: "₹40,000",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.6,
    reviews: 178,
    description: "Premium leatherette recliner with massage function",
    features: ["Massage Function", "Electric Recline", "USB Charging", "Premium Leatherette"],
    specifications: "Dimensions: 95 x 100 x 105 cm, Weight: 45 kg, Warranty: 2 Years",
    isOnSale: true,
    discount: 13
  },

  // DINING FURNITURE  
  {
    id: 11,
    itemGroupId: 301,
    productId: "301-W6",
    name: "Wooden Dining Set (6-Seater)",
    category: "Dining",
    subCategory: "Dining Sets",
    style: "Traditional",
    material: "Solid Wood",
    color: "Teak Finish",
    size: "6-Seater",
    price: "₹65,000",
    originalPrice: "₹75,000",
    images: [
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.9,
    reviews: 189,
    description: "Elegant 6-seater dining set crafted from premium teak wood",
    features: ["Teak Wood", "6 Seater", "Cushioned Chairs", "Expandable Table"],
    specifications: "Dimensions: 180 x 90 x 75 cm (Table), Weight: 120 kg, Warranty: 5 Years",
    isOnSale: true,
    discount: 13
  },
  {
    id: 12,
    itemGroupId: 301,
    productId: "301-W8",
    name: "Wooden Dining Set (8-Seater)",
    category: "Dining",
    subCategory: "Dining Sets",
    style: "Traditional",
    material: "Solid Wood",
    color: "Teak Finish",
    size: "8-Seater",
    price: "₹78,000",
    originalPrice: "₹89,000",
    images: [
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.8,
    reviews: 134,
    description: "Spacious 8-seater teak dining set for large families",
    features: ["Teak Wood", "8 Seater", "Cushioned Chairs", "Expandable Table"],
    specifications: "Dimensions: 220 x 100 x 75 cm (Table), Weight: 150 kg, Warranty: 5 Years",
    isOnSale: true,
    discount: 12
  },

  // OFFICE FURNITURE
  {
    id: 13,
    itemGroupId: 401,
    productId: "401-LB",
    name: "Executive Chair (High-Back Leather)",
    category: "Office",
    subCategory: "Office Chairs",
    style: "Professional",
    material: "Leather",
    color: "Black",
    size: "High-Back",
    price: "₹25,000",
    originalPrice: "₹30,000",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.8,
    reviews: 201,
    description: "Premium high-back leather executive chair with ergonomic design",
    features: ["Genuine Leather", "Ergonomic Design", "Height Adjustable", "360° Swivel"],
    specifications: "Dimensions: 70 x 70 x 110-120 cm, Weight: 25 kg, Warranty: 3 Years",
    isOnSale: true,
    discount: 17
  },
  {
    id: 14,
    itemGroupId: 402,
    productId: "402-OD-ST",
    name: "Standing Desk (Height Adjustable)",
    category: "Office",
    subCategory: "Office Desks",
    style: "Modern",
    material: "Steel",
    color: "White",
    size: "Medium",
    price: "₹45,000",
    originalPrice: "₹52,000",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.8,
    reviews: 89,
    description: "Electric height-adjustable standing desk",
    features: ["Electric Height Adjustment", "Memory Settings", "Cable Management", "Ergonomic"],
    specifications: "Dimensions: 140 x 70 x 65-130 cm, Weight: 45 kg, Warranty: 3 Years",
    isNew: true,
    isOnSale: true,
    discount: 13
  },

  // KIDS FURNITURE
  {
    id: 15,
    itemGroupId: 501,
    productId: "501-BP",
    name: "Bunk Bed (Pine Wood)",
    category: "Kids",
    subCategory: "Bunk Beds",
    style: "Kids",
    material: "Pine Wood",
    color: "Natural Pine",
    size: "Twin",
    price: "₹35,000",
    originalPrice: "₹40,000",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: false,
    rating: 4.5,
    reviews: 134,
    description: "Safe and sturdy pine wood bunk bed for kids",
    features: ["Pine Wood", "Safety Rails", "Ladder", "Natural Finish"],
    specifications: "Dimensions: 105 x 205 x 155 cm, Weight: 65 kg, Warranty: 3 Years",
    isOnSale: true,
    discount: 13
  },
  {
    id: 16,
    itemGroupId: 502,
    productId: "502-ST-CH",
    name: "Study Table with Chair",
    category: "Kids",
    subCategory: "Study Sets",
    style: "Kids",
    material: "Engineered Wood",
    color: "Blue & White",
    size: "Standard",
    price: "₹15,000",
    originalPrice: "₹18,000",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: false,
    rating: 4.3,
    reviews: 89,
    description: "Ergonomic study table and chair set for kids",
    features: ["Ergonomic Design", "Height Adjustable", "Blue & White", "Storage Compartments"],
    specifications: "Dimensions: 100 x 60 x 75 cm (Table), Weight: 25 kg, Warranty: 2 Years",
    isOnSale: true,
    discount: 17
  },

  // OUTDOOR FURNITURE
  {
    id: 17,
    itemGroupId: 601,
    productId: "601-GD-6",
    name: "Garden Dining Set (6-Seater)",
    category: "Outdoor",
    subCategory: "Dining Sets",
    style: "Outdoor",
    material: "Teak Wood",
    color: "Natural Teak",
    size: "6-Seater",
    price: "₹45,000",
    originalPrice: "₹50,000",
    images: [
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: false,
    rating: 4.5,
    reviews: 67,
    description: "Weather-resistant teak garden dining set",
    features: ["Teak Wood", "Weather Resistant", "6 Seater", "Natural Finish"],
    specifications: "Dimensions: 150 x 90 x 75 cm (Table), Weight: 80 kg, Warranty: 3 Years",
    isOnSale: true,
    discount: 10
  },
  {
    id: 18,
    itemGroupId: 603,
    productId: "603-OL-6",
    name: "Outdoor Lounge Set (6-Piece)",
    category: "Outdoor",
    subCategory: "Lounge Sets",
    style: "Outdoor",
    material: "Rattan",
    color: "Brown",
    size: "6-Piece",
    price: "₹85,000",
    originalPrice: "₹98,000",
    images: [
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.7,
    reviews: 67,
    description: "Luxury 6-piece rattan outdoor lounge set",
    features: ["Rattan Construction", "Weather Resistant", "6-Piece Set", "Brown Finish"],
    specifications: "Dimensions: Various, Total Weight: 140 kg, Warranty: 3 Years",
    isNew: true,
    isOnSale: true,
    discount: 13
  }
]

// Category-wise product organization
export const categoryProducts = {
  Bedroom: enhancedProductsData.filter(p => p.category === 'Bedroom'),
  'Living Room': enhancedProductsData.filter(p => p.category === 'Living Room'),
  Dining: enhancedProductsData.filter(p => p.category === 'Dining'),
  Office: enhancedProductsData.filter(p => p.category === 'Office'),
  Kids: enhancedProductsData.filter(p => p.category === 'Kids'),
  Outdoor: enhancedProductsData.filter(p => p.category === 'Outdoor')
}

// Export for use in other components
export default enhancedProductsData