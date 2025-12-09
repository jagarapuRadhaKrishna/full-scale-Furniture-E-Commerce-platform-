// Test script to verify massive dataset
import { categoryProducts } from './massive-products.js'

console.log('Product counts by category:')
Object.entries(categoryProducts).forEach(([category, products]) => {
  console.log(`${category}: ${products.length} items`)
})

console.log('\nTotal products:', Object.values(categoryProducts).reduce((sum, products) => sum + products.length, 0))