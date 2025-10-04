# Vercel Environment Variable Setup

## 🚨 IMPORTANT: Set Your API Key in Vercel

Your app is deployed but the TMDB API key needs to be configured in Vercel's environment variables.

## Steps to Fix:

### 1. Go to Vercel Dashboard
Visit: https://vercel.com/dashboard

### 2. Select Your Project
Click on your `movierec` project (or whatever you named it)

### 3. Go to Settings
- Click **Settings** tab at the top
- Click **Environment Variables** in the left sidebar

### 4. Add the API Key
Add a new environment variable:
- **Name**: `VITE_TMDB_API_KEY`
- **Value**: `1aa6757131de0e554cf2229d75cdc2f2`
- **Environment**: Select **Production**, **Preview**, and **Development** (all three)

### 5. Redeploy
After adding the environment variable:
- Go to the **Deployments** tab
- Click the **...** menu on the latest deployment
- Click **Redeploy**

## Alternative: Use Vercel CLI

If you have Vercel CLI installed, run:

```bash
vercel env add VITE_TMDB_API_KEY
```

When prompted:
1. Enter the value: `1aa6757131de0e554cf2229d75cdc2f2`
2. Select all environments (Production, Preview, Development)

Then redeploy:
```bash
vercel --prod
```

## Why This is Needed

- Environment variables are NOT included in your git repository (for security)
- Vite requires environment variables to be prefixed with `VITE_`
- The app needs the API key to fetch movie data from TMDB

## After Setup

Once you've added the environment variable and redeployed:
1. Wait 1-2 minutes for deployment to complete
2. Visit your app: `https://movierec.vercel.app` (or your custom domain)
3. Movie posters and data should now load correctly! 🎬

## Troubleshooting

If movies still don't load after setup:

1. **Check Browser Console**: 
   - Open Developer Tools (F12)
   - Look for any red error messages
   - Check if API calls are being made

2. **Verify Environment Variable**:
   - In Vercel Settings → Environment Variables
   - Make sure `VITE_TMDB_API_KEY` is listed
   - Make sure it's enabled for Production

3. **Force Rebuild**:
   - Go to Deployments
   - Redeploy from the latest commit
   - Make sure to check "Use existing Build Cache" is OFF

## Test Locally

To test locally with the environment variable:

1. Create a `.env` file in project root:
   ```bash
   VITE_TMDB_API_KEY=1aa6757131de0e554cf2229d75cdc2f2
   ```

2. Run the dev server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 and check if movies load

---

**Need Help?** 
- TMDB API Docs: https://developers.themoviedb.org/3
- Vercel Environment Variables: https://vercel.com/docs/concepts/projects/environment-variables
