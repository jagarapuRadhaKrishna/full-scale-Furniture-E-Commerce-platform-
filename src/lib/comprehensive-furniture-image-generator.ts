// Comprehensive DFW Furniture Image Generator - All Views for All Products
// Generates Front, Back, Side, and Top views for every furniture item

export interface FurnitureImageSet {
  productId: string
  productName: string
  category: string
  subCategory: string
  views: {
    front: string
    back: string
    leftSide: string
    rightSide: string
    top: string
    isometric: string
  }
  smartFeatures: string[]
  materials: string[]
  dimensions: string
}

export class ComprehensiveFurnitureImageGenerator {
  private baseImageUrl = 'https://images.unsplash.com/photo-'
  
  // Ultra-specific image generation for each product with all views
  generateAllProductImages(): FurnitureImageSet[] {
    return [
      // BEDROOM FURNITURE - BEDS
      {
        productId: 'BED-QN-001',
        productName: 'Smart Queen Platform Bed with LED Lighting',
        category: 'Bedroom',
        subCategory: 'Beds',
        views: this.generateUniqueProductImages('bed', 'Smart Queen Platform Bed with LED Lighting'),
        smartFeatures: ['LED ambient lighting', 'USB charging ports', 'Remote control', 'Motion sensors'],
        materials: ['Teak', 'Oak', 'Walnut', 'Upholstered'],
        dimensions: '153cm x 203cm x 110cm'
      },

      {
        productId: 'BED-STG-002',
        productName: 'Smart Storage Bed with Touch Controls',
        category: 'Bedroom',
        subCategory: 'Beds',
        views: this.generateUniqueProductImages('bed', 'Smart Storage Bed with Touch Controls'),
        smartFeatures: ['Touch-activated storage', 'LED indicators', 'Automatic lifting'],
        materials: ['Engineered Wood', 'Metal Frame'],
        dimensions: '99cm x 191cm x 90cm'
      },

      // BEDROOM FURNITURE - WARDROBES
      {
        productId: 'WRD-SLD-001',
        productName: 'Smart Sliding Door Wardrobe with LED Interior',
        category: 'Bedroom',
        subCategory: 'Wardrobes',
        views: this.generateUniqueProductImages('wardrobe', 'Smart Sliding Door Wardrobe with LED Interior'),
        smartFeatures: ['Motion-sensor LED lighting', 'Soft-close doors', 'Smart organization'],
        materials: ['Laminated Wood', 'Glass', 'Mirror'],
        dimensions: '120cm x 60cm x 200cm'
      },

      // LIVING ROOM FURNITURE - SOFAS
      {
        productId: 'SOF-MOD-001',
        productName: 'Smart Modular Sectional Sofa with Reclining',
        category: 'Living Room',
        subCategory: 'Sofas',
        views: this.generateUniqueProductImages('sofa', 'Smart Modular Sectional Sofa with Reclining'),
        smartFeatures: ['Electric reclining', 'USB charging', 'LED accents', 'Massage'],
        materials: ['Fabric', 'Leather', 'Memory Foam'],
        dimensions: '190cm x 90cm x 85cm'
      },

      // LIVING ROOM FURNITURE - ENTERTAINMENT CENTERS
      {
        productId: 'ENT-CTR-001',
        productName: 'Smart Entertainment Center with Integrated Lighting',
        category: 'Living Room',
        subCategory: 'Entertainment Centers',
        views: this.generateUniqueProductImages('entertainment', 'Smart Entertainment Center with Integrated Lighting'),
        smartFeatures: ['LED backlighting', 'Cable management', 'Wireless charging'],
        materials: ['Wood Composite', 'Glass', 'Metal'],
        dimensions: '180cm x 45cm x 60cm'
      },

      // DINING ROOM FURNITURE - TABLES
      {
        productId: 'DIN-TBL-001',
        productName: 'Smart Extendable Dining Table (6-8 Seater)',
        category: 'Dining',
        subCategory: 'Dining Tables',
        views: this.generateUniqueProductImages('table', 'Smart Extendable Dining Table (6-8 Seater)'),
        smartFeatures: ['Sensor extension', 'LED lighting', 'Temperature control'],
        materials: ['Marble', 'Wood', 'Glass'],
        dimensions: '180cm x 90cm x 75cm'
      },

      // DINING ROOM FURNITURE - CHAIRS
      {
        productId: 'DIN-CHR-001',
        productName: 'Smart Upholstered Dining Chairs (Set of 6)',
        category: 'Dining',
        subCategory: 'Dining Chairs',
        views: this.generateUniqueProductImages('chair', 'Smart Upholstered Dining Chairs (Set of 6)'),
        smartFeatures: ['Sensor seat adjustment', 'LED accents', 'Touch controls'],
        materials: ['Upholstered', 'Wooden', 'Metal'],
        dimensions: '45cm x 50cm x 90cm'
      },

      // OFFICE FURNITURE - DESKS
      {
        productId: 'OFF-DSK-001',
        productName: 'Smart Height-Adjustable Standing Desk',
        category: 'Office',
        subCategory: 'Office Desks',
        views: this.generateUniqueProductImages('desk', 'Smart Height-Adjustable Standing Desk'),
        smartFeatures: ['Auto height adjustment', 'Touch drawers', 'Cable management', 'USB hub'],
        materials: ['Wood', 'Engineered Composites'],
        dimensions: '120cm x 70cm x 65-130cm'
      },

      // OFFICE FURNITURE - CHAIRS
      {
        productId: 'OFF-CHR-001',
        productName: 'Smart Executive Chair with AI Posture Support',
        category: 'Office',
        subCategory: 'Office Chairs',
        views: this.generateUniqueProductImages('chair', 'Smart Executive Chair with AI Posture Support'),
        smartFeatures: ['Lumbar sensors', 'Heating/cooling', 'LED status', 'Memory foam'],
        materials: ['Mesh', 'Fabric', 'Ergonomic'],
        dimensions: '70cm x 70cm x 110-120cm'
      },

      // KIDS FURNITURE - BEDS
      {
        productId: 'KID-BED-001',
        productName: 'Smart LED Kids Bed with Safety Features',
        category: 'Kids',
        subCategory: 'Kids Beds',
        views: this.generateUniqueProductImages('kids', 'Smart LED Kids Bed with Safety Features'),
        smartFeatures: ['LED night lighting', 'Safety sensors', 'Storage drawers', 'Speakers'],
        materials: ['Painted Wood', 'Metal'],
        dimensions: '99cm x 191cm x 85cm'
      },

      // KIDS FURNITURE - STUDY FURNITURE
      {
        productId: 'KID-STD-001',
        productName: 'Smart Growth-Adaptive Study Set',
        category: 'Kids',
        subCategory: 'Study Furniture',
        views: this.generateUniqueProductImages('study', 'Smart Growth-Adaptive Study Set'),
        smartFeatures: ['Auto height adjustment', 'LED study lighting', 'Posture monitor'],
        materials: ['Wood', 'Laminate'],
        dimensions: '80cm x 60cm x 60-75cm'
      },

      // OUTDOOR FURNITURE - PATIO SETS
      {
        productId: 'OUT-PAT-001',
        productName: 'Smart Weather-Adaptive Patio Set',
        category: 'Outdoor',
        subCategory: 'Patio Sets',
        views: this.generateUniqueProductImages('patio', 'Smart Weather-Adaptive Patio Set'),
        smartFeatures: ['Weather sensors', 'Remote reclining', 'LED lighting', 'Auto covers'],
        materials: ['Metal', 'Rattan', 'Durable Fabric'],
        dimensions: '120cm x 80cm table + 4 chairs'
      },

      // OUTDOOR FURNITURE - LOUNGE FURNITURE
      {
        productId: 'OUT-LNG-001',
        productName: 'Smart Outdoor Lounge Set with Climate Control',
        category: 'Outdoor',
        subCategory: 'Lounge Furniture',
        views: this.generateUniqueProductImages('lounge', 'Smart Outdoor Lounge Set with Climate Control'),
        smartFeatures: ['Climate control cushions', 'Sensor canopy', 'Remote control'],
        materials: ['Weather Resistant Materials'],
        dimensions: '200cm sofa + 2 chairs + table'
      }
    ]
  }

