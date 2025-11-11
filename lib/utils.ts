import { type ClassValue, clsx } from 'clsx'
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: string): string {
  return format(new Date(date), 'MMM dd, yyyy')
}

export function formatDatetime(date: string): string {
  return format(new Date(date), 'MMM dd, yyyy HH:mm')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function generateJsonLd(post: {
  title: string
  meta_description?: string
  og_image?: string
  published_at: string
  slug: string
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta_description || '',
    image: post.og_image || '',
    author: {
      '@type': 'Person',
      name: 'Admin',
    },
    datePublished: post.published_at,
    dateModified: post.published_at,
    url: `${siteUrl}/posts/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/posts/${post.slug}`,
    },
  }
}

export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization for display
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
}

export function extractTextFromHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim()
}