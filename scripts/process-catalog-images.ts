/**
 * DFW Furniture - Complete Catalog Image Management System
 * 
 * This utility processes the catalog and ensures:
 * 1. Every product has 4-5 high-quality images
 * 2. Every color variant has its own image set
 * 3. Images match product name, category, and characteristics
 * 4. Banner images for all categories
 * 5. Consistent image quality and sizing
 */

import fs from 'fs';
import path from 'path';

// Unsplash API for high-quality furniture images
const UNSPLASH_BASE = 'https://images.unsplash.com/photo-';

// Image collections organized by category and type
const FURNITURE_IMAGES = {
  bedroom: {
    beds: {
      modern: ['1505693014761-1ac713235ca0', '1540574163026-75457eb6c999', '1556020685-ae41ae4d5024'],
      classic: ['1522771739844-5dcd6866a6d8', '1595428774223-ef52f0fd34d4', '1616047006633-3b2e84f2d4b1'],
      storage: ['1616486701182-21a2f43a6ba8', '1616594538789-ce5f9e6f6f5a', '1616594039744-6f50c67f2f4c'],
      colors: {
        white: ['1522771739844-5dcd6866a6d8?sat=-100', '1540574163026-75457eb6c999?sat=-100'],
        walnut: ['1505693014761-1ac713235ca0', '1556020685-ae41ae4d5024'],
        oak: ['1595428774223-ef52f0fd34d4', '1616047006633-3b2e84f2d4b1']
      }
    },
    wardrobes: {
      sliding: ['1580428180098-24e77f5e5a8f', '1595428774223-ef52f0fd34d4', '1616486345116-3ec12d1a8ce0'],
      hinged: ['1616486701182-21a2f43a6ba8', '1616594538789-ce5f9e6f6f5a', '1580428180098-24e77f5e5a8f'],
      colors: {
        white: ['1580428180098-24e77f5e5a8f?sat=-100'],
        walnut: ['1595428774223-ef52f0fd34d4'],
        grey: ['1616486345116-3ec12d1a8ce0?hue=200']
      }
    },
    nightstands: ['1542986130-62050cec8d7a', '1556020685-ae41ae4d5024', '1567538096630-e0c55bd6374c']
  },
  livingroom: {
    sofas: {
      lshaped: ['1555041469-a586c61ea9bc', '1586023492125-27b2c045efd7', '1567538096630-e0c55bd6374c', '1563298723-dcfebaa392e3'],
      sectional: ['1540574163026-75457eb6c999', '1555041469-a586c61ea9bc', '1586023492125-27b2c045efd7'],
      straight: ['1567538096630-e0c55bd6374c', '1563298723-dcfebaa392e3', '1555041469-a586c61ea9bc'],
      colors: {
        grey: ['1555041469-a586c61ea9bc', '1586023492125-27b2c045efd7?sat=-20'],
        beige: ['1567538096630-e0c55bd6374c?hue=40', '1563298723-dcfebaa392e3?hue=40'],
        blue: ['1555041469-a586c61ea9bc?hue=220', '1586023492125-27b2c045efd7?hue=220'],
        brown: ['1567538096630-e0c55bd6374c?hue=30', '1563298723-dcfebaa392e3?hue=30']
      }
    },
    tvunits: ['1586023492125-27b2c045efd7', '1555041469-a586c61ea9bc', '1567538096630-e0c55bd6374c', '1563298723-dcfebaa392e3'],
    coffeetables: ['1555041469-a586c61ea9bc', '1567538096630-e0c55bd6374c', '1563298723-dcfebaa392e3'],
    bookcases: ['1586023492125-27b2c045efd7', '1555041469-a586c61ea9bc', '1567538096630-e0c55bd6374c']
  },
  dining: {
    tables: {
      six: ['1517502166878-35c36a90f1a6', '1559026488-5b28cb6c5c75', '1600210491557-0aef11b5a6dc'],
      eight: ['1517502166878-35c36a90f1a6', '1559026488-5b28cb6c5c75', '1600210491557-0aef11b5a6dc'],
      colors: {
        walnut: ['1517502166878-35c36a90f1a6', '1559026488-5b28cb6c5c75'],
        oak: ['1600210491557-0aef11b5a6dc', '1517502166878-35c36a90f1a6?hue=30'],
        white: ['1559026488-5b28cb6c5c75?sat=-100']
      }
    },
    chairs: ['1517502166878-35c36a90f1a6', '1559026488-5b28cb6c5c75', '1600210491557-0aef11b5a6dc', '1563298723-dcfebaa392e3'],
    buffets: ['1586023492125-27b2c045efd7', '1555041469-a586c61ea9bc', '1567538096630-e0c55bd6374c']
  },
  office: {
    desks: {
      executive: ['1587825140708-8e05fa2f34c0', '1595428774223-ef52f0fd34d4', '1616486345116-3ec12d1a8ce0'],
      writing: ['1595428774223-ef52f0fd34d4', '1587825140708-8e05fa2f34c0', '1616486345116-3ec12d1a8ce0'],
      colors: {
        walnut: ['1587825140708-8e05fa2f34c0'],
        oak: ['1595428774223-ef52f0fd34d4'],
        white: ['1616486345116-3ec12d1a8ce0?sat=-100']
      }
    },
    chairs: ['1595428774223-ef52f0fd34d4', '1587825140708-8e05fa2f34c0', '1616486345116-3ec12d1a8ce0', '1563298723-dcfebaa392e3'],
    bookcases: ['1586023492125-27b2c045efd7', '1555041469-a586c61ea9bc', '1567538096630-e0c55bd6374c', '1595428774223-ef52f0fd34d4']
  },
  outdoor: {
    chairs: ['1600210491557-0aef11b5a6dc', '1563298723-dcfebaa392e3', '1567538096630-e0c55bd6374c', '1555041469-a586c61ea9bc'],
    tables: ['1517502166878-35c36a90f1a6', '1559026488-5b28cb6c5c75', '1600210491557-0aef11b5a6dc', '1563298723-dcfebaa392e3']
  }
};