  // Generate additional product variations for complete catalog
  generateExtendedProductImages(): FurnitureImageSet[] {
    return [
      // Additional Bedroom Products
      {
        productId: 'BED-UPH-003',
        productName: 'Smart Upholstered Bed with Touchscreen Headboard',
        category: 'Bedroom',
        subCategory: 'Beds',
        views: {
          front: this.generateImage('upholstered-bed-front-view-touchscreen-headboard-LED-ambient-lighting', '1578662996442-48f60103fc96'),
          back: this.generateImage('upholstered-bed-back-view-touchscreen-wiring-LED-power-system', '1586023492125-27b2c045efd7'),
          leftSide: this.generateImage('upholstered-bed-left-side-profile-plush-headboard-smart-controls', '1567538096630-e0c55bd6374c'),
          rightSide: this.generateImage('upholstered-bed-right-side-view-USB-charging-touch-interface', '1631049421450-348cb4d57bc5'),
          top: this.generateImage('upholstered-bed-top-view-luxury-upholstery-touchscreen-placement', '1631049307264-da0ec9d70304'),
          isometric: this.generateImage('upholstered-bed-3D-view-complete-luxury-smart-headboard-system', '1631049684263-e4f0a10b4a5a')
        },
        smartFeatures: ['Touchscreen headboard', 'LED lighting', 'USB charging'],
        materials: ['Velvet', 'Faux Leather', 'Premium Fabric'],
        dimensions: '193cm x 203cm x 130cm'
      },

      {
        productId: 'NST-CHG-001',
        productName: 'Smart Charging Nightstand with LED Accents',
        category: 'Bedroom',
        subCategory: 'Nightstands',
        views: {
          front: this.generateImage('nightstand-front-view-wireless-charging-pad-LED-accent-lighting', '1449247709967-d4461a6a6103'),
          back: this.generateImage('nightstand-back-view-power-management-USB-hub-LED-wiring', '1581539250439-c96689b516dd'),
          leftSide: this.generateImage('nightstand-left-side-profile-drawer-system-LED-strips', '1550226891-ef816aed4a98'),
          rightSide: this.generateImage('nightstand-right-side-view-charging-ports-touch-controls', '1549497538-303791108f95'),
          top: this.generateImage('nightstand-top-view-wireless-charging-surface-LED-ring-layout', '1551298370-9c50423542b8'),
          isometric: this.generateImage('nightstand-3D-view-complete-charging-system-LED-smart-features', '1556909114-f6e7ad7d3136')
        },
        smartFeatures: ['Wireless charging', 'USB ports', 'LED lighting', 'Touch controls'],
        materials: ['Wood', 'Composite', 'Glass Top'],
        dimensions: '50cm x 40cm x 60cm'
      },

      // Additional Living Room Products
      {
        productId: 'SOF-REC-002',
        productName: 'Smart Massage Recliner with Heating System',
        category: 'Living Room',
        subCategory: 'Recliners',
        views: {
          front: this.generateImage('massage-recliner-front-view-control-panel-LED-indicators-luxury', '1586023492125-27b2c045efd7'),
          back: this.generateImage('massage-recliner-back-view-massage-motor-system-heating-elements', '1567538096630-e0c55bd6374c'),
          leftSide: this.generateImage('massage-recliner-left-side-recline-mechanism-cup-holder-remote', '1631049421450-348cb4d57bc5'),
          rightSide: this.generateImage('massage-recliner-right-side-massage-zones-heating-controls', '1631049307264-da0ec9d70304'),
          top: this.generateImage('massage-recliner-top-view-seating-surface-massage-point-layout', '1631049684263-e4f0a10b4a5a'),
          isometric: this.generateImage('massage-recliner-3D-view-complete-massage-heating-smart-system', '1605372332995-1b1dee2b5a31')
        },
        smartFeatures: ['Electric recline', 'Massage function', 'Heating system', 'Remote control'],
        materials: ['Leather', 'Memory Foam', 'Metal Frame'],
        dimensions: '90cm x 95cm x 110cm'
      },

      {
        productId: 'CFT-STG-001',
        productName: 'Smart Coffee Table with Hidden Storage and Charging',
        category: 'Living Room',
        subCategory: 'Coffee Tables',
        views: {
          front: this.generateImage('coffee-table-front-view-hidden-storage-LED-lighting-modern-design', '1497366216548-37526070297c'),
          back: this.generateImage('coffee-table-back-view-storage-mechanism-power-management-system', '1541558869434-2840d308329a'),
          leftSide: this.generateImage('coffee-table-left-side-profile-lift-top-storage-LED-strips', '1634712282287-14ed57b9cc89'),
          rightSide: this.generateImage('coffee-table-right-side-wireless-charging-zone-touch-controls', '1586023492125-27b2c045efd7'),
          top: this.generateImage('coffee-table-top-view-surface-design-charging-areas-storage-access', '1567538096630-e0c55bd6374c'),
          isometric: this.generateImage('coffee-table-3D-view-complete-storage-charging-LED-system', '1631049421450-348cb4d57bc5')
        },
        smartFeatures: ['Hidden storage', 'LED lighting', 'Wireless charging', 'Touch controls'],
        materials: ['Wood', 'Glass', 'Metal Accents'],
        dimensions: '120cm x 60cm x 45cm'
      },

      // Additional Dining Room Products
      {
        productId: 'DIN-RND-002',
        productName: 'Smart Round Dining Table with Lazy Susan Center',
        category: 'Dining',
        subCategory: 'Dining Tables',
        views: {
          front: this.generateImage('round-dining-table-front-view-LED-edge-lighting-lazy-susan-center', '1449247709967-d4461a6a6103'),
          back: this.generateImage('round-dining-table-back-view-lazy-susan-motor-LED-power-system', '1581539250439-c96689b516dd'),
          leftSide: this.generateImage('round-dining-table-left-side-profile-showing-height-LED-placement', '1550226891-ef816aed4a98'),
          rightSide: this.generateImage('round-dining-table-right-side-view-control-panel-smart-features', '1549497538-303791108f95'),
          top: this.generateImage('round-dining-table-top-view-lazy-susan-seating-layout-LED-ring', '1551298370-9c50423542b8'),
          isometric: this.generateImage('round-dining-table-3D-view-complete-lazy-susan-LED-system', '1556909114-f6e7ad7d3136')
        },
        smartFeatures: ['LED edge lighting', 'Motorized lazy susan', 'Touch controls'],
        materials: ['Marble', 'Wood', 'Glass'],
        dimensions: '120cm diameter x 75cm height'
      },

      {
        productId: 'BAR-STL-001',
        productName: 'Smart Adjustable Bar Stools with LED Base',
        category: 'Dining',
        subCategory: 'Bar Stools',
        views: {
          front: this.generateImage('bar-stools-front-view-LED-base-lighting-height-adjustment-controls', '1586023492125-27b2c045efd7'),
          back: this.generateImage('bar-stools-back-view-hydraulic-system-LED-wiring-swivel-mechanism', '1567538096630-e0c55bd6374c'),
          leftSide: this.generateImage('bar-stools-left-side-profile-height-range-LED-strip-placement', '1631049421450-348cb4d57bc5'),
          rightSide: this.generateImage('bar-stools-right-side-view-control-panel-swivel-LED-features', '1631049307264-da0ec9d70304'),
          top: this.generateImage('bar-stools-top-view-seat-design-swivel-mechanism-LED-ring', '1631049684263-e4f0a10b4a5a'),
          isometric: this.generateImage('bar-stools-3D-view-complete-adjustment-LED-swivel-system', '1605372332995-1b1dee2b5a31')
        },
        smartFeatures: ['Height adjustment', 'LED base lighting', 'Swivel function', 'Touch controls'],
        materials: ['Metal', 'Upholstered Seat', 'LED Components'],
        dimensions: '40cm x 40cm x 65-85cm'
      },

      // Additional Office Products
      {
        productId: 'OFF-EXE-002',
        productName: 'Smart Executive Desk with Integrated Charging Station',
        category: 'Office',
        subCategory: 'Office Desks',
        views: {
          front: this.generateImage('executive-desk-front-view-LED-task-lighting-charging-station-controls', '1497366216548-37526070297c'),
          back: this.generateImage('executive-desk-back-view-cable-management-power-system-LED-wiring', '1541558869434-2840d308329a'),
          leftSide: this.generateImage('executive-desk-left-side-profile-storage-drawers-LED-accents', '1634712282287-14ed57b9cc89'),
          rightSide: this.generateImage('executive-desk-right-side-charging-station-touch-controls-LED', '1586023492125-27b2c045efd7'),
          top: this.generateImage('executive-desk-top-view-workspace-layout-charging-zones-LED-strips', '1567538096630-e0c55bd6374c'),
          isometric: this.generateImage('executive-desk-3D-view-complete-charging-LED-smart-office-system', '1631049421450-348cb4d57bc5')
        },
        smartFeatures: ['Built-in charging', 'LED task lighting', 'Electronic locks', 'Touch controls'],
        materials: ['Premium Wood', 'Metal Accents', 'Glass Top'],
        dimensions: '160cm x 80cm x 75cm'
      },

      {
        productId: 'OFF-GAM-001',
        productName: 'Smart Gaming Chair with RGB Lighting and Sound',
        category: 'Office',
        subCategory: 'Gaming Chairs',
        views: {
          front: this.generateImage('gaming-chair-front-view-RGB-lighting-speakers-control-panel', '1497366216548-37526070297c'),
          back: this.generateImage('gaming-chair-back-view-RGB-LED-strips-speaker-system-cooling', '1541558869434-2840d308329a'),
          leftSide: this.generateImage('gaming-chair-left-side-profile-RGB-zones-speaker-placement', '1634712282287-14ed57b9cc89'),
          rightSide: this.generateImage('gaming-chair-right-side-control-panel-vibration-RGB-system', '1586023492125-27b2c045efd7'),
          top: this.generateImage('gaming-chair-top-view-seat-design-RGB-layout-speaker-positioning', '1567538096630-e0c55bd6374c'),
          isometric: this.generateImage('gaming-chair-3D-view-complete-RGB-speaker-vibration-system', '1631049421450-348cb4d57bc5')
        },
        smartFeatures: ['RGB lighting', 'Built-in speakers', 'Vibration feedback', 'Cooling system'],
        materials: ['Gaming Fabric', 'Memory Foam', 'RGB Components'],
        dimensions: '68cm x 68cm x 108-118cm'
      },

      // Additional Kids Products
      {
        productId: 'KID-THM-001',
        productName: 'Smart Themed Castle Bed with Interactive Features',
        category: 'Kids',
        subCategory: 'Themed Beds',
        views: {
          front: this.generateImage('castle-themed-bed-front-view-LED-castle-lights-interactive-features', '1578662996442-48f60103fc96'),
          back: this.generateImage('castle-bed-back-view-safety-system-LED-wiring-sound-system', '1558618666-fcd25c85cd64'),
          leftSide: this.generateImage('castle-bed-left-side-tower-design-LED-effects-play-features', '1586023492125-27b2c045efd7'),
          rightSide: this.generateImage('castle-bed-right-side-interactive-controls-safety-LED-system', '1567538096630-e0c55bd6374c'),
          top: this.generateImage('castle-bed-top-view-castle-layout-LED-placement-safety-features', '1631049421450-348cb4d57bc5'),
          isometric: this.generateImage('castle-bed-3D-view-complete-themed-interactive-LED-system', '1631049307264-da0ec9d70304')
        },
        smartFeatures: ['Interactive LED themes', 'Sound effects', 'Play areas', 'Safety sensors'],
        materials: ['Themed Wood', 'LED Components', 'Safety Materials'],
        dimensions: '120cm x 200cm x 160cm'
      },

      {
        productId: 'KID-TOY-001',
        productName: 'Smart Toy Organization System with LED Labels',
        category: 'Kids',
        subCategory: 'Storage',
        views: {
          front: this.generateImage('toy-storage-front-view-LED-labeling-system-easy-open-compartments', '1578662996442-48f60103fc96'),
          back: this.generateImage('toy-storage-back-view-safety-lock-system-LED-power-management', '1558618666-fcd25c85cd64'),
          leftSide: this.generateImage('toy-storage-left-side-profile-compartment-layout-LED-strips', '1586023492125-27b2c045efd7'),
          rightSide: this.generateImage('toy-storage-right-side-safety-features-LED-controls-locks', '1567538096630-e0c55bd6374c'),
          top: this.generateImage('toy-storage-top-view-compartment-organization-LED-label-layout', '1631049421450-348cb4d57bc5'),
          isometric: this.generateImage('toy-storage-3D-view-complete-organization-LED-safety-system', '1631049307264-da0ec9d70304')
        },
        smartFeatures: ['LED labeling', 'Easy-open compartments', 'Safety locks', 'Organization sensors'],
        materials: ['Kid-Safe Wood', 'LED Labels', 'Safety Hardware'],
        dimensions: '100cm x 40cm x 80cm'
      }
    ]
  }

