import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
      style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid #2a2a3e' }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl">📚</span>
        <span
          className="text-xl font-bold tracking-tight"
          style={{ color: 'var(--color-accent)', fontFamily: 'Playfair Display, serif' }}
        >
          YA Explorer
        </span>
      </Link>

      {/* Genre links */}
      <div className="hidden md:flex items-center gap-6">
        {['Fantasy', 'Romance', 'Sci-Fi', 'Mystery', 'Horror'].map((genre) => (
          <Link
            key={genre}
            to={`/genre/${genre.toLowerCase()}`}
            className="text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: 'var(--color-muted)' }}
          >
            {genre}
          </Link>
        ))}
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          className="rounded-full px-4 py-2 text-sm outline-none w-48 focus:w-64 transition-all duration-300"
          style={{
            backgroundColor: '#2a2a3e',
            color: 'var(--color-text)',
            border: '1px solid #3a3a5e',
          }}
        />
        <button
          type="submit"
          className="rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
          style={{ backgroundColor: 'var(--color-accent)', color: '#0F0E17' }}
        >
          Search
        </button>
      </form>
    </nav>
  )
}