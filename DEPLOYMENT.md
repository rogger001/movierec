# Movie Recommendation App - Deployment Guide

🎬 **Movie Recommendation App** deployed to GitHub!

## 🚀 Repository
- **GitHub Repository**: https://github.com/rogger001/movierec

## 📦 Deployment Options

### Option 1: Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd movie-recommendation-app
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project or create new
   - Set build command: `npm run build`
   - Set output directory: `dist`

4. **Add Environment Variable**:
   - Go to Vercel dashboard → Settings → Environment Variables
   - Add: `VITE_TMDB_API_KEY` = your_api_key_here

### Option 2: Deploy to Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

4. **Set Environment Variables**:
   - Go to Netlify dashboard → Site settings → Environment variables
   - Add: `VITE_TMDB_API_KEY`

### Option 3: Deploy to GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `package.json`**:
   ```json
   {
     "homepage": "https://rogger001.github.io/movierec",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update `vite.config.js`**:
   ```javascript
   export default defineConfig({
     base: '/movierec/',
     // ... rest of config
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

## 🔑 Important: Environment Variables

**You need a TMDB API key to run this app!**

1. Get your API key from: https://www.themoviedb.org/settings/api
2. Create a `.env` file in the project root:
   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   ```

## 🛠️ Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rogger001/movierec.git
   cd movierec
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Add your TMDB API key**:
   - Create `.env` file with `VITE_TMDB_API_KEY=your_key`

4. **Start development server**:
   ```bash
   npm run dev
   ```

## 📋 Features Included in Deployment

✅ Genre filtering with visual pills
✅ Sort by: Popularity, Rating, Release Date, Title
✅ Grid/List view toggle
✅ Responsive design
✅ Movie details with recommendations
✅ Watchlist & Favorites
✅ Search functionality
✅ About Us page
✅ Premium footer with social links
✅ Smooth animations with Framer Motion

## 🔄 Future Updates

To deploy updates:
```bash
git add .
git commit -m "Your update message"
git push origin master
```

Then redeploy using your chosen platform's deployment command.

## 📱 Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API**: TMDB (The Movie Database)
- **Routing**: React Router DOM

## 🤝 Contributing

Feel free to fork this repository and submit pull requests!

## 📧 Contact

- **Developer**: Mayank
- **Email**: ms6374667@gmail.com
- **GitHub**: https://github.com/rogger001
- **LinkedIn**: https://linkedin.com/in/mayank-sharma-a12456330

---

**Enjoy your movie recommendations! 🎬🍿**
