// Content-based recommendation algorithm
export const getRecommendationsBasedOnHistory = (watchHistory, ratings, allMovies) => {
  if (!watchHistory.length && Object.keys(ratings).length === 0) {
    return [];
  }

  // Get highly rated movies from user's history
  const likedMovies = watchHistory.filter((movie) => {
    const rating = ratings[movie.id];
    return rating && rating >= 4;
  });

  if (likedMovies.length === 0) {
    return [];
  }

  // Extract genres from liked movies
  const genreCount = {};
  likedMovies.forEach((movie) => {
    if (movie.genre_ids) {
      movie.genre_ids.forEach((genreId) => {
        genreCount[genreId] = (genreCount[genreId] || 0) + 1;
      });
    }
  });

  // Sort genres by frequency
  const preferredGenres = Object.entries(genreCount)
    .sort((a, b) => b[1] - a[1])
    .map(([genreId]) => parseInt(genreId));

  // Score movies based on genre match
  const scoredMovies = allMovies.map((movie) => {
    let score = 0;
    
    if (movie.genre_ids) {
      movie.genre_ids.forEach((genreId) => {
        const genreIndex = preferredGenres.indexOf(genreId);
        if (genreIndex !== -1) {
          score += preferredGenres.length - genreIndex;
        }
      });
    }

    // Boost score based on rating
    score *= movie.vote_average / 10;

    return { ...movie, recommendationScore: score };
  });

  // Filter out movies already in history and sort by score
  const watchedIds = watchHistory.map((m) => m.id);
  return scoredMovies
    .filter((movie) => !watchedIds.includes(movie.id))
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, 20);
};

// Simple collaborative filtering simulation
export const getSimilarUsersRecommendations = (userRatings, allRatings) => {
  // This is a simplified version - in production, you'd use a backend service
  // For now, we'll just return popular movies not yet rated
  return [];
};

// Get recommendations based on a single movie
export const getSimilarMovieRecommendations = (movie, allMovies) => {
  if (!movie || !movie.genre_ids) {
    return [];
  }

  const scored = allMovies
    .filter((m) => m.id !== movie.id)
    .map((m) => {
      let score = 0;
      
      // Genre similarity
      if (m.genre_ids) {
        const commonGenres = m.genre_ids.filter((g) =>
          movie.genre_ids.includes(g)
        );
        score += commonGenres.length * 10;
      }

      // Rating similarity
      const ratingDiff = Math.abs(m.vote_average - movie.vote_average);
      score += 5 - ratingDiff;

      // Release year similarity (prefer similar era)
      if (m.release_date && movie.release_date) {
        const yearDiff = Math.abs(
          new Date(m.release_date).getFullYear() -
          new Date(movie.release_date).getFullYear()
        );
        score += Math.max(0, 10 - yearDiff / 2);
      }

      return { ...m, similarityScore: score };
    });

  return scored
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 12);
};

// Get trending recommendations with personalization
export const getPersonalizedTrending = (trendingMovies, favorites, ratings) => {
  if (favorites.length === 0 && Object.keys(ratings).length === 0) {
    return trendingMovies;
  }

  // Get user's preferred genres from favorites
  const genrePreferences = {};
  favorites.forEach((movie) => {
    if (movie.genre_ids) {
      movie.genre_ids.forEach((genreId) => {
        genrePreferences[genreId] = (genrePreferences[genreId] || 0) + 1;
      });
    }
  });

  // Score and sort trending movies
  const scored = trendingMovies.map((movie) => {
    let personalScore = movie.popularity || 0;

    if (movie.genre_ids) {
      movie.genre_ids.forEach((genreId) => {
        if (genrePreferences[genreId]) {
          personalScore += genrePreferences[genreId] * 100;
        }
      });
    }

    return { ...movie, personalScore };
  });

  return scored.sort((a, b) => b.personalScore - a.personalScore);
};

export default {
  getRecommendationsBasedOnHistory,
  getSimilarUsersRecommendations,
  getSimilarMovieRecommendations,
  getPersonalizedTrending,
};
