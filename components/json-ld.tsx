import { getTranslations } from "next-intl/server";
import { SCHOOL_ID, SITE_URL, localizedUrl } from "@/lib/site";
import { SCHOOL } from "@/lib/school-info";
import type { Locale } from "@/i18n/routing";

export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/**
 * 전역 엔티티(학원) — AEO v5 확장판
 * - @type 에 DanceSchool · LocalBusiness 를 함께 선언(로컬 검색·지도 계열 인용에 유리)
 * - openingHoursSpecification / geo / hasMap / areaServed / knowsAbout / sameAs 보강
 * - hasOfferCatalog: 수업 3종을 **숫자 가격(priceCurrency KRW)** 으로 제공
 *   (GPTO는 "3만 원" 문자열이라 스키마상 결함 — 우리는 숫자로 넣습니다)
 *
 * ※ 개인 휴대폰 번호는 넣지 않습니다. 안심번호만 사용합니다.
 */
export async function JsonLd({ locale }: { locale: Locale }) {
  const [t, blog] = await Promise.all([
    getTranslations({ locale, namespace: "school" }),
    getTranslations({ locale, namespace: "blog" }),
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@type": [
      "EducationalOrganization",
      "SportsActivityLocation",
      "DanceSchool",
      "LocalBusiness",
    ],
    "@id": SCHOOL_ID,
    name: t("name"),
    alternateName: t("alternateName"),
    description: t("description"),
    url: localizedUrl(locale),
    image: [`${SITE_URL}/og/cover.png`],
    logo: `${SITE_URL}/og/logo.png`,
    telephone: SCHOOL.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SCHOOL.address.streetAddress,
      addressLocality: SCHOOL.address.addressLocality,
      addressRegion: SCHOOL.address.addressRegion,
      postalCode: SCHOOL.address.postalCode,
      addressCountry: SCHOOL.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SCHOOL.geo.latitude,
      longitude: SCHOOL.geo.longitude,
    },
    hasMap: "https://m.place.naver.com/place/20526245",
    areaServed: SCHOOL.areaServed.map((name) => ({ "@type": "Place", name })),
    priceRange: SCHOOL.priceRange,
    currenciesAccepted: "KRW",
    paymentAccepted: "현금, 카드, 계좌이체, 온누리상품권",
    openingHoursSpecification: SCHOOL.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.opens,
      closes: h.closes,
      name: h.label,
    })),
    founder: {
      "@type": "Person",
      name: blog("authorName"),
      jobTitle: blog("authorRole"),
      description: t("founderDescription"),
    },
    employee: [
      { "@type": "Person", name: "이인경 (피쉬)", jobTitle: "대표 원장" },
      { "@type": "Person", name: "길태호 (태봉)", jobTitle: "공동 원장" },
    ],
    knowsAbout: [...SCHOOL.knowsAbout],
    sameAs: [...SCHOOL.sameAs],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${t("name")} 수업`,
      itemListElement: SCHOOL.offers.map((o) => ({
        "@type": "Offer",
        name: o.name,
        description: o.description,
        price: o.price,
        priceCurrency: "KRW",
        availability: "https://schema.org/InStock",
        url: localizedUrl(locale, o.path),
        itemOffered: {
          "@type": "Service",
          name: o.name,
          provider: { "@id": SCHOOL_ID },
        },
      })),
    },
  };

  return <StructuredData data={schema} />;
}

/** 빵부스러기(BreadcrumbList) — 화면의 <Breadcrumbs> 와 순서·문구를 맞춰 주세요. */
export function BreadcrumbJsonLd({
  items,
  id,
}: {
  items: { name: string; url?: string }[];
  id?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    ...(id ? { "@id": id } : {}),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
  return <StructuredData data={data} />;
}

/** FAQPage — 화면에 보이는 질문·답변과 **글자 단위로 같아야** 합니다. */
export function FaqJsonLd({
  items,
  id,
  locale,
}: {
  items: { question: string; answer: string }[];
  id?: string;
  locale?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(id ? { "@id": id } : {}),
    ...(locale ? { inLanguage: locale } : {}),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return <StructuredData data={data} />;
}
