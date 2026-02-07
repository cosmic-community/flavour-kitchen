// app/recipes/[slug]/page.tsx
import { getRecipeBySlug, getAllRecipes } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const recipe = await getRecipeBySlug(slug)

  if (!recipe) {
    return { title: 'Recipe Not Found' }
  }

  return {
    title: `${recipe.title} — Flavour Kitchen`,
    description: recipe.metadata?.description || 'A delicious recipe from Flavour Kitchen',
  }
}

export async function generateStaticParams() {
  const recipes = await getAllRecipes()
  return recipes.map((recipe) => ({ slug: recipe.slug }))
}

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params
  const recipe = await getRecipeBySlug(slug)

  if (!recipe) {
    notFound()
  }

  const category = recipe.metadata?.category
  const featuredImage = recipe.metadata?.featured_image

  return (
    <article>
      {/* Hero Image */}
      <div className="relative h-[400px] sm:h-[480px] overflow-hidden">
        {featuredImage?.imgix_url ? (
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=960&fit=crop&auto=format,compress`}
            alt={recipe.title}
            width={1600}
            height={480}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-charcoal-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/30 to-transparent" />

        <div className="relative z-10 flex flex-col justify-end h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <Link
            href="/"
            className="inline-flex items-center text-amber-300 text-sm font-medium mb-4 hover:text-amber-200 transition-colors w-fit"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all recipes
          </Link>

          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-block bg-amber-500/90 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3 w-fit hover:bg-amber-600 transition-colors"
            >
              {category.title}
            </Link>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            {recipe.title}
          </h1>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Description */}
        {recipe.metadata?.description && (
          <p className="text-lg text-gray-600 leading-relaxed mb-8 border-l-4 border-amber-400 pl-4">
            {recipe.metadata.description}
          </p>
        )}

        {/* Meta Info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {recipe.metadata?.prep_time && (
            <div className="bg-cream-100 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Prep Time</p>
              <p className="text-charcoal-800 font-bold">{recipe.metadata.prep_time}</p>
            </div>
          )}
          {recipe.metadata?.cook_time && (
            <div className="bg-cream-100 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Cook Time</p>
              <p className="text-charcoal-800 font-bold">{recipe.metadata.cook_time}</p>
            </div>
          )}
          {recipe.metadata?.servings && (
            <div className="bg-cream-100 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Servings</p>
              <p className="text-charcoal-800 font-bold">{recipe.metadata.servings}</p>
            </div>
          )}
          {category && (
            <div className="bg-cream-100 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Category</p>
              <p className="text-charcoal-800 font-bold">{category.title}</p>
            </div>
          )}
        </div>

        {/* Two Column Layout for Ingredients and Instructions */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Ingredients */}
          {recipe.metadata?.ingredients && (
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4 flex items-center gap-2">
                <span className="text-amber-500">🧾</span> Ingredients
              </h2>
              <div className="bg-cream-100 rounded-2xl p-6 sticky top-8">
                <div className="prose prose-sm prose-gray max-w-none prose-li:marker:text-amber-500">
                  <ReactMarkdown>{recipe.metadata.ingredients}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          {recipe.metadata?.instructions && (
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4 flex items-center gap-2">
                <span className="text-amber-500">👨‍🍳</span> Instructions
              </h2>
              <div className="prose prose-lg prose-gray max-w-none prose-headings:text-charcoal-900 prose-strong:text-charcoal-800 prose-blockquote:border-amber-400 prose-blockquote:text-gray-600">
                <ReactMarkdown>{recipe.metadata.instructions}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}