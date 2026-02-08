import type { Metadata } from 'next'
import { getAboutPage } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'About — Flavour Kitchen',
  description:
    'Learn about Flavour Kitchen — our story, our mission, and why we love sharing recipes from around the world.',
}

export default async function AboutPageRoute() {
  const about = await getAboutPage()

  // Fallback content if the Cosmic object hasn't been created yet
  const headline = about?.metadata?.headline ?? 'About Flavour Kitchen'
  const intro =
    about?.metadata?.intro ??
    'We believe that great food brings people together. Flavour Kitchen is a community-driven recipe hub celebrating cuisines from every corner of the globe.'
  const storyTitle = about?.metadata?.story_title ?? 'Our Story'
  const storyContent =
    about?.metadata?.story_content ??
    'Flavour Kitchen started as a passion project by a group of home cooks who wanted to make world cuisine accessible to everyone. What began as a small collection of family recipes has grown into a vibrant library of dishes spanning dozens of cultures and traditions.'
  const mission =
    about?.metadata?.mission ??
    'To inspire home cooks everywhere to explore new flavours, learn timeless techniques, and share the joy of cooking with the people they love.'
  const heroImage = about?.metadata?.hero_image?.imgix_url

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        {heroImage ? (
          <img
            src={`${heroImage}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt="About Flavour Kitchen"
            width={1600}
            height={400}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-charcoal-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/40 to-charcoal-900/10" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <p className="text-amber-300 text-sm uppercase tracking-[0.25em] font-semibold mb-4">
            Who We Are
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white max-w-3xl leading-tight">
            {headline}
          </h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
          {intro}
        </p>
      </section>

      {/* Story Section */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center">
            <span className="text-amber-500 text-4xl mb-4">📖</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-900 mb-6 text-center">
              {storyTitle}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed text-center">
              <p>{storyContent}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-amber-50 to-cream-100 rounded-2xl p-8 sm:p-12 text-center border border-amber-100">
          <span className="text-amber-500 text-4xl mb-4 block">🎯</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal-900 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
            {mission}
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-charcoal-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            What We Value
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <span className="text-4xl block mb-3">🌍</span>
              <h3 className="text-lg font-semibold text-amber-400 mb-2">
                Global Flavours
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We celebrate cuisines from every culture, honouring the traditions and stories behind each dish.
              </p>
            </div>
            <div className="text-center">
              <span className="text-4xl block mb-3">👩‍🍳</span>
              <h3 className="text-lg font-semibold text-amber-400 mb-2">
                Home Cooking
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every recipe is designed for real home kitchens — no professional equipment or rare ingredients needed.
              </p>
            </div>
            <div className="text-center">
              <span className="text-4xl block mb-3">❤️</span>
              <h3 className="text-lg font-semibold text-amber-400 mb-2">
                Community
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Food is better shared. We build a welcoming space where cooks of all levels learn and grow together.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}