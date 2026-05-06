import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedBooks } from '../api/books'
import type { Book } from '../api/books'
import BookCard from '../components/BookCard'

const GENRES = [
  { name: 'Fantasy', emoji: '🧙', color: '#7B61FF' },
  { name: 'Romance', emoji: '💜', color: '#E8658A' },
  { name: 'Sci-Fi', emoji: '🚀', color: '#38BDF8' },
  { name: 'Mystery', emoji: '🔍', color: '#F59E0B' },
  { name: 'Horror', emoji: '👻', color: '#6EE7B7' },
  { name: 'Contemporary', emoji: '🌆', color: '#E8A838' },
]

export default function Home() {
  const [featured, setFeatured] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeaturedBooks()
      .then(setFeatured)
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">

      {/* Hero */}
      <section className="text-center mb-16">
        <h1
          className="text-5xl md:text-7xl font-bold mb-4"
          style={{ color: 'var(--color-text)' }}
        >
          Your Next
          <span style={{ color: 'var(--color-accent)' }}> Favourite </span>
          Read
        </h1>
        <p className="text-lg mb-8" style={{ color: 'var(--color-muted)' }}>
          Discover the best Young Adult books across every genre
        </p>
        <Link
          to="/search?q=young adult bestseller"
          className="inline-block rounded-full px-8 py-3 font-semibold text-lg transition-opacity hover:opacity-80"
          style={{ backgroundColor: 'var(--color-accent)', color: '#0F0E17' }}
        >
          Explore Books
        </Link>
      </section>

      {/* Genre grid */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
          Browse by Genre
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {GENRES.map((genre) => (
            <Link
              key={genre.name}
              to={`/genre/${genre.name.toLowerCase()}`}
              className="flex flex-col items-center gap-2 rounded-xl p-4 transition-transform hover:scale-105"
              style={{ backgroundColor: 'var(--color-surface)', border: `1px solid ${genre.color}33` }}
            >
              <span className="text-3xl">{genre.emoji}</span>
              <span className="text-sm font-medium" style={{ color: genre.color }}>
                {genre.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured books */}
      <section>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
          Featured Books
        </h2>
        {loading ? (
          <div className="text-center py-12" style={{ color: 'var(--color-muted)' }}>
            Loading books...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {featured.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>

    </main>
  )
}