import { LightBulbIcon, ShieldCheckIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'

const careTips = [
  {
    icon: LightBulbIcon,
    title: 'Wood Furniture Care',
    description: 'Keep away from direct sunlight and use coasters to prevent water rings.',
    tips: ['Clean with soft cloth', 'Use wood polish monthly', 'Avoid harsh chemicals']
  },
  {
    icon: ShieldCheckIcon,
    title: 'Fabric Protection',
    description: 'Regular vacuuming and immediate stain treatment keeps fabric fresh.',
    tips: ['Vacuum weekly', 'Professional cleaning yearly', 'Use fabric protectors']
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Maintenance Tips',
    description: 'Regular maintenance extends furniture life and keeps it looking new.',
    tips: ['Tighten screws quarterly', 'Check for wear signs', 'Schedule service visits']
  }
]

const careGuides = [
  {
    title: 'Complete Wood Furniture Care Guide',
    description: 'Learn how to maintain and protect your wooden furniture',
    readTime: '5 min read',
    image: 'https://via.placeholder.com/300x200/8B4513/FFFFFF?text=Wood+Care'
  },
  {
    title: 'Leather Furniture Maintenance',
    description: 'Keep your leather furniture looking luxurious for years',
    readTime: '4 min read',
    image: 'https://via.placeholder.com/300x200/654321/FFFFFF?text=Leather+Care'
  },
  {
    title: 'Fabric Sofa Cleaning Tips',
    description: 'Professional tips for cleaning and maintaining fabric sofas',
    readTime: '6 min read',
    image: 'https://via.placeholder.com/300x200/D2691E/FFFFFF?text=Fabric+Care'
  }
]

export default function FurnitureCare() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Furniture Care Tips
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Keep your furniture looking beautiful for years with our expert care tips and maintenance guides.
          </p>
        </div>

        {/* Care Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {careTips.map((tip, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-furniture-cream rounded-full flex items-center justify-center mx-auto mb-4">
                <tip.icon className="h-8 w-8 text-furniture-brown" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {tip.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {tip.description}
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                {tip.tips.map((tipItem, tipIndex) => (
                  <li key={tipIndex} className="flex items-center justify-center">
                    <span className="w-1 h-1 bg-furniture-brown rounded-full mr-2"></span>
                    {tipItem}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Care Guides */}
        <div>
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Detailed Care Guides
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {careGuides.map((guide, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition duration-200">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-furniture-brown font-medium mb-2">
                    {guide.readTime}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {guide.title}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {guide.description}
                  </p>
                  <button className="text-furniture-brown font-medium hover:text-furniture-dark-wood transition duration-200">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-furniture-cream rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need Professional Maintenance?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our expert technicians provide professional cleaning, repair, and maintenance services 
            to keep your furniture in perfect condition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-furniture-brown text-white px-6 py-3 rounded-lg font-semibold hover:bg-furniture-dark-wood transition duration-200">
              Book Maintenance Service
            </button>
            <button className="bg-white text-furniture-brown border-2 border-furniture-brown px-6 py-3 rounded-lg font-semibold hover:bg-furniture-brown hover:text-white transition duration-200">
              Download Care Guide PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}