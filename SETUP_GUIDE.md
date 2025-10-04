# 🚀 Quick Setup Guide

Follow these steps to get your Movie Recommendation App up and running!

## Step 1: Get Your TMDB API Key

1. Visit [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Click **"Join TMDB"** in the top right corner
3. Fill out the registration form with your details
4. Verify your email address
5. After logging in, go to your account settings:
   - Click on your profile icon → **Settings**
   - In the left sidebar, click on **API**
   - Click **"Create"** or **"Request an API Key"**
   - Choose **"Developer"** option
   - Fill out the simple form (you can use placeholder info for personal projects)
   - Accept the terms and submit

6. **Copy your API Key** (v3 auth)

## Step 2: Configure the API Key

1. Open the project in your code editor
2. Navigate to: `src/services/tmdbApi.js`
3. Find this line (around line 5):
   ```javascript
   const API_KEY = 'YOUR_TMDB_API_KEY';
   ```
4. Replace `'YOUR_TMDB_API_KEY'` with your actual API key:
   ```javascript
   const API_KEY = 'abc123def456...'; // Your actual key here
   ```
5. **Save the file**

## Step 3: Install Dependencies (if not already done)

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages:
- react-router-dom
- axios
- framer-motion
- lucide-react
- tailwindcss
- And other dependencies

## Step 4: Start the Development Server

In your terminal, run:

```bash
npm run dev
```

You should see output like:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5174/
➜  Network: use --host to expose
```

## Step 5: Open in Browser

1. Open your web browser
2. Go to `http://localhost:5174` (or whatever port is shown in your terminal)
3. The app should load and display the homepage!

## ✅ Verification

If everything is working correctly, you should see:
- A beautiful dark-themed movie app interface
- Movie posters loading on the homepage
- A search bar at the top
- Navigation menu with Home, Trending, Watchlist, Favorites

## 🔧 Troubleshooting

### Issue: Movies not loading / API errors

**Solution:**
- Double-check your API key is correctly entered in `src/services/tmdbApi.js`
- Make sure there are no extra quotes or spaces
- Verify your API key is active on TMDB

### Issue: Blank page or errors on start

**Solution:**
- Run `npm install` again to ensure all dependencies are installed
- Clear your browser cache
- Check the browser console (F12) for specific error messages

### Issue: Port already in use

**Solution:**
- Vite will automatically try another port (5175, 5176, etc.)
- Or, you can stop the process using that port and restart

### Issue: Styles not loading correctly

**Solution:**
- Make sure Tailwind CSS is properly configured
- Try running `npm run dev` again
- Hard refresh the browser (Ctrl+F5 or Cmd+Shift+R)

## 🎯 Next Steps

Once the app is running:

1. **Explore the interface:**
   - Browse trending movies on the homepage
   - Use the search bar to find specific movies
   - Click on a movie card to see details

2. **Try the features:**
   - Add movies to your watchlist (Plus icon)
   - Mark movies as favorites (Heart icon)
   - Rate movies (star rating on movie details page)
   - Check out personalized recommendations

3. **Customize (optional):**
   - Change colors in `tailwind.config.js`
   - Modify animations in component files
   - Add your own features!

## 📚 Project Structure Overview

```
src/
├── components/       → Reusable UI components
├── pages/           → Full page components
├── services/        → API integration (TMDB)
├── contexts/        → State management
├── utils/           → Helper functions
├── App.jsx          → Main app setup
└── index.css        → Global styles
```

## 🎨 Features to Try

### Watchlist
- Navigate to **Watchlist** page
- Add movies by clicking the **Plus (+)** icon on any movie card
- Movies are saved in your browser's local storage

### Favorites
- Navigate to **Favorites** page
- Add movies by clicking the **Heart** icon on any movie card
- Your favorites persist across browser sessions

### Search
- Use the search bar in the navigation
- Get instant suggestions as you type
- Click a suggestion or press Enter to see all results

### Movie Details
- Click any movie card to see full details
- View cast, trailers, and similar movies
- Rate movies from 1-5 stars
- Your ratings are saved locally

### Recommendations
- Rate some movies (4-5 stars recommended)
- Go back to the homepage
- See personalized recommendations based on your ratings

## 🆘 Getting Help

If you encounter issues:

1. Check the browser console (F12) for error messages
2. Verify your TMDB API key is valid
3. Make sure all dependencies are installed (`npm install`)
4. Restart the development server (`npm run dev`)

## 🎉 You're All Set!

Enjoy exploring and discovering new movies with your personalized movie recommendation app!

**Happy movie watching! 🍿🎬**
