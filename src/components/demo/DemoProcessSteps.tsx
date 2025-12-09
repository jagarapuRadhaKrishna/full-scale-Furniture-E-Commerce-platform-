import { CheckCircleIcon, CalendarDaysIcon, HomeIcon, UserIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline'

const processSteps = [
  {
    step: 1,
    title: 'Book Demo Visit',
    description: 'Fill the form and schedule your FREE home consultation',
    icon: CalendarDaysIcon,
    details: [
      'Choose convenient date & time',
      'Instant booking confirmation',
      'SMS & email notifications'
    ]
  },
  {
    step: 2,
    title: 'Technician Assignment',
    description: 'Expert technician assigned with your furniture preferences',
    icon: UserIcon,
    details: [
      'Experienced furniture consultant',
      'Local area technician',
      'Contact details shared'
    ]
  },
  {
    step: 3,
    title: 'Home Visit',
    description: 'Technician visits with samples, catalog and measuring tools',
    icon: HomeIcon,
    details: [
      'Brings physical samples',
      'Digital catalog on tablet',
      'Takes room measurements'
    ]
  },
  {
    step: 4,
    title: 'Consultation & Quote',
    description: 'Get personalized recommendations and quotation',
    icon: CheckCircleIcon,
    details: [
      'Customized suggestions',
      'Instant quotation',
      'No purchase pressure'
    ]
  }
]

const benefits = [
  {
    title: 'See Before You Buy',
    description: 'Touch, feel and visualize furniture in your actual space'
  },
  {
    title: 'Expert Guidance',
    description: 'Professional advice on materials, colors, and space optimization'
  },
  {
    title: 'Accurate Measurements',
    description: 'Precise measurements ensure perfect fit in your room'
  },
  {
    title: 'Custom Solutions',
    description: 'Personalized designs based on your specific requirements'
  },
  {
    title: 'No Commitment',
    description: 'Demo service is completely FREE - no charges apply'
  },
  {
    title: 'Convenient Timing',
    description: 'Available 7 days a week including evenings'
  }
]

export default function DemoProcessSteps() {
  return (
    <div className="space-y-8">
      {/* How It Works */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          How Demo Service Works
        </h2>
        
        <div className="space-y-6">
          {processSteps.map((step, index) => (
            <div key={step.step} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-primary-600">
                    Step {step.step}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-3">
                  {step.description}
                </p>
                
                <ul className="space-y-1">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center space-x-2 text-sm text-gray-500">
                      <span className="w-1 h-1 bg-primary-600 rounded-full"></span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {index < processSteps.length - 1 && (
                <div className="absolute left-6 mt-12 w-px h-6 bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-furniture-cream rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Why Choose Home Demo?
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 text-sm">
                  {benefit.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Info */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <CurrencyRupeeIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            FREE Home Demo
          </h3>
          <p className="text-gray-600 mb-4">
            No charges for consultation and measurements
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 text-green-800">
              <CheckCircleIcon className="h-5 w-5" />
              <span className="font-medium">Money Back Guarantee</span>
            </div>
            <p className="text-sm text-green-700 mt-2">
              Our demo service is completely FREE - no charges, no hidden fees
            </p>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <h3 className="font-semibold text-gray-900 mb-2">
          Need Help?
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Our customer support team is here to assist you
        </p>
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium">Call:</span> +91 90597 37539 / +91 95508 97539
          </div>
          <div className="text-sm">
            <span className="font-medium">WhatsApp:</span> +91 90597 37539
          </div>
          <div className="text-sm">
            <span className="font-medium">Email:</span> divyafurnitureworld7539@gmail.com
          </div>
        </div>
      </div>
    </div>
  )
}