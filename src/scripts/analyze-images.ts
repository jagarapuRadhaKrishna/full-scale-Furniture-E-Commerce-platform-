#!/usr/bin/env node
// Product Image Analysis CLI Tool
// Usage: npm run analyze-images [options]

import { Command } from 'commander'
import { analyzeAndGenerateProductImages, IMAGE_ANALYSIS_SETTINGS } from '../lib/product-image-analysis-system'
import { processFurnitureImages } from '../lib/furniture-specific-image-system'
import { allMassiveProducts, EnhancedProduct as MassiveEnhancedProduct } from '../data/massive-products'
import { categoryProducts } from '../data/enhanced-products'
import fs from 'fs'
import path from 'path'

const program = new Command()

program
  .name('product-image-analyzer')
  .description('Analyze and generate product images for DFW Furniture catalog')
  .version('1.0.0')

program
  .command('analyze')
  .description('Analyze all products and generate missing/duplicate images')
  .option('-c, --category <category>', 'Process specific category only')
  .option('-l, --limit <number>', 'Limit number of products to process')
  .option('-o, --output <path>', 'Output directory for generated images', './generated-images/')
  .option('--dry-run', 'Analyze only, do not generate images')
  .option('--force', 'Force regeneration of all images')
  .option('--furniture-mode', 'Use enhanced furniture-specific processing')
  .action(async (options) => {
    console.log('🎨 DFW Product Image Analysis & Generation System')
    console.log('=' .repeat(50))

    try {
      // Configure settings based on options
      if (options.output) {
        IMAGE_ANALYSIS_SETTINGS.OUTPUT_PATH = options.output
      }

      // Get products to process
      let products: any[] = allMassiveProducts.map(p => ({
        ...p,
        originalPrice: p.originalPrice || ''
      }))
      
      if (options.category) {
        const categoryKey = Object.keys(categoryProducts).find(
          key => key.toLowerCase() === options.category.toLowerCase()
        )
        if (!categoryKey) {
          console.error(`❌ Category "${options.category}" not found.`)
          console.log('Available categories:', Object.keys(categoryProducts).join(', '))
          process.exit(1)
        }
        products = categoryProducts[categoryKey as keyof typeof categoryProducts].map(p => ({
          ...p,
          originalPrice: p.originalPrice || ''
        }))
        console.log(`📂 Processing category: ${categoryKey}`)
      }

      if (options.limit) {
        const limit = parseInt(options.limit)
        products = products.slice(0, limit)
        console.log(`🔢 Limited to ${limit} products`)
      }

      console.log(`📊 Total products to analyze: ${products.length}`)
      console.log(`💾 Output directory: ${IMAGE_ANALYSIS_SETTINGS.OUTPUT_PATH}`)
      
      if (options.furnitureMode) {
        console.log('🛋️ Using enhanced furniture-specific processing')
      }
      
      console.log('')

      if (options.dryRun) {
        console.log('🔍 DRY RUN MODE - Analysis only, no images generated')
        console.log('')
      }

      // Start processing
      let report: any
      
      if (options.furnitureMode) {
        report = await processFurnitureImages(products)
        
        // Display furniture-specific results
        console.log('')
        console.log('🛋️ FURNITURE PROCESSING COMPLETE')
        console.log('=' .repeat(35))
        console.log(`✅ Products processed: ${report.processingStats.successful}/${report.processingStats.total_products}`)
        console.log(`🎨 Total images generated: ${report.manifest.products.reduce((sum: number, p: any) => sum + p.generated_images.length, 0)}`)
        console.log(`🔄 Missing images generated: ${report.manifest.summary.generated_missing}`)
        console.log(`🔄 Duplicates replaced: ${report.manifest.summary.replaced_duplicate}`)
        console.log(`🔄 Wrong images replaced: ${report.manifest.summary.replaced_wrong}`)
        console.log(`✅ Valid images kept: ${report.manifest.summary.kept_valid}`)
        console.log(`❌ Errors encountered: ${report.processingStats.failed}`)
        console.log(`⏱️  Total time: ${(report.processingStats.processing_time_ms / 1000).toFixed(2)}s`)
        console.log('')
        
        // Quality metrics
        console.log('⭐ QUALITY METRICS:')
        console.log(`   Average Quality: ${report.manifest.quality_metrics.avg_quality.toFixed(1)}/100`)
        console.log(`   Average Consistency: ${report.manifest.quality_metrics.avg_consistency.toFixed(1)}/100`)
        console.log(`   Average Realism: ${report.manifest.quality_metrics.avg_realism.toFixed(1)}/100`)
        console.log('')
        
        // Category banners
        if (report.categoryBanners.length > 0) {
          console.log('🖼️  CATEGORY BANNERS GENERATED:')
          report.categoryBanners.forEach((banner: any) => {
            console.log(`   ${banner.category}: ${banner.featured_products.length} featured products`)
          })
          console.log('')
        }
        
      } else {
        report = await analyzeAndGenerateProductImages(products)

        // Display results
        console.log('')
        console.log('📈 PROCESSING COMPLETE')
        console.log('=' .repeat(30))
        console.log(`✅ Products processed: ${report.processed_count}/${report.total_products}`)
        console.log(`🎨 Images generated: ${report.generated_count}`)
        console.log(`🔄 Images replaced: ${report.replaced_count}`)
        console.log(`⏭️  Products skipped: ${report.skipped_count}`)
        console.log(`❌ Errors encountered: ${report.error_count}`)
        console.log(`⏱️  Total time: ${(report.processing_time_total_ms / 1000).toFixed(2)}s`)
        console.log('')

        // Category breakdown
        console.log('📂 CATEGORY BREAKDOWN:')
        Object.entries(report.summary.categories).forEach(([category, count]) => {
          console.log(`   ${category}: ${count} products`)
        })
        console.log('')

        // Image variant breakdown
        console.log('🖼️  IMAGE VARIANTS GENERATED:')
        Object.entries(report.summary.variants_generated).forEach(([variant, count]) => {
          console.log(`   ${variant}: ${count} images`)
        })
        console.log('')

        // Quality scores
        console.log('⭐ QUALITY SCORES:')
        console.log(`   Average: ${report.summary.quality_scores.avg.toFixed(1)}/100`)
        console.log(`   Range: ${report.summary.quality_scores.min}-${report.summary.quality_scores.max}`)
        console.log('')
      }

      // Show errors if any
      const errors = report.errors || report.processingStats?.errors || []
      if (errors.length > 0) {
        console.log('❌ ERRORS:')
        errors.forEach((error: any) => {
          console.log(`   ${error.product_id}: ${error.error}`)
        })
        console.log('')
      }

      const outputPath = options.furnitureMode ? './furniture-images-output/' : IMAGE_ANALYSIS_SETTINGS.OUTPUT_PATH
      console.log(`📁 Results saved to: ${outputPath}`)
      if (options.furnitureMode) {
        console.log('   - manifest.json (detailed results)')
        console.log('   - report.csv (summary report)')
        console.log('   - category-banners.json (banner configurations)')
        console.log('   - processing-stats.json (processing statistics)')
      } else {
        console.log('   - manifest.json (detailed results)')
        console.log('   - report.csv (summary report)')
        console.log('   - processing-summary.json (statistics)')
      }

    } catch (error) {
      console.error('❌ Analysis failed:', error)
      process.exit(1)
    }
  })

