import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBooksByGenre } from '../api/books'
import type { Book } from '../api/books'
import BookCard from '../components/BookCard'

const GENRE_META: Record<string, { emoji: string; color: string; description: string }> = {
  fantasy: { emoji: '🧙', color: '#7B61FF', description: 'Magic, dragons, and other worlds' },
  romance: { emoji: '💜', color: '#E8658A', description: 'Love stories that will make your heart soar' },
  'sci-fi': { emoji: '🚀', color: '#38BDF8', description: 'The future, space, and technology' },
  mystery: { emoji: '🔍', color: '#F59E0B', description: 'Secrets, clues, and thrilling twists' },
  horror: { emoji: '👻', color: '#6EE7B7', description: 'Spine-chilling stories for the brave' },
  contemporary: { emoji: '🌆', color: '#E8A838', description: 'Real life stories that hit close to home' },
}

export default function Genre() {
  const { name } = useParams<{ name: string }>()
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  const genre = name?.toLowerCase() || ''
  const meta = GENRE_META[genre] || { emoji: '📚', color: 'var(--color-accent)', description: '' }

  useEffect(() => {
    if (!genre) return
    setLoading(true)
    getBooksByGenre(genre)
      .then(setBooks)
      .finally(() => setLoading(false))
  }, [genre])

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">

      {/* Genre header */}
      <section className="mb-12 text-center">
        <p className="text-6xl mb-4">{meta.emoji}</p>
        <h1
          className="text-4xl md:text-5xl font-bold mb-3 capitalize"
          style={{ color: meta.color }}
        >
          {name}
        </h1>
        <p style={{ color: 'var(--color-muted)' }}>{meta.description}</p>
      </section>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12" style={{ color: 'var(--color-muted)' }}>
          Loading {name} books...
        </div>
      )}

      {/* Books grid */}
      {!loading && books.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && books.length === 0 && (
        <div className="text-center py-24" style={{ color: 'var(--color-muted)' }}>
          <p className="text-5xl mb-4">📭</p>
          <p className="text-lg">No books found for this genre</p>
        </div>
      )}

    </main>
  )
}