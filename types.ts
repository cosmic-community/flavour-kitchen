// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type?: string;
  created_at?: string;
  modified_at?: string;
}

// Category type
export interface Category extends CosmicObject {
  metadata: {
    name?: string;
    description?: string;
  };
}

// Recipe type
export interface Recipe extends CosmicObject {
  metadata: {
    description?: string;
    prep_time?: string;
    cook_time?: string;
    servings?: number;
    ingredients?: string;
    instructions?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    category?: Category;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

export interface CosmicSingleResponse<T> {
  object: T;
}

// Error helper type
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}