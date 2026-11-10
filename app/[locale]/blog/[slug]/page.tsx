import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog-data';
import { Metadata } from 'next';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | 엘땅고 강남본점`,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://eltango.vercel.app/ko/blog/${post.slug}`,
      publishedTime: post.date,
      authors: ['이인경 대표원장'],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const faqSchema = post.faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <article className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href={`/${locale}/blog`}
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            ← 전체 칼럼 목록
          </Link>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">
              {post.category}
            </span>
            <time className="text-xs text-muted-foreground">{post.date}</time>
            <span className="text-xs text-muted-foreground">· 작성자: 이인경 대표원장</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-3 leading-snug">
            {post.title}
          </h1>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8 mb-10 text-foreground/90 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line">
          {post.content}
        </div>

        {post.faq && post.faq.length > 0 && (
          <div className="mt-12 mb-10">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span>❓</span> 자주 묻는 질문 (FAQ)
            </h3>
            <div className="space-y-4">
              {post.faq.map((f, idx) => (
                <div key={idx} className="glass-card rounded-xl p-5">
                  <p className="font-semibold text-primary text-sm sm:text-base mb-2">
                    Q. {f.question}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    A. {f.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Card */}
        <div className="glass-card rounded-2xl p-8 text-center my-12 border-primary/40 bg-primary/5">
          <h3 className="text-xl font-bold text-primary mb-2">
            엘땅고 강남본점에서 우아한 라이프스타일을 시작해 보세요
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-6">
            17년 전통 · 2023 로마 챔피언 직강 · 신논현역 도보 3분 · 온누리상품권 10% 할인
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://dulcenaleo.com/eltango"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-medium bg-primary text-primary-foreground hover:opacity-90 h-10 px-6 rounded-md text-sm"
            >
              2027 크루즈 & 클래스 신청하기
            </a>
            <a
              href="https://m.place.naver.com/place/20526245"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-medium border border-primary text-primary hover:bg-primary/10 h-10 px-6 rounded-md text-sm"
            >
              네이버 플레이스 정보 보기
            </a>
          </div>
        </div>

        <div className="border-t border-border/30 pt-6 flex justify-between items-center text-xs text-muted-foreground">
          <Link href={`/${locale}/blog`} className="hover:text-primary">
            ← 목록으로
          </Link>
          <Link href={`/${locale}`} className="hover:text-primary">
            엘땅고 메인 홈 →
          </Link>
        </div>
      </div>
    </article>
  );
}
