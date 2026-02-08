import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🍽️</span>
            <span className="text-xl font-bold text-charcoal-900 group-hover:text-amber-600 transition-colors">
              Flavour Kitchen
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors"
            >
              Recipes
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors"
            >
              Contact
            </Link>
            <a
              href="https://www.cosmicjs.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors"
            >
              Cosmic Docs
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}