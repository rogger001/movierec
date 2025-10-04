import axios from 'axios';

// TMDB API Configuration
// You'll need to get a free API key from https://www.themoviedb.org/settings/api
const API_KEY = '1aa6757131de0e554cf2229d75cdc2f2'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Create axios instance
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// API endpoints
export const tmdbService = {
  // Get trending movies
  getTrending: (timeWindow = 'week') => {
    return tmdbApi.get(`/trending/movie/${timeWindow}`);
  },

  // Get popular movies
  getPopular: (page = 1) => {
    return tmdbApi.get('/movie/popular', { params: { page } });
  },

  // Get top rated movies
  getTopRated: (page = 1) => {
    return tmdbApi.get('/movie/top_rated', { params: { page } });
  },

  // Get upcoming movies
  getUpcoming: (page = 1) => {
    return tmdbApi.get('/movie/upcoming', { params: { page } });
  },

  // Get now playing movies
  getNowPlaying: (page = 1) => {
    return tmdbApi.get('/movie/now_playing', { params: { page } });
  },

  // Get movie details
  getMovieDetails: (movieId) => {
    return tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'videos,credits,similar,recommendations',
      },
    });
  },

  // Search movies
  searchMovies: (query, page = 1) => {
    return tmdbApi.get('/search/movie', {
      params: {
        query,
        page,
      },
    });
  },

  // Get movies by genre
  getMoviesByGenre: (genreId, page = 1) => {
    return tmdbApi.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc',
      },
    });
  },

  // Get movie genres
  getGenres: () => {
    return tmdbApi.get('/genre/movie/list');
  },

  // Get similar movies
  getSimilarMovies: (movieId) => {
    return tmdbApi.get(`/movie/${movieId}/similar`);
  },

  // Get movie recommendations
  getRecommendations: (movieId) => {
    return tmdbApi.get(`/movie/${movieId}/recommendations`);
  },

  // Discover movies with filters
  discoverMovies: (filters = {}) => {
    return tmdbApi.get('/discover/movie', {
      params: {
        sort_by: 'popularity.desc',
        ...filters,
      },
    });
  },
};

// Image URL helpers
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder-movie.png';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path, size = 'original') => {
  if (!path) return '/placeholder-backdrop.png';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export default tmdbService;
