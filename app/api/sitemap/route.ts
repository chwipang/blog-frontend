export const runtime = "nodejs";

import { getPosts } from "@/lib/api";
import { NextResponse } from "next/server";

/**
 * 동적 sitemap.xml 생성 API Route
 *
 * 이 엔드포인트는 런타임에 동적으로 sitemap을 생성합니다.
 * Next.js 빌드 시 백엔드에 접근할 수 없을 때 이 방법을 사용하세요.
 *
 * 사용법:
 * 1. robots.txt에서 sitemap URL을 /api/sitemap으로 변경
 * 2. 또는 app/sitemap.ts 대신 이 route를 사용
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  console.log(baseUrl);
  try {
    // 모든 포스트 가져오기
    const { posts } = await getPosts(1, 100);

    // XML sitemap 생성
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
              xmlns:xhtml="http://www.w3.org/1999/xhtml"
              xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
              xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
              xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
        <url>
          <loc>${baseUrl}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
        <url>
          <loc>${baseUrl}/about</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
        <url>
          <loc>${baseUrl}/posts</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.9</priority>
        </url>
      ${posts
        .map(
          (post) => `  <url>
          <loc>${baseUrl}/posts/${post.slug}</loc>
          <lastmod>${new Date(post.published_at).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>`
        )
        .join("\n")}
      </urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("[Dynamic Sitemap] Failed to generate sitemap:", error);

    // 에러 발생 시 최소한의 sitemap 반환
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/posts</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

    return new NextResponse(fallbackSitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=60, s-maxage=60",
      },
    });
  }
}
