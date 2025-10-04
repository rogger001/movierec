import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './contexts/MovieContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Watchlist from './pages/Watchlist';
import Favorites from './pages/Favorites';
import SearchResults from './pages/SearchResults';
import Trending from './pages/Trending';
import About from './pages/About';

function App() {
  return (
    <Router>
      <MovieProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-950 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
          <BackToTop />
        </div>
      </MovieProvider>
    </Router>
  );
}

export default App;
