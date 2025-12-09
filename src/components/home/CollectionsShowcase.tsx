'use client'

import Link from 'next/link'
import Image from 'next/image'

const collections = [
  {
    id: 1,
    title: 'Bedroom Collection',
    category: 'Bedroom',
    description: 'Beds, Wardrobes & More',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
    href: '/categories/bedroom',
    items: ['Beds', 'Wardrobes', 'Dressing Tables', 'Side Tables']
  },
  {
    id: 2,
    title: 'Living Room',
    category: 'Living Room',
    description: 'Sofas, TV Units & Coffee Tables',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    href: '/categories/living-room',
    items: ['L-Shaped Sofas', 'Recliners', 'TV Units', 'Coffee Tables']
  },
  {
    id: 3,
    title: 'Dining Sets',
    category: 'Dining',
    description: 'Tables, Chairs & Buffets',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
    href: '/categories/dining',
    items: ['4-Seater Sets', '6-Seater Sets', 'Dining Chairs', 'Buffets']
  },
  {
    id: 4,
    title: 'Office Furniture',
    category: 'Office',
    description: 'Desks, Chairs & Storage',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80',
    href: '/categories/office',
    items: ['Executive Desks', 'Office Chairs', 'Bookshelves', 'Filing Cabinets']
  },
  {
    id: 5,
    title: 'Kids Furniture',
    category: 'Kids',
    description: 'Beds, Study Tables & Storage',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80',
    href: '/categories/kids',
    items: ['Kids Beds', 'Bunk Beds', 'Study Tables', 'Toy Storage']
  },
  {
    id: 6,
    title: 'Outdoor Furniture',
    category: 'Outdoor',
    description: 'Garden & Patio Collection',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80',
    href: '/categories/outdoor',
    items: ['Garden Chairs', 'Swing Chairs', 'Sun Loungers', 'Outdoor Tables']
  },
  {
    id: 7,
    title: 'Textiles',
    category: 'Textiles',
    description: 'Bed Sheets, Curtains & More',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    href: '/categories/textiles',
    items: ['Bed Sheets', 'Curtains', 'Cushion Covers', 'Carpets & Rugs']
  }
]

export default function CollectionsShowcase() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[#FFE8DB] via-[#FFF5F0] to-[#FFD9C8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-orange-500">Collections</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive furniture collection for every room in your home
          </p>
        </div>
        
        {/* Collections Grid - All 7 Categories - Wider Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={collection.href}
              className="group cursor-pointer"
            >
              <div className="relative h-[320px] bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-orange-100">
                {/* Background Image - Clear and Visible */}
                <div className="absolute inset-0">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Subtle gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                
                {/* Content */}
                <div className="relative h-full p-6 flex flex-col justify-between z-10">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{collection.title}</h3>
                    <p className="text-white/90 text-sm font-medium drop-shadow">{collection.description}</p>
                  </div>
                  
                  <div>
                    {/* Items List */}
                    <ul className="space-y-1 mb-4">
                      {collection.items.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="text-white text-xs flex items-center drop-shadow">
                          <svg className="w-3 h-3 mr-2 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                    
                    <button className="px-5 py-2 bg-orange-500 text-white text-sm font-semibold rounded-full hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center transform hover:scale-105">
                      View All
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
