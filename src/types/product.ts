export interface ProductDimensions {
  length: string;
  width: string;
  height: string;
  weight_capacity: string;
}

export interface ProductMaterials {
  frame?: string;
  upholstery?: string;
  foam_density?: string;
  hardware?: string;
  table_top?: string;
  chairs?: string;
  headboard?: string;
  finish?: string;
}

export interface ProductVariants {
  colors: string[];
  finishes: string[];
}

export interface TechnicalSpecs {
  construction: string;
  material_grade: string;
  safety_standard: string;
}

export interface Product {
  model: string;
  name: string;
  category: string;
  subcategory: string;
  type: string;
  dimensions: ProductDimensions;
  materials: ProductMaterials;
  features: string[];
  variants: ProductVariants;
  technical_specs: TechnicalSpecs;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  warranty: string;
  customizable: boolean;
}

export interface CategoryProducts {
  [category: string]: {
    [subcategory: string]: Product[];
  };
}