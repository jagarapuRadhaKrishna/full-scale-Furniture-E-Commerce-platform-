#!/usr/bin/env node
// Furniture Image Analysis Demo Script
// Demonstrates the enhanced furniture-specific processing capabilities

import { processFurnitureImages, FurnitureMaterialAnalyzer } from '../lib/furniture-specific-image-system'
import { enhancedProductsData, type EnhancedProduct } from '../data/enhanced-products'

async function runFurnitureDemo() {
  console.log('🛋️ FURNITURE IMAGE ANALYSIS DEMO')
  console.log('=' .repeat(40))
  console.log('')
  
  // Initialize analyzer
  const analyzer = new FurnitureMaterialAnalyzer()
  
  // Demo 1: Material Detection
  console.log('🔍 DEMO 1: Material & Style Detection')
  console.log('-' .repeat(35))
  
  const sampleProducts = enhancedProductsData.slice(0, 5)
  
  sampleProducts.forEach((product: EnhancedProduct) => {
    const analysis = analyzer.analyzeFurnitureProduct(product)
    
    console.log(`\n📦 Product: ${product.name}`)
    console.log(`   Category: ${product.category} → ${product.subCategory}`)
    console.log(`   Materials: ${analysis.material_detected.join(', ')}`)
    console.log(`   Colors: ${analysis.color_palette.join(', ')}`)
    console.log(`   Style: ${analysis.style_classification}`)
    console.log(`   Size: ${analysis.size_category}`)
    console.log(`   Status: ${analysis.image_status}`)
    
    if (analysis.needs_generation) {
      console.log(`   🚨 Priority: ${analysis.priority_level.toUpperCase()}`)
      console.log(`   🔧 Complexity: ${analysis.complexity_score.toFixed(1)}/3`)
    }
    
    if (analysis.manual_review_required) {
      console.log(`   ⚠️  Manual review required`)
    }
  })
  
  // Demo 2: Image Variant Planning
  console.log('\n\n🖼️  DEMO 2: Image Variant Planning')
  console.log('-' .repeat(35))
  
  const variants = ['front', 'side', 'top', 'lifestyle', 'transparent', 'closeup']
  const dimensions = [
    { name: "thumbnail", w: 150, h: 150 },
    { name: "medium", w: 600, h: 600 },
    { name: "large", w: 1200, h: 1200 },
    { name: "banner", w: 1600, h: 900 }
  ]
  
  console.log('\nFor each furniture product, we generate:')
  console.log(`📸 ${variants.length} variants × ${dimensions.length} sizes = ${variants.length * dimensions.length} images per product`)
  console.log('')
  
  variants.forEach(variant => {
    console.log(`   ${variant.padEnd(12)} → ${getVariantDescription(variant)}`)
  })
  
  console.log('')
  dimensions.forEach(dim => {
    console.log(`   ${dim.name.padEnd(12)} → ${dim.w}×${dim.h}px`)
  })
  
  // Demo 3: Category Analysis
  console.log('\n\n📊 DEMO 3: Category-wise Analysis')
  console.log('-' .repeat(30))
  
  const categoryStats = analyzeByCategory(enhancedProductsData, analyzer)
  
  Object.entries(categoryStats).forEach(([category, stats]) => {
    console.log(`\n🏷️  ${category} (${stats.total} products):`)
    console.log(`   Missing images: ${stats.missing}`)
    console.log(`   Duplicate/Wrong: ${stats.needsReplacement}`)
    console.log(`   Valid images: ${stats.valid}`)
    console.log(`   Avg complexity: ${stats.avgComplexity.toFixed(1)}/3`)
    console.log(`   Common materials: ${stats.topMaterials.join(', ')}`)
  })
  
  // Demo 4: Processing Sample
  console.log('\n\n⚡ DEMO 4: Sample Processing (5 products)')
  console.log('-' .repeat(40))
  
  const sampleForProcessing = enhancedProductsData.slice(0, 5)
  
  console.log('Processing furniture images with enhanced system...\n')
  
  try {
    const results = await processFurnitureImages(sampleForProcessing)
    
    console.log('✅ PROCESSING RESULTS:')
    console.log(`   Products processed: ${results.processingStats.successful}`)
    console.log(`   Total images generated: ${results.manifest.products.reduce((sum: number, p: any) => sum + p.generated_images.length, 0)}`)
    console.log(`   Average quality: ${results.manifest.quality_metrics.avg_quality.toFixed(1)}/100`)
    console.log(`   Average realism: ${results.manifest.quality_metrics.avg_realism.toFixed(1)}/100`)
    console.log(`   Processing time: ${(results.processingStats.processing_time_ms / 1000).toFixed(2)}s`)
    
    // Show sample generated images
    console.log('\n📁 SAMPLE GENERATED FILES:')
    results.manifest.products.slice(0, 2).forEach((product: any) => {
      console.log(`\n   ${product.product_id} - ${product.name}:`)
      product.generated_images.slice(0, 3).forEach((img: any) => {
        console.log(`     └─ ${img.path}`)
        console.log(`        Alt: "${img.alt_text}"`)
        console.log(`        Quality: ${img.generation_quality}/100`)
      })
    })
    
    if (results.categoryBanners.length > 0) {
      console.log('\n🖼️  CATEGORY BANNERS:')
      results.categoryBanners.forEach((banner: any) => {
        console.log(`   ${banner.category}: ${banner.banner_path}`)
        console.log(`     Features: ${banner.featured_products.join(', ')}`)
      })
    }
    
  } catch (error) {
    console.error('❌ Demo processing failed:', error)
  }
  
  // Demo 5: Usage Examples
  console.log('\n\n🚀 DEMO 5: Command Usage Examples')
  console.log('-' .repeat(35))
  
  console.log('Run these commands to use the furniture system:')
  console.log('')
  console.log('# Process all furniture with enhanced system:')
  console.log('npm run analyze-images:furniture')
  console.log('')
  console.log('# Process bedroom furniture only:')
  console.log('npm run analyze-images:furniture-bedroom')
  console.log('')
  console.log('# Process limited set for testing:')
  console.log('npm run analyze-images analyze --furniture-mode --limit 10')
  console.log('')
  console.log('# Generate category banners:')
  console.log('npm run analyze-images analyze --furniture-mode --category "Living Room"')
  
  console.log('\n✨ Demo complete! The enhanced furniture system is ready for production use.')
}

