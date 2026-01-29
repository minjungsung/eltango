# 엘땅고 – Buenos Aires Style Tango

엘땅고의 반응형 랜딩페이지입니다. Next.js 14 (App Router), Tailwind CSS, shadcn 스타일 컴포넌트로 구성되었고 Vercel 배포에 최적화되어 있습니다.

## 로컬 실행

```bash
# 1) 의존성 설치
npm install

# 2) 개발 서버 실행
npm run dev

# 3) 브라우저 열기
# http://localhost:3000
```

## 배포 (Vercel)

```bash
# Vercel CLI가 있다면
npm install -g vercel
vercel
```

- GitHub에 푸시 후 Vercel 연결 시 자동 배포됩니다.

## 커스터마이징 포인트
- 이메일/위치: components/sections.tsx 의 Contact 섹션에서 실제 이메일/지도 링크로 교체하세요.
- 색상/테마: app/globals.css CSS 변수 및 tailwind.config.ts 참고.
- OG 메타: app/layout.tsx 의 metadata 수정.

## 기술 스택
- Next.js 14 (App Router)
- Tailwind CSS
- shadcn 스타일 유틸 (수동 포함: button, card, badge, accordion 등)
- TypeScript, ESLint, Prettier

## 라이선스
사내/개인 프로젝트 용도로 자유롭게 사용하세요.
