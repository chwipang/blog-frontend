import Link from 'next/link'
import PostCard from '@/components/PostCard'
import { getPosts } from '@/lib/api'

export const dynamic = 'force-dynamic' // Skip static generation at build time
export const revalidate = 60 // Revalidate every minute

export default async function HomePage() {
  try {
    const { posts, total } = await getPosts(1, 6) // Get first 6 posts

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI-Powered Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Discover intelligent content creation with SEO optimization,
              beautiful formatting, and engaging storytelling powered by artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/posts"
                className="btn-primary text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100"
              >
                Read Latest Posts
              </Link>
              <Link
                href="/about"
                className="btn-secondary text-lg px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-blue-600"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Latest Posts
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our collection of AI-generated content, optimized for both
                readers and search engines.
              </p>
            </div>

            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>

                <div className="text-center">
                  <Link
                    href="/posts"
                    className="btn-primary text-lg px-8 py-3"
                  >
                    View All Posts ({total})
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Posts Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Posts will appear here once they are published by the admin.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Powered by AI
              </h2>
              <p className="text-xl text-gray-600">
                Experience the future of content creation and optimization
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  AI-Generated Content
                </h3>
                <p className="text-gray-600">
                  Intelligent content creation with proper formatting, structure, and engaging writing style.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  SEO Optimized
                </h3>
                <p className="text-gray-600">
                  Automatic SEO optimization with meta tags, keywords, and structured data for better search rankings.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Interactive Comments
                </h3>
                <p className="text-gray-600">
                  Engage with readers through our anonymous comment system with moderation tools.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Unable to Load Content
          </h1>
          <p className="text-gray-600 mb-6">
            Please check if the API server is running and try again.
          </p>
          <Link
            href="/posts"
            className="btn-primary"
          >
            Try Again
          </Link>
        </div>
      </div>
    )
  }
}