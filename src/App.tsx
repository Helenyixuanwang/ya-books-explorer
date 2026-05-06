import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Search from './pages/Search'
import BookDetail from './pages/BookDetail'
import Genre from './pages/Genre'

function Footer() {
  return (
    <footer
      className="text-center py-8 mt-16 text-sm"
      style={{ borderTop: '1px solid #2a2a3e', color: '#A7A9BE' }}
    >
      <p className="mb-3">Built by Helen Wang</p>
      <div className="flex justify-center gap-6">
        <a href="https://linkedin.com/in/helenyixuanwang" target="_blank" rel="noopener noreferrer" style={{ color: '#E8A838' }}>
          LinkedIn
        </a>
        <a href="https://github.com/Helenyixuanwang" target="_blank" rel="noopener noreferrer" style={{ color: '#E8A838' }}>
          GitHub
        </a>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div style={{ backgroundColor: '#0F0E17', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/genre/:name" element={<Genre />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App