import { MetadataRoute } from 'next'
import { getPosts } from '@/lib/api'

// sitemap을 1시간마다 재생성 (ISR)
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // 기본 페이지들
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  try {
    // 모든 포스트 가져오기
    const { posts } = await getPosts(1, 1000)

    console.log(`[Sitemap] Fetched ${posts.length} posts for sitemap generation`)

    // 포스트 페이지들 - 각 개별 포스트 URL 생성
    const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.published_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    return [...staticPages, ...postPages]
  } catch (error) {
    console.error('[Sitemap] Failed to fetch posts for sitemap:', error)
    console.error('[Sitemap] Returning static pages only. Check API_BASE_URL configuration.')
    // 에러 발생 시 정적 페이지만 반환
    return staticPages
  }
}
