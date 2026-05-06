import { Link } from 'react-router-dom'
import type { Book } from '../api/books'

interface Props {
  book: Book
}

export default function BookCard({ book }: Props) {
  const { title, authors, imageLinks, averageRating } = book.volumeInfo
  const cover = imageLinks?.thumbnail || imageLinks?.smallThumbnail

  return (
    <Link to={`/book/${book.id}`} className="group flex flex-col gap-2">
      {/* Cover */}
      <div
        className="relative overflow-hidden rounded-lg aspect-[2/3] flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        {cover ? (
          <img
            src={cover.replace('http://', 'https://')}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 p-4 text-center">
            <span className="text-4xl">📖</span>
            <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{title}</span>
          </div>
        )}

        {/* Rating badge */}
        {averageRating && (
          <div
            className="absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-bold"
            style={{ backgroundColor: 'var(--color-accent)', color: '#0F0E17' }}
          >
            ⭐ {averageRating}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <p
          className="text-sm font-semibold line-clamp-2 group-hover:opacity-80 transition-opacity"
          style={{ color: 'var(--color-text)' }}
        >
          {title}
        </p>
        {authors && (
          <p className="text-xs mt-1 line-clamp-1" style={{ color: 'var(--color-muted)' }}>
            {authors.join(', ')}
          </p>
        )}
      </div>
    </Link>
  )
}