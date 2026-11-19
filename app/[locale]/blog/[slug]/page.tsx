import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { BlogFaq } from "@/components/blog-faq";
import { BlogMarkdown } from "@/components/blog-markdown";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, StructuredData } from "@/components/json-ld";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { blogPosts, getBlogPosts } from "@/lib/blog-data";
import { OG_SIZE, ogImageFor } from "@/lib/og-images";
import {
  BEGINNER_FORM_URL,
  CRUISE_REGISTRATION_URL,
  NAVER_PLACE_URL,
  SCHOOL_ID,
  SITE_URL,
  localizedAlternates,
  localizedUrl,
} from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const post = (await getBlogPosts(locale)).find((item) => item.slug === slug);
  if (!post) notFound();
  const t = await getTranslations({ locale, namespace: "blog" });
  const url = localizedUrl(locale, `/blog/${slug}`);
  const image = ogImageFor(slug);

  return {
    title: `${post.title} | El Tango`,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: url,
      languages: localizedAlternates(`/blog/${slug}`),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      locale: locale === "ko" ? "ko_KR" : "en_US",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [t("authorName")],
      // v5: 글마다 다른 1200×630 카드 (public/og/{slug}.png)
      images: [{ url: image, ...OG_SIZE, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const [t, posts] = await Promise.all([
    getTranslations({ locale, namespace: "blog" }),
    getBlogPosts(locale),
  ]);
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();

  const isKo = locale === "ko";
  const ctaHref = post.cta === "cruise" ? CRUISE_REGISTRATION_URL : BEGINNER_FORM_URL;
  const ctaLabel = post.cta === "cruise" ? t("ctaCruise") : t("ctaForm");
  const url = localizedUrl(locale, `/blog/${slug}`);
  const image = ogImageFor(slug);

  const crumbs = [
    { label: isKo ? "홈" : "Home", href: "/" },
    { label: isKo ? "칼럼" : "Column", href: "/blog" },
    { label: post.title },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: locale,
        mainEntityOfPage: url,
        url,
        image: [image],
        keywords: post.tags.join(", "),
        articleSection: post.category,
        author: {
          "@type": "Person",
          name: t("authorName"),
          jobTitle: t("authorRole"),
          worksFor: { "@id": SCHOOL_ID },
        },
        publisher: {
          "@type": "Organization",
          "@id": SCHOOL_ID,
          name: "엘땅고 강남본점",
          // 구글 Article 필수 항목(publisher.logo) — 기존 누락분 보강
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/og/logo.png`,
            width: 512,
            height: 512,
          },
        },
      },
      ...(post.faq.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              inLanguage: locale,
              mainEntity: post.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:px-6 lg:px-8">
      <StructuredData data={schema} />
      <BreadcrumbJsonLd
        id={`${url}#breadcrumb`}
        items={[
          { name: isKo ? "홈" : "Home", url: localizedUrl(locale, "/") },
          { name: isKo ? "칼럼" : "Column", url: localizedUrl(locale, "/blog") },
          { name: post.title, url },
        ]}
      />
      <article className="mx-auto max-w-3xl">
        <Breadcrumbs items={crumbs} />
        <header className="mb-8">
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {post.category}
            </span>
            <time dateTime={post.date} className="text-xs text-muted-foreground">
              {post.date}
            </time>
            <span className="text-xs text-muted-foreground">
              {t("author", { name: t("authorName") })}
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {post.description}
          </p>
        </header>
        <div className="glass-card mb-10 rounded-2xl p-6 sm:p-8">
          <BlogMarkdown content={post.content} />
        </div>
        <BlogFaq items={post.faq} title={t("faqTitle")} />
        <section className="glass-card my-12 rounded-2xl border-primary/40 bg-primary/5 p-8 text-center">
          <h2 className="mb-2 text-xl font-bold text-primary">{t("ctaTitle")}</h2>
          <p className="mb-6 text-sm text-muted-foreground">{t("ctaDescription")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              {ctaLabel}
            </a>
            <a
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center rounded-md border border-primary px-6 py-2 text-sm font-medium text-primary hover:bg-primary/10"
            >
              {t("ctaPlace")}
            </a>
          </div>
        </section>
        <footer className="flex items-center justify-between border-t border-border/30 pt-6 text-xs text-muted-foreground">
          <Link href="/blog" className="hover:text-primary">
            {t("backToBlog")}
          </Link>
          <Link href="/" className="hover:text-primary">
            {t("home")}
          </Link>
        </footer>
      </article>
    </main>
  );
}
