import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, StructuredData } from "@/components/json-ld";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/blog-data";
import { OG_DEFAULT, OG_SIZE, ogImageFor } from "@/lib/og-images";
import { SCHOOL_ID, SITE_URL, localizedAlternates, localizedUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    alternates: {
      canonical: localizedUrl(locale, "/blog"),
      languages: localizedAlternates("/blog"),
    },
    openGraph: {
      title: t("metadataTitle"),
      description: t("metadataDescription"),
      type: "website",
      url: localizedUrl(locale, "/blog"),
      locale: locale === "ko" ? "ko_KR" : "en_US",
      images: [{ url: OG_DEFAULT, ...OG_SIZE, alt: t("metadataTitle") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadataTitle"),
      description: t("metadataDescription"),
      images: [OG_DEFAULT],
    },
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const [t, posts, school] = await Promise.all([
    getTranslations({ locale, namespace: "blog" }),
    getBlogPosts(locale),
    getTranslations({ locale, namespace: "school" }),
  ]);

  const isKo = locale === "ko";
  const url = localizedUrl(locale, "/blog");

  // AEO v5: 칼럼 목록에 Blog 스키마(blogPost 배열) 추가 — GPTO에서 빠져 있던 항목
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${url}#blog`,
    name: t("title"),
    description: t("metadataDescription"),
    url,
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      "@id": SCHOOL_ID,
      name: school("name"),
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og/logo.png`, width: 512, height: 512 },
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      url: localizedUrl(locale, `/blog/${post.slug}`),
      image: ogImageFor(post.slug),
      author: { "@type": "Person", name: t("authorName") },
    })),
  };

  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:px-6 lg:px-8">
      <StructuredData data={schema} />
      <BreadcrumbJsonLd
        id={`${url}#breadcrumb`}
        items={[
          { name: isKo ? "홈" : "Home", url: localizedUrl(locale, "/") },
          { name: isKo ? "칼럼" : "Column", url },
        ]}
      />
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs
          items={[
            { label: isKo ? "홈" : "Home", href: "/" },
            { label: isKo ? "칼럼" : "Column" },
          ]}
        />
        <div className="mb-12 text-center">
          <p className="mb-2 font-serif text-sm italic text-primary">{t("eyebrow")}</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">{t("description")}</p>
        </div>
        <div className="grid gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="glass-card rounded-2xl p-6 hover:border-primary/50"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {post.category}
                </span>
                <time dateTime={post.date} className="text-xs text-muted-foreground">
                  {post.date}
                </time>
              </div>
              <h2 className="mb-2 text-xl font-bold text-foreground transition-colors hover:text-primary">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs text-muted-foreground/80">
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  {t("readMore")}
                </Link>
              </div>
            </article>
          ))}
        </div>
        {/* AEO v5: RSS·llms.txt 를 화면에도 노출(사람·크롤러 모두 발견 가능) */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
          <a
            href="/rss.xml"
            className="rounded-full border border-border/40 px-3 py-1.5 transition-colors hover:border-primary/40 hover:text-primary"
          >
            RSS
          </a>
          <a
            href="/llms.txt"
            className="rounded-full border border-border/40 px-3 py-1.5 transition-colors hover:border-primary/40 hover:text-primary"
          >
            llms.txt
          </a>
        </div>
        <div className="mt-12 border-t border-border/30 pt-8 text-center">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md border bg-background px-6 text-sm font-medium text-foreground hover:bg-foreground/10"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>
    </main>
  );
}