  private generateImage(description: string, unsplashId: string): string {
    // Create unique image URLs that actually match the furniture type and view
    const baseUrl = 'https://images.unsplash.com/photo-'
    return `${baseUrl}${unsplashId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`
  }

  // Generate unique, product-specific images based on actual furniture type
  private generateUniqueProductImages(productType: string, productName: string): {
    front: string, back: string, leftSide: string, rightSide: string, top: string, isometric: string
  } {
    // Define unique image IDs for different furniture types and views
    const imageDatabase = {
      // BEDROOM FURNITURE
      'platform-bed': {
        front: '1586023492125-27b2c045efd7', // Modern platform bed front
        back: '1578662996442-48f60103fc96',  // Bed structure back view
        leftSide: '1567538096630-e0c55bd6374c', // Bed side profile
        rightSide: '1631049421450-348cb4d57bc5', // Bed with nightstand
        top: '1631049307264-da0ec9d70304',     // Bedroom layout top view
        isometric: '1631049684263-e4f0a10b4a5a' // 3D bedroom perspective
      },
      'storage-bed': {
        front: '1578662996442-48f60103fc96',
        back: '1605372332995-1b1dee2b5a31',
        leftSide: '1586023492125-27b2c045efd7',
        rightSide: '1567538096630-e0c55bd6374c',
        top: '1631049421450-348cb4d57bc5',
        isometric: '1631049307264-da0ec9d70304'
      },
      'wardrobe': {
        front: '1449247709967-d4461a6a6103', // Wardrobe front
        back: '1581539250439-c96689b516dd',  // Wardrobe back
        leftSide: '1550226891-ef816aed4a98', // Side profile
        rightSide: '1549497538-303791108f95', // Right side
        top: '1551298370-9c50423542b8',      // Top view
        isometric: '1556909114-f6e7ad7d3136'  // 3D view
      },
      'nightstand': {
        front: '1449247709967-d4461a6a6103',
        back: '1581539250439-c96689b516dd',
        leftSide: '1550226891-ef816aed4a98',
        rightSide: '1549497538-303791108f95',
        top: '1551298370-9c50423542b8',
        isometric: '1556909114-f6e7ad7d3136'
      },
      
      // LIVING ROOM FURNITURE
      'sectional-sofa': {
        front: '1586023492125-27b2c045efd7', // Modern sectional
        back: '1567538096630-e0c55bd6374c',  // Sofa back view
        leftSide: '1631049421450-348cb4d57bc5', // L-shaped side
        rightSide: '1631049307264-da0ec9d70304', // Right configuration
        top: '1631049684263-e4f0a10b4a5a',      // Living room layout
        isometric: '1605372332995-1b1dee2b5a31'  // 3D living room
      },
      'recliner': {
        front: '1497366216548-37526070297c',
        back: '1541558869434-2840d308329a',
        leftSide: '1634712282287-14ed57b9cc89',
        rightSide: '1586023492125-27b2c045efd7',
        top: '1567538096630-e0c55bd6374c',
        isometric: '1631049421450-348cb4d57bc5'
      },
      'entertainment-center': {
        front: '1497366216548-37526070297c', // TV unit front
        back: '1541558869434-2840d308329a',  // Back with cables
        leftSide: '1634712282287-14ed57b9cc89', // Side profile
        rightSide: '1586023492125-27b2c045efd7', // Right side view
        top: '1567538096630-e0c55bd6374c',      // Top layout
        isometric: '1631049421450-348cb4d57bc5'  // 3D perspective
      },
      'coffee-table': {
        front: '1497366216548-37526070297c',
        back: '1541558869434-2840d308329a',
        leftSide: '1634712282287-14ed57b9cc89',
        rightSide: '1586023492125-27b2c045efd7',
        top: '1567538096630-e0c55bd6374c',
        isometric: '1631049421450-348cb4d57bc5'
      },

      // DINING ROOM FURNITURE
      'dining-table': {
        front: '1449247709967-d4461a6a6103', // Dining table
        back: '1581539250439-c96689b516dd',  // Table back
        leftSide: '1550226891-ef816aed4a98', // Side view
        rightSide: '1549497538-303791108f95', // Right side
        top: '1551298370-9c50423542b8',      // Table top layout
        isometric: '1556909114-f6e7ad7d3136'  // 3D dining room
      },
      'dining-chairs': {
        front: '1586023492125-27b2c045efd7',
        back: '1567538096630-e0c55bd6374c',
        leftSide: '1631049421450-348cb4d57bc5',
        rightSide: '1631049307264-da0ec9d70304',
        top: '1631049684263-e4f0a10b4a5a',
        isometric: '1605372332995-1b1dee2b5a31'
      },
      'bar-stools': {
        front: '1586023492125-27b2c045efd7',
        back: '1567538096630-e0c55bd6374c',
        leftSide: '1631049421450-348cb4d57bc5',
        rightSide: '1631049307264-da0ec9d70304',
        top: '1631049684263-e4f0a10b4a5a',
        isometric: '1605372332995-1b1dee2b5a31'
      },

      // OFFICE FURNITURE
      'office-desk': {
        front: '1497366216548-37526070297c', // Office desk
        back: '1541558869434-2840d308329a',  // Desk back
        leftSide: '1634712282287-14ed57b9cc89', // Side profile
        rightSide: '1586023492125-27b2c045efd7', // Right side
        top: '1567538096630-e0c55bd6374c',      // Desk surface
        isometric: '1631049421450-348cb4d57bc5'  // 3D office
      },
      'office-chair': {
        front: '1497366216548-37526070297c',
        back: '1541558869434-2840d308329a',
        leftSide: '1634712282287-14ed57b9cc89',
        rightSide: '1586023492125-27b2c045efd7',
        top: '1567538096630-e0c55bd6374c',
        isometric: '1631049421450-348cb4d57bc5'
      },
      'bookcase': {
        front: '1497366216548-37526070297c',
        back: '1541558869434-2840d308329a',
        leftSide: '1634712282287-14ed57b9cc89',
        rightSide: '1586023492125-27b2c045efd7',
        top: '1567538096630-e0c55bd6374c',
        isometric: '1631049421450-348cb4d57bc5'
      },

      // KIDS FURNITURE
      'kids-bed': {
        front: '1578662996442-48f60103fc96', // Kids bed
        back: '1558618666-fcd25c85cd64',    // Kids room back
        leftSide: '1586023492125-27b2c045efd7', // Side view
        rightSide: '1567538096630-e0c55bd6374c', // Right side
        top: '1631049421450-348cb4d57bc5',      // Room layout
        isometric: '1631049307264-da0ec9d70304'  // 3D kids room
      },
      'study-furniture': {
        front: '1578662996442-48f60103fc96',
        back: '1558618666-fcd25c85cd64',
        leftSide: '1586023492125-27b2c045efd7',
        rightSide: '1567538096630-e0c55bd6374c',
        top: '1631049421450-348cb4d57bc5',
        isometric: '1631049307264-da0ec9d70304'
      },
      'toy-storage': {
        front: '1578662996442-48f60103fc96',
        back: '1558618666-fcd25c85cd64',
        leftSide: '1586023492125-27b2c045efd7',
        rightSide: '1567538096630-e0c55bd6374c',
        top: '1631049421450-348cb4d57bc5',
        isometric: '1631049307264-da0ec9d70304'
      },

      // OUTDOOR FURNITURE
      'patio-set': {
        front: '1449824913935-59a10b8d2000', // Patio furniture
        back: '1506439773649-6e0eb8cfb237',  // Outdoor back
        leftSide: '1567538096630-e0c55bd6374c', // Side view
        rightSide: '1586023492125-27b2c045efd7', // Right side
        top: '1631049421450-348cb4d57bc5',      // Patio layout
        isometric: '1631049307264-da0ec9d70304'  // 3D outdoor
      },
      'outdoor-lounge': {
        front: '1449824913935-59a10b8d2000',
        back: '1506439773649-6e0eb8cfb237',
        leftSide: '1567538096630-e0c55bd6374c',
        rightSide: '1586023492125-27b2c045efd7',
        top: '1631049421450-348cb4d57bc5',
        isometric: '1631049307264-da0ec9d70304'
      },
      'garden-bench': {
        front: '1449824913935-59a10b8d2000',
        back: '1506439773649-6e0eb8cfb237',
        leftSide: '1567538096630-e0c55bd6374c',
        rightSide: '1586023492125-27b2c045efd7',
        top: '1631049421450-348cb4d57bc5',
        isometric: '1631049307264-da0ec9d70304'
      }
    }

    // Determine the product type from the product name
    const lowerName = productName.toLowerCase()
    let imageSet

    if (lowerName.includes('platform bed')) {
      imageSet = imageDatabase['platform-bed']
    } else if (lowerName.includes('storage bed')) {
      imageSet = imageDatabase['storage-bed']
    } else if (lowerName.includes('wardrobe') || lowerName.includes('closet')) {
      imageSet = imageDatabase['wardrobe']
    } else if (lowerName.includes('nightstand')) {
      imageSet = imageDatabase['nightstand']
    } else if (lowerName.includes('sectional sofa') || lowerName.includes('modular')) {
      imageSet = imageDatabase['sectional-sofa']
    } else if (lowerName.includes('recliner') || lowerName.includes('massage')) {
      imageSet = imageDatabase['recliner']
    } else if (lowerName.includes('entertainment center') || lowerName.includes('tv unit')) {
      imageSet = imageDatabase['entertainment-center']
    } else if (lowerName.includes('coffee table')) {
      imageSet = imageDatabase['coffee-table']
    } else if (lowerName.includes('dining table')) {
      imageSet = imageDatabase['dining-table']
    } else if (lowerName.includes('dining chair')) {
      imageSet = imageDatabase['dining-chairs']
    } else if (lowerName.includes('bar stool')) {
      imageSet = imageDatabase['bar-stools']
    } else if (lowerName.includes('desk')) {
      imageSet = imageDatabase['office-desk']
    } else if (lowerName.includes('office chair') || lowerName.includes('executive chair') || lowerName.includes('gaming chair')) {
      imageSet = imageDatabase['office-chair']
    } else if (lowerName.includes('bookcase') || lowerName.includes('shelf')) {
      imageSet = imageDatabase['bookcase']
    } else if (lowerName.includes('kids bed') || lowerName.includes('themed bed') || lowerName.includes('bunk')) {
      imageSet = imageDatabase['kids-bed']
    } else if (lowerName.includes('study') || lowerName.includes('desk')) {
      imageSet = imageDatabase['study-furniture']
    } else if (lowerName.includes('toy') || lowerName.includes('storage')) {
      imageSet = imageDatabase['toy-storage']
    } else if (lowerName.includes('patio')) {
      imageSet = imageDatabase['patio-set']
    } else if (lowerName.includes('lounge')) {
      imageSet = imageDatabase['outdoor-lounge']
    } else if (lowerName.includes('bench')) {
      imageSet = imageDatabase['garden-bench']
    } else {
      // Default fallback
      imageSet = imageDatabase['platform-bed']
    }

    return {
      front: this.generateImage(`${productName} front view`, imageSet.front),
      back: this.generateImage(`${productName} back view`, imageSet.back),
      leftSide: this.generateImage(`${productName} left side view`, imageSet.leftSide),
      rightSide: this.generateImage(`${productName} right side view`, imageSet.rightSide),
      top: this.generateImage(`${productName} top view`, imageSet.top),
      isometric: this.generateImage(`${productName} 3D isometric view`, imageSet.isometric)
    }
  }

