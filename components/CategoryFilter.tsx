'use client'

import type { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (slug: string | null) => void
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          activeCategory === null
            ? 'bg-amber-500 text-white shadow-md shadow-amber-200'
            : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:text-amber-600'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() =>
            onCategoryChange(
              activeCategory === category.slug ? null : category.slug
            )
          }
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === category.slug
              ? 'bg-amber-500 text-white shadow-md shadow-amber-200'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:text-amber-600'
          }`}
        >
          {category.title}
        </button>
      ))}
    </div>
  )
}