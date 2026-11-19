import { SITE_URL } from "@/lib/site";

/**
 * 글별 OG 이미지 경로.
 *
 * v5는 빌드 리스크를 0으로 두기 위해 **발행 시 1200×630 PNG를 미리 만들어**
 * `public/og/{slug}.png`로 커밋하는 방식을 씁니다(동적 라우트·폰트 로딩 없음).
 * 새 글을 쓰면 그 슬러그 이름으로 PNG 한 장을 추가하고 아래 목록에 슬러그를 더하세요.
 */
const OG_SLUGS: readonly string[] = [
  "cruise-2027-tango-preparation",
  "latin-shoes-vs-jazz-sneakers",
  "tango-lesson-cost-duration-guide",
  "office-workers-posture-tango-wellness",
  "tango-vs-salsa-guide",
  "tango-beginner-alone-guide",
  "ballroom-vs-argentine-tango",
  "tango-academy-vs-club-choice",
  "milonga-cabeceo-etiquette",
];

export const OG_DEFAULT = `${SITE_URL}/og/cover.png`;

/** 슬러그 전용 카드가 있으면 그것을, 없으면 기본 커버를 돌려줍니다(404 방지). */
export function ogImageFor(slug: string) {
  return OG_SLUGS.includes(slug) ? `${SITE_URL}/og/${slug}.png` : OG_DEFAULT;
}

export const OG_SIZE = { width: 1200, height: 630 } as const;
