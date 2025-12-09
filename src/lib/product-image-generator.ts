// Advanced Product-Specific Image Generation System
// This system generates unique images for each product based on:
// - Product name analysis
// - Material type
// - Style category
// - Color specification
// - Subcategory type

export function generateProductSpecificImages(product: {
  id: number
  name: string
  category: string
  subCategory: string
  style: string
  material: string
  color: string
  size?: string
}): string[] {

  // Create unique identifier for each product
  const uniqueId = `${product.id}-${product.category.toLowerCase()}-${product.subCategory.toLowerCase()}`;
  
  // Analyze product name to extract key furniture types
  const productName = product.name.toLowerCase();
  const material = product.material.toLowerCase();
  const style = product.style.toLowerCase();
  const color = product.color.toLowerCase();
  
  // Bedroom Furniture Images
  if (product.category === "Bedroom") {
    if (product.subCategory === "Beds") {
      return generateBedImages(productName, material, style, color, uniqueId);
    } else if (product.subCategory === "Wardrobes") {
      return generateWardrobeImages(productName, material, style, color, uniqueId);
    } else if (product.subCategory === "Nightstands") {
      return generateNightstandImages(productName, material, style, color, uniqueId);
    } else if (product.subCategory === "Dressers") {
      return generateDresserImages(productName, material, style, color, uniqueId);
    }
  }
  
  // Living Room Furniture Images
  else if (product.category === "Living Room") {
    if (product.subCategory === "Sofas") {
      return generateSofaImages(productName, material, style, color, uniqueId);
    } else if (product.subCategory === "Coffee Tables") {
      return generateCoffeeTableImages(productName, material, style, color, uniqueId);
    } else if (product.subCategory === "TV Units") {
      return generateTVUnitImages(productName, material, style, color, uniqueId);
    } else if (product.subCategory === "Armchairs") {
      return generateArmchairImages(productName, material, style, color, uniqueId);
    }
  }
  
  // Dining Furniture Images
  else if (product.category === "Dining") {
    if (product.subCategory === "Dining Tables") {
      return generateDiningTableImages(productName, material, style, color, uniqueId);
    } else if (product.subCategory === "Dining Chairs") {
      return generateDiningChairImages(productName, material, style, color, uniqueId);
    } else if (product.subCategory === "Buffets") {
      return generateBuffetImages(productName, material, style, color, uniqueId);
    } else if (product.subCategory === "Bar Stools") {
      return generateBarStoolImages(productName, material, style, color, uniqueId);
    }
  }
  
  // Office Furniture Images
  else if (product.category === "Office") {
    if (product.subCategory === "Office Chairs") {
      return generateOfficeChairImages(productName, material, style, color, uniqueId);
    } else if (product.subCategory === "Desks") {
      return generateDeskImages(productName, material, style, color, uniqueId);
    } else if (product.subCategory === "Bookcases") {
      return generateBookcaseImages(productName, material, style, color, uniqueId);
    } else if (product.subCategory === "Filing Cabinets") {
      return generateFilingCabinetImages(productName, material, style, color, uniqueId);
    }
  }
  
  // Kids Furniture Images
  else if (product.category === "Kids") {
    if (product.subCategory === "Kids Beds") {
      return generateKidsBedImages(productName, material, style, color, uniqueId);
    } else if (product.subCategory === "Study Tables") {
      return generateStudyTableImages(productName, material, style, color, uniqueId);
    } else if (product.subCategory === "Toy Storage") {
      return generateToyStorageImages(productName, material, style, color, uniqueId);
    } else if (product.subCategory === "Kids Chairs") {
      return generateKidsChairImages(productName, material, style, color, uniqueId);
    }
  }
  
  // Outdoor Furniture Images
  else if (product.category === "Outdoor") {
    if (product.subCategory === "Garden Sets") {
      return generateGardenSetImages(productName, material, style, color, uniqueId);
    } else if (product.subCategory === "Loungers") {
      return generateLoungerImages(productName, material, style, color, uniqueId);
    } else if (product.subCategory === "Umbrellas") {
      return generateUmbrellaImages(productName, material, style, color, uniqueId);
    } else if (product.subCategory === "Planters") {
      return generatePlanterImages(productName, material, style, color, uniqueId);
    }
  }
  
  // Fallback for unmatched products
  return generateFallbackImages(uniqueId);
}

