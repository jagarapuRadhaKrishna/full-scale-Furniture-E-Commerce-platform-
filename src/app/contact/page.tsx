'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for contacting us! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 87654 32109', '+91 76543 21098']
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Us',
      details: ['info@dfwfurniture.com', 'sales@dfwfurniture.com']
    },
    {
      icon: MapPinIcon,
      title: 'Visit Us',
      details: ['Divya Furniture World', 'MG Road, Sector 14', 'Your City - 110001']
    },
    {
      icon: ClockIcon,
      title: 'Working Hours',
      details: ['Mon - Sat: 10:00 AM - 8:00 PM', 'Sunday: 11:00 AM - 6:00 PM']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE8DB] via-[#FFF5F0] to-[#FFD9C8]">
      <section className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
            alt="Contact Us"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Get In <span className="text-orange-200">Touch</span>
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 text-sm mb-1">{detail}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us more about your requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt="Our Showroom"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Visit Our Showroom</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Experience our furniture firsthand at our spacious showroom. Our expert team is ready to help you find the perfect pieces for your home.
                </p>
                <div className="bg-orange-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2"> Location</h4>
                  <p className="text-gray-700 text-sm">
                    Divya Furniture World, MG Road, Sector 14, Your City - 110001
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-3xl shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-4">Book a FREE Home Demo</h3>
                <p className="mb-6 opacity-90">
                  Can't visit us? No problem! We'll bring our furniture to your home so you can see how it looks in your space.
                </p>
                <a
                  href="/book-demo"
                  className="inline-block px-6 py-3 bg-white text-orange-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  Book Demo Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
