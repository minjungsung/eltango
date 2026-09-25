"use client";

import { useTranslations } from "next-intl";
import { Contact, Footer } from "@/components/sections";

export function SNSPageClient() {
  const t = useTranslations("sns");

  const shorts = [
    "LElgWLGh6NY",
    "_oGGXDz3zWM",
    "I3A6RqWq_2g",
    "PhfbTc9GtTk",
    "WhA0mrus5UU",
  ];

  const socialLinks = [
    { label: t("youtube"), href: "https://www.youtube.com/@seoultango?si=TcnvuLDOZOW0qCmk" },
    { label: t("instagram"), href: "https://www.instagram.com/seoultangoacademy_eltango" },
    { label: t("cafe"), href: "https://cafe.naver.com/eltango2009" },
  ];

  return (
    <div>
      {/* 1. SNS 소개 + 링크 */}
      <div className="container py-12">
        <h1 className="text-center text-3xl font-bold sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-center text-muted-foreground">
          {t("description")}
        </p>
        <div className="mx-auto mt-10 flex max-w-md justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-lg border border-border/50 px-6 py-4 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* 2. YouTube Shorts */}
      <div className="container py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {shorts.map((id) => (
            <div
              key={id}
              className="relative aspect-[9/16] overflow-hidden rounded-xl border border-border/50"
            >
              <iframe
                src={`https://www.youtube.com/embed/${id}?loop=1&playlist=${id}`}
                title="YouTube Short"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. 상담 문의 */}
      <Contact />

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
