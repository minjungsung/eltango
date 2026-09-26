# Components

## 컴포넌트 아키텍처 개요

엘땅고의 컴포넌트는 크게 세 계층으로 나뉩니다:

```
┌─────────────────────────────────────────────┐
│              페이지 컴포넌트                   │
│  app/[locale]/main-page.tsx                 │
│  app/[locale]/sns/sns-page.tsx              │
├─────────────────────────────────────────────┤
│          기능 컴포넌트 (components/)          │
│  sections.tsx, register-form.tsx,           │
│  navbar.tsx, naver-map.tsx,                 │
│  full-page-scroll.tsx, language-switcher.tsx │
├─────────────────────────────────────────────┤
│          기본 UI 컴포넌트 (components/ui/)    │
│  button, card, input, label, textarea,     │
│  accordion, badge, copy-button             │
└─────────────────────────────────────────────┘
```

## sections.tsx — 메인 섹션 컴포넌트

이 파일은 메인 페이지를 구성하는 10개의 섹션 컴포넌트를 export합니다:

### Hero (슬라이드 1)
- 메인 히어로 영역: 타이틀, 서브타이틀, CTA 버튼 3개
- CTA: 카카오톡 오픈채팅, 네이버 카페, 수강 등록 폼 앵커
- 오른쪽에 탱고 커플 이미지 (md 이상에서 표시)
- `useTranslations("hero")`로 모든 텍스트 국제화

### Features (슬라이드 2 — WhyStay)
- 탱고의 가치를 설명하는 카드 목록
- 아이콘 + 제목 + 설명 구조

### BeginnerClass (슬라이드 3)
- 초급반 커리큘럼 소개
- 카드 기반 레이아웃

### About (슬라이드 4)
- 학원 소개, 역사, 철학

### Difference (슬라이드 5)
- 엘땅고만의 차별점

### Director (슬라이드 6)
- 강사진 소개
- 강사 사진 (`/images/fish.jpg`, `/images/taebong.jpg`, `/images/nenia.png`)

### Testimonials (슬라이드 7)
- 수강생 후기
- 카드 슬라이더 형태

### SNS (슬라이드 8)
- SNS 링크 및 갤러리

### Contact (슬라이드 9)
- `RegisterForm` 컴포넌트를 포함하는 수강 등록 섹션

### Footer (슬라이드 10)
- 주소, 연락처, 네이버 지도
- `NaverMap` 컴포넌트 포함

## register-form.tsx — 수강 등록 폼

클라이언트 컴포넌트 (`"use client"`)로 폼 상태를 관리합니다.

### Props

```typescript
interface RegisterFormProps {
  source?: string;  // 등록 출처 (기본값: "web")
}
```

### 상태 관리

| 상태 | 타입 | 설명 |
|------|------|------|
| `name` | `string` | 이름 |
| `phone` | `string` | 전화번호 (자동 포맷팅) |
| `memo` | `string` | 메모 (토글로 표시/숨김) |
| `showMemo` | `boolean` | 메모 필드 표시 여부 |
| `consent` | `boolean` | 개인정보 수집 동의 |
| `status` | `Status` | `"idle" \| "submitting" \| "success" \| "error"` |
| `errorMsg` | `string` | 에러 메시지 |

### 전화번호 포맷팅

`formatKoreanPhone()` 함수가 실시간으로 한국식 전화번호 포맷을 적용합니다:
- `02-xxx-xxxx` (서울 지역번호)
- `0xx-xxx-xxxx` (일반 지역번호)
- `010-xxxx-xxxx` (휴대폰)

### 클라이언트 사이드 검증

1. 이름: 빈 값 체크
2. 전화번호: 숫자만 추출 후 9자리 이상 확인
3. 동의: 체크박스 필수

### 제출 흐름

```
1. handleSubmit() 호출
2. 클라이언트 검증 통과
3. status = "submitting"
4. POST /api/register (JSON)
5. 성공 → status = "success" → 0.8초 후 카카오톡 리다이렉트
6. 실패 → status = "error" + 에러 메시지 표시
```

### 접근성

- `<Label htmlFor>` 연결
- `aria-label` 제공
- 커스텀 체크박스에 `sr-only` 실제 input 포함
- `type="tel"`, `inputMode="numeric"` 모바일 키패드 최적화
- 모든 인터랙티브 요소에 `disabled` 상태 처리

## navbar.tsx — 네비게이션 바

- 상단 고정 (`sticky top-0`)
- backdrop-blur 배경
- 데스크탑: 가로 네비게이션 링크 + CTA 버튼
- 모바일: 햄버거 메뉴 토글
- 6개 섹션 링크: about, beginner, director, reviews, sns, location
- `navigateToSection(hash)` — FullPageScroll에 커스텀 이벤트로 섹션 이동 요청

## naver-map.tsx — 네이버 지도

- 서초구 주흥길 12 좌표 (`37.4835, 127.0085`)
- `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` 환경변수로 API 키 관리
- **API 키 있는 경우:** Naver Maps SDK 동적 로드 → 인터랙티브 지도 + 마커
- **API 키 없는 경우:** 정적 지도 이미지 + 네이버 지도 링크 오버레이
- 스크립트 중복 로드 방지 로직 포함

## full-page-scroll.tsx — 풀페이지 스크롤

10개 섹션을 스냅 스크롤로 전환하는 커스텀 엔진입니다.

### 주요 기능

| 기능 | 구현 방식 |
|------|----------|
| 마우스 스크롤 | `wheel` 이벤트 감지 |
| 터치 스와이프 | `touchstart` + `touchend` delta 계산 |
| 키보드 | Arrow Up/Down, Page Up/Down, Home/End |
| 외부 네비게이션 | `CustomEvent("fp-navigate")` |
| 애니메이션 | CSS `transform: translateY()` + `transition` |
| 잠금 | `animatingRef`로 전환 중 입력 무시 |

### 외부 API

```typescript
// 다른 컴포넌트에서 특정 섹션으로 이동
import { navigateToSection } from "@/components/full-page-scroll";
navigateToSection("register"); // "register" 섹션으로 이동
```

## language-switcher.tsx — 언어 전환

- 현재 locale의 반대 언어로 전환 (`ko` ↔ `en`)
- `useRouter().replace()`로 locale 변경
- `NEXT_LOCALE` 쿠키 설정 (1년 유효)
- `useTransition()`으로 전환 중 로딩 상태 처리
- Globe 아이콘 + 전환 대상 언어 텍스트

## UI 컴포넌트 (components/ui/)

shadcn/ui 스타일의 기본 UI 컴포넌트입니다. Radix UI 프리미티브 + Tailwind CSS + class-variance-authority로 구성됩니다.

| 컴포넌트 | 기반 | 주요 변형 (variants) |
|----------|------|---------------------|
| `Button` | Radix Slot | default, outline, ghost, link / sm, lg |
| `Card` | div | CardHeader, CardContent, CardFooter |
| `Input` | input | 기본 스타일링 |
| `Label` | Radix Label | 기본 스타일링 |
| `Textarea` | textarea | 기본 스타일링 |
| `Accordion` | Radix Accordion | Item, Trigger, Content |
| `Badge` | span | default, secondary, outline, destructive |
| `CopyButton` | Button | 클립보드 복사 + 피드백 |

### 스타일링 유틸리티

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

`cn()` 함수는 조건부 클래스 이름 합성 + Tailwind 클래스 충돌 해결을 처리합니다.
