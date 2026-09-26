# Architecture

## Next.js App Router 구조

엘땅고는 Next.js 16의 App Router를 사용합니다. 모든 페이지 라우팅은 `app/[locale]/` 디렉토리 아래에서 locale 기반으로 동적 생성됩니다.

### 라우팅 구조

```
app/
├── [locale]/
│   ├── layout.tsx       ← Root layout (locale별 메타데이터, 폰트, 테마)
│   ├── page.tsx         ← 메인 페이지 엔트리 포인트
│   ├── main-page.tsx    ← 클라이언트 컴포넌트 (FullPageScroll)
│   └── sns/
│       ├── page.tsx     ← SNS 전용 페이지
│       └── sns-page.tsx
├── api/
│   └── register/
│       └── route.ts     ← 등록 API Route Handler
└── globals.css
```

### URL 패턴

| URL | 설명 |
|-----|------|
| `/` | 한국어 메인 (기본 locale, prefix 생략) |
| `/en` | 영어 메인 |
| `/sns` | SNS 전용 페이지 (한국어) |
| `/en/sns` | SNS 전용 페이지 (영어) |
| `/api/register` | 수강 등록 API |

`localePrefix: "as-needed"` 설정으로 기본 locale(`ko`)은 URL prefix가 생략됩니다.

## 서버 / 클라이언트 컴포넌트 분리

Next.js App Router의 서버 컴포넌트(RSC)와 클라이언트 컴포넌트를 명확하게 분리합니다.

### 서버 컴포넌트 (기본값)

| 파일 | 역할 |
|------|------|
| `app/[locale]/layout.tsx` | 메타데이터 생성, locale 검증, 폰트/테마 설정 |
| `app/[locale]/page.tsx` | 정적 params 생성, MainPage 렌더 |

서버 컴포넌트에서는 `getTranslations()`, `setRequestLocale()` 등 서버 전용 API를 사용합니다.

### 클라이언트 컴포넌트 (`"use client"`)

| 파일 | 이유 |
|------|------|
| `components/sections.tsx` | `useState`, `useTranslations()` 사용 |
| `components/register-form.tsx` | 폼 상태 관리, fetch API 호출 |
| `components/navbar.tsx` | 모바일 메뉴 토글, 네비게이션 이벤트 |
| `components/naver-map.tsx` | `useEffect`, DOM 조작 (지도 SDK) |
| `components/full-page-scroll.tsx` | 스크롤 이벤트, 터치 이벤트 처리 |
| `components/language-switcher.tsx` | `useRouter`, `useTransition` |
| `components/theme-provider.tsx` | next-themes Provider |

## Google Sheets 연동 흐름

수강 등록 폼의 데이터 흐름은 다음과 같습니다:

```
┌─────────────────┐     POST /api/register     ┌──────────────────┐
│   RegisterForm  │ ──────────────────────────► │  API Route       │
│  (Client-side)  │     { name, phone,          │  route.ts        │
│                 │       memo, source,          │  (Server-side)   │
│                 │       consent }              │                  │
└─────────────────┘                             └────────┬─────────┘
                                                         │
                                                         │ POST (서버 → 서버)
                                                         │ GOOGLE_SCRIPT_URL
                                                         ▼
                                                ┌──────────────────┐
                                                │  Google Apps     │
                                                │  Script          │
                                                │  (Web App)       │
                                                └────────┬─────────┘
                                                         │
                                                         │ appendRow()
                                                         ▼
                                                ┌──────────────────┐
                                                │  Google Sheets   │
                                                │  (데이터 저장)    │
                                                └──────────────────┘

응답 흐름:
API Route → { ok: true, redirectUrl: KAKAO_OPENCHAT_URL }
RegisterForm → window.location.href = redirectUrl (카카오톡 오픈채팅)
```

### 보안 설계

1. **`GOOGLE_SCRIPT_URL`은 서버 사이드에만 존재** — `NEXT_PUBLIC_` prefix를 사용하지 않아 클라이언트 번들에 노출되지 않음
2. **API Route가 프록시 역할** — 클라이언트는 `/api/register`만 호출하고, 실제 Google Script URL은 서버에서만 접근
3. **입력 검증** — 서버 사이드에서 이름 길이, 전화번호 형식, 동의 여부를 검증
4. **전화번호 정제** — `sanitizePhone()`으로 숫자와 `+` 외 문자 제거

### 에러 처리

| 에러 코드 | 상황 | HTTP 상태 |
|-----------|------|----------|
| `INVALID_JSON` | 잘못된 요청 본문 | 400 |
| `INVALID_NAME` | 이름 미입력 또는 50자 초과 | 400 |
| `INVALID_PHONE` | 전화번호 9~15자리 미충족 | 400 |
| `CONSENT_REQUIRED` | 개인정보 동의 미체크 | 400 |
| `SERVER_NOT_CONFIGURED` | `GOOGLE_SCRIPT_URL` 미설정 | 500 |
| `UPSTREAM_ERROR` | Google Script 응답 실패 | 502 |
| `NETWORK_ERROR` | 네트워크 연결 오류 | 502 |

## 풀페이지 스크롤 아키텍처

`FullPageScroll` 컴포넌트는 커스텀 스냅 스크롤 엔진으로, 10개 섹션을 관리합니다.

```
섹션 ID 목록:
hero → value → beginner → about → difference → director → reviews → sns → register → location
```

### 동작 방식

1. **마우스 휠 / 터치 스와이프** — `wheel`, `touchstart`, `touchend` 이벤트를 감지하여 섹션 간 이동
2. **커스텀 이벤트** — `navigateToSection(hash)` 함수로 Navbar 등 외부 컴포넌트에서 특정 섹션으로 점프
3. **애니메이션 잠금** — 전환 중 추가 입력을 무시하여 중복 스크롤 방지
4. **CSS Transform** — `translateY`로 전체 컨테이너를 이동 (DOM 리플로우 없이 GPU 가속)

## 정적 빌드 최적화

| 항목 | 설정 |
|------|------|
| `generateStaticParams()` | `["ko", "en"]` locale에 대해 빌드 타임에 정적 페이지 생성 |
| `images.unoptimized: true` | Vercel Image Optimization 비활성화 (외부 이미지 없음) |
| `typedRoutes: true` | 타입 안전 라우팅 |
| `localeDetection: true` | 브라우저 `Accept-Language` 헤더 기반 자동 locale 감지 |