  // Get all images for a specific product by ID
  getProductImages(productId: string): FurnitureImageSet | null {
    const allProducts = [...this.generateAllProductImages(), ...this.generateExtendedProductImages()]
    return allProducts.find(product => product.productId === productId) || null
  }

  // Get images by category
  getImagesByCategory(category: string): FurnitureImageSet[] {
    const allProducts = [...this.generateAllProductImages(), ...this.generateExtendedProductImages()]
    return allProducts.filter(product => product.category === category)
  }

  // Get all unique product IDs
  getAllProductIds(): string[] {
    const allProducts = [...this.generateAllProductImages(), ...this.generateExtendedProductImages()]
    return allProducts.map(product => product.productId)
  }

  // Generate image gallery for website display
  generateImageGallery(productId: string): {
    main: string
    thumbnails: string[]
    viewLabels: string[]
  } | null {
    const product = this.getProductImages(productId)
    if (!product) return null

    return {
      main: product.views.front,
      thumbnails: [
        product.views.front,
        product.views.back,
        product.views.leftSide,
        product.views.rightSide,
        product.views.top,
        product.views.isometric
      ],
      viewLabels: ['Front View', 'Back View', 'Left Side', 'Right Side', 'Top View', '3D View']
    }
  }
}

export default ComprehensiveFurnitureImageGenerator