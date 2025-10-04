import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, Plus, Check, Calendar, Clock, ArrowLeft, Play } from 'lucide-react';
import { tmdbService, getBackdropUrl, getImageUrl } from '../services/tmdbApi';
import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);

  const {
    isInWatchlist,
    isInFavorites,
    addToWatchlist,
    removeFromWatchlist,
    addToFavorites,
    removeFromFavorites,
    rateMovie,
    getMovieRating,
    addToWatchHistory,
  } = useMovieContext();

  useEffect(() => {
    fetchMovieDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const [movieData, similarData] = await Promise.all([
        tmdbService.getMovieDetails(id),
        tmdbService.getSimilarMovies(id),
      ]);

      setMovie(movieData.data);
      setSimilar(similarData.data.results.slice(0, 12));
      
      const savedRating = getMovieRating(id);
      setUserRating(savedRating);

      // Add to watch history
      addToWatchHistory({
        id: movieData.data.id,
        title: movieData.data.title,
        poster_path: movieData.data.poster_path,
        vote_average: movieData.data.vote_average,
        release_date: movieData.data.release_date,
      });
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRating = (rating) => {
    setUserRating(rating);
    rateMovie(parseInt(id), rating);
  };

  const inWatchlist = movie && isInWatchlist(movie.id);
  const inFavorites = movie && isInFavorites(movie.id);

  const trailer = movie?.videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Movie not found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Hero/Backdrop Section */}
      <div className="relative h-[80vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-transparent to-gray-950/80"></div>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="absolute top-8 left-4 md:left-8 z-20 flex items-center space-x-2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Poster */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <img
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                className="w-64 md:w-80 rounded-lg shadow-2xl"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                }}
              />
            </motion.div>

            {/* Movie Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex-1"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-xl text-gray-400 italic mb-4">{movie.tagline}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center space-x-2 bg-yellow-500/20 px-4 py-2 rounded-lg">
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold text-white">
                    {movie.vote_average?.toFixed(1)}
                  </span>
                  <span className="text-gray-400">/ 10</span>
                </div>

                {movie.release_date && (
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                )}

                {movie.runtime && (
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Clock className="w-5 h-5" />
                    <span>{movie.runtime} min</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-6">
                {trailer && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    <span>Watch Trailer</span>
                  </motion.a>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    inWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie)
                  }
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    inWatchlist
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {inWatchlist ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  <span>{inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    inFavorites ? removeFromFavorites(movie.id) : addToFavorites(movie)
                  }
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    inFavorites
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${inFavorites ? 'fill-current' : ''}`} />
                  <span>{inFavorites ? 'Favorited' : 'Add to Favorites'}</span>
                </motion.button>
              </div>

              {/* User Rating */}
              <div className="mb-6">
                <p className="text-gray-400 mb-2">Your Rating:</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= userRating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-600'
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Overview */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Overview</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cast */}
      {movie.credits?.cast && movie.credits.cast.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-white mb-6">Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movie.credits.cast.slice(0, 12).map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="text-center"
              >
                <img
                  src={
                    person.profile_path
                      ? getImageUrl(person.profile_path, 'w185')
                      : 'https://via.placeholder.com/185x278?text=No+Image'
                  }
                  alt={person.name}
                  className="w-full rounded-lg mb-2"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/185x278?text=No+Image';
                  }}
                />
                <p className="text-white font-medium text-sm">{person.name}</p>
                <p className="text-gray-400 text-xs">{person.character}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Similar Movies */}
      {similar.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-white mb-6">Similar Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {similar.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} delay={index * 0.05} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
