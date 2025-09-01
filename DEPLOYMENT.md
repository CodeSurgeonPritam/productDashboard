# Deployment Guide

This guide covers how to deploy the Product Dashboard to various platforms.

## 🚀 Vercel (Recommended)

### Method 1: Connect GitHub Repository
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Vite project
6. Deploy with default settings

### Method 2: Vercel CLI
```bash
npm install -g vercel
npm run build
vercel --prod
```

## 📦 Netlify

### Method 1: Drag & Drop
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder to the deployment area

### Method 2: Git Integration
1. Push code to GitHub
2. Connect repository in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## 🌐 GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "homepage": "https://yourusername.github.io/productDashboard",
   "deploy": "gh-pages -d dist"
   ```
3. Update vite.config.ts:
   ```typescript
   base: "/productDashboard/"
   ```
4. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

## 🐳 Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

Build and run:
```bash
docker build -t product-dashboard .
docker run -p 3000:80 product-dashboard
```

## 🔧 Build Configuration

The project is configured with:
- **Build tool**: Vite
- **Output directory**: `dist`
- **Build command**: `npm run build`
- **Dev command**: `npm run dev`
- **Preview command**: `npm run preview`

## 📝 Environment Variables

If you need environment variables, create `.env` files:

```bash
# .env.production
VITE_API_URL=https://dummyjson.com
VITE_APP_NAME=Product Dashboard
```

## 🎯 Deployment Checklist

- [x] Build completes without errors
- [x] TypeScript compilation passes
- [x] All routes work in production
- [x] API calls function correctly
- [x] Responsive design works
- [x] Loading states display properly
- [x] Error handling works

## 🚨 Common Issues

### MIME Type Error
- Ensure `vercel.json` has proper rewrites
- Check that `_redirects` file exists for Netlify
- Verify base path in `vite.config.ts`

### 404 on Refresh
- Add SPA fallback configuration
- Check routing setup in deployment platform

### Assets Not Loading
- Verify `base` path in Vite config
- Check public directory structure
- Ensure assets are in `public` folder

## 📊 Performance Tips

1. **Bundle Analysis**: Use `npm run build -- --analyze`
2. **Lazy Loading**: Implement code splitting
3. **CDN**: Use for static assets
4. **Compression**: Enable gzip/brotli
5. **Caching**: Set proper cache headers
