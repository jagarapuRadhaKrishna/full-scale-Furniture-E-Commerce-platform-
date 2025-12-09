// Complete Divya Furniture World Catalog - Updated Product Dataset
// Comprehensive furniture collection with smart features and detailed specifications

export interface ProductVariation {
  size: string
  price: string
  originalPrice?: string
  dimensions: string
  weight?: string
  inStock: boolean
}

export interface SmartFeature {
  name: string
  description: string
  icon?: string
}

export interface DetailedProduct {
  id: number
  productId: string
  name: string
  category: string
  subCategory: string
  material: string
  design: string
  variations: ProductVariation[]
  smartFeatures: SmartFeature[]
  description: string
  fullDescription: string
  features: string[]
  specifications: string
  images: string[]
  has360View: boolean
  rating: number
  reviews: number
  isNew?: boolean
  isFeatured?: boolean
  tags: string[]
  warranty: string
  assemblyRequired: boolean
}

// BEDROOM FURNITURE COLLECTION
export const bedroomFurniture: DetailedProduct[] = [
  // PLATFORM BEDS
  {
    id: 1001,
    productId: "BED-PLT-001",
    name: "Platform Bed with LED Lighting",
    category: "Bedroom",
    subCategory: "Beds",
    material: "Wood/Upholstery",
    design: "Modern Platform",
    variations: [
      {
        size: "Twin",
        price: "₹40,000",
        originalPrice: "₹45,000",
        dimensions: "99cm x 191cm x 35cm",
        weight: "45kg",
        inStock: true
      },
      {
        size: "Queen",
        price: "₹50,000",
        originalPrice: "₹55,000",
        dimensions: "152cm x 203cm x 35cm",
        weight: "65kg",
        inStock: true
      },
      {
        size: "King",
        price: "₹60,000",
        originalPrice: "₹68,000",
        dimensions: "193cm x 203cm x 35cm",
        weight: "85kg",
        inStock: true
      }
    ],
    smartFeatures: [
      {
        name: "LED Under-bed Lighting",
        description: "Ambient lighting with color customization"
      },
      {
        name: "Remote Control",
        description: "Wireless control for all lighting functions"
      },
      {
        name: "USB Charging Ports",
        description: "Built-in charging stations on both sides"
      }
    ],
    description: "Sleek platform bed with storage and smart lighting features",
    fullDescription: "Modern platform bed featuring LED under-bed lighting, remote control operation, and built-in storage. Multiple finish options available with contemporary design that fits any bedroom aesthetic.",
    features: ["LED Lighting", "Remote Control", "Storage Enabled", "Multiple Finishes", "USB Charging"],
    specifications: "Solid wood construction with engineered wood platform, LED strips, wireless remote, weight capacity up to 300kg",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049421450-348cb4d57bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049684263-e4f0a10b4a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605372332995-1b1dee2b5a31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.8,
    reviews: 156,
    isNew: true,
    isFeatured: true,
    tags: ["Smart Furniture", "LED Lighting", "Storage", "Modern"],
    warranty: "5 Years",
    assemblyRequired: true
  },

  // STORAGE BEDS
  {
    id: 1002,
    productId: "BED-STR-001",
    name: "Smart Storage Bed with Sensor Drawers",
    category: "Bedroom",
    subCategory: "Beds",
    material: "Engineered Wood & MDF",
    design: "Contemporary Storage",
    variations: [
      {
        size: "Compact",
        price: "₹35,000",
        originalPrice: "₹40,000",
        dimensions: "140cm x 190cm x 40cm",
        weight: "55kg",
        inStock: true
      },
      {
        size: "Queen",
        price: "₹45,000",
        originalPrice: "₹50,000",
        dimensions: "152cm x 203cm x 40cm",
        weight: "70kg",
        inStock: true
      },
      {
        size: "King",
        price: "₹55,000",
        originalPrice: "₹62,000",
        dimensions: "193cm x 203cm x 40cm",
        weight: "90kg",
        inStock: true
      }
    ],
    smartFeatures: [
      {
        name: "Sensor Drawers",
        description: "Touch-activated storage compartments"
      },
      {
        name: "Lift-top Storage",
        description: "Hydraulic lift mechanism for mattress platform"
      },
      {
        name: "Smart Locks",
        description: "Secure storage with electronic locks"
      }
    ],
    description: "Space-saving bed with smart sensor-activated storage solutions",
    fullDescription: "Innovative storage bed featuring sensor-activated drawers, hydraulic lift-top storage, and smart organization systems. Perfect for maximizing bedroom space while maintaining style and functionality.",
    features: ["Sensor Technology", "Hydraulic Lift", "Smart Locks", "Space-Saving", "Easy Access"],
    specifications: "Engineered wood construction, sensor technology, hydraulic systems, weight capacity 280kg",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049421450-348cb4d57bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049684263-e4f0a10b4a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605372332995-1b1dee2b5a31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.6,
    reviews: 128,
    isNew: true,
    tags: ["Smart Storage", "Sensor Technology", "Space-Saving"],
    warranty: "3 Years",
    assemblyRequired: true
  },

  // UPHOLSTERED BEDS
  {
    id: 1003,
    productId: "BED-UPH-001",
    name: "Luxury Upholstered Bed with Touchscreen Headboard",
    category: "Bedroom",
    subCategory: "Beds",
    material: "Velvet, Faux Leather",
    design: "Luxury Upholstered",
    variations: [
      {
        size: "Queen",
        price: "₹55,000",
        originalPrice: "₹65,000",
        dimensions: "152cm x 203cm x 120cm",
        weight: "75kg",
        inStock: true
      },
      {
        size: "King",
        price: "₹75,000",
        originalPrice: "₹85,000",
        dimensions: "193cm x 203cm x 120cm",
        weight: "95kg",
        inStock: true
      },
      {
        size: "Oversized King",
        price: "₹90,000",
        originalPrice: "₹105,000",
        dimensions: "203cm x 213cm x 130cm",
        weight: "110kg",
        inStock: true
      }
    ],
    smartFeatures: [
      {
        name: "Touchscreen Headboard",
        description: "Interactive display for entertainment and controls"
      },
      {
        name: "LED Ambient Lighting",
        description: "Customizable mood lighting with color options"
      },
      {
        name: "Wireless Charging",
        description: "Built-in wireless charging pads"
      }
    ],
    description: "Plush luxury bed with ambient lighting and interactive features",
    fullDescription: "Ultimate luxury upholstered bed featuring premium velvet or faux leather upholstery, touchscreen headboard for entertainment control, and sophisticated ambient lighting system.",
    features: ["Touchscreen Control", "Premium Upholstery", "Ambient Lighting", "Wireless Charging", "Luxury Design"],
    specifications: "Premium upholstery materials, touchscreen technology, LED lighting system, wireless charging capability",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049421450-348cb4d57bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049684263-e4f0a10b4a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605372332995-1b1dee2b5a31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.9,
    reviews: 89,
    isNew: true,
    isFeatured: true,
    tags: ["Luxury", "Smart Technology", "Touchscreen", "Premium Materials"],
    warranty: "5 Years",
    assemblyRequired: true
  },

  // WARDROBES
  {
    id: 1004,
    productId: "WRD-SLD-001",
    name: "Smart Sliding Door Wardrobe with LED",
    category: "Bedroom",
    subCategory: "Wardrobes",
    material: "Engineered Wood, Glass Panels",
    design: "Modern Sliding Door",
    variations: [
      {
        size: "2-Door",
        price: "₹25,000",
        originalPrice: "₹30,000",
        dimensions: "120cm x 60cm x 220cm",
        weight: "85kg",
        inStock: true
      },
      {
        size: "3-Door",
        price: "₹45,000",
        originalPrice: "₹52,000",
        dimensions: "180cm x 60cm x 220cm",
        weight: "120kg",
        inStock: true
      },
      {
        size: "4-Door Walk-in",
        price: "₹80,000",
        originalPrice: "₹92,000",
        dimensions: "240cm x 80cm x 240cm",
        weight: "180kg",
        inStock: true
      }
    ],
    smartFeatures: [
      {
        name: "Soft-close Doors",
        description: "Silent closing mechanism with sensors"
      },
      {
        name: "LED Interior Lighting",
        description: "Motion-activated LED strips inside"
      },
      {
        name: "Touch Controls",
        description: "Easy-access electronic controls"
      }
    ],
    description: "Modern wardrobe with smart features and modular design",
    fullDescription: "Contemporary sliding door wardrobe featuring soft-close technology, motion-activated LED lighting, and modular organization systems. Available in multiple configurations including corner and walk-in styles.",
    features: ["Sliding Doors", "LED Lighting", "Modular Design", "Soft-close Technology", "Motion Sensors"],
    specifications: "Engineered wood construction, glass panels, LED lighting system, soft-close hardware",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049684263-e4f0a10b4a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605372332995-1b1dee2b5a31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.7,
    reviews: 167,
    isNew: false,
    tags: ["Smart Storage", "Modular", "LED Technology"],
    warranty: "3 Years",
    assemblyRequired: true
  }
]

