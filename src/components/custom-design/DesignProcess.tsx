import { BeakerIcon, PencilSquareIcon, WrenchScrewdriverIcon, CheckCircleIcon, HomeIcon } from '@heroicons/react/24/outline'

const designSteps = [
  {
    step: 1,
    title: 'Requirement Analysis',
    description: 'We analyze your requirements, space, and preferences',
    icon: BeakerIcon,
    timeline: '1-2 days',
    details: [
      'Space measurement analysis',
      'Style preference evaluation', 
      'Budget optimization planning'
    ]
  },
  {
    step: 2,
    title: 'Concept Design',
    description: '3D concepts and material recommendations',
    icon: PencilSquareIcon,
    timeline: '3-5 days',
    details: [
      '3D visual concepts',
      'Material selection options',
      'Color scheme suggestions'
    ]
  },
  {
    step: 3,
    title: 'Design Refinement',
    description: 'Refine design based on your feedback',
    icon: WrenchScrewdriverIcon,
    timeline: '2-3 days',
    details: [
      'Incorporate feedback',
      'Technical specifications',
      'Final material selection'
    ]
  },
  {
    step: 4,
    title: 'Production Planning',
    description: 'Detailed production drawings and timeline',
    icon: CheckCircleIcon,
    timeline: '1-2 days',
    details: [
      'Production drawings',
      'Manufacturing timeline',
      'Quality checkpoints'
    ]
  },
  {
    step: 5,
    title: 'Manufacturing & Delivery',
    description: 'Custom furniture creation and home delivery',
    icon: HomeIcon,
    timeline: '15-30 days',
    details: [
      'Expert craftsmanship',
      'Quality control checks',
      'Professional installation'
    ]
  }
]

const designFeatures = [
  {
    title: 'Space Optimization',
    description: 'Maximize functionality while maintaining aesthetics'
  },
  {
    title: 'Material Expertise',
    description: 'Choose from premium woods, metals, and fabrics'
  },
  {
    title: 'Style Flexibility',
    description: 'Modern, traditional, or fusion - we create all styles'
  },
  {
    title: 'Budget-Friendly',
    description: 'Custom designs that fit your budget requirements'
  },
  {
    title: '3D Visualization',
    description: 'See your furniture in 3D before production starts'
  },
  {
    title: 'Lifetime Support',
    description: 'Ongoing maintenance and support for custom pieces'
  }
]

export default function DesignProcess() {
  return (
    <div className="space-y-8">
      {/* Design Process */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Our Design Process
        </h2>
        
        <div className="space-y-6">
          {designSteps.map((step, index) => (
            <div key={step.step} className="relative">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-furniture-cream rounded-full flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-furniture-brown" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                      {step.timeline}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-1">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="w-1 h-1 bg-furniture-brown rounded-full"></span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {index < designSteps.length - 1 && (
                <div className="absolute left-6 mt-4 w-px h-8 bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Design Features */}
      <div className="bg-furniture-cream rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Why Choose Custom Design?
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {designFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 text-sm">
                  {feature.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Information */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Custom Design Pricing
        </h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
            <span className="text-gray-700">Design Consultation</span>
            <span className="font-semibold text-green-600">FREE</span>
          </div>
          
          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
            <span className="text-gray-700">3D Design & Concepts</span>
            <span className="font-semibold text-gray-900">₹2,000 - ₹5,000</span>
          </div>
          
          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
            <span className="text-gray-700">Home Demo with Samples</span>
            <span className="font-semibold text-gray-900">FREE</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Production Cost</span>
            <span className="font-semibold text-gray-900">Based on Design</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Special Offer:</strong> Design fees are fully adjustable 
            against the final furniture cost if you proceed with production.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <h3 className="font-semibold text-gray-900 mb-2">
          Total Timeline
        </h3>
        <div className="text-2xl font-bold text-furniture-brown mb-2">
          20-45 Days
        </div>
        <p className="text-sm text-gray-600">
          From concept to delivery, depending on complexity
        </p>
      </div>

      {/* Contact */}
      <div className="bg-primary-600 text-white rounded-lg p-6 text-center">
        <h3 className="font-semibold mb-2">
          Need Design Consultation?
        </h3>
        <p className="text-sm text-primary-100 mb-4">
          Speak with our design experts for free consultation
        </p>
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium">Call:</span> +91 90597 37539 / +91 95508 97539
          </div>
          <div className="text-sm">
            <span className="font-medium">Email:</span> divyafurnitureworld7539@gmail.com
          </div>
        </div>
      </div>
    </div>
  )
}