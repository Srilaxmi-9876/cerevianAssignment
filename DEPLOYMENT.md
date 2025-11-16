# Deployment Guide

## Quick Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable: `OPENAI_API_KEY` (optional)
   - Click "Deploy"

3. **Your app will be live!**

## Environment Variables

Set these in your hosting platform:

- `OPENAI_API_KEY` (optional): For enhanced translation quality

## Platform-Specific Notes

### Vercel
- Automatic deployments on git push
- Serverless functions for API routes
- Free tier available

### Netlify
- Use Next.js plugin
- Set build command: `npm run build`
- Set publish directory: `.next`

### Railway
- Automatic detection of Next.js
- Add environment variables in dashboard
- Auto-deploys on git push

### AWS Amplify
- Connect GitHub repository
- Build settings auto-detected
- Add environment variables in console

## File Storage

The app saves audio files to `/public/audio`. For production:

1. **Option 1**: Use cloud storage (S3, Cloudinary, etc.)
2. **Option 2**: Use Vercel Blob Storage
3. **Option 3**: Keep local storage (works for Vercel with limitations)

For cloud storage, update `app/api/translate-and-tts/route.ts` to upload to your storage service instead of local filesystem.

