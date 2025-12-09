import { StarIcon } from '@heroicons/react/20/solid'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    text: 'Amazing service! The technician came to my home with samples and helped me choose the perfect sofa. The FREE demo service was incredible.',
    furniture: 'Living Room Set',
    image: 'https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=PS'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Hyderabad, Telangana',
    rating: 5,
    text: 'I was skeptical about buying furniture online, but the home demo service changed everything. Saw the quality firsthand before purchasing.',
    furniture: 'Bedroom Furniture',
    image: 'https://via.placeholder.com/80x80/4ECDC4/FFFFFF?text=RK'
  },
  {
    id: 3,
    name: 'Anita Patel',
    location: 'Vijayawada, Andhra Pradesh',
    rating: 5,
    text: 'The custom design service is fantastic. They understood exactly what I wanted and delivered beyond my expectations.',
    furniture: 'Custom Dining Table',
    image: 'https://via.placeholder.com/80x80/FFD93D/FFFFFF?text=AP'
  },
  {
    id: 4,
    name: 'Vikram Singh',
    location: 'Bhimavaram, Andhra Pradesh',
    rating: 4,
    text: 'Great quality furniture and excellent customer service. The technician was very professional and knowledgeable.',
    furniture: 'Office Setup',
    image: 'https://via.placeholder.com/80x80/6BCF7F/FFFFFF?text=VS'
  },
  {
    id: 5,
    name: 'Meera Reddy',
    location: 'Narsapuram, Andhra Pradesh',
    rating: 5,
    text: 'Love the convenience of home demo. Saved me multiple trips to showrooms. Highly recommend DFW!',
    furniture: 'Kids Furniture',
    image: 'https://via.placeholder.com/80x80/FF8C94/FFFFFF?text=MR'
  },
  {
    id: 6,
    name: 'Arjun Mehta',
    location: 'Kakinada, Andhra Pradesh',
    rating: 5,
    text: 'The repair service is prompt and efficient. Fixed my old sofa perfectly. Very satisfied with the service.',
    furniture: 'Sofa Repair',
    image: 'https://via.placeholder.com/80x80/A8E6CF/FFFFFF?text=AM'
  }
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied customers 
            have to say about our furniture and services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200 cursor-default">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-gray-300" />
                ))}
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>

              <div className="text-sm text-furniture-brown font-medium bg-furniture-cream px-3 py-1 rounded-full inline-block">
                {testimonial.furniture}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-8 text-sm text-gray-600">
            <div className="text-center">
              <div className="text-2xl font-bold text-furniture-brown">500+</div>
              <div>Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-furniture-brown">4.8/5</div>
              <div>Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-furniture-brown">1000+</div>
              <div>Demo Visits</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}