// Bedroom Furniture Image Generators
function generateBedImages(name: string, material: string, style: string, color: string, id: string): string[] {
  const baseImages = [
    // Platform beds
    `https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=bed-platform-${id}`,
    // Upholstered beds
    `https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=bed-upholstered-${id}`,
    // Wooden beds
    `https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=bed-wooden-${id}`,
    // Storage beds
    `https://images.unsplash.com/photo-1574634534894-89d7576c8259?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=bed-storage-${id}`,
    // Metal frame beds
    `https://images.unsplash.com/photo-1586140744749-dfa1f8e7efe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=bed-metal-${id}`,
    // Luxury beds
    `https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=bed-luxury-${id}`,
    // Modern beds
    `https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=bed-modern-${id}`,
    // Traditional beds
    `https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=bed-traditional-${id}`
  ];
  
  // Select images based on product characteristics
  let selectedImages = [];
  
  if (name.includes('platform')) selectedImages.push(baseImages[0]);
  else if (name.includes('upholstered') || name.includes('headboard')) selectedImages.push(baseImages[1]);
  else if (material.includes('wood') || material.includes('oak') || material.includes('walnut')) selectedImages.push(baseImages[2]);
  else if (name.includes('storage')) selectedImages.push(baseImages[3]);
  else if (material.includes('metal') || material.includes('steel')) selectedImages.push(baseImages[4]);
  else if (name.includes('luxury') || style.includes('luxury')) selectedImages.push(baseImages[5]);
  else if (style.includes('modern')) selectedImages.push(baseImages[6]);
  else if (style.includes('traditional') || style.includes('classic')) selectedImages.push(baseImages[7]);
  else selectedImages.push(baseImages[0]); // Default
  
  // Add complementary images
  selectedImages.push(baseImages[(selectedImages.length + 1) % baseImages.length]);
  selectedImages.push(baseImages[(selectedImages.length + 2) % baseImages.length]);
  
  return selectedImages.slice(0, 3);
}

function generateWardrobeImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=wardrobe-sliding-${id}`,
    `https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=wardrobe-hinged-${id}`,
    `https://images.unsplash.com/photo-1571898123604-061673c69d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=wardrobe-corner-${id}`
  ];
}

function generateNightstandImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=nightstand-drawer-${id}`,
    `https://images.unsplash.com/photo-1594736797933-d0f29bbef2a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=nightstand-open-${id}`,
    `https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=nightstand-floating-${id}`
  ];
}

function generateDresserImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=dresser-traditional-${id}`,
    `https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=dresser-modern-${id}`,
    `https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=dresser-vintage-${id}`
  ];
}

// Living Room Furniture Image Generators
function generateSofaImages(name: string, material: string, style: string, color: string, id: string): string[] {
  const baseImages = [
    // Sectional sofas
    `https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=sofa-sectional-${id}`,
    // Leather sofas
    `https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=sofa-leather-${id}`,
    // Fabric sofas
    `https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=sofa-fabric-${id}`,
    // Modern sofas
    `https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=sofa-modern-${id}`,
    // Chesterfield sofas
    `https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=sofa-chesterfield-${id}`,
    // Recliner sofas
    `https://images.unsplash.com/photo-1574634534894-89d7576c8259?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=sofa-recliner-${id}`
  ];
  
  let selectedImages = [];
  
  if (name.includes('sectional')) selectedImages.push(baseImages[0]);
  else if (material.includes('leather')) selectedImages.push(baseImages[1]);
  else if (material.includes('fabric')) selectedImages.push(baseImages[2]);
  else if (style.includes('modern')) selectedImages.push(baseImages[3]);
  else if (name.includes('chesterfield')) selectedImages.push(baseImages[4]);
  else if (name.includes('recliner')) selectedImages.push(baseImages[5]);
  else selectedImages.push(baseImages[0]);
  
  selectedImages.push(baseImages[(selectedImages.length + 1) % baseImages.length]);
  selectedImages.push(baseImages[(selectedImages.length + 2) % baseImages.length]);
  
  return selectedImages.slice(0, 3);
}

function generateCoffeeTableImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1594736797933-d0f29bbef2a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=table-coffee-glass-${id}`,
    `https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=table-coffee-wood-${id}`,
    `https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=table-coffee-metal-${id}`
  ];
}

function generateTVUnitImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=tv-unit-wall-${id}`,
    `https://images.unsplash.com/photo-1571898123604-061673c69d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=tv-unit-floor-${id}`,
    `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=tv-unit-corner-${id}`
  ];
}

function generateArmchairImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=chair-armchair-accent-${id}`,
    `https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=chair-armchair-lounge-${id}`,
    `https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=chair-armchair-wingback-${id}`
  ];
}

// Dining Furniture Image Generators
function generateDiningTableImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=dining-table-wood-${id}`,
    `https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=dining-table-glass-${id}`,
    `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=dining-table-marble-${id}`
  ];
}

function generateDiningChairImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=dining-chair-upholstered-${id}`,
    `https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=dining-chair-wooden-${id}`,
    `https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=dining-chair-metal-${id}`
  ];
}

function generateBuffetImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=buffet-traditional-${id}`,
    `https://images.unsplash.com/photo-1571898123604-061673c69d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=buffet-modern-${id}`,
    `https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=buffet-vintage-${id}`
  ];
}

function generateBarStoolImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=barstool-swivel-${id}`,
    `https://images.unsplash.com/photo-1594736797933-d0f29bbef2a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=barstool-backless-${id}`,
    `https://images.unsplash.com/photo-1586140744749-dfa1f8e7efe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=barstool-adjustable-${id}`
  ];
}

// Office Furniture Image Generators
function generateOfficeChairImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=office-chair-ergonomic-${id}`,
    `https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=office-chair-executive-${id}`,
    `https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=office-chair-task-${id}`
  ];
}

function generateDeskImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=desk-executive-${id}`,
    `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=desk-lshaped-${id}`,
    `https://images.unsplash.com/photo-1574634534894-89d7576c8259?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=desk-standing-${id}`
  ];
}

function generateBookcaseImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1571898123604-061673c69d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=bookcase-tall-${id}`,
    `https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=bookcase-wide-${id}`,
    `https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=bookcase-corner-${id}`
  ];
}

function generateFilingCabinetImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=filing-cabinet-vertical-${id}`,
    `https://images.unsplash.com/photo-1586140744749-dfa1f8e7efe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=filing-cabinet-lateral-${id}`,
    `https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=filing-cabinet-mobile-${id}`
  ];
}

// Kids Furniture Image Generators
function generateKidsBedImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=kids-bed-bunk-${id}`,
    `https://images.unsplash.com/photo-1574634534894-89d7576c8259?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=kids-bed-loft-${id}`,
    `https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=kids-bed-single-${id}`
  ];
}

function generateStudyTableImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=study-table-adjustable-${id}`,
    `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=study-table-corner-${id}`,
    `https://images.unsplash.com/photo-1594736797933-d0f29bbef2a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=study-table-storage-${id}`
  ];
}

function generateToyStorageImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1571898123604-061673c69d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=toy-storage-chest-${id}`,
    `https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=toy-storage-bins-${id}`,
    `https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=toy-storage-shelves-${id}`
  ];
}

function generateKidsChairImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=kids-chair-desk-${id}`,
    `https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=kids-chair-bean-${id}`,
    `https://images.unsplash.com/photo-1586140744749-dfa1f8e7efe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=kids-chair-rocking-${id}`
  ];
}

// Outdoor Furniture Image Generators
function generateGardenSetImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=garden-set-teak-${id}`,
    `https://images.unsplash.com/photo-1571898123604-061673c69d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=garden-set-wicker-${id}`,
    `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=garden-set-aluminum-${id}`
  ];
}

function generateLoungerImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=lounger-chaise-${id}`,
    `https://images.unsplash.com/photo-1594736797933-d0f29bbef2a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=lounger-pool-${id}`,
    `https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=lounger-reclining-${id}`
  ];
}

function generateUmbrellaImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=umbrella-patio-${id}`,
    `https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=umbrella-cantilever-${id}`,
    `https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=umbrella-market-${id}`
  ];
}

function generatePlanterImages(name: string, material: string, style: string, color: string, id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=planter-ceramic-${id}`,
    `https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=planter-wood-${id}`,
    `https://images.unsplash.com/photo-1574634534894-89d7576c8259?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=planter-metal-${id}`
  ];
}

// Fallback image generator
function generateFallbackImages(id: string): string[] {
  return [
    `https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=fallback-furniture-${id}`,
    `https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=fallback-modern-${id}`,
    `https://images.unsplash.com/photo-1574634534894-89d7576c8259?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=fallback-classic-${id}`
  ];
}