import { createBucketClient } from '@cosmicjs/sdk'
import type { Recipe, Category } from '@/types'
import { hasStatus } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'recipes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as Recipe[]
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch recipes')
  }
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'recipes', slug })
      .props(['id', 'title', 'slug', 'metadata', 'content'])
      .depth(1)

    return response.object as Recipe
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch recipe')
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])

    return response.objects as Category[]
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

export async function getRecipesByCategory(categoryId: string): Promise<Recipe[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'recipes', 'metadata.category': categoryId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as Recipe[]
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch recipes by category')
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'title', 'slug', 'metadata'])

    return response.object as Category
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch category')
  }
}