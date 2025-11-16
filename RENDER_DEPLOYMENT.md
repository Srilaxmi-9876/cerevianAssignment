# Render Deployment Guide

## Quick Deploy to Render

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Fix deployment configuration"
git push
```

### Step 2: Deploy on Render

1. Go to [render.com](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `cerevyn-translator` (or your choice)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Environment Variables

Add these in Render Dashboard → Environment:
- `NODE_ENV` = `production`
- `OPENAI_API_KEY` = `your_key_here` (optional)

### Step 4: Deploy

Click "Create Web Service" and wait for deployment.

---

## Troubleshooting CSS Issues

If CSS is not loading on Render:

1. **Check Build Logs**: Look for Tailwind CSS compilation errors
2. **Verify PostCSS**: Ensure `postcss.config.js` exists
3. **Clear Build Cache**: In Render, go to Settings → Clear Build Cache
4. **Rebuild**: Trigger a new deployment

---

## Alternative: Manual Configuration

If using `render.yaml` doesn't work, configure manually in Render Dashboard:

- **Root Directory**: (leave empty)
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Node Version**: `18.x` or `20.x`

---

## Common Issues

### CSS Not Loading
- Ensure `app/globals.css` imports Tailwind directives
- Check that `tailwind.config.js` is in root
- Verify `postcss.config.js` exists

### Build Fails
- Check Node version (should be 18+)
- Ensure all dependencies are in `package.json`
- Check build logs for specific errors

### Runtime Errors
- Check environment variables are set
- Verify API routes are working
- Check server logs in Render dashboard

---

## After Deployment

1. Test the live URL
2. Upload a PDF
3. Test translation and TTS
4. Check browser console for errors (F12)