// LIVING ROOM FURNITURE COLLECTION
export const livingRoomFurniture: DetailedProduct[] = [
  // SMART SOFAS
  {
    id: 2001,
    productId: "SOF-LSH-001",
    name: "Smart L-Shaped Sectional Sofa",
    category: "Living Room",
    subCategory: "Sofas",
    material: "Leather, Fabric, Velvet",
    design: "Modern Sectional",
    variations: [
      {
        size: "5-Seater",
        price: "₹65,000",
        originalPrice: "₹75,000",
        dimensions: "280cm x 180cm x 85cm",
        weight: "95kg",
        inStock: true
      },
      {
        size: "7-Seater",
        price: "₹75,000",
        originalPrice: "₹85,000",
        dimensions: "320cm x 200cm x 85cm",
        weight: "120kg",
        inStock: true
      },
      {
        size: "Modular 9-Piece",
        price: "₹85,000",
        originalPrice: "₹98,000",
        dimensions: "Configurable",
        weight: "150kg",
        inStock: true
      }
    ],
    smartFeatures: [
      {
        name: "Remote Recline",
        description: "Electric reclining with memory positions"
      },
      {
        name: "Touch Sensor Cushions",
        description: "Pressure-sensitive cushion adjustment"
      },
      {
        name: "LED Accent Lighting",
        description: "Ambient lighting with color customization"
      },
      {
        name: "USB Charging Hub",
        description: "Multiple charging ports built-in"
      }
    ],
    description: "Premium sectional sofa with smart features and modular design",
    fullDescription: "Modern L-shaped sectional sofa featuring electric reclining, touch-sensitive cushions, LED accent lighting, and integrated charging solutions. Available in premium leather, fabric, or velvet upholstery.",
    features: ["Electric Recline", "Touch Sensors", "LED Lighting", "USB Charging", "Modular Design"],
    specifications: "Hardwood frame, premium upholstery, electric mechanisms, LED system, USB charging hub",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049421450-348cb4d57bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049684263-e4f0a10b4a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.8,
    reviews: 234,
    isNew: true,
    isFeatured: true,
    tags: ["Smart Furniture", "Electric Features", "Modular", "Premium"],
    warranty: "5 Years",
    assemblyRequired: true
  }
]

