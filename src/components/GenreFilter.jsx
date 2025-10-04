import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { tmdbService } from '../services/tmdbApi';

const GenreFilter = ({ selectedGenres = [], onGenreChange }) => {
  const [genres, setGenres] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await tmdbService.getGenres();
      setGenres(response.data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const toggleGenre = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      onGenreChange(selectedGenres.filter((id) => id !== genreId));
    } else {
      onGenreChange([...selectedGenres, genreId]);
    }
  };

  const clearFilters = () => {
    onGenreChange([]);
  };

  return (
    <div className="w-full">
      {/* Genre Pills - Always Visible, Horizontal Scrollable */}
      <div className="flex items-center gap-3">
        {/* All Genres Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex-shrink-0 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full shadow-glow-md transition-all font-medium"
        >
          <Filter className="w-4 h-4" />
          <span>All Genres</span>
          {selectedGenres.length > 0 && (
            <span className="px-2 py-0.5 bg-white/20 text-xs rounded-full font-bold">
              {selectedGenres.length}
            </span>
          )}
        </motion.button>

        {/* Horizontal Scrollable Genre Pills */}
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2">
            {genres.slice(0, 8).map((genre, index) => {
              const isSelected = selectedGenres.includes(genre.id);
              return (
                <motion.button
                  key={genre.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleGenre(genre.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                    isSelected
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-glow-md ring-2 ring-red-500/50'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-white/10'
                  }`}
                >
                  {genre.name}
                </motion.button>
              );
            })}
            
            {genres.length > 8 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsOpen(true)}
                className="flex-shrink-0 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full border border-white/10 transition-all font-medium whitespace-nowrap"
              >
                +{genres.length - 8} More
              </motion.button>
            )}
          </div>
        </div>

        {/* Clear All Button */}
        {selectedGenres.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            className="flex-shrink-0 p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all"
            title="Clear all filters"
          >
            <X className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {/* Genre Pills Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-0 z-50 w-screen max-w-2xl p-6 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Filter by Genre</h3>
              <div className="flex items-center space-x-2">
                {selectedGenres.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={clearFilters}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-full transition-colors"
                  >
                    Clear All
                  </motion.button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Genre Pills */}
            <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
              {genres.map((genre, index) => {
                const isSelected = selectedGenres.includes(genre.id);
                return (
                  <motion.button
                    key={genre.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.02 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleGenre(genre.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-glow-md'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-white/10'
                    }`}
                  >
                    {genre.name}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenreFilter;
