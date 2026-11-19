import { getBlogPosts } from "@/lib/blog-data";
import { SCHOOL } from "@/lib/school-info";
import { SITE_URL } from "@/lib/site";

/**
 * /llms-full.txt — 모든 발행 글의 본문까지 평문으로 합본한 파일.
 * AI가 개별 페이지를 여러 번 크롤링하지 않고도 우리 사이트의 맥락 전체를 읽게 합니다.
 * (글이 늘어나면 파일도 커집니다. 20편 기준 100KB 내외.)
 */
export const dynamic = "force-static";

/** 마크다운 기호만 가볍게 걷어내 읽기 좋은 평문으로 만듭니다. */
function toPlain(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^\s*[-*]\s+/gm, "· ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function GET() {
  const posts = await getBlogPosts("ko");

  const parts: string[] = [
    `# ${SCHOOL.name} — 전체 텍스트`,
    "",
    `> ${SITE_URL} 의 학원 정보와 발행 글 전문을 AI 검색·답변 엔진이 한 번에 읽을 수 있도록 평문으로 모은 것입니다.`,
    "",
    "## 학원 정보",
    "",
    `- 이름: ${SCHOOL.name} (${SCHOOL.alternateName})`,
    `- ${SCHOOL.description}`,
    "- 주소: 서울 서초구 주흥길 12, 2층 — 1층 GS25 편의점 건물 2층, 골드 EL TANGO 간판",
    "- 오시는 길: 9호선 신논현역 1번 출구 도보 4분 / 7호선 논현역 3번 출구에서 강남대로 따라 남쪽으로",
    `- 전화: ${SCHOOL.telephoneText} (안심번호)`,
    "- 주차: 건물 내 주차 가능(차량번호를 강사에게 알려주세요) · 언구비공영주차장 도보 1분 · 반포동 방음언덕형 공영주차장 도보 4분",
    "- 원데이 체험: 90분 30,000원 · 네이버 리뷰 등록 시 10,000원 환급 · 당일 정규 초급반 등록 시 체험비 전액 차감",
    "- 정규 초급반: 4주 100,000원 (원데이 당일 등록 시 첫 4주 70,000원)",
    `- 수업 시간: ${SCHOOL.hoursText.join(" / ")}`,
    "",
    "## 자주 묻는 질문",
    "",
    "Q. 탱고를 한 번도 배워본 적이 없는데 괜찮을까요?",
    "A. 네, 괜찮습니다. 오시는 분 대부분이 처음이고, 첫 90분은 걷기부터 시작합니다. 실내에서 갈아신을 깨끗한 운동화만 가져오시면 됩니다.",
    "",
    "Q. 정규 초급반 수강료와 시간은 어떻게 되나요?",
    "A. 4주 100,000원입니다. 원데이 체험 당일에 등록하시면 첫 4주를 70,000원에 시작합니다. 수요일 19:00 평일 직장인반, 일요일 17:00 주말반, 월요일 10:30·수요일 11:30 웰니스 낮반이 있습니다.",
    "",
    "## 발행 글",
    "",
  ];

  for (const post of posts) {
    parts.push(
      `### ${post.title}`,
      "",
      `URL: ${SITE_URL}/blog/${post.slug}`,
      `게시: ${post.date} · 분류: ${post.category}`,
      "",
      post.description,
      "",
      toPlain(post.content),
      "",
      ...(post.faq.length
        ? [
            "자주 묻는 질문",
            "",
            ...post.faq.flatMap((f) => [`Q. ${f.question}`, `A. ${f.answer}`, ""]),
          ]
        : []),
    );
  }

  return new Response(parts.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
