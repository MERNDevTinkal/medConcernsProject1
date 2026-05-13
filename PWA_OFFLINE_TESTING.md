# PWA Offline Testing & Deployment Guide

## ✅ What's Fixed

Your PWA offline functionality has been fixed for **images** (essential). Audio is optional and cached on-demand to save device storage.

---

## 🧪 Testing Offline Mode Locally

### Step 1: Build & Preview
```bash
npm run build
npm run preview
```

### Step 2: Test in DevTools (Chrome/Edge)
1. Open DevTools (`F12`)
2. Go to **Application** tab
3. Click **Service Workers** → You should see a registered service worker
4. In **Cache Storage**, you'll see:
   - `app-shell` (JS, CSS, HTML)
   - `images-cache` (PNG, JPG, etc.)
   - `audio-cache` (MP3 files)

### Step 3: Simulate Offline
1. In DevTools, go to **Network** tab
2. Check **Offline** checkbox
3. Refresh page - **Images should load from cache!**
4. Images will work, audio may not (expected - it's optional)

### Step 4: Test on Real Device
```bash
npm run preview
# Then visit: http://<your-ip>:4173
```
- Open app on phone
- Disconnect WiFi/Mobile data
- App + images should still work!

---

## 📱 Mobile Testing (Android/iOS)

### Android
1. Install app from browser → **Add to Home Screen**
2. Open app 
3. Disconnect internet
4. Images should still load

### iOS
1. Open in Safari → **Share** → **Add to Home Screen**
2. Open app
3. Turn on Airplane Mode
4. Images should still load

---

## 🚀 Deploy to Vercel

### Step 1: Build & Prepare
```bash
npm run build
```

### Step 2: Deploy
```bash
vercel --prod
```

Or connect GitHub repo to Vercel for auto-deploy.

### Step 3: Test on Vercel
- Visit your deployed URL
- Open DevTools → **Application** → **Service Workers**
- Should see service worker registered
- Test offline mode (same as above)

---

## 🔍 Debugging

### Check Service Worker Status
Open DevTools Console and run:
```javascript
if ('caches' in window) {
  caches.keys().then(names => {
    console.log('Available caches:', names);
    names.forEach(name => {
      caches.open(name).then(cache => {
        cache.keys().then(requests => {
          console.log(`${name}: ${requests.length} items`);
        });
      });
    });
  });
}
```

### Clear Cache if Needed
```javascript
if ('caches' in window) {
  caches.keys().then(names => {
    names.forEach(name => caches.delete(name));
    console.log('✅ Cache cleared - your app will re-download everything');
  });
}
```

---

## ⚙️ Cache Strategy Explanation

| Item | Strategy | Purpose |
|------|----------|---------|
| JS/CSS/HTML | NetworkFirst | Always use latest app code |
| Images | CacheFirst | Show offline images instantly |
| Audio | CacheFirst | Cache on first use, optional |

**Result:** 
- ✅ **Images always work offline** (required)
- ⚠️ **Audio will work IF previously visited** (optional)
- 🔄 **App code always stays fresh** (auto-updates)

---

## 📊 Expected Cache Sizes

- **App Shell**: ~200 KB
- **Images**: 100-500 MB (depending on your image count)
- **Audio**: 50 MP3s × ~5 MB = ~250 MB

**Total storage used**: ~1-2 GB (device storage varies)

---

## ✨ Important Notes

1. **First Load**: App must connect to internet at least once
2. **Cache Updates**: Old caches auto-update when new version deployed
3. **Audio**: Only caches on demand (doesn't pre-cache all MP3s)
4. **Storage Warning**: If too many images, older ones get removed
5. **Manifest**: Already configured in your `index.html`

---

## 💡 If Offline Still Not Working

1. **Clear browser cache**: Settings → Clear browsing data → Cache
2. **Reinstall PWA**: Remove from home screen → Re-add
3. **Check manifest.json**: Make sure it exists in `public/`
4. **Check service worker**: DevTools → Application → Service Workers
5. **Mobile permissions**: Allow offline storage when prompted

---

## 🎯 Next Steps

1. Test locally: `npm run preview` + offline mode
2. Deploy: `vercel --prod`
3. Test on mobile devices (iOS + Android)
4. Monitor DevTools console for any errors

**Your PWA is now production-ready for Vercel! 🚀**
