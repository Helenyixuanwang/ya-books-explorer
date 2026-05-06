import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Search from './pages/Search'
import BookDetail from './pages/BookDetail'
import Genre from './pages/Genre'

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/genre/:name" element={<Genre />} />
      </Routes>
    </div>
  )
}

export default App