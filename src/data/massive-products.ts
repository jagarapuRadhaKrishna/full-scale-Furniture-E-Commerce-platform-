// Massive Enhanced Product Dataset - 100+ items per category
// This dataset provides comprehensive furniture collections with unique images

import { generateUltraSpecificImages } from '../lib/ultra-specific-image-generator'

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
  originalPrice?: string
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

// Massive product collection with 600+ items (100+ per category)
export const massiveProductsData: EnhancedProduct[] = [
  // ===================== BEDROOM FURNITURE (100+ ITEMS) =====================
  
  // BEDS (40 items)
  {
    id: 1001,
    itemGroupId: 101,
    productId: "BED-001-KW",
    name: "Luxury Platform Bed - King Size Walnut",
    category: "Bedroom",
    subCategory: "Beds",
    style: "Modern",
    material: "Solid Walnut",
    color: "Natural Walnut",
    size: "King",
    price: "₹85,000",
    originalPrice: "₹95,000",
    images: generateUltraSpecificImages({
      id: 1001,
      name: "Luxury Platform Bed - King Size Walnut",
      category: "Bedroom",
      subCategory: "Beds",
      style: "Modern",
      material: "Solid Walnut",
      color: "Natural Walnut",
      size: "King"
    }),
    has360View: true,
    rating: 4.8,
    reviews: 156,
    description: "Luxurious king-size platform bed crafted from premium walnut wood with contemporary design",
    features: ["Solid Walnut Construction", "No Box Spring Required", "Easy Assembly", "5-Year Warranty"],
    specifications: "Dimensions: 76\"W x 80\"L x 14\"H, Weight Capacity: 600 lbs",
    isNew: true,
    isOnSale: true,
    discount: 11
  },
  {
    id: 1002,
    itemGroupId: 101,
    productId: "BED-002-QO",
    name: "Classic Oak Queen Bed with Upholstered Headboard",
    category: "Bedroom",
    subCategory: "Beds",
    style: "Classic",
    material: "Oak Wood",
    color: "Honey Oak",
    size: "Queen",
    price: "₹65,000",
    images: generateUltraSpecificImages({
      id: 1002,
      name: "Classic Oak Queen Bed with Upholstered Headboard",
      category: "Bedroom",
      subCategory: "Beds",
      style: "Classic",
      material: "Oak Wood",
      color: "Honey Oak",
      size: "Queen"
    }),
    has360View: true,
    rating: 4.6,
    reviews: 89,
    description: "Elegant queen bed featuring solid oak construction with luxurious upholstered headboard",
    features: ["Solid Oak Frame", "Upholstered Headboard", "Traditional Craftsmanship", "Durable Construction"],
    specifications: "Dimensions: 60\"W x 80\"L x 50\"H, Weight: 120 lbs",
    isNew: false
  },
  {
    id: 1003,
    itemGroupId: 101,
    productId: "BED-003-SM",
    name: "Minimalist Single Bed - Metal Frame",
    category: "Bedroom",
    subCategory: "Beds",
    style: "Minimalist",
    material: "Steel",
    color: "Matte Black",
    size: "Single",
    price: "₹25,000",
    originalPrice: "₹30,000",
    images: generateUltraSpecificImages({
      id: 1003,
      name: "Minimalist Single Bed - Metal Frame",
      category: "Bedroom",
      subCategory: "Beds",
      style: "Minimalist",
      material: "Steel",
      color: "Matte Black",
      size: "Single"
    }),
    has360View: true,
    rating: 4.4,
    reviews: 67,
    description: "Sleek minimalist single bed with sturdy metal frame, perfect for modern spaces",
    features: ["Steel Construction", "Space Saving", "Easy Assembly", "Modern Design"],
    specifications: "Dimensions: 39\"W x 75\"L x 35\"H, Weight: 45 lbs",
    isOnSale: true,
    discount: 17
  },
  {
    id: 1004,
    itemGroupId: 101,
    productId: "BED-004-KT",
    name: "Teak Wood King Bed with Storage",
    category: "Bedroom",
    subCategory: "Beds",
    style: "Traditional",
    material: "Teak Wood",
    color: "Natural Teak",
    size: "King",
    price: "₹95,000",
    images: generateUltraSpecificImages({
      id: 1004,
      name: "Teak Wood King Bed with Storage",
      category: "Bedroom",
      subCategory: "Beds",
      style: "Traditional",
      material: "Teak Wood",
      color: "Natural Teak",
      size: "King"
    }),
    has360View: true,
    rating: 4.9,
    reviews: 203,
    description: "Premium teak wood king bed featuring built-in storage compartments and traditional craftsmanship",
    features: ["Solid Teak Wood", "Built-in Storage", "Hand Carved Details", "Lifetime Durability"],
    specifications: "Dimensions: 76\"W x 80\"L x 18\"H, Weight: 180 lbs",
    isNew: true
  },
  {
    id: 1005,
    itemGroupId: 101,
    productId: "BED-005-QR",
    name: "Rustic Pine Queen Bed Frame",
    category: "Bedroom",
    subCategory: "Beds",
    style: "Rustic",
    material: "Pine Wood",
    color: "Rustic Brown",
    size: "Queen",
    price: "₹45,000",
    originalPrice: "₹55,000",
    images: generateUltraSpecificImages({
      id: 1005,
      name: "Rustic Pine Queen Bed Frame",
      category: "Bedroom",
      subCategory: "Beds",
      style: "Rustic",
      material: "Pine Wood",
      color: "Rustic Brown",
      size: "Queen"
    }),
    has360View: true,
    rating: 4.3,
    reviews: 78,
    description: "Charming rustic queen bed made from reclaimed pine wood with natural finish",
    features: ["Reclaimed Pine Wood", "Rustic Finish", "Eco-Friendly", "Unique Grain Patterns"],
    specifications: "Dimensions: 60\"W x 80\"L x 45\"H, Weight: 95 lbs",
    isOnSale: true,
    discount: 18
  }
  // Continue with 35 more bed variations...
]

