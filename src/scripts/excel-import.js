#!/usr/bin/env node

/**
 * Excel Dataset Import Utility for DFW Furniture Website
 * This script converts Excel data to the website's product format
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Expected Excel columns (customize based on your Excel structure)
const EXCEL_COLUMNS = {
  ID: 'A',
  NAME: 'B',
  CATEGORY: 'C',
  SUB_CATEGORY: 'D',
  PRICE: 'E',
  ORIGINAL_PRICE: 'F',
  IMAGE_URL_1: 'G',
  IMAGE_URL_2: 'H',
  IMAGE_URL_3: 'I',
  IMAGE_URL_4: 'J',
  DESCRIPTION: 'K',
  MATERIAL: 'L',
  COLOR: 'M',
  SIZE: 'N',
  STYLE: 'O',
  FEATURES: 'P',
  SPECIFICATIONS: 'Q',
  RATING: 'R',
  REVIEWS: 'S',
  IS_NEW: 'T',
  IS_ON_SALE: 'U',
  DISCOUNT: 'V'
};

class ExcelImporter {
  constructor() {
    this.products = [];
    this.errors = [];
  }

  /**
   * Read and process Excel file
   * @param {string} filePath - Path to Excel file
   * @returns {Array} Processed products array
   */
  async importExcelData(filePath) {
    try {
      console.log(`📊 Reading Excel file: ${filePath}`);
      
      // Read the Excel file
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0]; // Use first sheet
      const worksheet = workbook.Sheets[sheetName];
      
      // Convert to JSON
      const rawData = XLSX.utils.sheet_to_json(worksheet, { 
        header: 1,
        raw: false 
      });
      
      console.log(`📦 Found ${rawData.length} rows in Excel file`);
      
      // Process each row (skip header)
      for (let i = 1; i < rawData.length; i++) {
        const row = rawData[i];
        const product = this.processRow(row, i + 1);
        
        if (product) {
          this.products.push(product);
        }
      }
      
      console.log(`✅ Successfully processed ${this.products.length} products`);
      if (this.errors.length > 0) {
        console.log(`⚠️  Encountered ${this.errors.length} errors:`);
        this.errors.forEach(error => console.log(`   - ${error}`));
      }
      
      return this.products;
      
    } catch (error) {
      console.error(`❌ Error reading Excel file: ${error.message}`);
      throw error;
    }
  }

  /**
   * Process individual Excel row
   * @param {Array} row - Excel row data
   * @param {number} rowNumber - Row number for error reporting
   * @returns {Object|null} Processed product object
   */
  processRow(row, rowNumber) {
    try {
      // Extract data from row (adjust indices based on your Excel structure)
      const id = row[0] || null;
      const name = row[1] || '';
      const category = row[2] || '';
      const subCategory = row[3] || '';
      const price = row[4] || '';
      const originalPrice = row[5] || '';
      const imageUrl1 = row[6] || '';
      const imageUrl2 = row[7] || '';
      const imageUrl3 = row[8] || '';
      const imageUrl4 = row[9] || '';
      const description = row[10] || '';
      const material = row[11] || '';
      const color = row[12] || '';
      const size = row[13] || '';
      const style = row[14] || '';
      const features = row[15] || '';
      const specifications = row[16] || '';
      const rating = parseFloat(row[17]) || 4.5;
      const reviews = parseInt(row[18]) || 0;
      const isNew = row[19] === 'TRUE' || row[19] === '1' || false;
      const isOnSale = row[20] === 'TRUE' || row[20] === '1' || false;
      const discount = parseInt(row[21]) || 0;

      // Validate required fields
      if (!id || !name || !category) {
        this.errors.push(`Row ${rowNumber}: Missing required fields (ID, Name, or Category)`);
        return null;
      }

      // Process images array
      const images = [imageUrl1, imageUrl2, imageUrl3, imageUrl4]
        .filter(url => url && url.trim() !== '')
        .map(url => url.trim());

      // Process features array
      const featuresArray = features 
        ? features.split(',').map(f => f.trim()).filter(f => f !== '')
        : [];

      // Create product object matching your website structure
      const product = {
        id: parseInt(id),
        itemGroupId: parseInt(id) + 100, // Generate group ID
        productId: `${id}-${category.substring(0,3).toUpperCase()}-${Math.random().toString(36).substring(7)}`,
        name: name.trim(),
        category: category.trim(),
        subCategory: subCategory.trim(),
        style: style.trim() || 'Modern',
        material: material.trim() || 'Mixed Materials',
        color: color.trim() || 'Natural',
        size: size.trim() || 'Standard',
        price: this.formatPrice(price),
        originalPrice: this.formatPrice(originalPrice) || this.formatPrice(price),
        images: images,
        has360View: images.length >= 3, // Enable 360 view if 3+ images
        rating: rating,
        reviews: reviews,
        description: description.trim(),
        features: featuresArray,
        specifications: specifications.trim(),
        isNew: isNew,
        isOnSale: isOnSale,
        discount: discount
      };

      return product;

    } catch (error) {
      this.errors.push(`Row ${rowNumber}: Error processing - ${error.message}`);
      return null;
    }
  }

  /**
   * Format price string
   * @param {string} price - Raw price value
   * @returns {string} Formatted price
   */
  formatPrice(price) {
    if (!price) return '';
    
    // Remove any existing currency symbols
    const cleanPrice = price.toString().replace(/[₹$,]/g, '');
    const numPrice = parseInt(cleanPrice);
    
    if (isNaN(numPrice)) return price;
    
    return `₹${numPrice.toLocaleString('en-IN')}`;
  }

  /**
   * Save processed data to TypeScript file
   * @param {string} outputPath - Output file path
   */
  async saveToTypeScript(outputPath) {
    try {
      const tsContent = this.generateTypeScriptFile();
      
      fs.writeFileSync(outputPath, tsContent, 'utf8');
      console.log(`💾 Saved ${this.products.length} products to ${outputPath}`);
      
    } catch (error) {
      console.error(`❌ Error saving file: ${error.message}`);
      throw error;
    }
  }

  /**
   * Generate TypeScript file content
   * @returns {string} TypeScript file content
   */
  generateTypeScriptFile() {
    const header = `// Auto-generated product data from Excel import
// Generated on: ${new Date().toISOString()}
// Total products: ${this.products.length}

export interface Product {
  id: number;
  itemGroupId: number;
  productId: string;
  name: string;
  category: string;
  subCategory: string;
  style: string;
  material: string;
  color: string;
  size: string;
  price: string;
  originalPrice: string;
  images: string[];
  has360View: boolean;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  specifications: string;
  isNew?: boolean;
  isOnSale?: boolean;
  discount?: number;
}

export const importedProducts: Product[] = `;

    const productsData = JSON.stringify(this.products, null, 2);
    const footer = `;\n\nexport default importedProducts;`;

    return header + productsData + footer;
  }

  /**
   * Generate summary report
   */
  generateSummaryReport() {
    const categories = {};
    
    this.products.forEach(product => {
      if (!categories[product.category]) {
        categories[product.category] = 0;
      }
      categories[product.category]++;
    });

    console.log('\n📊 IMPORT SUMMARY REPORT');
    console.log('========================');
    console.log(`Total Products: ${this.products.length}`);
    console.log(`Total Errors: ${this.errors.length}`);
    console.log('\nProducts by Category:');
    
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`  - ${category}: ${count} products`);
    });

    const withImages = this.products.filter(p => p.images.length > 0).length;
    const with360View = this.products.filter(p => p.has360View).length;
    
    console.log(`\nProducts with Images: ${withImages}/${this.products.length}`);
    console.log(`Products with 360° View: ${with360View}/${this.products.length}`);
    console.log('========================\n');
  }
}

// CLI Usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log(`
🏠 DFW Excel Import Utility

Usage: node excel-import.js <excel-file-path> [output-file-path]

Examples:
  node excel-import.js ./furniture-data.xlsx
  node excel-import.js ./furniture-data.xlsx ./src/data/imported-products.ts

Supported formats: .xlsx, .xls
    `);
    process.exit(1);
  }

  const excelPath = args[0];
  const outputPath = args[1] || './src/data/imported-products.ts';

  const importer = new ExcelImporter();
  
  importer.importExcelData(excelPath)
    .then(() => {
      importer.generateSummaryReport();
      return importer.saveToTypeScript(outputPath);
    })
    .then(() => {
      console.log('✅ Excel import completed successfully!');
    })
    .catch(error => {
      console.error('❌ Import failed:', error.message);
      process.exit(1);
    });
}

module.exports = ExcelImporter;