import { Product } from '../types/product';

export const DFW_PRODUCTS: Product[] = [
  {
    model: "DFW-LS-001",
    name: "Premium L-Shape Sofa",
    category: "Living Room",
    subcategory: "Sofas & Sectionals",
    type: "L-Shaped",
    dimensions: {
      length: "280 cm",
      width: "180 cm",
      height: "85 cm",
      weight_capacity: "450 kg"
    },
    materials: {
      frame: "Solid Teak Wood",
      upholstery: "Premium Fabric",
      foam_density: "35D HR Foam",
      hardware: "Steel Connectors"
    },
    features: [
      "Ergonomic Back Support",
      "Detachable Cushions",
      "Spill Resistant Fabric",
      "Optional Storage Under Seats"
    ],
    variants: {
      colors: ["Grey", "Beige", "Navy Blue"],
      finishes: ["Matte", "Glossy"]
    },
    technical_specs: {
      construction: "Mortise & Tenon Joints",
      material_grade: "IS 303 Certified",
      safety_standard: "ISO 7170"
    },
    images: [
      "/assets/images/livingroom/sofa/DFW-LS-001/front.jpg",
      "/assets/images/livingroom/sofa/DFW-LS-001/side.jpg",
      "/assets/images/livingroom/sofa/DFW-LS-001/back.jpg",
      "/assets/images/livingroom/sofa/DFW-LS-001/angle.jpg",
      "/assets/images/livingroom/sofa/DFW-LS-001/top.jpg"
    ],
    price: 45000,
    rating: 4.8,
    stock: 12,
    warranty: "5 years",
    customizable: true
  },
  {
    model: "DFW-PR-001",
    name: "Luxe Power Recliner",
    category: "Living Room",
    subcategory: "Recliners",
    type: "Power Recliner",
    dimensions: {
      length: "100 cm",
      width: "95 cm",
      height: "110 cm",
      weight_capacity: "150 kg"
    },
    materials: {
      frame: "Hardwood",
      upholstery: "Top Grain Leather",
      foam_density: "40D HR Foam",
      hardware: "Electric Motor Recline Mechanism"
    },
    features: [
      "Electric Recline Control",
      "USB Charging Port",
      "Ergonomic Back & Arm Support",
      "Premium Leather Finish"
    ],
    variants: {
      colors: ["Brown", "Black", "Beige"],
      finishes: ["Matte", "Glossy"]
    },
    technical_specs: {
      construction: "Electric Recliner Frame",
      material_grade: "IS 303 Certified",
      safety_standard: "ISO 7170"
    },
    images: [
      "/assets/images/livingroom/recliners/DFW-PR-001/front.jpg",
      "/assets/images/livingroom/recliners/DFW-PR-001/side.jpg",
      "/assets/images/livingroom/recliners/DFW-PR-001/back.jpg",
      "/assets/images/livingroom/recliners/DFW-PR-001/angle.jpg",
      "/assets/images/livingroom/recliners/DFW-PR-001/top.jpg"
    ],
    price: 58000,
    rating: 4.9,
    stock: 9,
    warranty: "5 years",
    customizable: false
  }
  // ... Additional products will follow the same structure
];

// Utility functions to filter products
export const getProductsByCategory = (category: string): Product[] => {
  return DFW_PRODUCTS.filter(product => product.category === category);
};

export const getProductsBySubcategory = (subcategory: string): Product[] => {
  return DFW_PRODUCTS.filter(product => product.subcategory === subcategory);
};

export const getProductById = (model: string): Product | undefined => {
  return DFW_PRODUCTS.find(product => product.model === model);
};

// Get product categories
export const getCategories = (): string[] => {
  return [...new Set(DFW_PRODUCTS.map(product => product.category))];
};

// Get subcategories for a category
export const getSubcategories = (category: string): string[] => {
  const products = getProductsByCategory(category);
  return [...new Set(products.map(product => product.subcategory))];
};