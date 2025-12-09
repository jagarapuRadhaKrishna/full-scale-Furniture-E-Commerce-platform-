const fs = require('fs');
const path = require('path');

// Rich banner images for each subcategory
const bannerImages = {
  'low-height-beds': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1920&q=80',
  'height-beds': 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1920&q=80',
  'platform-beds': 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1920&q=80',
  'hydraulic-beds': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1920&q=80',
  'bookshelf-beds': 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1920&q=80',
  'sliding-wardrobes': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
  'hinged-wardrobes': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1920&q=80',
  'walk-in-wardrobes': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
  'dressing-tables': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80',
  'side-tables': 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1920&q=80',
  'chest-drawers': 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=1920&q=80',
  'sofas-l-shaped': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80',
  'sofas-3-seater': 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1920&q=80',
  'sofas-2-seater': 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1920&q=80',
  'sofa-cum-bed': 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1920&q=80',
  'power-recliners': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80',
  'manual-recliners': 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1920&q=80',
  'marble-coffee-tables': 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=1920&q=80',
  'glass-coffee-tables': 'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?w=1920&q=80',
  'wall-tv-units': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80',
  'floor-tv-units': 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1920&q=80'
};

const defaultBanner = 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1920&q=80';

function updateSubcategoryPage(filePath, subcategoryName) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file needs updating
    if (content.includes('/product/') && content.includes('Rich Banner Image')) {
      console.log(`✓ Already updated: ${subcategoryName}`);
      return;
    }

    // Get banner image
    const bannerImage = bannerImages[subcategoryName] || defaultBanner;
    
    // Add rich banner section after ModuleHeader
    const bannerSection = `
      {/* Rich Banner Image */}
      <section className="relative h-64 mb-8 rounded-3xl overflow-hidden shadow-2xl">
        <img 
          src="${bannerImage}"
          alt="${subcategoryName} collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
          <div className="p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Premium ${subcategoryName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Collection</h2>
            <p className="text-lg opacity-90">Discover our curated selection of high-quality furniture</p>
          </div>
        </div>
      </section>
`;

    // Replace product links to use /product/[id] instead of inline display
    content = content.replace(
      /<div key=\{product\.id\} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">/g,
      `<Link href={\`/product/\${product.productId || product.id}\`} key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group block">`
    );

    // Close Link tag properly
    content = content.replace(
      /<\/div>\s*<\/div>\s*<\/div>\s*\)\)\}/g,
      `</div>
                </div>
              </Link>
            ))}
          </div>`
    );

    // Insert banner after ModuleHeader
    content = content.replace(
      /(<ModuleHeader[\s\S]*?\/>)/,
      `$1\n${bannerSection}`
    );

    // Ensure Link is imported
    if (!content.includes("import Link from 'next/link'")) {
      content = content.replace(
        "import { useState } from 'react'",
        "import { useState } from 'react'\nimport Link from 'next/link'"
      );
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated: ${subcategoryName}`);
  } catch (error) {
    console.error(`✗ Error updating ${subcategoryName}:`, error.message);
  }
}

function walkDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDirectory(filePath);
    } else if (file === 'page.tsx' && filePath.includes('categories')) {
      const subcategoryName = path.basename(path.dirname(filePath));
      if (subcategoryName !== 'categories') {
        updateSubcategoryPage(filePath, subcategoryName);
      }
    }
  });
}

console.log('Starting subcategory pages update...\n');
const categoriesPath = path.join(__dirname, '..', 'src', 'app', 'categories');
walkDirectory(categoriesPath);
console.log('\n✓ All subcategory pages updated!');
