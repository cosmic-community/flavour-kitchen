'use client'

import { useState, useMemo } from 'react'
import RecipeCard from '@/components/RecipeCard'
import CategoryFilter from '@/components/CategoryFilter'
import type { Recipe, Category } from '@/types'

interface RecipeGridProps {
  recipes: Recipe[]
  categories: Category[]
}

export default function RecipeGrid({ recipes, categories }: RecipeGridProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredRecipes = useMemo(() => {
    let result = recipes

    // Filter by category
    if (activeCategory) {
      result = result.filter(
        (recipe) => recipe.metadata.category?.slug === activeCategory
      )
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter((recipe) => {
        const title = recipe.title.toLowerCase()
        const description = (recipe.metadata.description ?? '').toLowerCase()
        const ingredients = (recipe.metadata.ingredients ?? '').toLowerCase()
        return (
          title.includes(query) ||
          description.includes(query) ||
          ingredients.includes(query)
        )
      })
    }

    return result
  }, [recipes, searchQuery, activeCategory])

  const activeCategoryTitle = activeCategory
    ? categories.find((c) => c.slug === activeCategory)?.title
    : undefined

  return (
    <div>
      {/* Search + Filter Bar */}
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 mb-6">
          All Recipes
        </h2>

        {/* Search Input */}
        <div className="relative mb-6">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search recipes by name, ingredient, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm text-charcoal-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Results */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🔍</p>
          <p className="text-xl text-gray-500 mb-2">No recipes found</p>
          <p className="text-sm text-gray-400">
            Try a different search term or clear your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setActiveCategory(null)
            }}
            className="mt-4 text-amber-600 font-semibold hover:text-amber-700 transition-colors text-sm"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-400 mb-6">
            Showing {filteredRecipes.length} of {recipes.length} recipes
            {activeCategoryTitle && (
              <span>
                {' '}
                in{' '}
                <span className="font-semibold text-amber-600">
                  {activeCategoryTitle}
                </span>
              </span>
            )}
            {searchQuery && (
              <span>
                {' '}
                matching &ldquo;<span className="font-semibold">{searchQuery}</span>&rdquo;
              </span>
            )}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}