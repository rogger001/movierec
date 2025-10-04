import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tmdbService } from '../services/tmdbApi';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchMovies = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await tmdbService.searchMovies(query);
        setSuggestions(response.data.results.slice(0, 5));
        setIsOpen(true);
      } catch (error) {
        console.error('Search error:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchMovies, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      if (onSearch) onSearch(query);
    }
  };

  const handleSuggestionClick = (movieId) => {
    navigate(`/movie/${movieId}`);
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setIsOpen(true)}
            placeholder="Search for movies..."
            className="w-full pl-12 pr-12 py-3 bg-gray-800 text-white rounded-full border border-gray-700 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Search suggestions dropdown */}
      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-full bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50"
          >
            {suggestions.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSuggestionClick(movie.id)}
                className="flex items-center space-x-3 p-3 hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                      : 'https://via.placeholder.com/92x138?text=No+Image'
                  }
                  alt={movie.title}
                  className="w-12 h-18 object-cover rounded"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/92x138?text=No+Image';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate">
                    {movie.title}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : 'N/A'}
                  </p>
                </div>
                {movie.vote_average > 0 && (
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <span className="text-sm font-semibold">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
            <div className="p-3 bg-gray-900 text-center">
              <button
                onClick={handleSubmit}
                className="text-sm text-red-500 hover:text-red-400 font-medium"
              >
                View all results for "{query}"
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <div className="absolute top-full mt-2 w-full bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-4 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500 mx-auto"></div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
