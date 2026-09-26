# Setup Guide

## 사전 요구사항

- **Node.js** 18+ (20 LTS 권장)
- **npm** (Node.js와 함께 설치됨)
- **Git** (소스 코드 관리)

## 로컬 개발환경 세팅

### 1. 저장소 클론

```bash
git clone https://github.com/minjungsung/eltango.git
cd eltango
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성합니다:

```env
# 수강 등록 폼 → Google Sheets 연동 (필수)
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# 등록 완료 후 리다이렉트할 카카오톡 오픈채팅 URL (선택)
NEXT_PUBLIC_KAKAO_OPENCHAT_URL=https://open.kakao.com/o/YOUR_CHAT_ID

# 네이버 지도 API (선택 — 없으면 정적 이미지로 폴백)
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_naver_map_client_id
```

#### 환경변수 상세 설명

| 변수명 | 필수 | 설명 |
|--------|------|------|
| `GOOGLE_SCRIPT_URL` | ✅ | Google Apps Script Web App URL. 수강 등록 데이터를 Google Sheets에 저장. **절대 `NEXT_PUBLIC_` prefix 사용 금지** |
| `NEXT_PUBLIC_KAKAO_OPENCHAT_URL` | ❌ | 등록 완료 후 리다이렉트 URL. 미설정 시 리다이렉트 없이 성공 메시지만 표시 |
| `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` | ❌ | Naver Cloud Platform에서 발급한 Maps API Client ID. 미설정 시 정적 지도 이미지로 대체 |

### 4. Google Apps Script 설정

수강 등록 폼이 정상 동작하려면 Google Apps Script를 설정해야 합니다. 자세한 설정 방법은 프로젝트 루트의 `SETUP_GOOGLE_SHEETS.md` 파일을 참고하세요.

간략한 흐름:
1. Google Sheets에서 스프레드시트 생성
2. Apps Script 에디터에서 `doPost()` 함수 작성 (이름, 전화번호, 메모, 소스, 타임스탬프를 행으로 추가)
3. Web App으로 배포하여 URL 생성
4. 해당 URL을 `GOOGLE_SCRIPT_URL` 환경변수에 설정

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속합니다.

- 한국어: `http://localhost:3000`
- 영어: `http://localhost:3000/en`

## 스크립트 명령어

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (포트 3000, `.next` 캐시 자동 삭제) |
| `npm run build` | 프로덕션 빌드 |
| `npm start` | 빌드된 앱 실행 (포트 3000) |
| `npm run lint` | ESLint 검사 |

## Vercel 배포

### 자동 배포 (권장)

이 프로젝트는 `main` 브랜치에 push하면 Vercel이 자동으로 배포합니다.

```bash
git add .
git commit -m "feat: 새 기능 추가"
git push origin main
# → Vercel이 자동 빌드 + 배포
```

### 수동 배포

```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### Vercel 환경변수 설정

Vercel 대시보드에서 다음 환경변수를 설정해야 합니다:

1. Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
2. 아래 변수 추가:

| 변수명 | Environment |
|--------|------------|
| `GOOGLE_SCRIPT_URL` | Production, Preview |
| `NEXT_PUBLIC_KAKAO_OPENCHAT_URL` | Production, Preview |
| `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` | Production, Preview |

> ⚠️ **주의:** `GOOGLE_SCRIPT_URL`은 `NEXT_PUBLIC_` prefix 없이 설정합니다. 서버 사이드에서만 접근해야 하며, 클라이언트 번들에 노출되면 안 됩니다.

## 네이버 지도 API 발급

1. [Naver Cloud Platform](https://www.ncloud.com/) 가입
2. AI·NAVER API → Application 등록
3. Web Dynamic Map API 활성화
4. 허용 도메인에 `localhost`, `eltango.vercel.app` 추가
5. Client ID를 `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`에 설정

## 트러블슈팅

### 문제: 개발 서버에서 스타일이 깨짐
**해결:** `.next` 캐시를 삭제합니다. `npm run dev`가 자동으로 삭제하지만, 수동으로 하려면:
```bash
rm -rf .next && npm run dev
```

### 문제: 수강 등록 폼 제출 시 "서버 설정 오류"
**해결:** `.env.local`에 `GOOGLE_SCRIPT_URL`이 올바르게 설정되어 있는지 확인합니다.

### 문제: 네이버 지도가 표시되지 않음
**해결:** `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`가 설정되지 않으면 자동으로 정적 이미지로 폴백됩니다. 인터랙티브 지도가 필요하면 Naver Cloud Platform에서 API 키를 발급하세요.

### 문제: iOS Safari에서 폼 입력 시 화면 확대
**해결:** 이미 해결되어 있습니다. 모든 입력 필드가 `text-base` (16px)로 설정되어 iOS Safari의 자동 확대를 방지합니다.
