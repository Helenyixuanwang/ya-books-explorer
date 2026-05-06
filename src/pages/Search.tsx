import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchBooks } from '../api/books'
import type { Book } from '../api/books'
import BookCard from '../components/BookCard'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [results, setResults] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(searchParams.get('q') || '')

  const q = searchParams.get('q') || ''

  useEffect(() => {
    if (!q) return
    setLoading(true)
    searchBooks(q)
      .then(setResults)
      .finally(() => setLoading(false))
  }, [q])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      setSearchParams({ q: query.trim() })
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, or keyword..."
          className="flex-1 rounded-full px-6 py-3 text-sm outline-none"
          style={{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            border: '1px solid #3a3a5e',
          }}
        />
        <button
          type="submit"
          className="rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ backgroundColor: 'var(--color-accent)', color: '#0F0E17' }}
        >
          Search
        </button>
      </form>

      {/* Results header */}
      {q && !loading && (
        <p className="mb-6 text-sm" style={{ color: 'var(--color-muted)' }}>
          {results.length > 0
            ? `Found ${results.length} results for "${q}"`
            : `No results found for "${q}"`}
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-12" style={{ color: 'var(--color-muted)' }}>
          Searching...
        </div>
      )}

      {/* Results grid */}
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {results.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !q && (
        <div className="text-center py-24" style={{ color: 'var(--color-muted)' }}>
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg">Search for your next favourite YA book</p>
        </div>
      )}

    </main>
  )
}