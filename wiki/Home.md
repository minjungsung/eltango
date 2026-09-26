# 엘땅고 (El Tango) — Wiki

> Buenos Aires Style Argentine Tango Studio 랜딩페이지

## 프로젝트 개요

엘땅고는 서울 강남에 위치한 아르헨티나 탱고 학원의 공식 웹사이트입니다. 수강 문의 등록, 학원 소개, 강사 소개, 수강 후기 등의 정보를 제공하며, 한국어와 영어 두 가지 언어를 지원합니다.

**라이브 사이트:** [eltango.vercel.app](https://eltango.vercel.app)

## 기술 스택

| 카테고리 | 기술 |
|----------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS |
| UI 컴포넌트 | shadcn/ui 스타일 (Radix UI 기반) |
| 국제화 (i18n) | next-intl v4 |
| 테마 | next-themes (다크 모드 고정) |
| 아이콘 | Lucide React |
| 폰트 | Playfair Display (Google Fonts, serif) |
| 지도 | Naver Maps API |
| 백엔드 연동 | Google Apps Script → Google Sheets |
| 배포 | Vercel (main 브랜치 push 시 자동 배포) |

## 주요 기능

- **풀페이지 스크롤** — 10개 섹션을 스냅 스크롤로 네비게이션
- **수강 등록 폼** — 이름, 전화번호, 메모 입력 → Google Sheets 저장 → 카카오톡 오픈채팅 리다이렉트
- **한/영 국제화** — 모든 UI 텍스트가 `messages/ko.json`, `messages/en.json`에서 관리됨
- **네이버 지도 연동** — API 키 있으면 인터랙티브 지도, 없으면 정적 이미지 폴백
- **반응형 디자인** — 모바일/태블릿/데스크탑 대응
- **SEO / OG 메타** — locale별 동적 메타데이터 생성

## Wiki 목차

| 페이지 | 내용 |
|--------|------|
| [Architecture](Architecture) | Next.js App Router 구조, 라우팅, 서버/클라이언트 분리, Google Sheets 연동 흐름 |
| [Setup Guide](Setup-Guide) | 로컬 개발환경, 환경변수, Vercel 배포 |
| [Components](Components) | 주요 컴포넌트 상세 설명 |
| [i18n](i18n) | 국제화 구조, next-intl 설정, 번역 파일 관리 |

## 프로젝트 구조

```
eltango/
├── app/
│   ├── [locale]/          # locale 기반 동적 라우팅
│   │   ├── layout.tsx     # locale별 레이아웃 (메타, 폰트, 테마)
│   │   ├── page.tsx       # 메인 페이지 엔트리
│   │   ├── main-page.tsx  # 풀페이지 스크롤 + 섹션 조합
│   │   └── sns/           # SNS 전용 페이지
│   ├── api/
│   │   └── register/route.ts  # 등록 API (서버 사이드)
│   └── globals.css        # CSS 변수, 다크 테마
├── components/
│   ├── sections.tsx       # Hero, Features, About, Contact 등 10개 섹션
│   ├── register-form.tsx  # 수강 등록 폼 (클라이언트 컴포넌트)
│   ├── navbar.tsx         # 상단 네비게이션 바
│   ├── naver-map.tsx      # 네이버 지도 위젯
│   ├── full-page-scroll.tsx  # 풀페이지 스냅 스크롤 엔진
│   ├── language-switcher.tsx # 한/영 전환 버튼
│   ├── mobile-cta.tsx     # 모바일 하단 CTA 버튼
│   ├── theme-provider.tsx # 다크 테마 프로바이더
│   └── ui/                # shadcn 스타일 기본 컴포넌트
│       ├── accordion.tsx, badge.tsx, button.tsx, card.tsx
│       ├── copy-button.tsx, input.tsx, label.tsx, textarea.tsx
├── i18n/
│   ├── routing.ts         # 지원 locale, 기본값, prefix 전략
│   ├── request.ts         # 서버 사이드 locale 결정 로직
│   └── navigation.ts      # locale-aware Link, redirect, useRouter
├── messages/
│   ├── ko.json            # 한국어 번역
│   └── en.json            # 영어 번역
├── lib/
│   └── utils.ts           # cn() 유틸리티 (clsx + tailwind-merge)
├── public/images/         # 정적 이미지 (강사 사진, 지도 등)
├── next.config.mjs        # next-intl 플러그인, 이미지 설정
├── tailwind.config.ts     # Tailwind 커스텀 설정
└── package.json           # 의존성 및 스크립트
```
