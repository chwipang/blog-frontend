# Sitemap 구성 가이드

## 개요

이 프로젝트는 **개별 포스트를 포함하는 동적 sitemap**을 자동으로 생성합니다.

## 구현된 Sitemap 방식

### 방식 1: Next.js 13+ App Router Sitemap (권장)

**파일:** `app/sitemap.ts`

**특징:**
- Next.js의 공식 sitemap 기능 사용
- 빌드 시 sitemap.xml 자동 생성
- ISR (Incremental Static Regeneration)로 1시간마다 자동 업데이트
- `/sitemap.xml`로 접근 가능

**포함되는 URL:**
1. 홈페이지: `/`
2. About 페이지: `/about`
3. 포스트 목록: `/posts`
4. **개별 포스트: `/posts/{slug}`** ← 모든 발행된 포스트가 자동으로 포함됨

**작동 방식:**
```typescript
// 1. 백엔드 API에서 모든 포스트 가져오기
const { posts } = await getPosts(1, 1000)

// 2. 각 포스트를 sitemap 엔트리로 변환
const postPages = posts.map((post) => ({
  url: `${baseUrl}/posts/${post.slug}`,
  lastModified: new Date(post.published_at),
  changeFrequency: 'weekly',
  priority: 0.7,
}))

// 3. 정적 페이지와 합쳐서 반환
return [...staticPages, ...postPages]
```

### 방식 2: API Route 기반 동적 Sitemap (대안)

**파일:** `app/api/sitemap/route.ts`

**특징:**
- 완전히 런타임에 동적으로 생성
- 빌드 시 백엔드 접근 불가능할 때 유용
- `/api/sitemap`로 접근 가능
- XML 형식으로 직접 생성

**사용 시기:**
- Vercel 등에서 빌드할 때 백엔드 API에 접근할 수 없는 경우
- 더 세밀한 캐시 제어가 필요한 경우
- sitemap 생성 로직을 완전히 제어하고 싶은 경우

## 설정 확인 사항

### 1. 환경 변수 설정

**`.env.local` 또는 배포 환경 변수:**
```bash
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com/api
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**중요:**
- 빌드 시 백엔드 API에 접근 가능해야 개별 포스트가 sitemap에 포함됩니다
- 로컬 개발 시: `http://localhost:8000/api`
- 배포 환경: 실제 백엔드 도메인 사용

### 2. 백엔드 CORS 설정

**`blog-backend/app/config.py`:**
```python
# 프론트엔드 도메인을 ALLOWED_ORIGINS에 추가
ALLOWED_ORIGINS=https://your-frontend-domain.com,https://vercel.app
```

**`blog-backend/app/main.py`:**
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 3. Robots.txt 설정

**파일:** `app/robots.ts`

```typescript
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,  // 또는 ${baseUrl}/api/sitemap
  }
}
```

## 배포 체크리스트

### Vercel 배포 시

1. **환경 변수 설정** (Project Settings → Environment Variables)
   ```
   NEXT_PUBLIC_API_BASE_URL = https://your-backend.com/api
   NEXT_PUBLIC_SITE_URL = https://your-frontend.vercel.app
   ```

2. **백엔드 CORS 설정**
   - 백엔드 환경 변수에 Vercel 도메인 추가
   - `ALLOWED_ORIGINS=https://your-frontend.vercel.app`

3. **빌드 로그 확인**
   - 빌드 시 sitemap 생성 로그 확인:
   ```
   [Sitemap] Fetched X posts for sitemap generation
   ```
   - 에러가 있다면 백엔드 접근 문제 확인

4. **배포 후 확인**
   ```bash
   # Sitemap 확인
   curl https://your-domain.com/sitemap.xml

   # 개별 포스트가 포함되어 있는지 확인
   curl https://your-domain.com/sitemap.xml | grep "/posts/"

   # Robots.txt 확인
   curl https://your-domain.com/robots.txt
   ```

## 문제 해결

### 문제: Sitemap에 개별 포스트가 없음

**원인:**
- 빌드 시 백엔드 API에 접근할 수 없음
- 환경 변수 `NEXT_PUBLIC_API_BASE_URL`이 잘못 설정됨
- CORS 문제로 API 요청 실패

**해결:**
1. 빌드 로그에서 에러 확인
2. 환경 변수 확인
3. 백엔드 CORS 설정 확인
4. 대안: API Route 방식 (`/api/sitemap`) 사용

### 문제: 구글 서치 콘솔에서 크롤링 실패

**원인:**
- User-Agent 차단
- 인증 미들웨어가 크롤러 차단
- 리다이렉트 루프

**해결:**
1. 백엔드에서 크롤러 User-Agent 허용 확인
2. `/posts/{slug}` 경로가 인증 없이 접근 가능한지 확인
3. 리다이렉트 체인 확인:
   ```bash
   curl -I https://your-domain.com/posts/some-post
   ```

### 문제: 새 포스트가 sitemap에 나타나지 않음

**해결:**
- Sitemap은 1시간마다 자동 갱신됨 (`revalidate = 3600`)
- 즉시 갱신 필요 시:
  1. Vercel: Deployment → Redeploy
  2. 또는 ISR 수동 갱신: `https://your-domain.com/sitemap.xml?revalidate=1`

## 테스트

### 로컬 테스트

1. 백엔드 시작:
   ```bash
   cd blog-backend
   source venv/bin/activate
   uvicorn app.main:app --reload
   ```

2. 프론트엔드 빌드 및 시작:
   ```bash
   cd blog-frontend
   npm run build
   npm start
   ```

3. Sitemap 확인:
   ```bash
   curl http://localhost:3000/sitemap.xml
   ```

### 배포 환경 테스트

```bash
# 1. Sitemap 다운로드
curl https://your-domain.com/sitemap.xml -o sitemap.xml

# 2. 개별 포스트 URL 확인
grep -o "https://your-domain.com/posts/[^<]*" sitemap.xml

# 3. 구글 서치 콘솔에서 sitemap 제출
# - Search Console → Sitemaps → Add new sitemap
# - URL: https://your-domain.com/sitemap.xml

# 4. URL 검사 도구로 개별 포스트 크롤링 요청
# - Search Console → URL Inspection
# - URL: https://your-domain.com/posts/some-post
# - Request Indexing
```

## Google Search Console 설정

1. **Sitemap 제출**
   - URL: `https://your-domain.com/sitemap.xml`

2. **색인 생성 요청**
   - URL 검사 도구 사용
   - 개별 포스트 URL 입력
   - "색인 생성 요청" 클릭

3. **커버리지 확인**
   - 몇 일 후 "커버리지" 보고서에서 색인 상태 확인
   - "제외됨" 항목이 있다면 원인 확인

## 참고 자료

- [Next.js Sitemap Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Google Search Central - Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