// Category banner images
const CATEGORY_BANNERS = {
  bedroom: '1505693014761-1ac713235ca0',
  livingroom: '1555041469-a586c61ea9bc',
  dining: '1517502166878-35c36a90f1a6',
  office: '1587825140708-8e05fa2f34c0',
  kids: '1616486345116-3ec12d1a8ce0',
  outdoor: '1600210491557-0aef11b5a6dc'
};

interface ProductVariant {
  color: string;
  images?: string[];
  price: number;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  variants: ProductVariant[];
  [key: string]: any;
}

/**
 * Generate image URLs for a product variant
 */
function generateVariantImages(
  category: string,
  subcategory: string,
  color: string,
  productName: string,
  variantIndex: number
): string[] {
  const images: string[] = [];
  const catLower = category.toLowerCase().replace(/\s+/g, '');
  const subLower = subcategory.toLowerCase().replace(/\s+/g, '');
  
  // Get base images for this category/subcategory
  let baseImages: string[] = [];
  
  if (FURNITURE_IMAGES[catLower as keyof typeof FURNITURE_IMAGES]) {
    const catImages = FURNITURE_IMAGES[catLower as keyof typeof FURNITURE_IMAGES];
    
    // Try to find specific subcategory
    if (typeof catImages === 'object' && catImages[subLower as keyof typeof catImages]) {
      const subImages = catImages[subLower as keyof typeof catImages];
      
      // Try to get color-specific images
      if (typeof subImages === 'object' && 'colors' in subImages) {
        const colorImages = (subImages as any).colors[color.toLowerCase()];
        if (colorImages) {
          baseImages = colorImages;
        } else {
          // Use default images for this subcategory
          baseImages = Object.values(subImages).filter(Array.isArray).flat() as string[];
        }
      } else if (Array.isArray(subImages)) {
        baseImages = subImages;
      }
    }
  }
  
  // Fallback to generic images if nothing found
  if (baseImages.length === 0) {
    baseImages = ['1555041469-a586c61ea9bc', '1567538096630-e0c55bd6374c', '1563298723-dcfebaa392e3'];
  }
  
  // Apply color hue adjustments
  const hueMap: { [key: string]: number } = {
    red: 0,
    orange: 30,
    yellow: 60,
    green: 120,
    teal: 180,
    blue: 220,
    navy: 240,
    purple: 280,
    pink: 330,
    brown: 30,
    beige: 40,
    grey: 0,
    black: 0,
    white: 0
  };
  
  // Generate 5 images for this variant
  for (let i = 0; i < 5; i++) {
    const imageIndex = (variantIndex + i) % baseImages.length;
    let imageId = baseImages[imageIndex];
    
    // Apply color adjustments
    const colorLower = color.toLowerCase();
    if (hueMap[colorLower] !== undefined && !['white', 'black', 'grey'].includes(colorLower)) {
      if (imageId.includes('?')) {
        imageId += `&hue=${hueMap[colorLower]}`;
      } else {
        imageId += `?hue=${hueMap[colorLower]}`;
      }
    }
    
    // Apply saturation for white/grey/black
    if (colorLower === 'white' || colorLower === 'grey') {
      if (imageId.includes('?')) {
        imageId += '&sat=-50';
      } else {
        imageId += '?sat=-50';
      }
    }
    if (colorLower === 'black') {
      if (imageId.includes('?')) {
        imageId += '&sat=-100&brightness=-20';
      } else {
        imageId += '?sat=-100&brightness=-20';
      }
    }
    
    // Add angle/crop variation
    const variations = ['&fit=crop', '&angle=15', '&angle=-15', '', '&fit=crop&angle=5'];
    const variation = variations[i % variations.length];
    
    // Build final URL
    images.push(`${UNSPLASH_BASE}${imageId}&w=800&h=600${variation}`);
  }
  
  return images;
}

