import { EyeIcon, HeartIcon, StarIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

const customDesigns = [
  {
    id: 1,
    title: 'L-Shaped Corner Sofa',
    category: 'Living Room',
    description: 'Custom L-shaped sofa designed for small living room with storage underneath',
    beforeImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    price: '₹45,000',
    timeline: '25 days',
    client: 'Mumbai Client',
    rating: 4.9,
    review: 'Outstanding craftsmanship! The custom sofa fits perfectly in our small living room. The hidden storage is incredibly useful.',
    has360View: true
  },
  {
    id: 2,
    title: 'Space-Saving Study Unit',
    category: 'Kids Room',
    description: 'Compact study table with built-in storage and bookshelf for kids room',
    beforeImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    price: '₹18,000',
    timeline: '18 days',
    client: 'Delhi Client',
    rating: 4.8,
    review: 'Perfect for our daughter\'s room! Smart design that maximizes storage while maintaining a clean look.',
    has360View: true
  },
  {
    id: 3,
    title: 'Executive Office Desk',
    category: 'Office',
    description: 'Large executive desk with cable management and built-in filing system',
    beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    price: '₹32,000',
    timeline: '22 days',
    client: 'Bangalore Client',
    rating: 4.7,
    review: 'Excellent desk design with great cable management. The filing system is very well organized.',
    has360View: true
  },
  {
    id: 4,
    title: 'Modular Kitchen Island',
    category: 'Kitchen',
    description: 'Multi-functional kitchen island with storage, breakfast counter, and prep area',
    beforeImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    price: '₹65,000',
    timeline: '35 days',
    client: 'Pune Client',
    rating: 5.0,
    review: 'Amazing transformation! The kitchen island has become the focal point of our home. Great craftsmanship.',
    has360View: true
  },
  {
    id: 5,
    title: 'Wall-Mounted TV Unit',
    category: 'Living Room',
    description: 'Floating TV unit with hidden cable management and display shelves',
    beforeImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    price: '₹28,000',
    timeline: '20 days',
    client: 'Chennai Client',
    rating: 4.6,
    review: 'Clean, modern design that saved a lot of floor space. Installation was flawless.',
    has360View: true
  },
  {
    id: 6,
    title: 'Outdoor Dining Pavilion',
    category: 'Outdoor',
    description: 'Weather-resistant outdoor dining set with pergola and built-in planters',
    beforeImage: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    price: '₹55,000',
    timeline: '30 days',
    client: 'Hyderabad Client',
    rating: 4.8,
    review: 'Perfect outdoor setup for family gatherings. Weather-resistant materials are holding up beautifully.',
    has360View: true
  }
]

const designStats = [
  { label: 'Custom Projects Completed', value: '250+' },
  { label: 'Happy Clients', value: '200+' },
  { label: 'Average Timeline', value: '25 Days' },
  { label: 'Client Satisfaction', value: '98%' }
]

export default function DesignGallery() {
  return (
    <div className="space-y-12">
      {/* Stats */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Custom Design Achievements
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {designStats.map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold text-furniture-brown mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Custom Design Gallery
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore our portfolio of custom furniture designs. Each piece is uniquely 
          crafted to meet specific client requirements and space constraints.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {customDesigns.map((design) => (
            <div key={design.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Before/After Images */}
              <div className="relative h-48">
                <div className="absolute inset-0 grid grid-cols-2">
                  <div className="relative">
                    <img
                      src={design.beforeImage}
                      alt="Before design"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                      Before
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={design.afterImage}
                      alt="After design"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                      After
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button className="p-2 bg-white bg-opacity-90 rounded-full shadow-md hover:bg-opacity-100">
                    <EyeIcon className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white bg-opacity-90 rounded-full shadow-md hover:bg-opacity-100">
                    <HeartIcon className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-furniture-brown bg-furniture-cream px-2 py-1 rounded">
                    {design.category}
                  </span>
                  <span className="text-sm text-gray-500">{design.client}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {design.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {design.description}
                </p>
                
                {/* Customer Review */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`h-4 w-4 ${i < Math.floor(design.rating) ? 'fill-current' : 'stroke-current fill-transparent'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{design.rating}/5</span>
                  </div>
                  <p className="text-sm text-gray-600 italic mb-1">
                    &quot;{design.review}&quot;
                  </p>
                  <p className="text-xs text-gray-500">- {design.client}</p>
                </div>
                
                <div className="flex justify-between items-center text-sm mb-4">
                  <div>
                    <span className="font-semibold text-furniture-brown">{design.price}</span>
                  </div>
                  <div className="text-gray-500">
                    {design.timeline}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {design.has360View && (
                    <button className="bg-furniture-brown text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-furniture-dark-wood transition duration-200 flex items-center space-x-1">
                      <ArrowPathIcon className="h-4 w-4" />
                      <span>360°</span>
                    </button>
                  )}
                  <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-700 transition duration-200">
                    Similar Design
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-furniture-cream rounded-2xl p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            What Our Custom Design Clients Say
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6">
              <p className="text-gray-700 mb-4 italic">
                &quot;The team understood exactly what I wanted for my small apartment. 
                The custom L-shaped sofa with storage was perfect for my space. 
                Quality exceeded expectations!&quot;
              </p>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">Priya Sharma</div>
                <div className="text-gray-600">Mumbai • L-Shaped Sofa</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <p className="text-gray-700 mb-4 italic">
                &quot;Amazing attention to detail! The kitchen island design was exactly 
                as visualized in 3D. The whole process was smooth and professional.&quot;
              </p>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">Rajesh Kumar</div>
                <div className="text-gray-600">Pune • Kitchen Island</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-600 text-white rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">
          Ready to Create Your Custom Furniture?
        </h3>
        <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
          Join 200+ satisfied customers who chose custom design solutions. 
          Let&apos;s bring your furniture vision to life!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200">
            Start Custom Design
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition duration-200">
            View More Designs
          </button>
        </div>
      </div>
    </div>
  )
}