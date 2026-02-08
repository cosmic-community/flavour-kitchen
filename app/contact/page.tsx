import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us — Flavour Kitchen',
  description:
    'Get in touch with the Flavour Kitchen team. Ask about recipes, suggest new cuisines, or just say hello.',
}

export default function ContactPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <span className="text-4xl mb-4 block">💌</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 mb-3">
          Get in Touch
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Have a recipe question, suggestion, or just want to say hello? Fill
          out the form below and we&apos;ll get back to you soon.
        </p>
      </div>

      {/* Contact Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
        <ContactForm />
      </div>

      {/* Additional Info */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-white rounded-xl border border-gray-100">
          <span className="text-2xl block mb-2">📧</span>
          <h3 className="font-semibold text-charcoal-900 text-sm mb-1">
            Email
          </h3>
          <a
            href="mailto:tony@cosmicjs.com"
            className="text-amber-600 hover:text-amber-700 text-sm transition-colors"
          >
            tony@cosmicjs.com
          </a>
        </div>
        <div className="p-6 bg-white rounded-xl border border-gray-100">
          <span className="text-2xl block mb-2">🍳</span>
          <h3 className="font-semibold text-charcoal-900 text-sm mb-1">
            Recipe Ideas
          </h3>
          <p className="text-gray-500 text-sm">
            We love hearing your suggestions
          </p>
        </div>
        <div className="p-6 bg-white rounded-xl border border-gray-100">
          <span className="text-2xl block mb-2">⚡</span>
          <h3 className="font-semibold text-charcoal-900 text-sm mb-1">
            Response Time
          </h3>
          <p className="text-gray-500 text-sm">
            Usually within 24 hours
          </p>
        </div>
      </div>
    </section>
  )
}