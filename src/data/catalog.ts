export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  salePrice?: number;
  description: string;
  features: string[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
    unit: 'cm' | 'inch';
  };
  materials: string[];
  colors: string[];
  images: {
    main: string;
    gallery: string[];
    threeSixty?: string[];
  };
  stock: number;
  ratings: {
    average: number;
    count: number;
  };
  isCustomizable: boolean;
  deliveryTime: string;
  warranty: string;
}

export const products: Product[] = [
  // Living Room - Sofas & Sectionals
  {
    id: "lr-sofa-001",
    name: "Premium L-Shaped Sectional Sofa",
    category: "Living Room",
    subCategory: "Sofas & Sectionals",
    price: 89999,
    salePrice: 79999,
    description: "Luxurious L-shaped sectional sofa with premium upholstery and deep comfortable seating",
    features: [
      "Premium fabric upholstery",
      "High-density foam cushioning",
      "Solid wood frame",
      "Removable covers for easy cleaning",
      "Built-in storage under chaise"
    ],
    dimensions: {
      width: 280,
      height: 85,
      depth: 175,
      unit: "cm"
    },
    materials: ["Premium Fabric", "Solid Wood", "High-density Foam"],
    colors: ["Slate Grey", "Royal Blue", "Beige"],
    images: {
      main: "/images/products/living-room/sofas/l-shaped-premium-grey.jpg",
      gallery: [
        "/images/products/living-room/sofas/l-shaped-premium-grey-1.jpg",
        "/images/products/living-room/sofas/l-shaped-premium-grey-2.jpg",
        "/images/products/living-room/sofas/l-shaped-premium-grey-3.jpg"
      ],
      threeSixty: [
        "/images/products/360/l-shaped-sofa/view-1.jpg",
        "/images/products/360/l-shaped-sofa/view-2.jpg",
        "/images/products/360/l-shaped-sofa/view-3.jpg",
        "/images/products/360/l-shaped-sofa/view-4.jpg"
      ]
    },
    stock: 15,
    ratings: {
      average: 4.8,
      count: 127
    },
    isCustomizable: true,
    deliveryTime: "3-4 weeks",
    warranty: "5 years on frame, 2 years on cushions"
  },

  // Living Room - Recliners
  {
    id: "lr-recliner-001",
    name: "Luxe Leather Power Recliner",
    category: "Living Room",
    subCategory: "Recliners",
    price: 49999,
    description: "Power recliner with genuine leather upholstery and multiple reclining positions",
    features: [
      "Genuine leather upholstery",
      "Electric power recline mechanism",
      "USB charging port",
      "Multiple reclining positions",
      "Extra padded headrest"
    ],
    dimensions: {
      width: 95,
      height: 105,
      depth: 95,
      unit: "cm"
    },
    materials: ["Genuine Leather", "High-grade Steel", "Premium Foam"],
    colors: ["Brown", "Black", "Tan"],
    images: {
      main: "/images/products/living-room/recliners/power-recliner-brown.jpg",
      gallery: [
        "/images/products/living-room/recliners/power-recliner-brown-1.jpg",
        "/images/products/living-room/recliners/power-recliner-brown-2.jpg"
      ]
    },
    stock: 8,
    ratings: {
      average: 4.9,
      count: 84
    },
    isCustomizable: false,
    deliveryTime: "1-2 weeks",
    warranty: "3 years comprehensive"
  },

  // Bedroom - Beds
  {
    id: "br-bed-001",
    name: "Modern Platform King Size Bed",
    category: "Bedroom",
    subCategory: "Beds",
    price: 65999,
    salePrice: 59999,
    description: "Contemporary platform bed with LED lighting and storage",
    features: [
      "Built-in LED mood lighting",
      "Hydraulic storage",
      "Premium finish",
      "Sturdy construction",
      "Includes side tables"
    ],
    dimensions: {
      width: 188,
      height: 120,
      depth: 210,
      unit: "cm"
    },
    materials: ["Engineered Wood", "Metal Framework", "Premium Laminate"],
    colors: ["Wenge", "White Oak", "Walnut"],
    images: {
      main: "/images/products/bedroom/beds/platform-bed-king.jpg",
      gallery: [
        "/images/products/bedroom/beds/platform-bed-king-1.jpg",
        "/images/products/bedroom/beds/platform-bed-king-2.jpg"
      ]
    },
    stock: 10,
    ratings: {
      average: 4.7,
      count: 156
    },
    isCustomizable: true,
    deliveryTime: "2-3 weeks",
    warranty: "5 years"
  },

  // Dining Room - Dining Sets
  {
    id: "dr-set-001",
    name: "6-Seater Marble Top Dining Set",
    category: "Dining Room",
    subCategory: "Dining Sets",
    price: 79999,
    description: "Elegant dining set with marble top and premium chairs",
    features: [
      "Italian marble top",
      "Premium upholstered chairs",
      "Solid wood base",
      "Anti-scratch surface",
      "Stain-resistant fabric"
    ],
    dimensions: {
      width: 180,
      height: 75,
      depth: 90,
      unit: "cm"
    },
    materials: ["Italian Marble", "Solid Wood", "Premium Fabric"],
    colors: ["White Marble/Walnut", "Black Marble/Mahogany"],
    images: {
      main: "/images/products/dining/sets/marble-6-seater.jpg",
      gallery: [
        "/images/products/dining/sets/marble-6-seater-1.jpg",
        "/images/products/dining/sets/marble-6-seater-2.jpg"
      ]
    },
    stock: 6,
    ratings: {
      average: 4.8,
      count: 92
    },
    isCustomizable: true,
    deliveryTime: "3-4 weeks",
    warranty: "2 years"
  },

  // Office Furniture
  {
    id: "of-desk-001",
    name: "Executive Office Desk with Storage",
    category: "Office",
    subCategory: "Desks",
    price: 45999,
    description: "Professional executive desk with ample storage and wire management",
    features: [
      "Wire management system",
      "Multiple drawers",
      "Lockable storage",
      "Premium finish",
      "Ergonomic design"
    ],
    dimensions: {
      width: 160,
      height: 75,
      depth: 80,
      unit: "cm"
    },
    materials: ["Premium MDF", "Metal Framework", "Tempered Glass"],
    colors: ["Dark Oak", "White", "Black"],
    images: {
      main: "/images/products/office/desks/executive-desk.jpg",
      gallery: [
        "/images/products/office/desks/executive-desk-1.jpg",
        "/images/products/office/desks/executive-desk-2.jpg"
      ]
    },
    stock: 12,
    ratings: {
      average: 4.6,
      count: 78
    },
    isCustomizable: false,
    deliveryTime: "1-2 weeks",
    warranty: "2 years"
  },

  // Kids Furniture
  {
    id: "kf-bed-001",
    name: "Children's Theme Bed with Storage",
    category: "Kids",
    subCategory: "Beds",
    price: 39999,
    salePrice: 34999,
    description: "Fun and functional theme bed with built-in storage",
    features: [
      "Safe rounded edges",
      "Storage drawers",
      "Non-toxic paint",
      "Theme customization",
      "Guard rails included"
    ],
    dimensions: {
      width: 100,
      height: 120,
      depth: 200,
      unit: "cm"
    },
    materials: ["MDF", "Solid Pine", "Child-safe Paint"],
    colors: ["Blue/White", "Pink/White", "Rainbow"],
    images: {
      main: "/images/products/kids/beds/theme-bed.jpg",
      gallery: [
        "/images/products/kids/beds/theme-bed-1.jpg",
        "/images/products/kids/beds/theme-bed-2.jpg"
      ]
    },
    stock: 8,
    ratings: {
      average: 4.7,
      count: 65
    },
    isCustomizable: true,
    deliveryTime: "2-3 weeks",
    warranty: "3 years"
  },

  // Outdoor Furniture
  {
    id: "of-set-001",
    name: "4-Piece Garden Lounge Set",
    category: "Outdoor",
    subCategory: "Lounge Sets",
    price: 54999,
    description: "Weather-resistant outdoor lounge set with comfortable cushions",
    features: [
      "Weather-resistant wicker",
      "Water-repellent cushions",
      "UV protected",
      "Easy to clean",
      "Stackable design"
    ],
    dimensions: {
      width: 240,
      height: 85,
      depth: 180,
      unit: "cm"
    },
    materials: ["All-weather Wicker", "Aluminum Frame", "Olefin Fabric"],
    colors: ["Brown/Beige", "Grey/White"],
    images: {
      main: "/images/products/outdoor/sets/garden-lounge.jpg",
      gallery: [
        "/images/products/outdoor/sets/garden-lounge-1.jpg",
        "/images/products/outdoor/sets/garden-lounge-2.jpg"
      ]
    },
    stock: 5,
    ratings: {
      average: 4.5,
      count: 45
    },
    isCustomizable: false,
    deliveryTime: "1-2 weeks",
    warranty: "3 years on frame, 1 year on cushions"
  }
];

