import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import CommentSection from '@/components/CommentSection'
import { getPost } from '@/lib/api'
import { formatDate, generateJsonLd, sanitizeHtml } from '@/lib/utils'

interface PostPageProps {
  params: {
    slug: string
  }
}

export const dynamic = 'force-dynamic' // Skip static generation at build time

export async function generateMetadata({ params }: PostPageProps) {
  try {
    const post = await getPost(params.slug)

    return {
      title: post.meta_title || post.title,
      description: post.meta_description,
      keywords: post.keywords,
      authors: [{ name: 'Admin' }],
      openGraph: {
        title: post.meta_title || post.title,
        description: post.meta_description,
        type: 'article',
        publishedTime: post.published_at,
        images: post.og_image ? [{ url: post.og_image }] : [],
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.meta_title || post.title,
        description: post.meta_description,
        images: post.og_image ? [post.og_image] : [],
      },
    }
  } catch {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    }
  }
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const post = await getPost(params.slug)

    const jsonLd = generateJsonLd(post)

    return (
      <>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <article className="min-h-screen bg-white">
          {/* Hero Section */}
          <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="mb-8">
                <Link
                  href="/posts"
                  className="text-blue-100 hover:text-white flex items-center text-sm"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to Posts
                </Link>
              </nav>

              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formatDate(post.published_at)}
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {post.view_count} views
                </div>

                {post.keywords && post.keywords.length > 0 && (
                  <div className="hidden md:flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    {post.keywords.slice(0, 3).join(', ')}
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="prose-custom">
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(post.html_content),
                }}
              />
            </div>

            {/* Keywords Section */}
            {post.keywords && post.keywords.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Share this post
              </h3>
              <div className="flex space-x-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    post.title
                  )}&url=${encodeURIComponent(
                    `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <span className="sr-only">Share on Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <span className="sr-only">Share on Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-700 transition-colors"
                >
                  <span className="sr-only">Share on LinkedIn</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Suspense
                fallback={
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="animate-pulse">
                      <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                }
              >
                <CommentSection postId={post.id} />
              </Suspense>
            </div>
          </div>
        </article>
      </>
    )
  } catch (error) {
    notFound()
  }
}