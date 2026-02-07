import { getAllRecipes, getAllCategories } from '@/lib/cosmic'
import RecipeGrid from '@/components/RecipeGrid'
import type { Recipe, Category } from '@/types'

export default async function HomePage() {
  const [recipes, categories]: [Recipe[], Category[]] = await Promise.all([
    getAllRecipes(),
    getAllCategories(),
  ])

  // Pick the first recipe with a featured image for the hero
  const heroRecipe = recipes.find((r) => r.metadata?.featured_image?.imgix_url)

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[520px] overflow-hidden">
        {heroRecipe?.metadata?.featured_image?.imgix_url ? (
          <img
            src={`${heroRecipe.metadata.featured_image.imgix_url}?w=1600&h=1040&fit=crop&auto=format,compress`}
            alt="Flavour Kitchen hero"
            width={1600}
            height={520}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-charcoal-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/50 to-charcoal-900/20" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <p className="text-amber-300 text-sm uppercase tracking-[0.25em] font-semibold mb-4">
            Recipes from around the world
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white max-w-3xl leading-tight">
            Cook Something{' '}
            <span className="text-amber-400">Amazing</span> Tonight
          </h1>
          <p className="mt-5 text-gray-300 text-lg max-w-xl">
            Browse {recipes.length} hand-crafted recipes across {categories.length}{' '}
            cuisines. Search, filter, and find your next favourite dish.
          </p>
        </div>
      </section>

      {/* Recipes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <RecipeGrid recipes={recipes} categories={categories} />
      </section>
    </>
  )
}