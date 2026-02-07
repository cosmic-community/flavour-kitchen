import type { Metadata } from 'next'
import Header from '@/components/Header'
import CosmicBadge from '@/components/CosmicBadge'
import './globals.css'

export const metadata: Metadata = {
  title: 'Flavour Kitchen — Recipes from Around the World',
  description:
    'Discover delicious recipes from around the world. Browse by cuisine, search for ingredients, and cook something amazing tonight.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG ?? ''

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="bg-cream-50 text-charcoal-900 font-sans min-h-screen">
        <Header />
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-charcoal-900 text-white mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <p className="text-2xl font-bold mb-2">🍽️ Flavour Kitchen</p>
              <p className="text-gray-400 text-sm">
                Recipes from around the world, powered by{' '}
                <a
                  href="https://www.cosmicjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Cosmic
                </a>
              </p>
              <p className="text-gray-500 text-xs mt-4">
                © {new Date().getFullYear()} Flavour Kitchen. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}