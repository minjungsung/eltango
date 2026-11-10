import React from 'react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '엘땅고 아르헨티나 탱고 칼럼 & AEO 가이드 | 강남본점',
  description: '크루즈 선상 파티 댄스, 4050 척추 교정 웰니스, 탱고 슈즈 선택법, 수강료 및 기간 총정리. 24년 경력 이인경 원장의 전문 칼럼.',
};

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-serif italic text-primary mb-2">EL TANGO Column & Guide</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            아르헨티나 탱고 전문 칼럼 & 입문 가이드
          </h1>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base">
            24년 차 챔피언 이인경 원장이 전하는 탱고의 품격, 체형 교정 웰니스, 2027 크루즈 여행 준비
          </p>
        </div>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="glass-card rounded-2xl p-6 transition-all hover:border-primary/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">
                  {post.category}
                </span>
                <time className="text-xs text-muted-foreground">{post.date}</time>
              </div>
              <h2 className="text-xl font-bold text-foreground hover:text-primary transition-colors mb-2">
                <Link href={`/${locale}/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                {post.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs text-muted-foreground/80">
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  칼럼 읽기 →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center border-t border-border/30 pt-8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium border bg-background hover:bg-foreground/10 h-10 px-6 text-foreground"
          >
            ← 엘땅고 메인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
