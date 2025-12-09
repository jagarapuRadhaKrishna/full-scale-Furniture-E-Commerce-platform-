export interface Product {
  model: string;
  name: string;
  images: string[];
  price: number;
  rating: number;
}

export interface Subcategory {
  id: string;
  name: string;
  products: Product[];
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Catalog {
  categories: Category[];
}