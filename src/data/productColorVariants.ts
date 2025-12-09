// Sample color variants data for products
// This would typically be stored in a database or API

export const productColorVariants = {
  'DFW-LSL-001': { // Voyage Peak L-Shaped Sofa
    'Brown': [
      '/images/products/voyage-peak-l-shaped/brown/brown-front-view.webp',
      '/images/products/voyage-peak-l-shaped/brown/brown-fabric-view.webp',
      '/images/products/voyage-peak-l-shaped/brown/brown-top-view.webp',
      '/images/products/voyage-peak-l-shaped/brown/brown-side-view.webp'
    ],
    'Grey': [
      '/images/products/voyage-peak-l-shaped/grey/grey-front-view.jpg',
      '/images/products/voyage-peak-l-shaped/grey/grey-overall-measurement.jpg',
      '/images/products/voyage-peak-l-shaped/grey/grey-cloth.jpg',
      '/images/products/voyage-peak-l-shaped/grey/grey-sectional.jpg',
      '/images/products/voyage-peak-l-shaped/grey/grey-measurements.jpg',
      '/images/products/voyage-peak-l-shaped/grey/grey-side.jpg',
      '/images/products/voyage-peak-l-shaped/grey/grey-overview.jpg',
      '/images/products/voyage-peak-l-shaped/grey/grey-combinations.jpg'
    ],
    'Blue': [
      '/images/products/voyage-peak-l-shaped/blue/blue-front-view.jpg',
      '/images/products/voyage-peak-l-shaped/blue/blue-measurements.jpg',
      '/images/products/voyage-peak-l-shaped/blue/blue-cloth.jpg',
      '/images/products/voyage-peak-l-shaped/blue/blue-comfort.jpg',
      '/images/products/voyage-peak-l-shaped/blue/blue-sectional-view.jpg',
      '/images/products/voyage-peak-l-shaped/blue/blue-side-view.jpg',
      '/images/products/voyage-peak-l-shaped/blue/blue-multiple-combinations.jpg'
    ],
    'Beige': [
      '/images/products/voyage-peak-l-shaped/beige/beige-front-view.jpg',
      '/images/products/voyage-peak-l-shaped/beige/beige-sectional-view.jpg',
      '/images/products/voyage-peak-l-shaped/beige/beige-measurements.jpg',
      '/images/products/voyage-peak-l-shaped/beige/beige-overview.jpg',
      '/images/products/voyage-peak-l-shaped/beige/measurement-view-beige.jpg'
    ],
    'Black': [
      '/images/products/voyage-peak-l-shaped/black/black-topview.jpg',
      '/images/products/voyage-peak-l-shaped/black/black-header.jpeg',
      '/images/products/voyage-peak-l-shaped/black/black-side.jpeg',
      '/images/products/voyage-peak-l-shaped/black/black-front-view.jpg'
    ]
  }
}

export interface ColorVariant {
  color: string
  images: string[]
  available: boolean
}

export function getProductColorVariants(productId: string): ColorVariant[] {
  const variants = productColorVariants[productId as keyof typeof productColorVariants]
  
  if (!variants) {
    return []
  }

  return Object.entries(variants).map(([color, images]) => ({
    color,
    images,
    available: true
  }))
}

export function getAvailableColors(productId: string): string[] {
  const variants = productColorVariants[productId as keyof typeof productColorVariants]
  return variants ? Object.keys(variants) : []
}

export function getColorImages(productId: string, color: string): string[] {
  const variants = productColorVariants[productId as keyof typeof productColorVariants]
  return variants?.[color as keyof typeof variants] || []
}
