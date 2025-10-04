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
      className="group relative cursor-pointer bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition-all"
      onClick={handleCardClick}
    >
      <div className="flex gap-4 p-4">
        {/* Poster */}
        <div className="relative flex-shrink-0 w-32 h-48 overflow-hidden rounded-lg">
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
          <div className="absolute top-2 right-2 backdrop-blur-md bg-black/60 px-2 py-1 rounded-full border border-white/20">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-white font-bold">
                {movie.vote_average?.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
              {movie.title}
            </h3>
            
            <div className="flex items-center space-x-3 mb-3">
              {movie.release_date && (
                <div className="flex items-center space-x-1 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-white font-semibold">
                  {movie.vote_average?.toFixed(1)}
                </span>
                <span className="text-sm text-gray-400">/ 10</span>
              </div>
            </div>

            <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
              {movie.overview || 'No description available.'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWatchlistClick}
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                inWatchlist
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {inWatchlist ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>In Watchlist</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Watchlist</span>
                </>
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFavoriteClick}
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                inFavorites
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${inFavorites ? 'fill-current' : ''}`} />
              <span>{inFavorites ? 'Favorited' : 'Favorite'}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieListCard;
