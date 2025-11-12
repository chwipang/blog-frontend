import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/api";

export const dynamic = "force-dynamic"; // Skip static generation at build time
export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  try {
    const { posts, total } = await getPosts(1, 6); // Get first 6 posts

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#E20871] to-[#A0054F] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              취업의신 블로그
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              15년 취업컨설팅 노하우, 1,600만 누적 방문, 6만6천 명의 잡콘서트
              청강자. 실제 합격 데이터를 바탕으로 실무형 취업 전략을 전합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/posts"
                className="text-lg px-8 py-3 bg-white text-[#E20871] hover:bg-gray-100 rounded-md font-medium transition-colors"
              >
                최근 글 보기
              </Link>
              <Link
                href="/about"
                className="text-lg px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-[#E20871] rounded-md font-medium transition-colors"
              >
                잡프라이즈 소개
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                최신 포스트
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                실제 컨설팅 후기와 합격 사례를 기반으로 한 취업전략 콘텐츠
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
                  <Link href="/posts" className="btn-primary text-lg px-8 py-3">
                    전체 포스트 보기 ({total})
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
                  아직 포스트가 없습니다
                </h3>
                <p className="text-gray-600 mb-6">
                  관리자가 포스트를 게시하면 여기에 표시됩니다.
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
                잡프라이즈의 강점
              </h2>
              <p className="text-xl text-gray-600">
                15년 업력과 검증된 합격 데이터로 차별화된 취업 솔루션을
                제공합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#E20871]"
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
                  실무형 콘텐츠
                </h3>
                <p className="text-gray-600">
                  현직 인사담당자 350명이 참여한 HR아너스포럼의 실제 사례 기반
                  콘텐츠.
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
                      d="M9 19v-6a2 2 0 00-2-2H5v8h4zm6 0V9a2 2 0 00-2-2h-2v12h4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  검증된 합격데이터
                </h3>
                <p className="text-gray-600">
                  17,000건의 입사서류와 30,000건 이상의 취업데이터로 분석된 합격
                  기준 제공.
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
                      d="M7 8h10M7 12h4m1 8l-4-4H5v-8h14v8h-3l-4 4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  회원 후기·피드백
                </h3>
                <p className="text-gray-600">
                  컨설팅 회원들의 실제 후기와 커리어 피드백이 반영되는 참여형
                  커뮤니티 운영.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
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
          <Link href="/posts" className="btn-primary">
            Try Again
          </Link>
        </div>
      </div>
    );
  }
}
