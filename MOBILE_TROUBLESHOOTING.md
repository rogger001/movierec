# Mobile Troubleshooting Guide 📱

## Issue: Movie Cards Empty on Mobile (Working on Desktop)

### ✅ Fixes Applied:

1. **Mobile-Optimized Image Sizes**
   - Desktop: 500px width images
   - Mobile: 342px width images (faster loading)
   - Reduced bandwidth usage on mobile networks

2. **CORS Headers Added** (`vercel.json`)
   - Proper Cross-Origin Resource Sharing headers
   - Better compatibility with mobile browsers
   - Improved security headers

3. **Image Loading Improvements**
   - Added `crossOrigin="anonymous"` to all images
   - Added `referrerPolicy="no-referrer"` for TMDB API
   - Better error handling with fallback placeholders

4. **Mobile-Specific Meta Tags**
   - Cache control headers
   - iOS app-capable settings
   - Better mobile browser compatibility

5. **Retry Logic**
   - Automatically retries API calls once on mobile
   - 2-second delay before retry
   - Console logging for debugging

---

## 🔧 Try These Steps (In Order):

### Step 1: Clear Mobile Browser Cache
**On iPhone/Safari:**
1. Go to Settings → Safari
2. Tap "Clear History and Website Data"
3. Confirm

**On Android/Chrome:**
1. Open Chrome
2. Tap ⋮ (three dots) → Settings
3. Privacy and security → Clear browsing data
4. Select "Cached images and files"
5. Tap Clear data

### Step 2: Force Reload on Mobile
1. Open your app URL
2. Pull down to refresh (iOS) or tap reload icon
3. Or use Private/Incognito mode

### Step 3: Check Console Logs (Mobile)
**On iPhone/Safari:**
1. Connect iPhone to Mac
2. Open Safari → Develop → [Your iPhone] → [Your Site]
3. Check Console for errors

**On Android/Chrome:**
1. Connect to PC via USB
2. Open `chrome://inspect` on PC
3. Inspect your mobile page
4. Check Console tab

**Look for:**
- 🎬 "Fetching movies..." (good - API call started)
- ✅ "Movies fetched" (good - data received)
- ❌ Any red error messages (bad - something failed)

---

## 🚀 After Push (Wait for Vercel):

Vercel will automatically rebuild with these changes. This typically takes:
- ⏱️ **1-2 minutes** to deploy
- 🔄 You'll get an email when done

### Then on Mobile:
1. **Hard Refresh**: Close browser completely and reopen
2. **Clear Cache**: Use steps above
3. **Try Incognito**: Open in private/incognito mode first
4. **Wait 5 minutes**: Sometimes DNS/CDN needs time to update

---

## 🔍 What Changed:

### Before:
```javascript
// Desktop-only image size
getImageUrl(path, 'w500')
// No CORS attributes
<img src={url} />
```

### After:
```javascript
// Mobile-optimized image size
const imageSize = isMobile ? 'w342' : 'w500';
getImageUrl(path, imageSize)

// With CORS and referrer policy
<img 
  src={url} 
  crossOrigin="anonymous"
  referrerPolicy="no-referrer"
/>
```

---

## 📊 Expected Behavior Now:

### When Page Loads on Mobile:
1. **Loading state** shows first (spinner/skeletons)
2. **Console logs** "🎬 Fetching movies..." with `{isMobile: true}`
3. **API calls** made to TMDB
4. **If successful**: Movies appear with images
5. **If images fail**: Placeholder cards with Film icon appear
6. **If API fails**: Retries once after 2 seconds

---

## ⚠️ Still Not Working?

### Check These:

1. **Network Tab** (in mobile browser dev tools)
   - Are API calls being made to `api.themoviedb.org`?
   - Status code 200 = success
   - Status code 401/403 = API key issue
   - Status code 429 = rate limited

2. **Image Loading**
   - Are images trying to load from `image.tmdb.org`?
   - Any 403 errors = referrer policy issue
   - Any 404 errors = invalid image path

3. **JavaScript Errors**
   - Any console errors about modules?
   - Any syntax errors?
   - Any "undefined" errors?

### Quick Test URLs:
- API Test: https://api.themoviedb.org/3/movie/550?api_key=1aa6757131de0e554cf2229d75cdc2f2
- Image Test: https://image.tmdb.org/t/p/w342/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg

If these URLs work in mobile browser, the issue is in your app code. If they don't work, it's a network/firewall issue.

---

## 🎯 Most Likely Solution:

**90% of the time, this is a caching issue.**

The fix:
1. Wait for Vercel deployment (check email)
2. Clear mobile browser cache completely
3. Open in incognito/private mode
4. Movies should load! 🎉

---

## 📞 Need More Help?

Share these debug details:
- What mobile device/browser? (e.g., iPhone 14 / Safari)
- What do you see in console? (any errors?)
- What network requests are made? (check Network tab)
- Does it work in incognito mode?

This will help diagnose the exact issue! 🔧
