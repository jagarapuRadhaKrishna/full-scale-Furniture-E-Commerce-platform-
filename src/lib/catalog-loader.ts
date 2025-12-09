import { Product } from '@/types/product.types';
import catalogData from '@/data/complete-dfw-catalog.json';

export class CatalogLoader {
  private static products: Product[] | null = null;

  /**
   * Load all products from the JSON catalog
   */
  static loadProducts(): Product[] {
    if (this.products === null) {
      this.products = catalogData.products.map(product => ({
        ...product,
        dimensions: {
          ...product.dimensions,
          unit: product.dimensions.unit as 'cm' | 'inch'
        },
        createdAt: new Date(product.createdAt),
        updatedAt: new Date(product.updatedAt)
      })) as unknown as Product[];
    }
    return this.products;
  }

  /**
   * Get products by category
   */
  static getProductsByCategory(category: string): Product[] {
    const products = this.loadProducts();
    return products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Get products by subcategory
   */
  static getProductsBySubcategory(subcategory: string): Product[] {
    const products = this.loadProducts();
    return products.filter(product => 
      product.subcategory.toLowerCase() === subcategory.toLowerCase()
    );
  }

  /**
   * Get product by model code
   */
  static getProductByModel(modelCode: string): Product | undefined {
    const products = this.loadProducts();
    return products.find(product => 
      product.model.toLowerCase() === modelCode.toLowerCase()
    );
  }

  /**
   * Search products by query
   */
  static searchProducts(query: string): Product[] {
    const products = this.loadProducts();
    const searchTerm = query.toLowerCase();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.model.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.subcategory.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  /**
   * Get all unique categories
   */
  static getCategories(): string[] {
    const products = this.loadProducts();
    return Array.from(new Set(products.map(product => product.category)));
  }

  /**
   * Get all unique subcategories
   */
  static getSubcategories(): string[] {
    const products = this.loadProducts();
    return Array.from(new Set(products.map(product => product.subcategory)));
  }

  /**
   * Get products in price range
   */
  static getProductsByPriceRange(minPrice: number, maxPrice: number): Product[] {
    const products = this.loadProducts();
    return products.filter(product => {
      const productMinPrice = Math.min(...product.variants.map(v => v.price));
      const productMaxPrice = Math.max(...product.variants.map(v => v.price));
      return productMinPrice >= minPrice && productMaxPrice <= maxPrice;
    });
  }

  /**
   * Get featured products (high rating)
   */
  static getFeaturedProducts(limit: number = 10): Product[] {
    const products = this.loadProducts();
    return products
      .filter(product => product.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  /**
   * Get products by material
   */
  static getProductsByMaterial(material: string): Product[] {
    const products = this.loadProducts();
    return products.filter(product => 
      product.materials.primary.toLowerCase().includes(material.toLowerCase()) ||
      (product.materials.secondary && 
       product.materials.secondary.toLowerCase().includes(material.toLowerCase()))
    );
  }

  /**
   * Get catalog statistics
   */
  static getCatalogStats() {
    const products = this.loadProducts();
    const categories = this.getCategories();
    const subcategories = this.getSubcategories();
    
    const totalStock = products.reduce((sum, product) => 
      sum + product.variants.reduce((variantSum, variant) => variantSum + variant.stock, 0), 0
    );
    
    const priceRange = {
      min: Math.min(...products.flatMap(p => p.variants.map(v => v.price))),
      max: Math.max(...products.flatMap(p => p.variants.map(v => v.price)))
    };

    return {
      totalProducts: products.length,
      totalCategories: categories.length,
      totalSubcategories: subcategories.length,
      totalStock,
      priceRange,
      averageRating: products.reduce((sum, p) => sum + p.rating, 0) / products.length,
      categories,
      subcategories
    };
  }
}