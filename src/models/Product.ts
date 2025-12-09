import { ObjectId } from 'mongodb';

export interface IProduct {
  _id?: ObjectId;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku: string;
  categoryId: ObjectId;
  brandId?: ObjectId;
  vendorId?: ObjectId;
  
  // Pricing
  price: number;
  compareAtPrice?: number; // Original price for discount display
  costPrice?: number; // For vendor/admin
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
    startDate?: Date;
    endDate?: Date;
  };
  
  // Inventory
  stock: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  allowBackorder: boolean;
  
  // Product Details
  images: Array<{
    url: string;
    alt?: string;
    isPrimary: boolean;
  }>;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'inch';
  };
  weight?: {
    value: number;
    unit: 'kg' | 'lb';
  };
  
  // Attributes
  attributes: {
    color?: string[];
    material?: string[];
    style?: string[];
    finish?: string[];
    assemblyRequired?: boolean;
    warranty?: string;
    [key: string]: any;
  };
  
  // SEO
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  
  // 3D/AR
  model3D?: {
    url: string;
    format: 'gltf' | 'glb' | 'obj';
    size: number;
  };
  arEnabled: boolean;
  
  // Reviews & Ratings
  rating: {
    average: number;
    count: number;
  };
  
  // Status
  status: 'draft' | 'active' | 'archived';
  featured: boolean;
  trending: boolean;
  newArrival: boolean;
  
  // Metadata
  viewCount: number;
  salesCount: number;
  wishlistCount: number;
  tags: string[];
  
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface ICategory {
  _id?: ObjectId;
  name: string;
  slug: string;
  description?: string;
  parentId?: ObjectId;
  image?: string;
  icon?: string;
  order: number;
  isActive: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IBrand {
  _id?: ObjectId;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// MongoDB Collection Names
export const PRODUCT_COLLECTIONS = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  BRANDS: 'brands',
};

// MongoDB Indexes
export const PRODUCT_INDEXES = [
  { key: { slug: 1 }, unique: true },
  { key: { sku: 1 }, unique: true },
  { key: { categoryId: 1 } },
  { key: { brandId: 1 } },
  { key: { vendorId: 1 } },
  { key: { status: 1 } },
  { key: { featured: 1 } },
  { key: { price: 1 } },
  { key: { 'rating.average': -1 } },
  { key: { createdAt: -1 } },
  { key: { name: 'text', description: 'text', tags: 'text' } }, // Text search index
];

export const CATEGORY_INDEXES = [
  { key: { slug: 1 }, unique: true },
  { key: { parentId: 1 } },
  { key: { order: 1 } },
  { key: { isActive: 1 } },
];

export const BRAND_INDEXES = [
  { key: { slug: 1 }, unique: true },
  { key: { order: 1 } },
  { key: { isActive: 1 } },
];

// Helper functions for Product operations
export class ProductModel {
  /**
   * Create a new product document
   */
  static createProduct(productData: Partial<IProduct>): IProduct {
    return {
      name: productData.name || '',
      slug: productData.slug || this.generateSlug(productData.name || ''),
      description: productData.description || '',
      shortDescription: productData.shortDescription,
      sku: productData.sku || this.generateSKU(),
      categoryId: productData.categoryId!,
      brandId: productData.brandId,
      vendorId: productData.vendorId,
      price: productData.price || 0,
      compareAtPrice: productData.compareAtPrice,
      stock: productData.stock || 0,
      lowStockThreshold: productData.lowStockThreshold || 10,
      trackInventory: productData.trackInventory !== false,
      allowBackorder: productData.allowBackorder || false,
      images: productData.images || [],
      dimensions: productData.dimensions,
      weight: productData.weight,
      attributes: productData.attributes || {},
      seo: productData.seo,
      arEnabled: productData.arEnabled || false,
      rating: {
        average: 0,
        count: 0,
      },
      status: productData.status || 'draft',
      featured: productData.featured || false,
      trending: productData.trending || false,
      newArrival: productData.newArrival || false,
      viewCount: 0,
      salesCount: 0,
      wishlistCount: 0,
      tags: productData.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Generate URL-friendly slug from name
   */
  static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Generate unique SKU
   */
  static generateSKU(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return `DFW-${timestamp}-${random}`.toUpperCase();
  }

  /**
   * Calculate final price after discount
   */
  static calculateFinalPrice(product: IProduct): number {
    if (!product.discount) return product.price;

    const now = new Date();
    if (product.discount.startDate && now < product.discount.startDate) {
      return product.price;
    }
    if (product.discount.endDate && now > product.discount.endDate) {
      return product.price;
    }

    if (product.discount.type === 'percentage') {
      return product.price * (1 - product.discount.value / 100);
    } else {
      return Math.max(0, product.price - product.discount.value);
    }
  }

  /**
   * Check if product is in stock
   */
  static isInStock(product: IProduct): boolean {
    if (!product.trackInventory) return true;
    return product.stock > 0 || product.allowBackorder;
  }

  /**
   * Check if product is low stock
   */
  static isLowStock(product: IProduct): boolean {
    if (!product.trackInventory) return false;
    return product.stock <= product.lowStockThreshold && product.stock > 0;
  }
}

// Helper functions for Category operations
export class CategoryModel {
  /**
   * Create a new category document
   */
  static createCategory(categoryData: Partial<ICategory>): ICategory {
    return {
      name: categoryData.name || '',
      slug: categoryData.slug || ProductModel.generateSlug(categoryData.name || ''),
      description: categoryData.description,
      parentId: categoryData.parentId,
      image: categoryData.image,
      icon: categoryData.icon,
      order: categoryData.order || 0,
      isActive: categoryData.isActive !== false,
      seo: categoryData.seo,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

// Helper functions for Brand operations
export class BrandModel {
  /**
   * Create a new brand document
   */
  static createBrand(brandData: Partial<IBrand>): IBrand {
    return {
      name: brandData.name || '',
      slug: brandData.slug || ProductModel.generateSlug(brandData.name || ''),
      description: brandData.description,
      logo: brandData.logo,
      website: brandData.website,
      isActive: brandData.isActive !== false,
      order: brandData.order || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
