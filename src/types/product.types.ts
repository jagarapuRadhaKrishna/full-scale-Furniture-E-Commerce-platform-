export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  weight: number;
  unit: 'cm' | 'inch';
}

export interface ProductMaterials {
  primary: string;
  secondary?: string;
  finish: string;
  upholstery?: string;
  hardware?: string;
}

export interface ProductVariant {
  color: string;
  material?: string;
  images: string[];
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  model: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  dimensions: ProductDimensions;
  materials: ProductMaterials;
  variants: ProductVariant[];
  features: string[];
  specifications: Record<string, string>;
  warranty: string;
  rating: number;
  reviews: number;
  isCustomizable: boolean;
  customizationOptions?: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}