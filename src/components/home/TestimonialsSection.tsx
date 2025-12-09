'use client'

import { StarIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    text: "Absolutely love the sofa set I purchased! The quality is outstanding and the delivery was prompt. The team was very helpful throughout the process.",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi, NCR",
    rating: 5,
    text: "Best furniture shopping experience! The bedroom set exceeded my expectations. Great quality at affordable prices. Highly recommended!",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Anita Patel",
    location: "Bangalore, Karnataka",
    rating: 5,
    text: "The wardrobe and bed are simply beautiful. The craftsmanship is excellent and the customer service team was amazing. Will definitely shop again!",
    date: "3 weeks ago"
  }
]

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  return (
    <section className="py-20 bg-gradient-to-br from-orange-600 to-orange-500 text-white relative overflow-hidden">
      {/* Banner Image */}
      <div className="relative h-80 mb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1920&q=80)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center max-w-3xl px-4">
            <h2 className="text-6xl font-bold mb-4 text-white drop-shadow-2xl">What Our Clients Say</h2>
            <p className="text-2xl text-amber-300">Trusted by Thousands of Happy Homeowners</p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with Divya Furniture World.
          </p>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            {/* Stars */}
            <div className="flex gap-1 mb-6 justify-center">
              {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                <StarIcon key={i} className="w-6 h-6 text-amber-400" />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-xl md:text-2xl text-center leading-relaxed mb-8">
              "{testimonials[activeTestimonial].text}"
            </blockquote>

            {/* Author */}
            <div className="text-center space-y-1">
              <div className="font-bold text-lg">{testimonials[activeTestimonial].name}</div>
              <div className="text-gray-300 text-sm">{testimonials[activeTestimonial].location}</div>
              <div className="text-gray-400 text-xs">{testimonials[activeTestimonial].date}</div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex gap-3 justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeTestimonial ? 'w-12 bg-amber-400' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-400 mb-2">10K+</div>
            <div className="text-gray-300">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-400 mb-2">500+</div>
            <div className="text-gray-300">Products</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-400 mb-2">50+</div>
            <div className="text-gray-300">Cities Covered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-400 mb-2">4.8★</div>
            <div className="text-gray-300">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}
