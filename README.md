# 🎬 Movie Recommendation Web App

A beautiful, modern movie recommendation web application built with React, Tailwind CSS, and Framer Motion. Discover, search, and organize your favorite movies with an intuitive and animated interface.

## ✨ Features

### 🔍 **Search & Filter**
- Real-time movie search with autocomplete suggestions
- Search by title, genre, rating, or release year
- Advanced filtering options

### 🤖 **AI-Powered Recommendations**
- Personalized movie suggestions based on your watch history
- Content-based filtering algorithm
- Recommendations based on your ratings and favorites

### 🎯 **Movie Details**
- Comprehensive movie information (synopsis, cast, trailers, ratings)
- Watch trailers directly on YouTube
- View similar movies and recommendations
- Rate movies (1-5 stars)

### 📚 **Watchlist & Favorites**
- Add movies to your watchlist for later viewing
- Mark movies as favorites
- Persistent storage using localStorage
- Track your watch history

### 🎨 **Beautiful UI/UX**
- Smooth animations and transitions with Framer Motion
- Hover effects on movie cards
- Responsive design (mobile, tablet, desktop)
- Dark theme with modern aesthetics

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- TMDB API Key (free)

### Installation Steps

1. **Get your TMDB API Key:**
   - Go to [The Movie Database (TMDB)](https://www.themoviedb.org/)
   - Create a free account
   - Navigate to Settings > API
   - Request an API key (it's free and instant!)
   - Copy your API key

2. **Configure the API Key:**
   - Open `src/services/tmdbApi.js`
   - Replace `YOUR_TMDB_API_KEY` with your actual API key:
   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```

3. **Install dependencies (if needed):**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   - Navigate to `http://localhost:5174` (or the port shown in your terminal)

## 🛠️ Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **TMDB API** - Movie data and images
- **Lucide React** - Beautiful icon set

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── MovieCard.jsx    # Movie card with hover effects
│   ├── Navbar.jsx       # Navigation header
│   └── SearchBar.jsx    # Search with autocomplete
├── contexts/            # React Context API
│   └── MovieContext.jsx # Global state management
├── pages/               # Page components
│   ├── Home.jsx         # Homepage with trending movies
│   ├── MovieDetails.jsx # Detailed movie view
│   ├── Watchlist.jsx    # User's watchlist
│   ├── Favorites.jsx    # User's favorites
│   ├── SearchResults.jsx # Search results page
│   └── Trending.jsx     # Trending movies page
├── services/            # API services
│   └── tmdbApi.js       # TMDB API integration
├── utils/               # Utility functions
│   └── recommendations.js # Recommendation algorithms
├── App.jsx              # Main app component
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## 🎯 Key Features

### Recommendation Algorithm
The app uses a content-based filtering algorithm that:
- Analyzes your highly-rated movies (4+ stars)
- Identifies your preferred genres
- Scores movies based on genre similarity
- Weights results by movie ratings
- Filters out already-watched movies

### State Management
Uses React Context API to manage:
- Watchlist items
- Favorite movies
- User ratings
- Watch history

All data persists in localStorage for a seamless experience.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie data API
- [Lucide Icons](https://lucide.dev/) for the beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

---

**Made with ❤️ using React + Tailwind CSS + Framer Motion**

Enjoy discovering your next favorite movie! 🍿
