import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Star, Sparkles, Play, ChevronLeft, ChevronRight, Info, Filter } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import MovieListCard from '../components/MovieListCard';
import GenreFilter from '../components/GenreFilter';
import ViewToggle from '../components/ViewToggle';
import SortDropdown from '../components/SortDropdown';
import { MovieCardSkeleton, HeroSkeleton } from '../components/LoadingSkeleton';
import { tmdbService } from '../services/tmdbApi';
import { useMovieContext } from '../contexts/MovieContext';
import { getPersonalizedTrending, getRecommendationsBasedOnHistory } from '../utils/recommendations';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('popularity'); // popularity, rating, release_date, title

  const { favorites, ratings, watchHistory } = useMovieContext();

  useEffect(() => {
    fetchMovies();
  }, []);

  // Filter movies by selected genres
  const filterMoviesByGenre = (movies) => {
    if (selectedGenres.length === 0) return movies;
    return movies.filter((movie) =>
      movie.genre_ids?.some((genreId) => selectedGenres.includes(genreId))
    );
  };

  const filteredTrendingMovies = filterMoviesByGenre(trendingMovies);
  const filteredTopRatedMovies = filterMoviesByGenre(topRatedMovies);
  const filteredRecommendedMovies = filterMoviesByGenre(recommendedMovies);

  // Sorting function
  const sortMovies = (movies) => {
    const sorted = [...movies];
    switch (sortBy) {
      case 'rating':
        return sorted.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
      case 'release_date':
        return sorted.sort((a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0));
      case 'title':
        return sorted.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      case 'popularity':
      default:
        return sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
  };

  // Apply sorting
  const sortedTrendingMovies = sortMovies(filteredTrendingMovies);
  const sortedTopRatedMovies = sortMovies(filteredTopRatedMovies);
  const sortedRecommendedMovies = sortMovies(filteredRecommendedMovies);

  useEffect(() => {
    // Update recommendations when watch history or ratings change
    if (popularMovies.length > 0) {
      const recommended = getRecommendationsBasedOnHistory(
        watchHistory,
        ratings,
        popularMovies
      );
      setRecommendedMovies(recommended);
    }
  }, [watchHistory, ratings, popularMovies]);

  const fetchMovies = async (retryCount = 0) => {
    try {
      setLoading(true);
      const isMobile = window.innerWidth < 768;
      console.log('🎬 Fetching movies...', { isMobile, retryCount });
      
      const [trending, popular, topRated, genreList] = await Promise.all([
        tmdbService.getTrending('week'),
        tmdbService.getPopular(1),
        tmdbService.getTopRated(1),
        tmdbService.getGenres(),
      ]);

      console.log('✅ Movies fetched:', {
        trending: trending.data.results.length,
        popular: popular.data.results.length,
        topRated: topRated.data.results.length,
        genres: genreList.data.genres.length
      });

      setTrendingMovies(trending.data.results.slice(0, 10));
      setPopularMovies(popular.data.results);
      setTopRatedMovies(topRated.data.results.slice(0, 10));
      setGenres(genreList.data.genres);
    } catch (error) {
      console.error('❌ Error fetching movies:', error);
      console.error('Error details:', error.response?.data || error.message);
      
      // Retry once on mobile if it fails
      if (retryCount < 1 && window.innerWidth < 768) {
        console.log('🔄 Retrying on mobile...');
        setTimeout(() => fetchMovies(retryCount + 1), 2000);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const getGenreNames = (genreIds) => {
    return genreIds
      ?.map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean)
      .slice(0, 3)
      .join(', ');
  };

  // Hero carousel auto-play
  useEffect(() => {
    if (trendingMovies.length > 0) {
      const timer = setInterval(() => {
        setHeroIndex((prev) => (prev + 1) % Math.min(5, trendingMovies.length));
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [trendingMovies]);

  const nextHero = () => {
    setHeroIndex((prev) => (prev + 1) % Math.min(5, trendingMovies.length));
  };

  const prevHero = () => {
    setHeroIndex((prev) => (prev - 1 + Math.min(5, trendingMovies.length)) % Math.min(5, trendingMovies.length));
  };

  if (loading) {
    return (
      <div className="min-h-screen pb-12">
        <HeroSkeleton />
        <div className="container mx-auto px-4 py-12 space-y-12">
          {[1, 2, 3].map((section) => (
            <section key={section}>
              <div className="h-8 w-48 bg-gray-800 rounded-lg mb-6 animate-pulse" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
                {[...Array(10)].map((_, i) => (
                  <MovieCardSkeleton key={i} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

  const currentHeroMovie = trendingMovies[heroIndex];

  return (
    <div className="min-h-screen pb-12">
      {/* Enhanced Hero Carousel */}
      {currentHeroMovie && (
        <section className="relative h-[80vh] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${currentHeroMovie.backdrop_path})`,
                }}
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-950/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-gray-950/80 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Content */}
          <div className="container mx-auto px-4 h-full flex items-end pb-16 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-3xl"
              >
                {/* Featured Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600/90 backdrop-blur-sm rounded-full mb-4 shadow-glow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-bold">FEATURED</span>
                </motion.div>

                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 md:mb-6 leading-tight drop-shadow-2xl">
                  {currentHeroMovie.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/20">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold text-white">
                      {currentHeroMovie.vote_average?.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-300">/ 10</span>
                  </div>
                  
                  <div className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/20">
                    <span className="text-white font-medium">
                      {new Date(currentHeroMovie.release_date).getFullYear()}
                    </span>
                  </div>
                  
                  {getGenreNames(currentHeroMovie.genre_ids) && (
                    <div className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/20">
                      <span className="text-gray-300 text-sm">
                        {getGenreNames(currentHeroMovie.genre_ids)}
                      </span>
                    </div>
                  )}
                </div>
                
                <p className="text-lg md:text-xl text-gray-200 mb-8 line-clamp-3 leading-relaxed">
                  {currentHeroMovie.overview}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(239, 68, 68, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/movie/${currentHeroMovie.id}`)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-glow-md transition-all"
                  >
                    <Play className="w-6 h-6 fill-current" />
                    <span>Watch Now</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/movie/${currentHeroMovie.id}`)}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-lg border border-white/20 transition-all"
                  >
                    <Info className="w-6 h-6" />
                    <span>More Info</span>
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-20 pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevHero}
              className="pointer-events-auto p-3 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full border border-white/20 transition-all group"
            >
              <ChevronLeft className="w-8 h-8 text-white group-hover:text-red-500 transition-colors" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextHero}
              className="pointer-events-auto p-3 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full border border-white/20 transition-all group"
            >
              <ChevronRight className="w-8 h-8 text-white group-hover:text-red-500 transition-colors" />
            </motion.button>
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {trendingMovies.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={() => setHeroIndex(index)}
                className="group relative"
              >
                <div
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === heroIndex
                      ? 'w-12 bg-red-600 shadow-glow-md'
                      : 'w-8 bg-white/40 hover:bg-white/60'
                  }`}
                />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Genre Filter Section - Prominent at Top */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-white/10 py-6 sticky top-16 md:top-18 z-40 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            {/* Top Row: Title and Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <Filter className="w-6 h-6 text-red-500" />
                <h2 className="text-xl md:text-2xl font-bold text-white">Explore & Filter</h2>
              </div>
              
              {/* View Toggle and Sort */}
              <div className="flex items-center space-x-3">
                <ViewToggle view={viewMode} setView={setViewMode} />
                <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
              </div>
            </div>
            
            {/* Genre Filter */}
            <GenreFilter
              selectedGenres={selectedGenres}
              onGenreChange={setSelectedGenres}
            />
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Personalized Recommendations */}
        {sortedRecommendedMovies.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-glow-md">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Recommended for You</h2>
                <p className="text-gray-400 text-sm">
                  {selectedGenres.length > 0 
                    ? `${sortedRecommendedMovies.length} movies in selected genres`
                    : 'Based on your ratings and watch history'}
                </p>
              </div>
            </div>
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6' 
              : 'flex flex-col space-y-4'}>
              {sortedRecommendedMovies.slice(0, 10).map((movie, index) => (
                viewMode === 'grid' ? (
                  <MovieCard key={movie.id} movie={movie} delay={index * 0.05} />
                ) : (
                  <MovieListCard key={movie.id} movie={movie} delay={index * 0.05} />
                )
              ))}
            </div>
          </motion.section>
        )}

        {/* Trending This Week */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl shadow-glow-md animate-pulse-slow">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Trending This Week</h2>
              <p className="text-gray-400 text-sm">
                {selectedGenres.length > 0
                  ? `${sortedTrendingMovies.length} trending movies in selected genres`
                  : 'Most popular movies right now'}
              </p>
            </div>
          </div>
          {sortedTrendingMovies.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6' 
              : 'flex flex-col space-y-4'}>
              {sortedTrendingMovies.map((movie, index) => (
                viewMode === 'grid' ? (
                  <MovieCard key={movie.id} movie={movie} delay={index * 0.05} />
                ) : (
                  <MovieListCard key={movie.id} movie={movie} delay={index * 0.05} />
                )
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No trending movies found in selected genres</p>
            </div>
          )}
        </motion.section>

        {/* Top Rated */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-glow-md">
              <Star className="w-6 h-6 text-white fill-current" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Top Rated Movies</h2>
              <p className="text-gray-400 text-sm">
                {selectedGenres.length > 0
                  ? `${sortedTopRatedMovies.length} top rated movies in selected genres`
                  : 'All-time classics and fan favorites'}
              </p>
            </div>
          </div>
          {sortedTopRatedMovies.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6' 
              : 'flex flex-col space-y-4'}>
              {sortedTopRatedMovies.map((movie, index) => (
                viewMode === 'grid' ? (
                  <MovieCard key={movie.id} movie={movie} delay={index * 0.05} />
                ) : (
                  <MovieListCard key={movie.id} movie={movie} delay={index * 0.05} />
                )
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No top rated movies found in selected genres</p>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default Home;
