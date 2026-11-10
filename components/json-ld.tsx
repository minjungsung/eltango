import { getTranslations } from "next-intl/server";
import { SCHOOL_ID, SITE_URL, localizedUrl } from "@/lib/site";
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

export async function JsonLd({ locale }: { locale: Locale }) {
  const [t, blog] = await Promise.all([
    getTranslations({ locale, namespace: "school" }),
    getTranslations({ locale, namespace: "blog" }),
  ]);
  const schema = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "SportsActivityLocation"],
    "@id": SCHOOL_ID,
    name: t("name"),
    alternateName: t("alternateName"),
    description: t("description"),
    url: localizedUrl(locale),
    image: `${SITE_URL}/images/main.png`,
    telephone: "+82-10-2415-0563",
    address: {
      "@type": "PostalAddress",
      streetAddress: "주흥길 12, 2층",
      addressLocality: "서초구",
      addressRegion: "서울특별시",
      addressCountry: "KR",
    },
    priceRange: "₩₩",
    founder: {
      "@type": "Person",
      name: blog("authorName"),
      jobTitle: blog("authorRole"),
      description: t("founderDescription"),
    },
    sameAs: [
      "https://m.place.naver.com/place/20526245",
      "https://cafe.naver.com/eltango2009",
      "https://www.instagram.com/eltango_seoultangoacademy",
      "https://www.youtube.com/@seoultango",
      "https://dulcenaleo.com/eltango",
    ],
  };

  return <StructuredData data={schema} />;
}