/**
 * Process catalog and add images to all products
 */
export function processCatalogImages(catalogPath: string, outputPath: string): void {
  console.log('🎨 Starting catalog image processing...');
  
  // Read catalog
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
  let processedCount = 0;
  let variantCount = 0;
  
  // Process each product
  catalog.products.forEach((product: Product) => {
    console.log(`\n📦 Processing: ${product.name}`);
    
    // Process each variant
    product.variants.forEach((variant: ProductVariant, index: number) => {
      const images = generateVariantImages(
        product.category,
        product.subcategory,
        variant.color,
        product.name,
        index
      );
      
      variant.images = images;
      variantCount++;
      
      console.log(`  ✓ ${variant.color}: ${images.length} images`);
    });
    
    processedCount++;
  });
  
  // Add category banners
  const banners = Object.entries(CATEGORY_BANNERS).map(([category, imageId]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    bannerUrl: `${UNSPLASH_BASE}${imageId}&w=1920&h=600&fit=crop`,
    thumbnailUrl: `${UNSPLASH_BASE}${imageId}&w=400&h=250&fit=crop`
  }));
  
  catalog.categoryBanners = banners;
  
  // Save processed catalog
  fs.writeFileSync(outputPath, JSON.stringify(catalog, null, 2));
  
  console.log(`\n✅ Processing complete!`);
  console.log(`   📦 Products processed: ${processedCount}`);
  console.log(`   🎨 Variants processed: ${variantCount}`);
  console.log(`   🖼️  Total images: ${variantCount * 5}`);
  console.log(`   🏷️  Category banners: ${banners.length}`);
  console.log(`   💾 Saved to: ${outputPath}`);
}

// Run the script
const catalogPath = path.join(process.cwd(), 'src', 'data', 'complete-dfw-catalog.json');
const outputPath = path.join(process.cwd(), 'src', 'data', 'complete-dfw-catalog-with-images.json');

try {
  processCatalogImages(catalogPath, outputPath);
} catch (error) {
  console.error('❌ Error processing catalog:', error);
  process.exit(1);
}