// For brevity, I'll create a function to generate the remaining products
function generateMassiveProductData(): EnhancedProduct[] {
  const products: EnhancedProduct[] = []
  
  // BEDROOM FURNITURE (100 items total)
  const bedroomCategories = [
    { subCategory: "Beds", count: 40 },
    { subCategory: "Wardrobes", count: 25 },
    { subCategory: "Nightstands", count: 20 },
    { subCategory: "Dressers", count: 15 }
  ]
  
  let currentId = 1006
  
  // Generate Bedroom products
  bedroomCategories.forEach(cat => {
    for (let i = 0; i < cat.count; i++) {
      const materials = ["Solid Wood", "Engineered Wood", "Metal", "Teak", "Oak", "Pine", "Mahogany"]
      const colors = ["Walnut", "Oak", "White", "Black", "Brown", "Natural", "Espresso", "Cherry"]
      const styles = ["Modern", "Classic", "Rustic", "Minimalist", "Traditional", "Contemporary", "Industrial"]
      
      const material = materials[i % materials.length]
      const color = colors[i % colors.length]
      const style = styles[i % styles.length]
      const basePrice = Math.floor(Math.random() * 80000) + 20000
      const hasDiscount = i % 3 === 0
      
      products.push({
        id: currentId++,
        itemGroupId: 100 + Math.floor(i / 10),
        productId: `${cat.subCategory.toUpperCase()}-${String(i).padStart(3, '0')}-${material.charAt(0)}${color.charAt(0)}`,
        name: `${style} ${cat.subCategory.slice(0, -1)} - ${material} ${color}`,
        category: "Bedroom",
        subCategory: cat.subCategory,
        style: style,
        material: material,
        color: color,
        size: ["King", "Queen", "Single", "Standard", "Large", "Medium"][i % 6],
        price: `₹${basePrice.toLocaleString()}`,
        originalPrice: hasDiscount ? `₹${(basePrice * 1.2).toLocaleString()}` : undefined,
        images: generateUltraSpecificImages({
          id: currentId,
          name: `${style} ${cat.subCategory.slice(0, -1)} - ${material} ${color}`,
          category: "Bedroom",
          subCategory: cat.subCategory,
          style: style,
          material: material,
          color: color
        }),
        has360View: true,
        rating: 3.5 + Math.random() * 1.5,
        reviews: Math.floor(Math.random() * 200) + 20,
        description: `Premium ${style.toLowerCase()} ${cat.subCategory.toLowerCase().slice(0, -1)} crafted from ${material.toLowerCase()} in ${color.toLowerCase()} finish`,
        features: [
          `${material} Construction`,
          `${color} Finish`,
          `${style} Design`,
          "Easy Assembly",
          "5-Year Warranty"
        ],
        specifications: `Dimensions: ${40 + Math.floor(Math.random() * 40)}"W x ${60 + Math.floor(Math.random() * 30)}"D x ${20 + Math.floor(Math.random() * 40)}"H`,
        isNew: i % 5 === 0,
        isOnSale: hasDiscount,
        discount: hasDiscount ? Math.floor(Math.random() * 30) + 10 : undefined
      })
    }
  })
  
  // LIVING ROOM FURNITURE (100 items)
  const livingRoomCategories = [
    { subCategory: "Sofas", count: 35 },
    { subCategory: "Coffee Tables", count: 25 },
    { subCategory: "TV Units", count: 20 },
    { subCategory: "Armchairs", count: 20 }
  ]
  
  livingRoomCategories.forEach(cat => {
    for (let i = 0; i < cat.count; i++) {
      const materials = ["Leather", "Fabric", "Velvet", "Wood", "Glass", "Metal", "Rattan"]
      const colors = ["Brown", "Black", "White", "Gray", "Beige", "Navy", "Cream", "Burgundy"]
      const styles = ["Modern", "Classic", "Contemporary", "Minimalist", "Traditional", "Scandinavian", "Industrial"]
      
      const material = materials[i % materials.length]
      const color = colors[i % colors.length]
      const style = styles[i % styles.length]
      const basePrice = Math.floor(Math.random() * 120000) + 30000
      const hasDiscount = i % 4 === 0
      
      products.push({
        id: currentId++,
        itemGroupId: 200 + Math.floor(i / 10),
        productId: `LR-${cat.subCategory.replace(/\s+/g, '').toUpperCase()}-${String(i).padStart(3, '0')}`,
        name: `${style} ${cat.subCategory.slice(0, -1)} - ${material} ${color}`,
        category: "Living Room",
        subCategory: cat.subCategory,
        style: style,
        material: material,
        color: color,
        size: ["Large", "Medium", "Small", "XL", "Standard", "Compact"][i % 6],
        price: `₹${basePrice.toLocaleString()}`,
        originalPrice: hasDiscount ? `₹${(basePrice * 1.25).toLocaleString()}` : undefined,
        images: generateUltraSpecificImages({
          id: currentId,
          name: `${style} ${cat.subCategory.slice(0, -1)} - ${material} ${color}`,
          category: "Living Room",
          subCategory: cat.subCategory,
          style: style,
          material: material,
          color: color
        }),
        has360View: true,
        rating: 3.8 + Math.random() * 1.2,
        reviews: Math.floor(Math.random() * 180) + 30,
        description: `Elegant ${style.toLowerCase()} ${cat.subCategory.toLowerCase().slice(0, -1)} featuring ${material.toLowerCase()} upholstery in ${color.toLowerCase()}`,
        features: [
          `${material} Upholstery`,
          `${color} Color`,
          `${style} Design`,
          "Comfortable Seating",
          "3-Year Warranty"
        ],
        specifications: `Dimensions: ${60 + Math.floor(Math.random() * 40)}"W x ${30 + Math.floor(Math.random() * 30)}"D x ${25 + Math.floor(Math.random() * 20)}"H`,
        isNew: i % 6 === 0,
        isOnSale: hasDiscount,
        discount: hasDiscount ? Math.floor(Math.random() * 25) + 15 : undefined
      })
    }
  })
  
  // DINING FURNITURE (100 items)
  const diningCategories = [
    { subCategory: "Dining Tables", count: 30 },
    { subCategory: "Dining Chairs", count: 40 },
    { subCategory: "Buffets", count: 20 },
    { subCategory: "Bar Stools", count: 10 }
  ]
  
  diningCategories.forEach(cat => {
    for (let i = 0; i < cat.count; i++) {
      const materials = ["Solid Wood", "Glass", "Marble", "Metal", "Oak", "Pine", "Mahogany"]
      const colors = ["Natural", "Black", "White", "Brown", "Gray", "Espresso", "Cherry"]
      const styles = ["Modern", "Classic", "Rustic", "Contemporary", "Traditional", "Industrial", "Farmhouse"]
      
      const material = materials[i % materials.length]
      const color = colors[i % colors.length]
      const style = styles[i % styles.length]
      const basePrice = Math.floor(Math.random() * 100000) + 25000
      const hasDiscount = i % 5 === 0
      
      products.push({
        id: currentId++,
        itemGroupId: 300 + Math.floor(i / 10),
        productId: `DIN-${cat.subCategory.replace(/\s+/g, '').toUpperCase()}-${String(i).padStart(3, '0')}`,
        name: `${style} ${cat.subCategory.slice(0, -1)} - ${material} ${color}`,
        category: "Dining",
        subCategory: cat.subCategory,
        style: style,
        material: material,
        color: color,
        size: ["4 Seater", "6 Seater", "8 Seater", "2 Seater", "Standard", "Large"][i % 6],
        price: `₹${basePrice.toLocaleString()}`,
        originalPrice: hasDiscount ? `₹${(basePrice * 1.3).toLocaleString()}` : undefined,
        images: generateUltraSpecificImages({
          id: currentId,
          name: `${style} ${cat.subCategory.slice(0, -1)} - ${material} ${color}`,
          category: "Dining",
          subCategory: cat.subCategory,
          style: style,
          material: material,
          color: color
        }),
        has360View: true,
        rating: 4.0 + Math.random() * 1.0,
        reviews: Math.floor(Math.random() * 150) + 25,
        description: `Beautiful ${style.toLowerCase()} ${cat.subCategory.toLowerCase().slice(0, -1)} made from ${material.toLowerCase()} in ${color.toLowerCase()} finish`,
        features: [
          `${material} Construction`,
          `${color} Finish`,
          `${style} Design`,
          "Scratch Resistant",
          "4-Year Warranty"
        ],
        specifications: `Dimensions: ${50 + Math.floor(Math.random() * 50)}"W x ${30 + Math.floor(Math.random() * 40)}"D x ${28 + Math.floor(Math.random() * 15)}"H`,
        isNew: i % 7 === 0,
        isOnSale: hasDiscount,
        discount: hasDiscount ? Math.floor(Math.random() * 20) + 10 : undefined
      })
    }
  })
  
  // OFFICE FURNITURE (100 items)
  const officeCategories = [
    { subCategory: "Office Chairs", count: 40 },
    { subCategory: "Desks", count: 30 },
    { subCategory: "Bookcases", count: 20 },
    { subCategory: "Filing Cabinets", count: 10 }
  ]
  
  officeCategories.forEach(cat => {
    for (let i = 0; i < cat.count; i++) {
      const materials = ["Leather", "Mesh", "Wood", "Metal", "Fabric", "Plastic", "Glass"]
      const colors = ["Black", "Brown", "White", "Gray", "Navy", "Red", "Green"]
      const styles = ["Executive", "Ergonomic", "Modern", "Classic", "Contemporary", "Industrial", "Minimalist"]
      
      const material = materials[i % materials.length]
      const color = colors[i % colors.length]
      const style = styles[i % styles.length]
      const basePrice = Math.floor(Math.random() * 80000) + 15000
      const hasDiscount = i % 4 === 0
      
      products.push({
        id: currentId++,
        itemGroupId: 400 + Math.floor(i / 10),
        productId: `OFF-${cat.subCategory.replace(/\s+/g, '').toUpperCase()}-${String(i).padStart(3, '0')}`,
        name: `${style} ${cat.subCategory.slice(0, -1)} - ${material} ${color}`,
        category: "Office",
        subCategory: cat.subCategory,
        style: style,
        material: material,
        color: color,
        size: ["Standard", "Large", "Compact", "XL", "Medium", "Small"][i % 6],
        price: `₹${basePrice.toLocaleString()}`,
        originalPrice: hasDiscount ? `₹${(basePrice * 1.2).toLocaleString()}` : undefined,
        images: generateUltraSpecificImages({
          id: currentId,
          name: `${style} ${cat.subCategory.slice(0, -1)} - ${material} ${color}`,
          category: "Office",
          subCategory: cat.subCategory,
          style: style,
          material: material,
          color: color
        }),
        has360View: true,
        rating: 3.9 + Math.random() * 1.1,
        reviews: Math.floor(Math.random() * 120) + 20,
        description: `Professional ${style.toLowerCase()} ${cat.subCategory.toLowerCase().slice(0, -1)} with ${material.toLowerCase()} finish in ${color.toLowerCase()}`,
        features: [
          `${material} Material`,
          `${color} Color`,
          `${style} Design`,
          "Ergonomic Support",
          "2-Year Warranty"
        ],
        specifications: `Dimensions: ${24 + Math.floor(Math.random() * 30)}"W x ${24 + Math.floor(Math.random() * 30)}"D x ${30 + Math.floor(Math.random() * 20)}"H`,
        isNew: i % 8 === 0,
        isOnSale: hasDiscount,
        discount: hasDiscount ? Math.floor(Math.random() * 25) + 10 : undefined
      })
    }
  })
  
  // KIDS FURNITURE (100 items)
  const kidsCategories = [
    { subCategory: "Kids Beds", count: 30 },
    { subCategory: "Study Tables", count: 25 },
    { subCategory: "Toy Storage", count: 25 },
    { subCategory: "Kids Chairs", count: 20 }
  ]
  
  kidsCategories.forEach(cat => {
    for (let i = 0; i < cat.count; i++) {
      const materials = ["Wood", "Plastic", "Metal", "MDF", "Pine", "Plywood", "Fabric"]
      const colors = ["Pink", "Blue", "Yellow", "Green", "White", "Multicolor", "Red"]
      const styles = ["Playful", "Educational", "Colorful", "Safe", "Fun", "Creative", "Modern"]
      
      const material = materials[i % materials.length]
      const color = colors[i % colors.length]
      const style = styles[i % styles.length]
      const basePrice = Math.floor(Math.random() * 40000) + 10000
      const hasDiscount = i % 3 === 0
      
      products.push({
        id: currentId++,
        itemGroupId: 500 + Math.floor(i / 10),
        productId: `KIDS-${cat.subCategory.replace(/\s+/g, '').toUpperCase()}-${String(i).padStart(3, '0')}`,
        name: `${style} ${cat.subCategory.slice(0, -1)} - ${material} ${color}`,
        category: "Kids",
        subCategory: cat.subCategory,
        style: style,
        material: material,
        color: color,
        size: ["Small", "Medium", "Standard", "Compact", "Mini", "Regular"][i % 6],
        price: `₹${basePrice.toLocaleString()}`,
        originalPrice: hasDiscount ? `₹${(basePrice * 1.15).toLocaleString()}` : undefined,
        images: generateUltraSpecificImages({
          id: currentId,
          name: `${style} ${cat.subCategory.slice(0, -1)} - ${material} ${color}`,
          category: "Kids",
          subCategory: cat.subCategory,
          style: style,
          material: material,
          color: color
        }),
        has360View: true,
        rating: 4.2 + Math.random() * 0.8,
        reviews: Math.floor(Math.random() * 100) + 15,
        description: `Safe and ${style.toLowerCase()} ${cat.subCategory.toLowerCase().slice(0, -1)} made from child-safe ${material.toLowerCase()} in vibrant ${color.toLowerCase()}`,
        features: [
          `Child-Safe ${material}`,
          `${color} Color`,
          `${style} Design`,
          "Safety Certified",
          "3-Year Warranty"
        ],
        specifications: `Dimensions: ${20 + Math.floor(Math.random() * 25)}"W x ${20 + Math.floor(Math.random() * 25)}"D x ${20 + Math.floor(Math.random() * 25)}"H`,
        isNew: i % 6 === 0,
        isOnSale: hasDiscount,
        discount: hasDiscount ? Math.floor(Math.random() * 20) + 5 : undefined
      })
    }
  })
  
  // OUTDOOR FURNITURE (100 items)
  const outdoorCategories = [
    { subCategory: "Garden Sets", count: 30 },
    { subCategory: "Loungers", count: 25 },
    { subCategory: "Umbrellas", count: 25 },
    { subCategory: "Planters", count: 20 }
  ]
  
  outdoorCategories.forEach(cat => {
    for (let i = 0; i < cat.count; i++) {
      const materials = ["Teak", "Rattan", "Aluminum", "Steel", "Wicker", "Plastic", "Bamboo"]
      const colors = ["Natural", "Brown", "Black", "White", "Green", "Gray", "Beige"]
      const styles = ["Tropical", "Modern", "Classic", "Resort", "Contemporary", "Rustic", "Minimalist"]
      
      const material = materials[i % materials.length]
      const color = colors[i % colors.length]
      const style = styles[i % styles.length]
      const basePrice = Math.floor(Math.random() * 90000) + 20000
      const hasDiscount = i % 4 === 0
      
      products.push({
        id: currentId++,
        itemGroupId: 600 + Math.floor(i / 10),
        productId: `OUT-${cat.subCategory.replace(/\s+/g, '').toUpperCase()}-${String(i).padStart(3, '0')}`,
        name: `${style} ${cat.subCategory.slice(0, -1)} - ${material} ${color}`,
        category: "Outdoor",
        subCategory: cat.subCategory,
        style: style,
        material: material,
        color: color,
        size: ["Large", "Medium", "Small", "XL", "Standard", "Compact"][i % 6],
        price: `₹${basePrice.toLocaleString()}`,
        originalPrice: hasDiscount ? `₹${(basePrice * 1.2).toLocaleString()}` : undefined,
        images: generateUltraSpecificImages({
          id: currentId,
          name: `${style} ${cat.subCategory.slice(0, -1)} - ${material} ${color}`,
          category: "Outdoor",
          subCategory: cat.subCategory,
          style: style,
          material: material,
          color: color
        }),
        has360View: true,
        rating: 4.0 + Math.random() * 1.0,
        reviews: Math.floor(Math.random() * 80) + 12,
        description: `Weather-resistant ${style.toLowerCase()} ${cat.subCategory.toLowerCase().slice(0, -1)} crafted from durable ${material.toLowerCase()} in ${color.toLowerCase()}`,
        features: [
          `Weather-Resistant ${material}`,
          `${color} Finish`,
          `${style} Design`,
          "UV Protection",
          "5-Year Warranty"
        ],
        specifications: `Dimensions: ${40 + Math.floor(Math.random() * 40)}"W x ${30 + Math.floor(Math.random() * 30)}"D x ${30 + Math.floor(Math.random() * 20)}"H`,
        isNew: i % 9 === 0,
        isOnSale: hasDiscount,
        discount: hasDiscount ? Math.floor(Math.random() * 30) + 10 : undefined
      })
    }
  })
  
  return products
}

// Generate all products with unique images
export const allMassiveProducts = [...massiveProductsData, ...generateMassiveProductData()]

// Category-wise organization with 100+ items each
export const categoryProducts = {
  Bedroom: allMassiveProducts.filter(p => p.category === 'Bedroom'),
  'Living Room': allMassiveProducts.filter(p => p.category === 'Living Room'),
  Dining: allMassiveProducts.filter(p => p.category === 'Dining'),
  Office: allMassiveProducts.filter(p => p.category === 'Office'),
  Kids: allMassiveProducts.filter(p => p.category === 'Kids'),
  Outdoor: allMassiveProducts.filter(p => p.category === 'Outdoor')
}

// Export massive dataset
export default allMassiveProducts
