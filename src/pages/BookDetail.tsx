import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBookById } from '../api/books'
import type { Book } from '../api/books'

export default function BookDetail() {
  const { id } = useParams<{ id: string }>()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getBookById(id)
      .then(setBook)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="text-center py-24" style={{ color: 'var(--color-muted)' }}>
        Loading book...
      </div>
    )
  }

  if (!book) {
    return (
      <div className="text-center py-24" style={{ color: 'var(--color-muted)' }}>
        Book not found.
      </div>
    )
  }

  const {
    title,
    authors,
    description,
    imageLinks,
    averageRating,
    ratingsCount,
    publishedDate,
    pageCount,
    categories,
    previewLink,
  } = book.volumeInfo

  const cover = imageLinks?.thumbnail || imageLinks?.smallThumbnail

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">

      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-8 text-sm transition-opacity hover:opacity-70"
        style={{ color: 'var(--color-muted)' }}
      >
        ← Back to Home
      </Link>

      <div className="flex flex-col md:flex-row gap-10">

        {/* Cover */}
        <div className="flex-shrink-0">
          {cover ? (
            <img
              src={cover.replace('http://', 'https://')}
              alt={title}
              className="w-48 rounded-xl shadow-2xl"
            />
          ) : (
            <div
              className="w-48 h-72 rounded-xl flex items-center justify-center text-5xl"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              📖
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">

          {/* Title + author */}
          <div>
            <h1
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: 'var(--color-text)' }}
            >
              {title}
            </h1>
            {authors && (
              <p className="text-lg" style={{ color: 'var(--color-accent)' }}>
                {authors.join(', ')}
              </p>
            )}
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--color-muted)' }}>
            {averageRating && (
              <span>⭐ {averageRating} ({ratingsCount?.toLocaleString()} ratings)</span>
            )}
            {publishedDate && (
              <span>📅 {publishedDate.slice(0, 4)}</span>
            )}
            {pageCount && (
              <span>📄 {pageCount} pages</span>
            )}
          </div>

          {/* Categories */}
          {categories && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-accent2)' }}
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          {description && (
            <div
              className="text-sm leading-relaxed max-w-2xl"
              style={{ color: 'var(--color-muted)' }}
              dangerouslySetInnerHTML={{
                __html: description.slice(0, 800) + (description.length > 800 ? '...' : '')
              }}
            />
          )}

          {/* Preview link */}
          {previewLink && (
            <a href={previewLink} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-80 w-fit" style={{ backgroundColor: 'var(--color-accent)', color: '#0F0E17' }}>
              Preview on Google Books →
            </a>
          )}

        </div>
      </div>
    </main>
  )
}