import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { StructuredData } from "@/components/json-ld";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { blogPosts, getBlogPosts } from "@/lib/blog-data";
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
  return {
    title: `${post.title} | El Tango`,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: localizedUrl(locale, `/blog/${slug}`),
      languages: localizedAlternates(`/blog/${slug}`),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: localizedUrl(locale, `/blog/${slug}`),
      locale: locale === "ko" ? "ko_KR" : "en_US",
      publishedTime: post.date,
      authors: [t("authorName")],
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
  const ctaHref =
    post.cta === "cruise" ? CRUISE_REGISTRATION_URL : BEGINNER_FORM_URL;
  const ctaLabel = post.cta === "cruise" ? t("ctaCruise") : t("ctaForm");
  const url = localizedUrl(locale, `/blog/${slug}`);
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
        image: `${SITE_URL}/images/main.png`,
        author: {
          "@type": "Person",
          name: t("authorName"),
          jobTitle: t("authorRole"),
        },
        publisher: { "@id": SCHOOL_ID },
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
      <article className="mx-auto max-w-3xl">
        <header className="mb-8">
          <Link
            href="/blog"
            className="text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            {t("backToBlog")}
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {post.category}
            </span>
            <time
              dateTime={post.date}
              className="text-xs text-muted-foreground"
            >
              {post.date}
            </time>
            <span className="text-xs text-muted-foreground">
              {t("author", { name: t("authorName") })}
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {post.title}
          </h1>
        </header>
        <div className="glass-card mb-10 space-y-4 rounded-2xl p-6 text-sm leading-relaxed text-foreground/90 sm:p-8 sm:text-base">
          <Markdown
            components={{
              h2: ({ children }) => (
                <h2 className="mb-4 mt-8 text-2xl font-bold first:mt-0">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-3 mt-6 text-xl font-semibold">{children}</h3>
              ),
              p: ({ children }) => <p className="my-4">{children}</p>,
              ul: ({ children }) => (
                <ul className="my-4 list-disc space-y-2 pl-6">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="my-4 list-decimal space-y-2 pl-6">{children}</ol>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">
                  {children}
                </strong>
              ),
            }}
          >
            {post.content}
          </Markdown>
        </div>
        {post.faq.length > 0 && (
          <section className="mb-10 mt-12" aria-labelledby="faq-title">
            <h2
              id="faq-title"
              className="mb-6 text-xl font-bold text-foreground"
            >
              {t("faqTitle")}
            </h2>
            <div className="space-y-4">
              {post.faq.map((faq) => (
                <div key={faq.question} className="glass-card rounded-xl p-5">
                  <h3 className="mb-2 text-sm font-semibold text-primary sm:text-base">
                    {t("question", { text: faq.question })}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t("answer", { text: faq.answer })}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
        <section className="glass-card my-12 rounded-2xl border-primary/40 bg-primary/5 p-8 text-center">
          <h2 className="mb-2 text-xl font-bold text-primary">
            {t("ctaTitle")}
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            {t("ctaDescription")}
          </p>
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
