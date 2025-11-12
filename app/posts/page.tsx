import { Suspense } from 'react'
import Link from 'next/link'
import PostCard from '@/components/PostCard'
import { getPosts } from '@/lib/api'

export const metadata = {
  title: '전체 포스트',
  description: '15년 취업 컨설팅 노하우를 담은 잡프라이즈의 모든 콘텐츠를 확인하세요.',
}

export const dynamic = 'force-dynamic' // Skip static generation at build time
export const revalidate = 60

export default async function PostsPage() {
  let posts: any[] = []
  let total = 0
  let pages = 0
  let error: Error | null = null

  try {
    const result = await getPosts(1, 12) // Get 12 posts per page
    posts = result.posts
    total = result.total
    pages = result.pages
  } catch (e) {
    error = e as Error
    console.error('Failed to fetch posts:', e)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Failed to Load Posts
            </h1>
            <p className="text-gray-600 mb-4">
              {error.message || 'Unable to fetch posts from the API'}
            </p>
            <details className="text-left bg-gray-50 p-4 rounded mt-4">
              <summary className="cursor-pointer font-medium text-gray-700 mb-2">Technical Details</summary>
              <pre className="text-xs text-gray-600 overflow-auto">{error.stack || error.toString()}</pre>
              <div className="mt-2 text-sm text-gray-600">
                <p>API URL: {process.env.NEXT_PUBLIC_API_BASE_URL || 'Not set'}</p>
              </div>
            </details>
            <Link
              href="/posts"
              className="btn-primary mt-6 inline-block"
            >
              Retry
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              전체 포스트
            </h1>
            <p className="text-xl text-gray-600">
              아직 작성된 포스트가 없습니다
            </p>
          </div>
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
              포스트가 없습니다
            </h2>
            <p className="text-gray-600 mb-8">
              현재 게시된 포스트가 없습니다. 나중에 다시 확인해주세요!
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              전체 포스트
            </h1>
            <p className="text-xl text-gray-600">
              {total}개의 취업 인사이트 {total === 1 ? '아티클' : '아티클'}
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
                    전체 {pages}페이지 중 1페이지
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    페이지네이션 기능 준비 중!
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
}