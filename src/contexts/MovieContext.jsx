import React, { createContext, useContext, useState, useEffect } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [ratings, setRatings] = useState(() => {
    const saved = localStorage.getItem('ratings');
    return saved ? JSON.parse(saved) : {};
  });

  const [watchHistory, setWatchHistory] = useState(() => {
    const saved = localStorage.getItem('watchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('ratings', JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    localStorage.setItem('watchHistory', JSON.stringify(watchHistory));
  }, [watchHistory]);

  // Watchlist functions
  const addToWatchlist = (movie) => {
    if (!watchlist.find((m) => m.id === movie.id)) {
      setWatchlist([...watchlist, movie]);
      return true;
    }
    return false;
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist(watchlist.filter((m) => m.id !== movieId));
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some((m) => m.id === movieId);
  };

  // Favorites functions
  const addToFavorites = (movie) => {
    if (!favorites.find((m) => m.id === movie.id)) {
      setFavorites([...favorites, movie]);
      return true;
    }
    return false;
  };

  const removeFromFavorites = (movieId) => {
    setFavorites(favorites.filter((m) => m.id !== movieId));
  };

  const isInFavorites = (movieId) => {
    return favorites.some((m) => m.id === movieId);
  };

  // Rating functions
  const rateMovie = (movieId, rating) => {
    setRatings({ ...ratings, [movieId]: rating });
  };

  const getMovieRating = (movieId) => {
    return ratings[movieId] || 0;
  };

  // Watch history functions
  const addToWatchHistory = (movie) => {
    const exists = watchHistory.find((m) => m.id === movie.id);
    if (!exists) {
      const historyItem = {
        ...movie,
        watchedAt: new Date().toISOString(),
      };
      setWatchHistory([historyItem, ...watchHistory.slice(0, 49)]); // Keep last 50
    }
  };

  const clearWatchHistory = () => {
    setWatchHistory([]);
  };

  const value = {
    watchlist,
    favorites,
    ratings,
    watchHistory,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
    rateMovie,
    getMovieRating,
    addToWatchHistory,
    clearWatchHistory,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
