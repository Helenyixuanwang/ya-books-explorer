const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes'

export interface Book {
  id: string
  volumeInfo: {
    title: string
    authors?: string[]
    description?: string
    imageLinks?: {
      thumbnail?: string
      smallThumbnail?: string
    }
    categories?: string[]
    averageRating?: number
    ratingsCount?: number
    publishedDate?: string
    pageCount?: number
    previewLink?: string
  }
}

export interface BooksResponse {
  items: Book[]
  totalItems: number
}

// Search YA books by query
export async function searchBooks(query: string, maxResults = 20): Promise<Book[]> {
  const normalizedQuery = query.toLowerCase().trim()
  const url = `${BASE_URL}?q=${encodeURIComponent(normalizedQuery)}&maxResults=${maxResults}&orderBy=relevance&key=${API_KEY}`
  const res = await fetch(url)
  const data: BooksResponse = await res.json()
  return data.items || []
}

// Browse by genre
export async function getBooksByGenre(genre: string, maxResults = 20): Promise<Book[]> {
  const genreMap: Record<string, string> = {
    fantasy: 'fantasy+young+adult',
    romance: 'romance+young+adult',
    'sci-fi': 'science+fiction+young+adult',
    mystery: 'mystery+young+adult',
    horror: 'horror+young+adult',
    contemporary: 'contemporary+young+adult',
  }

  const searchTerm = genreMap[genre.toLowerCase()] || `${genre}+young+adult`
  const url = `${BASE_URL}?q=${searchTerm}&maxResults=${maxResults}&orderBy=relevance&key=${API_KEY}`
  const res = await fetch(url)
  const data: BooksResponse = await res.json()
  return data.items || []
}

// Get single book by ID
export async function getBookById(id: string): Promise<Book> {
  const url = `${BASE_URL}/${id}?key=${API_KEY}`
  const res = await fetch(url)
  const data: Book = await res.json()
  return data
}

// Featured books for homepage
export async function getFeaturedBooks(): Promise<Book[]> {
  const queries = [
    'harry potter',
    'hunger games',
    'divergent',
    'percy jackson',
    'the maze runner',
    'twilight',
    'fault in our stars',
    'six of crows',
    'an ember in the ashes',
    'throne of glass',
    'to all the boys',
    'the hate u give',
  ]
  const query = queries[Math.floor(Math.random() * queries.length)]
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&maxResults=12&orderBy=relevance&key=${API_KEY}`
  const res = await fetch(url)
  const data: BooksResponse = await res.json()
  return data.items || []
}