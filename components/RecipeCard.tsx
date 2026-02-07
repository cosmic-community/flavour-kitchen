import Link from 'next/link'
import type { Recipe } from '@/types'

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const category = recipe.metadata?.category
  const featuredImage = recipe.metadata?.featured_image

  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        {featuredImage?.imgix_url ? (
          <img
            src={`${featuredImage.imgix_url}?w=800&h=560&fit=crop&auto=format,compress`}
            alt={recipe.title}
            width={400}
            height={280}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-cream-200">
            <span className="text-5xl">🍽️</span>
          </div>
        )}

        {/* Category Badge */}
        {category && (
          <span className="absolute top-3 left-3 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
            {category.title}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-charcoal-900 group-hover:text-amber-600 transition-colors line-clamp-1 mb-2">
          {recipe.title}
        </h3>

        {recipe.metadata?.description && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
            {recipe.metadata.description}
          </p>
        )}

        {/* Meta Row */}
        <div className="flex items-center gap-4 text-xs text-gray-400">
          {recipe.metadata?.prep_time && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Prep {recipe.metadata.prep_time}
            </span>
          )}
          {recipe.metadata?.cook_time && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
              Cook {recipe.metadata.cook_time}
            </span>
          )}
          {recipe.metadata?.servings && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {recipe.metadata.servings} servings
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}