export const categories = [
  {
    id: "living-room",
    name: "Living Room",
    subCategories: [
      {
        id: "sofas-sectionals",
        name: "Sofas & Sectionals",
        description: "Luxurious sofas and sectionals for your living space"
      },
      {
        id: "recliners",
        name: "Recliners",
        description: "Comfortable recliners for ultimate relaxation"
      },
      {
        id: "coffee-tables",
        name: "Coffee Tables",
        description: "Stylish coffee tables to complement your living room"
      },
      {
        id: "tv-units",
        name: "TV Units",
        description: "Modern TV units with ample storage"
      }
    ]
  },
  {
    id: "bedroom",
    name: "Bedroom",
    subCategories: [
      {
        id: "beds",
        name: "Beds & Frames",
        description: "Premium beds and frames for peaceful sleep"
      },
      {
        id: "mattresses",
        name: "Mattresses",
        description: "High-quality mattresses for comfort"
      },
      {
        id: "wardrobes",
        name: "Wardrobes",
        description: "Spacious wardrobes with modern designs"
      },
      {
        id: "dressing-tables",
        name: "Dressing Tables",
        description: "Elegant dressing tables for your bedroom"
      }
    ]
  },
  {
    id: "dining-room",
    name: "Dining Room",
    subCategories: [
      {
        id: "dining-sets",
        name: "Dining Sets",
        description: "Complete dining sets for family gatherings"
      },
      {
        id: "dining-tables",
        name: "Dining Tables",
        description: "Standalone dining tables in various styles"
      },
      {
        id: "chairs",
        name: "Dining Chairs",
        description: "Comfortable dining chairs"
      },
      {
        id: "buffet-units",
        name: "Buffet Units",
        description: "Storage solutions for your dining area"
      }
    ]
  },
  {
    id: "office",
    name: "Office",
    subCategories: [
      {
        id: "desks",
        name: "Office Desks",
        description: "Professional desks for your workspace"
      },
      {
        id: "chairs",
        name: "Office Chairs",
        description: "Ergonomic chairs for comfort"
      },
      {
        id: "storage",
        name: "Storage Solutions",
        description: "Office storage and organization"
      }
    ]
  },
  {
    id: "kids",
    name: "Kids",
    subCategories: [
      {
        id: "beds",
        name: "Kids Beds",
        description: "Fun and safe beds for children"
      },
      {
        id: "study-tables",
        name: "Study Tables",
        description: "Ergonomic study tables for children"
      },
      {
        id: "storage",
        name: "Storage & Organizers",
        description: "Storage solutions for kids' rooms"
      }
    ]
  },
  {
    id: "outdoor",
    name: "Outdoor",
    subCategories: [
      {
        id: "lounge-sets",
        name: "Lounge Sets",
        description: "Comfortable outdoor seating sets"
      },
      {
        id: "dining-sets",
        name: "Outdoor Dining",
        description: "Weather-resistant dining furniture"
      },
      {
        id: "decor",
        name: "Outdoor Decor",
        description: "Decorative items for your outdoor space"
      }
    ]
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProductsBySubCategory = (category: string, subCategory: string) => {
  return products.filter(
    product => 
      product.category === category && 
      product.subCategory === subCategory
  );
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.salePrice !== undefined);
};

export const getNewArrivals = () => {
  return products.slice(0, 8); // Returns first 8 products as new arrivals
};