program
  .command('stats')
  .description('Show statistics about current product dataset')
  .action(() => {
    console.log('📊 DFW PRODUCT DATASET STATISTICS')
    console.log('=' .repeat(40))
    
    console.log(`Total products: ${allMassiveProducts.length}`)
    console.log('')
    
    // Category breakdown
    console.log('Category breakdown:')
    Object.entries(categoryProducts).forEach(([category, products]) => {
      console.log(`  ${category}: ${products.length} products`)
    })
    console.log('')
    
    // Images status
    const withImages = allMassiveProducts.filter(p => p.images && p.images.length > 0).length
    const without360 = allMassiveProducts.filter(p => !p.has360View).length
    
    console.log('Image status:')
    console.log(`  Products with images: ${withImages}/${allMassiveProducts.length} (${((withImages/allMassiveProducts.length)*100).toFixed(1)}%)`)
    console.log(`  Products without 360° view: ${without360}/${allMassiveProducts.length} (${((without360/allMassiveProducts.length)*100).toFixed(1)}%)`)
    console.log('')
    
    // Price range
    const prices = allMassiveProducts.map(p => parseInt(p.price.replace(/[₹,]/g, '')))
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length
    
    console.log('Price analysis:')
    console.log(`  Range: ₹${minPrice.toLocaleString()} - ₹${maxPrice.toLocaleString()}`)
    console.log(`  Average: ₹${Math.round(avgPrice).toLocaleString()}`)
  })

program
  .command('validate')
  .description('Validate product data integrity')
  .action(() => {
    console.log('🔍 VALIDATING PRODUCT DATA')
    console.log('=' .repeat(30))
    
    const issues: string[] = []
    
    allMassiveProducts.forEach((product, index) => {
      // Check required fields
      if (!product.productId) issues.push(`Product ${index}: Missing productId`)
      if (!product.name) issues.push(`Product ${product.productId || index}: Missing name`)
      if (!product.category) issues.push(`Product ${product.productId || index}: Missing category`)
      if (!product.price) issues.push(`Product ${product.productId || index}: Missing price`)
      
      // Check image URLs
      if (product.images) {
        product.images.forEach((img, imgIndex) => {
          if (!img.startsWith('http')) {
            issues.push(`Product ${product.productId}: Invalid image URL ${imgIndex + 1}`)
          }
        })
      }
      
      // Check duplicates
      const duplicates = allMassiveProducts.filter(p => p.productId === product.productId)
      if (duplicates.length > 1) {
        issues.push(`Duplicate productId: ${product.productId}`)
      }
    })
    
    if (issues.length === 0) {
      console.log('✅ All products validated successfully!')
      console.log(`✅ ${allMassiveProducts.length} products checked`)
    } else {
      console.log(`❌ Found ${issues.length} issues:`)
      issues.forEach(issue => console.log(`   ${issue}`))
    }
  })

program
  .command('export-csv')
  .description('Export product data to CSV format')
  .option('-o, --output <path>', 'Output CSV file path', './products-export.csv')
  .action((options) => {
    console.log('📄 EXPORTING PRODUCT DATA TO CSV')
    console.log('=' .repeat(35))
    
    const headers = [
      'product_id', 'name', 'category', 'sub_category', 'style', 'material', 
      'color', 'size', 'price', 'original_price', 'current_image_url', 
      'has_360_view', 'rating', 'reviews', 'description'
    ]
    
    const rows = allMassiveProducts.map(product => [
      product.productId,
      `"${product.name}"`,
      product.category,
      product.subCategory,
      product.style,
      product.material,
      product.color,
      product.size,
      product.price,
      product.originalPrice || '',
      product.images?.[0] || '',
      product.has360View ? 'TRUE' : 'FALSE',
      product.rating,
      product.reviews,
      `"${product.description || ''}"`
    ])
    
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
    
    fs.writeFileSync(options.output, csvContent)
    console.log(`✅ Exported ${allMassiveProducts.length} products to: ${options.output}`)
  })

// Parse command line arguments
program.parse(process.argv)