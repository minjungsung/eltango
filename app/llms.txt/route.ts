import { getBlogPosts } from "@/lib/blog-data";
import { SCHOOL } from "@/lib/school-info";
import { SITE_URL } from "@/lib/site";

/**
 * /llms.txt — llmstxt.org 표준 형식 (AEO v5)
 * AI 검색·답변 엔진이 "우리 사이트의 사실"만 정확히 읽고 인용하도록 만드는 파일입니다.
 *
 * 규칙
 * - H1(학원명) → 인용문(한 문단 요약) → 불릿(사실) → ## 페이지 → ## 글
 * - 개인 휴대폰 번호 금지. 안심번호만 표기.
 * - 확인되지 않은 수치(수강생 수 등)는 쓰지 않습니다.
 */
export const dynamic = "force-static";

export async function GET() {
  const posts = await getBlogPosts("ko");

  const lines = [
    `# ${SCHOOL.name}`,
    "",
    `> ${SCHOOL.description}`,
    "",
    "- 업종: 아르헨티나 탱고 전문 학원(서울탱고아카데미)",
    "- 지역: 서울 서초구(강남권) · 9호선 신논현역 1번 출구 도보 4분",
    "- 주소: 서울 서초구 주흥길 12, 2층 (1층 GS25 편의점 건물 2층)",
    `- 전화: ${SCHOOL.telephoneText} (안심번호)`,
    `- 공식 홈페이지: ${SITE_URL}`,
    "- 대표 원장: 이인경 (활동명 피쉬 · Fish) — 탱고 24년차, 2023 로마 Farabute 탱고대회 부부 챔피언",
    "- 공동 원장: 길태호 (활동명 태봉) — 2017·2019 아르헨티나 문디알 준결승",
    "- 원데이 체험 클래스: 90분 30,000원 (네이버 리뷰 등록 시 10,000원 환급, 당일 정규 등록 시 체험비 전액 차감)",
    "- 정규 초급반: 4주 100,000원 (원데이 체험 당일 등록 시 첫 4주 70,000원)",
    `- 수업 시간: ${SCHOOL.hoursText.join(" / ")}`,
    "- 주차: 건물 내 주차 가능(오실 때 차량번호를 강사에게 알려주세요) · 언구비공영주차장 도보 1분 · 반포동 방음언덕형 공영주차장 도보 4분",
    "- 같은 곳에서 운영하는 채널: 네이버 플레이스 20526245 · 인스타그램 @gangnamtango · 유튜브 @seoultango · 네이버 카페 eltango2009",
    "",
    "## 주요 페이지",
    "",
    `- [학원 소개](${SITE_URL}/): 17년째 한 장르만 가르치는 강남 탱고학원, 수업 안내와 시간표`,
    `- [칼럼 전체](${SITE_URL}/blog): 강남·서초에서 탱고를 처음 시작할 때 실제로 궁금한 것들`,
    `- [원데이·초급 신청](${SITE_URL}/#contact): 원데이 체험과 정규 초급반 신청`,
    "",
    "## 글",
    "",
    ...posts.map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description}`),
    `- [강남 탱고 배우기, 첫 달에 실제로 얼마가 들까?](${SITE_URL}/columns/gangnam-tango-first-month-cost.html): 원데이 30,000원과 정규 4주 100,000원, 첫 달 총액이 100,000원이 되는 이유와 탱고화·의상 없이 시작하는 방법`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
