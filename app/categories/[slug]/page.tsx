// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getRecipesByCategory, getAllCategories } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import RecipeCard from '@/components/RecipeCard'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${category.title} Recipes — Flavour Kitchen`,
    description: category.metadata.description ?? `Browse all ${category.title} recipes.`,
  }
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({ slug: category.slug }))
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const recipes = await getRecipesByCategory(category.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <Link
        href="/"
        className="inline-flex items-center text-amber-600 text-sm font-medium mb-8 hover:text-amber-700 transition-colors"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to all recipes
      </Link>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 mb-3">
          {category.title} Recipes
        </h1>
        {category.metadata.description && (
          <p className="text-lg text-gray-500">{category.metadata.description}</p>
        )}
        <p className="text-sm text-gray-400 mt-2">
          {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} found
        </p>
      </div>

      {/* Recipe Grid */}
      {recipes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🍳</p>
          <p className="text-xl text-gray-500">No recipes in this category yet.</p>
          <Link href="/" className="mt-4 inline-block text-amber-600 font-semibold hover:text-amber-700 transition-colors">
            Browse all recipes →
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}