import { Suspense } from 'react'
import PostCard from '@/components/PostCard'
import { getPosts } from '@/lib/api'

export const metadata = {
  title: 'All Posts',
  description: 'Browse all blog posts created with AI-powered content optimization.',
}

export const revalidate = 60

export default async function PostsPage() {
  try {
    const { posts, total, pages } = await getPosts(1, 12) // Get 12 posts per page

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              All Posts
            </h1>
            <p className="text-xl text-gray-600">
              Explore {total} AI-optimized {total === 1 ? 'article' : 'articles'}
            </p>
          </div>

          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination placeholder - can be enhanced later */}
              {pages > 1 && (
                <div className="mt-12 text-center">
                  <p className="text-gray-600">
                    Showing page 1 of {pages}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Pagination coming soon!
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No Posts Found
              </h2>
              <p className="text-gray-600 mb-8">
                There are currently no published posts. Check back later for new content!
              </p>
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Failed to Load Posts
          </h1>
          <p className="text-gray-600 mb-6">
            Unable to fetch posts. Please ensure the API server is running.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }
}