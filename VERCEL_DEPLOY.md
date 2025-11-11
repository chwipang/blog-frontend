# Vercel 배포 가이드

AI Blog Frontend를 Vercel에 배포하는 방법입니다.

## 사전 준비

1. ✅ GitHub 계정
2. ✅ Vercel 계정 (무료) - [https://vercel.com](https://vercel.com)
3. ✅ Backend API가 배포되어 있어야 함 (Render 등)

## 1단계: GitHub에 Push

먼저 모든 변경사항을 GitHub에 올립니다:

```bash
cd /home/jung/dev/ai-blog-service/blog-frontend
git status
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

**중요:** `.env.local` 파일이 커밋되지 않았는지 확인하세요!

```bash
git status
# .env.local이 목록에 없어야 합니다
```

## 2단계: Vercel 로그인

1. [Vercel](https://vercel.com) 접속
2. **"Sign Up"** 또는 **"Log In"** 클릭
3. GitHub 계정으로 로그인
4. 필요시 GitHub repository 접근 권한 허용

## 3단계: 새 프로젝트 배포

### 방법 1: Dashboard에서 배포 (권장)

1. **"Add New..."** → **"Project"** 클릭
2. **"Import Git Repository"** 선택
3. GitHub repository 검색: `ai-blog-service`
4. **"Import"** 클릭
5. 프로젝트 설정:

```
Project Name: ai-blog-frontend (원하는 이름)
Framework Preset: Next.js (자동 감지됨)
Root Directory: blog-frontend
Build Command: npm run build (자동 설정)
Output Directory: .next (자동 설정)
Install Command: npm install (자동 설정)
```

6. **아직 Deploy 하지 마세요!** (환경 변수 먼저 설정)

### 방법 2: Vercel CLI 사용

```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 배포
cd blog-frontend
vercel
```

## 4단계: 환경 변수 설정 (매우 중요!)

Deploy 전에 반드시 환경 변수를 설정해야 합니다:

### Dashboard에서 설정

1. **"Environment Variables"** 섹션 펼치기
2. 다음 환경 변수 추가:

```bash
# Backend API URL - YOUR DEPLOYED BACKEND URL!
NEXT_PUBLIC_API_BASE_URL=https://your-backend.onrender.com/api

# Site URL - Will be provided by Vercel after first deploy
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app

# Site Metadata
NEXT_PUBLIC_SITE_NAME=AI Blog
NEXT_PUBLIC_SITE_DESCRIPTION=AI-powered blog with SEO optimization
```

**중요 사항:**
- `NEXT_PUBLIC_API_BASE_URL`을 실제 배포된 백엔드 URL로 변경하세요
- `NEXT_PUBLIC_SITE_URL`은 첫 배포 후 Vercel이 제공하는 URL로 업데이트
- 모든 `NEXT_PUBLIC_*` 변수는 클라이언트에서 접근 가능합니다

### 환경별 설정

각 환경(Production, Preview, Development)에 대해 설정할 수 있습니다:

- **Production**: 실제 프로덕션 배포
- **Preview**: Pull Request 미리보기
- **Development**: 로컬 개발 (vercel dev 사용 시)

일반적으로 모든 환경에 동일한 값을 설정하면 됩니다.

## 5단계: 배포

1. **"Deploy"** 버튼 클릭
2. 배포 프로세스 시작 (2-3분 소요)
3. 빌드 로그 확인:
   ```
   Installing dependencies...
   Building Next.js application...
   Collecting page data...
   Finalizing build...
   ```

## 6단계: 배포 확인

### 앱 URL 확인

배포 완료 후 자동 생성된 URL:
```
https://your-project.vercel.app
```

또는 커스텀 도메인 연결 가능!

### 테스트

1. 브라우저에서 앱 URL 접속
2. 홈페이지가 정상적으로 로드되는지 확인
3. Blog 포스트 목록이 표시되는지 확인
4. 포스트 상세 페이지 접속 테스트
5. 댓글 기능 테스트

### API 연결 확인

브라우저 개발자 도구 (F12) → Network 탭:
- Backend API 호출이 성공하는지 확인
- 200 OK 응답이 오는지 확인

## 자주 발생하는 문제

### 문제 1: Build Failed

**에러:**
```
Error: Failed to compile
Module not found: Can't resolve '...'
```

**해결:**
1. 로컬에서 빌드 테스트:
   ```bash
   npm run build
   ```
2. 에러 수정 후 push
3. Vercel이 자동으로 재배포

### 문제 2: API 연결 실패

**에러:**
```
Failed to fetch
Network Error
```

**해결:**
1. 환경 변수에서 `NEXT_PUBLIC_API_BASE_URL` 확인
2. Backend API가 실제로 작동 중인지 확인:
   ```bash
   curl https://your-backend.onrender.com/health
   ```
3. Backend의 CORS 설정 확인:
   ```
   ALLOWED_ORIGINS=https://your-project.vercel.app,*
   ```

### 문제 3: Environment Variables Not Working

**에러:**
```
undefined is not an object
process.env.NEXT_PUBLIC_API_BASE_URL is undefined
```

**해결:**
1. Vercel Dashboard → Project → Settings → Environment Variables
2. 변수 이름이 `NEXT_PUBLIC_`로 시작하는지 확인
3. 변수 저장 후 **Redeploy** 필요:
   - Deployments 탭 → 최신 배포 → ⋯ → Redeploy

### 문제 4: 404 on Page Refresh

**원인:**
SPA 라우팅 문제 (Next.js는 자동 처리하므로 발생하지 않아야 함)

**해결:**
Next.js App Router를 사용 중이라면 자동 처리됩니다. 문제가 계속되면 `vercel.json`의 rewrites 확인.

### 문제 5: Static File Not Found

**에러:**
```
404: /images/logo.png not found
```

**해결:**
1. 파일이 `public/` 디렉토리에 있는지 확인
2. 경로가 `/images/logo.png` 형식인지 확인 (상대 경로 아님)

## 배포 후 설정

### 1. SITE_URL 환경 변수 업데이트

첫 배포 후 Vercel URL을 받으면:

1. Settings → Environment Variables
2. `NEXT_PUBLIC_SITE_URL` 업데이트:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-actual-url.vercel.app
   ```
3. **Redeploy** 클릭

### 2. Backend CORS 업데이트

Backend의 `ALLOWED_ORIGINS`에 Vercel URL 추가:

**Render Dashboard → Backend → Environment Variables:**
```
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-admin.streamlit.app
```

Save 후 backend가 자동으로 재배포됩니다.

### 3. 커스텀 도메인 연결 (선택사항)

Vercel에서 무료로 커스텀 도메인 연결 가능:

1. Settings → Domains
2. "Add" 클릭
3. 도메인 입력 (예: `myblog.com`)
4. DNS 설정 안내에 따라 도메인 설정
   - A Record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`
5. 자동 HTTPS 인증서 발급 (무료)

## 자동 배포 설정

Vercel은 기본적으로 Git 통합 자동 배포가 활성화되어 있습니다:

### Production 배포

```bash
git push origin main
```
→ 자동으로 production에 배포

### Preview 배포

```bash
git checkout -b feature/new-feature
git push origin feature/new-feature
```
→ Pull Request 생성 시 자동으로 preview 배포 생성
→ 고유한 URL로 미리보기 가능

### 배포 비활성화

Settings → Git → 자동 배포 끄기 가능

## 성능 최적화

### 1. Image Optimization

Next.js의 Image 컴포넌트 사용:

```jsx
import Image from 'next/image'

<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority
/>
```

### 2. 정적 생성 (SSG)

가능한 경우 Static Site Generation 사용:

```jsx
export async function generateStaticParams() {
  const posts = await fetchPosts()
  return posts.map(post => ({ slug: post.slug }))
}
```

### 3. Caching

Vercel Edge Network가 자동으로 캐싱 처리

### 4. Analytics

Vercel Analytics 활성화 (무료):

1. Settings → Analytics → Enable
2. 페이지 성능 및 방문자 통계 확인

## 모니터링

### Vercel Dashboard

다음 정보 확인 가능:
- 배포 히스토리
- 빌드 로그
- 런타임 로그
- Analytics (페이지 뷰, 성능)
- Web Vitals (Core Web Vitals)

### Deployment 로그

특정 배포 클릭 → Logs에서:
- Build logs
- Function logs
- Edge logs

## Vercel CLI 명령어

```bash
# 로그인
vercel login

# 배포
vercel

# Production 배포
vercel --prod

# 환경 변수 설정
vercel env add NEXT_PUBLIC_API_BASE_URL

# 환경 변수 확인
vercel env ls

# 프로젝트 정보
vercel inspect

# 로그 확인
vercel logs
```

## 비용

### 무료 티어 (Hobby)

- 무제한 개인 프로젝트
- 100GB 대역폭/월
- 자동 HTTPS
- Custom domains
- Preview deployments

### 유료 티어 (Pro)

- $20/월
- 1TB 대역폭/월
- 팀 협업
- 비밀번호 보호
- Analytics 강화

## 보안 체크리스트

배포 전 확인:

- [ ] `.env.local`이 `.gitignore`에 포함됨
- [ ] GitHub에 `.env.local`이 커밋되지 않음
- [ ] Backend CORS가 올바르게 설정됨
- [ ] 모든 API 키가 환경 변수로 관리됨
- [ ] HTTPS 자동 활성화 확인
- [ ] Security headers 설정 (`vercel.json`)

## 다음 단계

1. ✅ Frontend 배포 완료
2. 🔄 Backend CORS 업데이트
3. 🔄 커스텀 도메인 연결 (선택)
4. 🔄 Google Analytics 추가 (선택)
5. 🔄 SEO 최적화
6. 🔄 Performance monitoring

## 유용한 링크

- [Vercel 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [Vercel CLI 문서](https://vercel.com/docs/cli)
- [Next.js on Vercel](https://vercel.com/solutions/nextjs)

## 지원

문제가 발생하면:

1. [Vercel Status](https://vercel-status.com/) 확인
2. Build logs 검토
3. [Vercel Community](https://github.com/vercel/vercel/discussions) 방문
4. [Next.js Discord](https://nextjs.org/discord) 참여

---

**축하합니다!** 🎉
Frontend가 Vercel에 성공적으로 배포되었습니다!

이제 전체 AI Blog Service가 클라우드에서 실행됩니다:
- ✅ Backend: Render
- ✅ Admin: Streamlit Cloud
- ✅ Frontend: Vercel
