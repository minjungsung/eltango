import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/blog-data";
import { localizedAlternates, localizedUrl } from "@/lib/site";

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
    },
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const [t, posts] = await Promise.all([
    getTranslations({ locale, namespace: "blog" }),
    getBlogPosts(locale),
  ]);

  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="mb-2 font-serif text-sm italic text-primary">
            {t("eyebrow")}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            {t("description")}
          </p>
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
                <time
                  dateTime={post.date}
                  className="text-xs text-muted-foreground"
                >
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
                    <span
                      key={tag}
                      className="text-xs text-muted-foreground/80"
                    >
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
        <div className="mt-16 border-t border-border/30 pt-8 text-center">
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
