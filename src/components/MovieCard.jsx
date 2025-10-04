import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Plus, Check, Film } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../contexts/MovieContext';
import { getImageUrl } from '../services/tmdbApi';

const MovieCard = ({ movie, delay = 0 }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const {
    isInWatchlist,
    isInFavorites,
    addToWatchlist,
    removeFromWatchlist,
    addToFavorites,
    removeFromFavorites,
  } = useMovieContext();

  const inWatchlist = isInWatchlist(movie.id);
  const inFavorites = isInFavorites(movie.id);

  const handleWatchlistClick = (e) => {
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (inFavorites) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
      className="group relative cursor-pointer w-full"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl ring-1 ring-white/10 hover:ring-red-500/50 transition-all duration-300">
        {/* Movie Poster */}
        <div className="aspect-[2/3] overflow-hidden relative bg-gray-800">
          {!imageError && movie.poster_path ? (
            <motion.img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
              loading="lazy"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
              <Film className="w-12 h-12 md:w-16 md:h-16 text-gray-600 mb-2" />
              <span className="text-xs text-gray-500 text-center px-2">{movie.title}</span>
            </div>
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Overlay with actions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-3 md:p-4 backdrop-blur-sm"
        >
          <div className="space-y-2">
            <h3 className="text-sm md:text-lg font-bold text-white line-clamp-2">
              {movie.title}
            </h3>
            
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs md:text-sm text-white font-medium">
                    {movie.vote_average?.toFixed(1)}
                  </span>
                </div>
                {movie.release_date && (
                  <span className="text-xs md:text-sm text-gray-300">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                )}
              </div>
              
              <div className="flex space-x-1 md:space-x-2 flex-shrink-0">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWatchlistClick}
                  className={`p-1.5 md:p-2 rounded-full transition-colors ${
                    inWatchlist
                      ? 'bg-green-600 text-white'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {inWatchlist ? (
                    <Check className="w-3 h-3 md:w-4 md:h-4" />
                  ) : (
                    <Plus className="w-3 h-3 md:w-4 md:h-4" />
                  )}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFavoriteClick}
                  className={`p-1.5 md:p-2 rounded-full transition-colors ${
                    inFavorites
                      ? 'bg-red-600 text-white'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Heart
                    className={`w-3 h-3 md:w-4 md:h-4 ${inFavorites ? 'fill-current' : ''}`}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rating badge with glass effect */}
        <div className="absolute top-2 right-2 md:top-3 md:right-3 backdrop-blur-md bg-black/60 px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-white/20 shadow-lg">
          <div className="flex items-center space-x-1 md:space-x-1.5">
            <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400 drop-shadow-glow" />
            <span className="text-xs md:text-sm text-white font-bold tracking-tight">
              {movie.vote_average?.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