function getVariantDescription(variant: string): string {
  const descriptions = {
    front: 'Main display view - clean product shot',
    side: 'Secondary angle - shows depth and profile', 
    top: 'Top-down view - shows dimensions and shape',
    lifestyle: 'Product in realistic room setting',
    transparent: 'Isolated PNG for overlays and design',
    closeup: 'Material texture and finish details'
  }
  return descriptions[variant as keyof typeof descriptions] || 'Product image variant'
}

function analyzeByCategory(products: EnhancedProduct[], analyzer: FurnitureMaterialAnalyzer) {
  const stats: Record<string, {
    total: number
    missing: number
    needsReplacement: number
    valid: number
    complexities: number[]
    materials: string[]
    avgComplexity: number
    topMaterials: string[]
  }> = {}
  
  products.forEach(product => {
    const category = product.category
    if (!stats[category]) {
      stats[category] = {
        total: 0,
        missing: 0,
        needsReplacement: 0,
        valid: 0,
        complexities: [],
        materials: [],
        avgComplexity: 0,
        topMaterials: []
      }
    }
    
    const analysis = analyzer.analyzeFurnitureProduct(product)
    
    stats[category].total++
    
    if (analysis.image_status === 'MISSING') {
      stats[category].missing++
    } else if (analysis.image_status === 'DUPLICATE' || analysis.image_status === 'WRONG') {
      stats[category].needsReplacement++
    } else {
      stats[category].valid++
    }
    
    stats[category].complexities.push(analysis.complexity_score)
    stats[category].materials.push(...analysis.material_detected)
  })
  
  // Calculate averages and top materials
  Object.keys(stats).forEach(category => {
    const categoryStats = stats[category]
    
    // Average complexity
    categoryStats.avgComplexity = categoryStats.complexities.reduce((sum: number, c: number) => sum + c, 0) / categoryStats.complexities.length
    
    // Top materials
    const materialCounts = categoryStats.materials.reduce((acc: any, material: string) => {
      acc[material] = (acc[material] || 0) + 1
      return acc
    }, {})
    
    categoryStats.topMaterials = Object.entries(materialCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 3)
      .map(([material]) => material)
  })
  
  return stats
}

// Run the demo
if (require.main === module) {
  runFurnitureDemo().catch(console.error)
}

export { runFurnitureDemo }