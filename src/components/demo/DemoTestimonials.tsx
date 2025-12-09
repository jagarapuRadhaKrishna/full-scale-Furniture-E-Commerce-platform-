import { StarIcon } from '@heroicons/react/20/solid'

const demoTestimonials = [
  {
    id: 1,
    name: 'Smita Gupta',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    furniture: 'Living Room Set',
    text: 'The FREE home demo service was amazing! The technician brought beautiful sofa samples and helped me choose the perfect color for my living room. Excellent service at no cost.',
    purchaseAmount: '₹65,000',
    image: 'https://via.placeholder.com/60x60/FF6B6B/FFFFFF?text=SG'
  },
  {
    id: 2,
    name: 'Rahul Verma',
    location: 'Delhi, NCR',
    rating: 5,
    furniture: 'Bedroom Furniture',
    text: 'I was hesitant to buy furniture online, but the demo service changed my mind completely. Saw the quality firsthand and made an informed decision.',
    purchaseAmount: '₹85,000',
    image: 'https://via.placeholder.com/60x60/4ECDC4/FFFFFF?text=RV'
  },
  {
    id: 3,
    name: 'Deepika Singh',
    location: 'Bangalore, Karnataka',
    rating: 5,
    furniture: 'Custom Dining Table',
    text: 'The technician took precise measurements and showed me various wood samples. The custom dining table turned out exactly as discussed during the demo.',
    purchaseAmount: '₹45,000',
    image: 'https://via.placeholder.com/60x60/FFD93D/FFFFFF?text=DS'
  },
  {
    id: 4,
    name: 'Amit Sharma',
    location: 'Pune, Maharashtra',
    rating: 5,
    furniture: 'Office Setup',
    text: 'Professional service! The consultant understood my office requirements perfectly and suggested ergonomic furniture within my budget.',
    purchaseAmount: '₹35,000',
    image: 'https://via.placeholder.com/60x60/6BCF7F/FFFFFF?text=AS'
  }
]

const stats = [
  { label: 'Demo Visits Completed', value: '1,200+' },
  { label: 'Average Rating', value: '4.9/5' },
  { label: 'Purchase Conversion', value: '85%' },
  { label: 'Customer Satisfaction', value: '96%' }
]

export default function DemoTestimonials() {
  return (
    <div className="mt-16">
      {/* Stats Section */}
      <div className="bg-primary-600 text-white rounded-2xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Demo Service by Numbers
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-primary-100 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          What Our Demo Customers Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {demoTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>

              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-furniture-brown font-medium bg-furniture-cream px-2 py-1 rounded">
                    {testimonial.furniture}
                  </span>
                </div>
                <div className="text-sm text-green-600 font-medium">
                  Purchased: {testimonial.purchaseAmount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions
        </h3>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">
              What happens during the demo visit?
            </h4>
            <p className="text-gray-600 text-sm">
              Our technician brings furniture samples, catalogs, and measuring tools. 
              They&apos;ll assess your space, understand your requirements, show samples, 
              take measurements, and provide personalized recommendations.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">
              Is the home demo really free?
            </h4>
            <p className="text-gray-600 text-sm">
              Yes! Our home demo service is completely FREE. There are no hidden charges 
              for consultation, measurements, or design recommendations.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">
              How long does the demo visit take?
            </h4>
            <p className="text-gray-600 text-sm">
              Typically 45-60 minutes, depending on your requirements. 
              Our technicians are thorough but respectful of your time.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">
              Can I reschedule the demo visit?
            </h4>
            <p className="text-gray-600 text-sm">
              Absolutely! You can reschedule up to 4 hours before the 
              scheduled time by calling our customer support.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}