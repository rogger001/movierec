import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { tmdbService } from '../services/tmdbApi';

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState('week');

  useEffect(() => {
    fetchTrending();
  }, [timeWindow]);

  const fetchTrending = async () => {
    try {
      setLoading(true);
      const response = await tmdbService.getTrending(timeWindow);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading trending movies...</p>
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-red-600" />
            <h1 className="text-4xl font-bold text-white">Trending Movies</h1>
          </div>

          {/* Time Window Selector */}
          <div className="flex space-x-2 bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setTimeWindow('day')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                timeWindow === 'day'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeWindow('week')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                timeWindow === 'week'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              This Week
            </button>
          </div>
        </div>
        <p className="text-gray-400">
          {movies.length} trending movie{movies.length !== 1 ? 's' : ''} {timeWindow === 'day' ? 'today' : 'this week'}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} delay={index * 0.05} />
        ))}
      </div>
    </div>
  );
};

export default Trending;