// DINING ROOM FURNITURE COLLECTION
export const diningFurniture: DetailedProduct[] = [
  // DINING TABLES
  {
    id: 3001,
    productId: "DIN-TBL-001",
    name: "Smart Extendable Dining Table (6-8 Seater)",
    category: "Dining",
    subCategory: "Dining Tables",
    material: "Marble, Wood, Glass",
    design: "Modern Extendable",
    variations: [
      {
        size: "6-Seater",
        price: "₹45,000",
        originalPrice: "₹52,000",
        dimensions: "180cm x 90cm x 75cm",
        weight: "85kg",
        inStock: true
      },
      {
        size: "8-Seater Extended",
        price: "₹55,000",
        originalPrice: "₹65,000",
        dimensions: "220cm x 100cm x 75cm",
        weight: "110kg",
        inStock: true
      },
      {
        size: "Round Glass 4-Seater",
        price: "₹38,000",
        originalPrice: "₹45,000",
        dimensions: "120cm diameter x 75cm",
        weight: "65kg",
        inStock: true
      }
    ],
    smartFeatures: [
      {
        name: "Sensor Automatic Extension",
        description: "Touch-activated table extension mechanism"
      },
      {
        name: "LED Table Lighting",
        description: "Under-table ambient lighting with remote control"
      },
      {
        name: "Temperature Control Surface",
        description: "Heated surface for food warming"
      }
    ],
    description: "Smart dining table with automatic extension and LED lighting",
    fullDescription: "Modern dining table featuring sensor-activated extension mechanism, LED ambient lighting, and premium material options. Perfect for family gatherings with smart technology integration.",
    features: ["Auto Extension", "LED Lighting", "Premium Materials", "Temperature Control", "Remote Operation"],
    specifications: "Solid wood/marble construction, sensor extension system, LED strips, weight capacity 150kg",
    images: [
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550226891-ef816aed4a98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551298370-9c50423542b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.7,
    reviews: 189,
    isNew: true,
    isFeatured: true,
    tags: ["Smart Dining", "Auto Extension", "LED Lighting", "Premium"],
    warranty: "5 Years",
    assemblyRequired: true
  },

  // DINING CHAIRS
  {
    id: 3002,
    productId: "DIN-CHR-001",
    name: "Smart Upholstered Dining Chairs (Set of 6)",
    category: "Dining",
    subCategory: "Dining Chairs",
    material: "Upholstered, Wooden, Metal",
    design: "Ergonomic Smart Seating",
    variations: [
      {
        size: "Set of 4",
        price: "₹24,000",
        originalPrice: "₹30,000",
        dimensions: "45cm x 50cm x 90cm each",
        weight: "8kg each",
        inStock: true
      },
      {
        size: "Set of 6",
        price: "₹35,000",
        originalPrice: "₹42,000",
        dimensions: "45cm x 50cm x 90cm each",
        weight: "8kg each",
        inStock: true
      },
      {
        size: "Set of 8",
        price: "₹45,000",
        originalPrice: "₹55,000",
        dimensions: "45cm x 50cm x 90cm each",
        weight: "8kg each",
        inStock: true
      }
    ],
    smartFeatures: [
      {
        name: "Sensor Seat Adjustment",
        description: "Automatic posture-responsive seat adjustment"
      },
      {
        name: "LED Accent Lighting",
        description: "Ambient lighting in chair base"
      },
      {
        name: "Touch Controls",
        description: "Touch-sensitive height and recline adjustment"
      }
    ],
    description: "Smart dining chairs with sensor adjustment and LED accents",
    fullDescription: "Ergonomic dining chairs featuring sensor-based posture adjustment, LED accent lighting, and premium upholstery. Designed for comfort during long dining experiences.",
    features: ["Sensor Adjustment", "LED Accents", "Touch Controls", "Premium Upholstery", "Ergonomic Design"],
    specifications: "Upholstered seat, wooden frame, sensor technology, LED system, weight capacity 120kg per chair",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049421450-348cb4d57bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049684263-e4f0a10b4a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605372332995-1b1dee2b5a31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.5,
    reviews: 156,
    tags: ["Smart Seating", "Sensor Technology", "LED Lighting"],
    warranty: "3 Years",
    assemblyRequired: true
  }
]

// OFFICE FURNITURE COLLECTION
export const officeFurniture: DetailedProduct[] = [
  // OFFICE DESKS
  {
    id: 4001,
    productId: "OFF-DSK-001",
    name: "Smart Height-Adjustable Standing Desk",
    category: "Office",
    subCategory: "Office Desks",
    material: "Wood, Engineered Composites",
    design: "Modern Executive",
    variations: [
      {
        size: "Standard 120cm",
        price: "₹35,000",
        originalPrice: "₹42,000",
        dimensions: "120cm x 70cm x 65-130cm",
        weight: "45kg",
        inStock: true
      },
      {
        size: "Executive 160cm",
        price: "₹45,000",
        originalPrice: "₹55,000",
        dimensions: "160cm x 80cm x 65-130cm",
        weight: "65kg",
        inStock: true
      },
      {
        size: "L-Shaped Corner",
        price: "₹60,000",
        originalPrice: "₹70,000",
        dimensions: "160cm x 120cm x 65-130cm",
        weight: "85kg",
        inStock: true
      }
    ],
    smartFeatures: [
      {
        name: "Auto Height Adjustment",
        description: "Electric height adjustment with memory settings"
      },
      {
        name: "Touch Drawers",
        description: "Touch-activated drawer opening system"
      },
      {
        name: "Cable Management",
        description: "Smart cable organization with sensor routing"
      },
      {
        name: "USB Charging Hub",
        description: "Built-in USB charging stations"
      }
    ],
    description: "Smart standing desk with electric height adjustment and touch controls",
    fullDescription: "Professional standing desk featuring electric height adjustment, touch-activated drawers, smart cable management, and integrated charging solutions. Perfect for modern office productivity.",
    features: ["Electric Height Adjustment", "Touch Controls", "Cable Management", "USB Charging", "Memory Settings"],
    specifications: "Engineered wood surface, electric motor system, touch sensors, USB hub, weight capacity 100kg",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049421450-348cb4d57bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.8,
    reviews: 234,
    isNew: true,
    isFeatured: true,
    tags: ["Smart Office", "Height Adjustable", "Touch Technology", "Professional"],
    warranty: "5 Years",
    assemblyRequired: true
  },

  // OFFICE CHAIRS
  {
    id: 4002,
    productId: "OFF-CHR-001",
    name: "Smart Executive Chair with AI Posture Support",
    category: "Office",
    subCategory: "Office Chairs",
    material: "Mesh, Fabric, Ergonomic",
    design: "Executive Ergonomic",
    variations: [
      {
        size: "Standard Executive",
        price: "₹25,000",
        originalPrice: "₹32,000",
        dimensions: "70cm x 70cm x 110-120cm",
        weight: "25kg",
        inStock: true
      },
      {
        size: "High-Back Premium",
        price: "₹35,000",
        originalPrice: "₹42,000",
        dimensions: "75cm x 75cm x 115-125cm",
        weight: "30kg",
        inStock: true
      },
      {
        size: "Mesh Gaming Style",
        price: "₹28,000",
        originalPrice: "₹35,000",
        dimensions: "68cm x 68cm x 108-118cm",
        weight: "22kg",
        inStock: true
      }
    ],
    smartFeatures: [
      {
        name: "Lumbar Sensors",
        description: "AI-powered posture monitoring and adjustment"
      },
      {
        name: "Heating/Cooling",
        description: "Temperature control for seat and backrest"
      },
      {
        name: "LED Status Lighting",
        description: "Posture indicator lighting system"
      },
      {
        name: "Memory Foam Adaptation",
        description: "Smart foam that adapts to user preferences"
      }
    ],
    description: "AI-powered executive chair with posture monitoring and temperature control",
    fullDescription: "Advanced executive chair featuring AI posture monitoring, heating/cooling system, LED status indicators, and adaptive memory foam. Designed for ultimate office comfort and productivity.",
    features: ["AI Posture Support", "Temperature Control", "LED Indicators", "Memory Foam", "Lumbar Sensors"],
    specifications: "Mesh/fabric upholstery, AI sensors, heating/cooling system, LED indicators, weight capacity 150kg",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049421450-348cb4d57bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.9,
    reviews: 345,
    isNew: true,
    isFeatured: true,
    tags: ["AI Technology", "Smart Office", "Ergonomic", "Temperature Control"],
    warranty: "5 Years",
    assemblyRequired: true
  }
]

// KIDS FURNITURE COLLECTION
export const kidsFurniture: DetailedProduct[] = [
  // KIDS BEDS
  {
    id: 5001,
    productId: "KID-BED-001",
    name: "Smart LED Kids Bed with Safety Features",
    category: "Kids",
    subCategory: "Kids Beds",
    material: "Painted Wood, Metal",
    design: "Themed Smart Kids",
    variations: [
      {
        size: "Single Twin",
        price: "₹25,000",
        originalPrice: "₹32,000",
        dimensions: "99cm x 191cm x 85cm",
        weight: "35kg",
        inStock: true
      },
      {
        size: "Bunk Bed",
        price: "₹35,000",
        originalPrice: "₹42,000",
        dimensions: "105cm x 205cm x 155cm",
        weight: "65kg",
        inStock: true
      },
      {
        size: "Loft Bed with Desk",
        price: "₹45,000",
        originalPrice: "₹55,000",
        dimensions: "120cm x 200cm x 180cm",
        weight: "85kg",
        inStock: true
      }
    ],
    smartFeatures: [
      {
        name: "LED Night Lighting",
        description: "Gentle LED lighting with color themes"
      },
      {
        name: "Sensor Safety Rails",
        description: "Motion-detecting safety barriers"
      },
      {
        name: "Smart Storage Drawers",
        description: "Touch-activated toy storage compartments"
      },
      {
        name: "Bedtime Story Speaker",
        description: "Built-in Bluetooth speaker system"
      }
    ],
    description: "Smart kids bed with LED lighting and advanced safety features",
    fullDescription: "Interactive kids bed featuring LED night lighting, motion-sensor safety rails, smart storage drawers, and built-in entertainment system. Designed for safety, fun, and smart organization.",
    features: ["LED Lighting", "Safety Sensors", "Smart Storage", "Entertainment System", "Child-Safe Design"],
    specifications: "Painted wood construction, LED system, motion sensors, Bluetooth speakers, safety certified",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049421450-348cb4d57bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.8,
    reviews: 267,
    isNew: true,
    isFeatured: true,
    tags: ["Kids Safe", "LED Lighting", "Smart Storage", "Entertainment"],
    warranty: "3 Years",
    assemblyRequired: true
  },

  // STUDY FURNITURE
  {
    id: 5002,
    productId: "KID-STD-001",
    name: "Smart Growth-Adaptive Study Set",
    category: "Kids",
    subCategory: "Study Furniture",
    material: "Wood, Laminate",
    design: "Adjustable Growth System",
    variations: [
      {
        size: "Ages 5-10",
        price: "₹18,000",
        originalPrice: "₹24,000",
        dimensions: "80cm x 60cm x 60-75cm",
        weight: "25kg",
        inStock: true
      },
      {
        size: "Ages 8-15",
        price: "₹22,000",
        originalPrice: "₹28,000",
        dimensions: "100cm x 70cm x 65-85cm",
        weight: "35kg",
        inStock: true
      },
      {
        size: "Teen Executive",
        price: "₹28,000",
        originalPrice: "₹35,000",
        dimensions: "120cm x 80cm x 70-90cm",
        weight: "45kg",
        inStock: true
      }
    ],
    smartFeatures: [
      {
        name: "Auto Height Adjustment",
        description: "Sensor-based height adaptation as child grows"
      },
      {
        name: "LED Study Lighting",
        description: "Eye-care LED lighting with brightness control"
      },
      {
        name: "Smart Posture Monitor",
        description: "Posture tracking with gentle correction reminders"
      },
      {
        name: "Digital Learning Hub",
        description: "Integrated tablet/device charging and storage"
      }
    ],
    description: "Growth-adaptive study furniture with smart learning features",
    fullDescription: "Intelligent study set that grows with your child, featuring auto-height adjustment, LED study lighting, posture monitoring, and integrated digital learning support. Perfect for academic development.",
    features: ["Growth Adaptive", "LED Study Light", "Posture Monitor", "Digital Integration", "Ergonomic Design"],
    specifications: "Wood/laminate construction, height adjustment motors, LED lighting, posture sensors, device integration",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049421450-348cb4d57bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.7,
    reviews: 198,
    isNew: true,
    tags: ["Growth Adaptive", "Smart Learning", "Ergonomic", "LED Technology"],
    warranty: "5 Years",
    assemblyRequired: true
  }
]

// OUTDOOR FURNITURE COLLECTION
export const outdoorFurniture: DetailedProduct[] = [
  // PATIO SETS
  {
    id: 6001,
    productId: "OUT-PAT-001",
    name: "Smart Weather-Adaptive Patio Set",
    category: "Outdoor",
    subCategory: "Patio Sets",
    material: "Metal, Rattan, Durable Fabric",
    design: "Weather-Smart Modular",
    variations: [
      {
        size: "4-Seater Compact",
        price: "₹45,000",
        originalPrice: "₹55,000",
        dimensions: "120cm x 80cm table + 4 chairs",
        weight: "85kg total",
        inStock: true
      },
      {
        size: "6-Seater Standard",
        price: "₹55,000",
        originalPrice: "₹65,000",
        dimensions: "150cm x 90cm table + 6 chairs",
        weight: "120kg total",
        inStock: true
      },
      {
        size: "8-Seater Sectional",
        price: "₹65,000",
        originalPrice: "₹75,000",
        dimensions: "Modular sectional configuration",
        weight: "180kg total",
        inStock: true
      }
    ],
    smartFeatures: [
      {
        name: "Weather Sensors",
        description: "Automatic weather monitoring and alerts"
      },
      {
        name: "Remote Reclining Chairs",
        description: "Electric reclining with weather-resistant motors"
      },
      {
        name: "LED Ambient Lighting",
        description: "Weather-proof LED lighting system"
      },
      {
        name: "Smart Covers",
        description: "Automatic protective cover deployment"
      }
    ],
    description: "Weather-smart patio set with automatic protection and comfort features",
    fullDescription: "Advanced outdoor furniture featuring weather sensors, remote-controlled reclining, LED ambient lighting, and automatic protective systems. Built for year-round outdoor luxury.",
    features: ["Weather Sensors", "Electric Recline", "LED Lighting", "Auto Protection", "Modular Design"],
    specifications: "Weather-resistant materials, electric systems, LED strips, sensor technology, 5-year weather warranty",
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049421450-348cb4d57bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.6,
    reviews: 145,
    isNew: true,
    isFeatured: true,
    tags: ["Weather Smart", "Outdoor Luxury", "Electric Features", "Modular"],
    warranty: "5 Years",
    assemblyRequired: true
  },

  // LOUNGE FURNITURE
  {
    id: 6002,
    productId: "OUT-LNG-001",
    name: "Smart Outdoor Lounge Set with Climate Control",
    category: "Outdoor",
    subCategory: "Lounge Furniture",
    material: "Weather Resistant Materials",
    design: "Luxury Climate Smart",
    variations: [
      {
        size: "3-Piece Lounge",
        price: "₹65,000",
        originalPrice: "₹78,000",
        dimensions: "200cm sofa + 2 chairs + coffee table",
        weight: "140kg total",
        inStock: true
      },
      {
        size: "5-Piece Sectional",
        price: "₹85,000",
        originalPrice: "₹98,000",
        dimensions: "Modular sectional with ottoman",
        weight: "220kg total",
        inStock: true
      },
      {
        size: "7-Piece Garden Suite",
        price: "₹120,000",
        originalPrice: "₹140,000",
        dimensions: "Complete outdoor living set",
        weight: "300kg total",
        inStock: true
      }
    ],
    smartFeatures: [
      {
        name: "Climate Control Cushions",
        description: "Heating and cooling integrated in seating"
      },
      {
        name: "Sensor Touch Canopy",
        description: "Automated shade adjustment based on sun position"
      },
      {
        name: "Remote Control Operation",
        description: "Wireless control for all smart features"
      },
      {
        name: "Weather Protection System",
        description: "Automatic weatherproofing activation"
      }
    ],
    description: "Premium outdoor lounge with climate control and automated features",
    fullDescription: "Luxury outdoor lounge set featuring climate-controlled cushions, automated canopy system, remote operation, and comprehensive weather protection. The ultimate in outdoor comfort technology.",
    features: ["Climate Control", "Auto Canopy", "Remote Control", "Weather Protection", "Luxury Materials"],
    specifications: "Weather-resistant construction, climate control systems, automated mechanisms, remote operation, premium warranty",
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049421450-348cb4d57bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    has360View: true,
    rating: 4.8,
    reviews: 123,
    isNew: true,
    isFeatured: true,
    tags: ["Climate Control", "Luxury Outdoor", "Smart Automation", "Premium"],
    warranty: "7 Years",
    assemblyRequired: true
  }
]

export const completeProductCatalog = {
  bedroom: bedroomFurniture,
  livingRoom: livingRoomFurniture,
  dining: diningFurniture,
  office: officeFurniture,
  kids: kidsFurniture,
  outdoor: outdoorFurniture
}

export default completeProductCatalog