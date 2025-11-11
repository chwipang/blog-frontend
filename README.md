# AI Blog Frontend

Next.js-based frontend for the AI-powered blog service with full SEO optimization.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ Server-side rendering (SSR) for optimal SEO
- 🔍 Automatic SEO optimization with meta tags and structured data
- 💬 Anonymous comment system
- 📱 Mobile-first responsive design
- 🚀 Fast loading with Next.js optimization
- 📊 View tracking and analytics
- 🖼️ Optimized image handling

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.local.example .env.local
# Edit .env.local with your configuration
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## Environment Variables

Create `.env.local` file with:

```env
API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=AI Blog
NEXT_PUBLIC_SITE_DESCRIPTION=AI-powered blog with SEO optimization
```

## Project Structure

- `app/` - Next.js 14 App Router pages
- `components/` - Reusable React components
- `lib/` - Utility functions and API clients
- `public/` - Static assets

## Pages

- `/` - Homepage with featured posts
- `/posts` - All posts listing
- `/posts/[slug]` - Individual post pages
- `/about` - About page

## SEO Features

- Automatic meta tags generation
- Open Graph and Twitter Card support
- JSON-LD structured data
- Optimized images with next/image
- Clean URLs with post slugs
- Sitemap generation (can be added)

## Deployment

The frontend can be deployed to:

- **Vercel** (recommended) - Zero-config deployment
- **Netlify** - Static site hosting
- **AWS Amplify** - Full-stack deployment
- **Any static hosting** - After `npm run build`

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on every push

### Manual Deployment

```bash
npm run build
npm start
```

## Multi-Domain Setup

To serve the same content on multiple domains:

1. Deploy to multiple Vercel projects
2. Each project points to the same API backend
3. Configure different NEXT_PUBLIC_SITE_URL for each domain
4. Customize styling/branding per domain if needed

## Performance

- Automatic code splitting
- Image optimization
- Static generation where possible
- Fast loading with Next.js optimizations
- Minimal bundle size