# 🍽️ Flavour Kitchen

![Flavour Kitchen](https://imgix.cosmicjs.com/30d43500-047e-11f1-8d51-6975b8e02a0c-photo-1568901346375-23c9450c58cd-1770507545610.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A beautiful recipe blog powered by [Cosmic](https://www.cosmicjs.com) CMS. Browse, search, and filter recipes across multiple cuisines with a warm, food-forward design. Every recipe features rich markdown-rendered instructions, beautiful photography, and detailed cooking information.

## Features

- 🔍 **Real-time Search** — Filter recipes instantly by title, description, or ingredients
- 🏷️ **Category Filtering** — Browse by cuisine type (Italian, Mexican, Asian, American, Desserts)
- 📖 **Rich Recipe Pages** — Markdown-rendered ingredients and step-by-step instructions
- 🖼️ **Optimized Images** — Fast-loading recipe photography via imgix
- 📱 **Fully Responsive** — Beautiful on mobile, tablet, and desktop
- ⚡ **Server-Side Rendering** — Fast initial loads with Next.js 16 App Router
- 🎨 **Warm Design** — Earthy amber and cream palette with beautiful typography

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6987ccb2215623f84cc4adc2&clone_repository=6987ce76215623f84cc4ae05)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create 5 recipes with images across different categories"

### Code Generation Prompt

> "Build me an app: A recipe blog with search and category filtering. Generate the complete application code."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com) — Headless CMS for content management ([docs](https://www.cosmicjs.com/docs))
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [react-markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering for recipe content

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime installed
- A [Cosmic](https://www.cosmicjs.com) account with the recipe content model

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd flavour-kitchen

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Start development server
bun dev
```

### Environment Variables

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching all recipes

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: recipes } = await cosmic.objects
  .find({ type: 'recipes' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a single recipe by slug

```typescript
const { object: recipe } = await cosmic.objects
  .findOne({ type: 'recipes', slug: 'salted-caramel-brownies' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

### Fetching categories

```typescript
const { objects: categories } = await cosmic.objects
  .find({ type: 'categories' })
  .props(['id', 'title', 'slug', 'metadata'])
```

## Cosmic CMS Integration

This app uses two Cosmic object types:

- **Recipes** — Main content type with description, prep/cook time, servings, markdown ingredients/instructions, featured image, and category relationship
- **Categories** — Cuisine categories (Italian, Mexican, Asian, American, Desserts) connected via object metafield

The `depth(1)` parameter is used to resolve category relationships in a single API call.

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Set publish directory to `.next`
5. Add environment variables in the Netlify dashboard

<!-- README_END -->