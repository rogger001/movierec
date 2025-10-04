import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { tmdbService } from '../services/tmdbApi';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (query) {
      searchMovies();
    }
  }, [query, page]);

  const searchMovies = async () => {
    try {
      setLoading(true);
      const response = await tmdbService.searchMovies(query, page);
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-400">Searching...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-2">
          <Search className="w-8 h-8 text-red-600" />
          <h1 className="text-4xl font-bold text-white">Search Results</h1>
        </div>
        <p className="text-gray-400">
          {movies.length === 0
            ? `No results found for "${query}"`
            : `Found ${movies.length} result${movies.length !== 1 ? 's' : ''} for "${query}"`}
        </p>
      </motion.div>

      {movies.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <Search className="w-24 h-24 text-gray-700 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-400 mb-2">
            No movies found
          </h2>
          <p className="text-gray-500 mb-6">
            Try searching with different keywords
          </p>
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} delay={index * 0.05} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
              >
                Previous
              </motion.button>
              <span className="text-white">
                Page {page} of {Math.min(totalPages, 500)}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages || page >= 500}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
              >
                Next
              </motion.button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
