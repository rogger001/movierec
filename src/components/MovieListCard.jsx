import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Plus, Check, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../contexts/MovieContext';
import { getImageUrl } from '../services/tmdbApi';

const MovieListCard = ({ movie, delay = 0 }) => {
  const navigate = useNavigate();
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
      className="group relative cursor-pointer bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition-all w-full"
      onClick={handleCardClick}
    >
      <div className="flex gap-2 md:gap-4 p-3 md:p-4">
        {/* Poster */}
        <div className="relative flex-shrink-0 w-20 h-28 sm:w-24 sm:h-36 md:w-32 md:h-48 overflow-hidden rounded-lg">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
            }}
          />
          {/* Rating badge */}
          <div className="absolute top-1 right-1 md:top-2 md:right-2 backdrop-blur-md bg-black/60 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full border border-white/20">
            <div className="flex items-center space-x-0.5 md:space-x-1">
              <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-[10px] md:text-xs text-white font-bold">
                {movie.vote_average?.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="text-sm sm:text-base md:text-xl font-bold text-white mb-1 md:mb-2 line-clamp-2">
              {movie.title}
            </h3>
            
            <div className="flex items-center space-x-2 md:space-x-3 mb-2 md:mb-3">
              {movie.release_date && (
                <div className="flex items-center space-x-0.5 md:space-x-1 text-gray-400">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-0.5 md:space-x-1">
                <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs md:text-sm text-white font-semibold">
                  {movie.vote_average?.toFixed(1)}
                </span>
                <span className="text-xs md:text-sm text-gray-400">/ 10</span>
              </div>
            </div>

            <p className="hidden sm:block text-gray-400 text-xs md:text-sm line-clamp-2 leading-relaxed">
              {movie.overview || 'No description available.'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 md:space-x-2 mt-2 md:mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWatchlistClick}
              className={`flex items-center space-x-1 px-2 py-1 md:px-4 md:py-2 rounded-lg font-medium text-xs md:text-sm transition-colors ${
                inWatchlist
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {inWatchlist ? (
                <>
                  <Check className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">In Watchlist</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Watchlist</span>
                </>
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFavoriteClick}
              className={`flex items-center space-x-1 px-2 py-1 md:px-4 md:py-2 rounded-lg font-medium text-xs md:text-sm transition-colors ${
                inFavorites
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Heart className={`w-3 h-3 md:w-4 md:h-4 ${inFavorites ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{inFavorites ? 'Favorited' : 'Favorite'}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieListCard;
