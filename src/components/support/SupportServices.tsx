import { WrenchScrewdriverIcon, Cog6ToothIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline'

const supportServices = [
  {
    id: 1,
    title: 'Furniture Repair',
    description: 'Expert repair services for all types of furniture damage',
    icon: WrenchScrewdriverIcon,
    price: '₹300 - ₹800',
    duration: '1-2 hours',
    services: ['Wood repair', 'Joint fixing', 'Surface restoration', 'Hardware replacement']
  },
  {
    id: 2,
    title: 'Assembly Service',
    description: 'Professional assembly of flat-pack and modular furniture',
    icon: Cog6ToothIcon,
    price: '₹200 - ₹500',
    duration: '30 mins - 2 hours',
    services: ['Flat-pack assembly', 'Hardware installation', 'Alignment check', 'Safety testing']
  },
  {
    id: 3,
    title: 'Maintenance',
    description: 'Regular maintenance to keep your furniture in perfect condition',
    icon: ShieldCheckIcon,
    price: '₹400 - ₹1000',
    duration: '1-3 hours',
    services: ['Deep cleaning', 'Polish application', 'Joint tightening', 'Preventive care']
  }
]

export default function SupportServices() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {supportServices.map((service) => (
        <div key={service.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <service.icon className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {service.description}
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Visit Fee:</span>
              <span className="font-semibold text-furniture-brown">{service.price}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Duration:</span>
              <span className="font-semibold text-gray-900">{service.duration}</span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Services Include:</h4>
            <ul className="space-y-2">
              {service.services.map((item, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className="w-1 h-1 bg-primary-600 rounded-full"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-200">
            Book {service.title}
          </button>
        </div>
      ))}
    </div>
  )
}