import React from 'react';
import { motion } from 'framer-motion';
import { BookmarkCheck } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { useMovieContext } from '../contexts/MovieContext';

const Watchlist = () => {
  const { watchlist } = useMovieContext();

  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-2">
          <BookmarkCheck className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">My Watchlist</h1>
        </div>
        <p className="text-gray-400">
          {watchlist.length === 0
            ? 'No movies in your watchlist yet'
            : `${watchlist.length} movie${watchlist.length !== 1 ? 's' : ''} in your watchlist`}
        </p>
      </motion.div>

      {watchlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <BookmarkCheck className="w-24 h-24 text-gray-700 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-400 mb-2">
            Your watchlist is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Start adding movies you want to watch later!
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Discover Movies
          </motion.a>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {watchlist.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} delay={index * 0.05} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
