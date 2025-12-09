'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: 'What is included in the visit fee?',
    answer: 'The visit fee includes technician travel, assessment, and basic troubleshooting. If repair work is needed, additional charges apply based on the service required.'
  },
  {
    question: 'How quickly can you visit for repairs?',
    answer: 'Normal requests are handled within 3-5 days. Urgent requests within 1-2 days, and emergency repairs can be scheduled the same day with additional charges.'
  },
  {
    question: 'Do you provide warranty on repair work?',
    answer: 'Yes, all our repair work comes with a 30-day warranty. For parts replacement, warranty varies by component (3-12 months).'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, UPI, credit/debit cards, and bank transfers. Payment is due upon completion of the service.'
  },
  {
    question: 'Can you repair furniture from other brands?',
    answer: 'Yes, our expert technicians can repair furniture from any brand. We carry common spare parts and can source specific components if needed.'
  },
  {
    question: 'Is there a minimum charge for visits?',
    answer: 'Yes, there is a minimum visit fee of ₹200 which covers assessment and minor adjustments. This is adjusted against the repair cost if work is done.'
  }
]

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none"
            >
              <span className="font-medium text-gray-900">
                {faq.question}
              </span>
              {openFAQ === index ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {openFAQ === index && (
              <div className="px-4 pb-3">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">
          Still have questions?
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Our customer support team is here to help
        </p>
        <div className="space-y-2 text-sm">
          <div><span className="font-medium">Call:</span> +91 90597 37539 / +91 95508 97539</div>
          <div><span className="font-medium">WhatsApp:</span> +91 90597 37539</div>
          <div><span className="font-medium">Email:</span> divyafurnitureworld7539@gmail.com</div>
        </div>
      </div>
    </div>
  )
}