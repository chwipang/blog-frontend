import { MetadataRoute } from 'next'
import { getPosts } from '@/lib/api'

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

    // 포스트 페이지들
    const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.published_at),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    return [...staticPages, ...postPages]
  } catch (error) {
    console.error('Failed to fetch posts for sitemap:', error)
    // 에러 발생 시 정적 페이지만 반환
    return staticPages
  }
}
