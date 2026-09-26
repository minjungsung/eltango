import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

import { Phone, Mail, MapPin, Heart, Clock, Users } from "lucide-react";
import Image from "next/image";
import { RegisterForm } from "@/components/register-form";
import { NaverMap } from "@/components/naver-map";

/* ─── Hero (Slide 1) ─── */
export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex flex-col overflow-hidden ambient-glow">
      {/* Main hero area */}
      <div className="container flex-1 py-3 sm:py-6">
        <div className="grid items-center gap-6 md:grid-cols-2">
          {/* Left: text */}
          <div>
            <h1 className="font-serif text-4xl leading-[1.2] tracking-tight sm:text-5xl md:text-6xl text-primary whitespace-pre-line md:whitespace-normal">
              {t("titleEn")}
            </h1>
            <p className="mt-6 text-xl text-foreground/90 sm:text-2xl">
              {t("subtitle")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground whitespace-pre-line md:whitespace-normal">
              {t("description")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground whitespace-pre-line md:whitespace-normal">
              {t("sub2")}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="text-base px-6">
                <a href="https://open.kakao.com/o/sVeY3gPi" target="_blank" rel="noopener noreferrer">{t("ctaPrimary")}</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base px-6 border-foreground/30 text-foreground hover:bg-foreground/10"
              >
                <a href="https://cafe.naver.com/eltango2009" target="_blank" rel="noopener noreferrer">{t("ctaSecondary")}</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base px-6 border-foreground/30 text-foreground hover:bg-foreground/10"
              >
                <a href="#register">{t("ctaTertiary")}</a>
              </Button>
            </div>
          </div>
          {/* Right: couple image */}
          <div className="relative hidden aspect-[3/4] overflow-hidden rounded-2xl md:block">
            <Image
              src="/images/main.png"
              alt="탱고 커플"
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={95}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── WhyStay / Tango Value (Slide 2) ─── */
export function Features() {
  const tw = useTranslations("whyStay");
  const items = ["i2", "i3", "i4", "i6", "i8"] as const;

  return (
    <section className="">
      <div className="container">
        <h2 className="text-center text-3xl font-bold sm:text-4xl whitespace-pre-line md:whitespace-normal">
          {tw("title")}
        </h2>
        <p className="mt-2 text-center font-serif text-lg italic text-primary whitespace-pre-line md:whitespace-normal">
          &ldquo;{tw("quote")}&rdquo;
        </p>

        <div className="mx-auto mt-6 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((key) => (
            <div
              key={key}
              className="glass-card rounded-2xl p-3 text-center"
            >
              <p className="text-base font-bold text-primary">
                {tw(`items.${key}.title`)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {tw(`items.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About ─── */
export function About() {
  const t = useTranslations("about");

  return (
    <section className="">
      <div className="container">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <p className="font-serif text-sm italic text-primary">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight whitespace-pre-line md:whitespace-normal sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground whitespace-pre-line md:whitespace-normal">
              {t("description")}
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-8 border-primary/50 text-primary hover:bg-primary/10"
            >
              <a href="https://m.place.naver.com/place/20526245/home" target="_blank" rel="noopener noreferrer">{t("cta")}</a>
            </Button>
          </div>
          <div className="relative aspect-[4/3] w-full max-h-[25vh] md:max-h-[60vh] overflow-hidden rounded-2xl">
            <Image
              src="/images/14194.jpg"
              alt="엘땅고 스튜디오"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Director (Slide 3) ─── */
export function Director() {
  const t = useTranslations("director");
  return (
    <section className="">
      <div className="container">
        <div className="grid items-start gap-4 md:grid-cols-2">
          <div className="relative aspect-[3/4] w-full max-h-[30vh] md:max-h-[70vh] overflow-hidden rounded-2xl">
            <Image
              src="/images/fish.jpg"
              alt="이인경 대표원장"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div>
            <p className="font-serif text-sm italic text-primary">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight whitespace-pre-line md:whitespace-normal sm:text-3xl">
              {t("title")}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground whitespace-pre-line md:whitespace-normal">
              {t("story")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
              {t("achievements")}
            </p>
            <p className="mt-6 text-base font-semibold text-primary whitespace-pre-line md:whitespace-normal">
              {t("philosophy")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Difference (Slide 4) ─── */
export function Difference() {
  const t = useTranslations("difference");
  const tf = useTranslations("features");
  const rows = ["r1", "r2", "r3", "r4", "r5"] as const;
  const featureItems = [
    { key: "f1", icon: <Clock className="h-5 w-5" /> },
    { key: "f2", icon: <MapPin className="h-5 w-5" /> },
    { key: "f3", icon: <Heart className="h-5 w-5" /> },
    { key: "f4", icon: <Users className="h-5 w-5" /> },
  ] as const;

  return (
    <section className="ambient-glow">
      <div className="container">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          {t("title")}
        </h2>

        <div className="mt-6 space-y-6">
          {/* Comparison table */}
          <div className="glass-card mx-auto max-w-2xl overflow-hidden rounded-2xl">
            <div className="grid grid-cols-2 text-center text-sm font-semibold">
              <div className="border-r border-border/30 p-3 text-muted-foreground">
                {t("headers.general")}
              </div>
              <div className="p-3 text-primary">{t("headers.eltango")}</div>
            </div>
            {rows.map((key) => (
              <div
                key={key}
                className="grid grid-cols-2 border-t border-border/20 text-center text-sm"
              >
                <div className="border-r border-border/20 p-3 text-muted-foreground">
                  {t(`rows.${key}.general`)}
                </div>
                <div className="p-3 text-foreground">
                  {t(`rows.${key}.eltango`)}
                </div>
              </div>
            ))}
          </div>

          {/* Feature strip */}
          <div className="mx-auto grid max-w-3xl grid-cols-4 gap-4 place-items-center">
            {featureItems.map(({ key, icon }) => (
              <div key={key} className="glass-card flex flex-col items-center gap-2 rounded-2xl p-3 text-center">
                <div className="flex h-10 w-10 items-center justify-center text-primary">
                  {icon}
                </div>
                <div>
                  <p className="text-sm font-semibold">{tf(`${key}.title`)}</p>
                  <p className="text-xs text-muted-foreground">{tf(`${key}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Beginner Class (Slide 5 intro) ─── */
export function BeginnerClass() {
  const t = useTranslations("beginner");
  const points = [
    { key: "p1", icon: <Clock className="h-5 w-5" /> },
    { key: "p2", icon: <MapPin className="h-5 w-5" /> },
    { key: "p3", icon: <Heart className="h-5 w-5" /> },
  ] as const;

  return (
    <section className="relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid items-center gap-4 md:grid-cols-2 md:gap-12">
          {/* Left: image */}
          <div className="relative aspect-[4/3] w-full max-h-[25vh] md:max-h-[60vh] overflow-hidden rounded-2xl">
            <Image
              src="/images/schedule.png"
              alt="수업 시간표"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          {/* Right: content */}
          <div>
            <p className="font-serif text-sm italic text-primary">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl whitespace-pre-line md:whitespace-normal">
              {t("title")}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground whitespace-pre-line md:whitespace-normal">
              {t("subtitle")}
            </p>
            <div className="mt-8 space-y-3">
              {points.map(({ key, icon }) => (
                <div key={key} className="glass-card flex items-start gap-3 rounded-2xl p-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {t(`points.${key}.title`)}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {t(`points.${key}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Button asChild size="lg" className="px-10 text-base">
                <a href="https://open.kakao.com/o/sVeY3gPi" target="_blank" rel="noopener noreferrer">{t("cta")}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Milonga / Community (Slide 6) ─── */
export function Milonga() {
  const t = useTranslations("milonga");
  return (
    <section className="py-20 sm:py-28">
      <div className="container">
        <div className="grid items-center gap-6 sm:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/community.png"
              alt="밀롱가 우나베스"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div>
            <p className="font-serif text-sm italic text-primary">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl whitespace-pre-line md:whitespace-normal">
              {t("title")}
            </h2>
            <p className="mt-3 text-base font-medium text-foreground/80 whitespace-pre-line md:whitespace-normal">
              {t("subtitle")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground whitespace-pre-line md:whitespace-normal">
              {t("description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials (Slide 2 voices) ─── */
export function Testimonials() {
  const t = useTranslations("testimonials");
  const items = ["t1", "t2", "t3"] as const;

  return (
    <section className="">
      <div className="container">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {t("subtitle")}
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((key) => (
            <div
              key={key}
              className="glass-card rounded-2xl p-5"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t(`${key}.text`)}&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-[#03C75A] text-[10px] font-bold text-white">N</span>
                <span className="text-xs text-muted-foreground">{t(`${key}.author`)}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-foreground/30 text-foreground hover:bg-foreground/10"
          >
            <a href="https://m.place.naver.com/place/20526245/review/visitor" target="_blank" rel="noopener noreferrer">
              {t("cta")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Audience (Slide 7) ─── */
export function Audience() {
  const t = useTranslations("audience");
  const items = ["i1", "i2", "i3", "i4", "i5"] as const;

  return (
    <section className="py-20 sm:py-28">
      <div className="container">
        <h2 className="text-center text-3xl font-bold sm:text-4xl whitespace-pre-line md:whitespace-normal">
          {t("title")}
        </h2>
        <ul className="mx-auto mt-10 max-w-xl space-y-4">
          {items.map((key) => (
            <li key={key} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
              <span className="text-base text-muted-foreground whitespace-pre-line md:whitespace-normal">
                {t(`items.${key}`)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="px-8">
            <a href="#register">{t("ctaPrimary")}</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="px-8 border-primary text-primary hover:bg-primary/10"
          >
            <a href="#register">{t("ctaSecondary")}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ (Slide 5) ─── */
export function FAQ() {
  const t = useTranslations("faq");

  const shorts = [
    "LElgWLGh6NY",
    "_oGGXDz3zWM",
    "I3A6RqWq_2g",
    "PhfbTc9GtTk",
    "WhA0mrus5UU",
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="container">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          {t("title")}
        </h2>

        {/* YouTube Shorts */}
        <div className="mx-auto mt-12 max-w-5xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shorts.map((id) => (
              <div
                key={id}
                className="glass-card relative aspect-[9/16] overflow-hidden rounded-2xl"
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
      </div>
    </section>
  );
}

/* ─── Contact / Register ─── */
/* ─── SNS (Slide 8) ─── */
export function SNS() {
  const t = useTranslations("sns");

  const videoId = "LElgWLGh6NY";

  const socialLinks = [
    { label: t("youtube"), href: "https://www.youtube.com/@seoultango?si=TcnvuLDOZOW0qCmk" },
    { label: t("instagram"), href: "https://www.instagram.com/seoultangoacademy_eltango" },
    { label: t("cafe"), href: "https://cafe.naver.com/eltango2009" },
  ];

  return (
    <section className="">
      <div className="container">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-center text-muted-foreground">
          {t("description")}
        </p>
        <div className="mx-auto mt-4 flex max-w-md justify-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex flex-col items-center gap-1 rounded-2xl px-5 py-3 text-sm text-muted-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="mx-auto mt-6 flex max-w-[200px] justify-center">
          <a
            href={`https://www.youtube.com/shorts/${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block aspect-[9/16] w-full overflow-hidden rounded-2xl border border-border/30"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/oar2.jpg`}
              alt="YouTube Short"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90">
                <svg className="h-7 w-7 text-red-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact (Slide 9) ─── */
export function Contact() {
  const t = useTranslations("contact");
  return (
    <section className="">
      <div className="container">
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{t("title")}</h2>
          <p className="mt-3 text-sm text-muted-foreground whitespace-pre-line md:whitespace-normal">
            {t("description")}
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-md glass-card rounded-2xl p-6 glow-primary">
          <RegisterForm source="contact" />
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
export function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="flex flex-col h-full">
      <div className="container flex-1 flex flex-col justify-center py-4">
        <h2 className="mb-3 text-center text-xl font-bold">{t("directionsTitle")}</h2>
        {/* Map — large, prominent */}
        <div className="mx-auto w-full max-w-2xl aspect-[2/1] max-h-[35vh] overflow-hidden rounded-2xl border border-border/30 bg-muted">
          <NaverMap />
        </div>

        {/* Contact info — vertical list */}
        <div className="mx-auto mt-3 max-w-2xl space-y-1.5 text-sm text-muted-foreground">
          <p className="font-serif text-base font-bold text-primary">{t("brand")}</p>
          <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-primary" /> {t("phone")}</p>
          <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-primary" /> {t("email")}</p>
          <p className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span className="whitespace-pre-line md:whitespace-normal">{t("address")}</span>
          </p>
        </div>
      </div>
      {/* Bottom bar — always visible */}
      <div className="container pb-2">
        <div className="flex flex-col items-center justify-between gap-1 border-t border-border/30 pt-2 text-xs text-muted-foreground sm:flex-row">
          <p>{t("rights", { year: new Date().getFullYear() })}</p>
          <div className="flex gap-4">
            <span>{t("privacy")}</span>
            <span>{t("terms")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
