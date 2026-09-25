import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

import { Phone, Mail, MapPin, Heart, Clock, Users } from "lucide-react";
import Image from "next/image";
import { RegisterForm } from "@/components/register-form";
import { NaverMap } from "@/components/naver-map";

/* ─── Hero (Slide 1) ─── */
export function Hero() {
  const t = useTranslations("hero");
  const tf = useTranslations("features");
  const featureItems = [
    { key: "f1", icon: <Clock className="h-5 w-5" /> },
    { key: "f2", icon: <MapPin className="h-5 w-5" /> },
    { key: "f3", icon: <Heart className="h-5 w-5" /> },
    { key: "f4", icon: <Users className="h-5 w-5" /> },
  ] as const;

  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Main hero area */}
      <div className="container flex-1 py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
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
          <div className="relative hidden aspect-[3/4] overflow-hidden rounded-lg lg:block">
            <Image
              src="/images/main.png"
              alt="탱고 커플"
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={95}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Bottom feature strip */}
      <div className="border-t border-border/30">
        <div className="container py-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {featureItems.map(({ key, icon }) => (
              <div key={key} className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-primary">
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

/* ─── WhyStay (Slide 2) ─── */
export function Features() {
  const tw = useTranslations("whyStay");
  const stats = ["s1", "s2", "s3"] as const;
  const voices = ["v1", "v2", "v3"] as const;

  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <h2 className="text-center text-3xl font-bold sm:text-4xl whitespace-pre-line md:whitespace-normal">
          {tw("title")}
        </h2>
        <p className="mt-4 text-center font-serif text-lg italic text-primary whitespace-pre-line md:whitespace-normal">
          &ldquo;{tw("quote")}&rdquo;
        </p>

        <div className="mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-3">
          {stats.map((key) => (
            <div key={key} className="text-center">
              <p className="text-4xl font-bold text-primary">
                {tw(`stats.${key}.value`)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {tw(`stats.${key}.label`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
          {voices.map((key) => (
            <div
              key={key}
              className="rounded-lg border p-5 text-center"
            >
              <p className="text-sm">
                &ldquo;{tw(`voices.${key}`)}&rdquo;
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
    <section id="about" className="py-20 sm:py-28">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
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
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/images/studio-interior.png"
              alt="엘땅고 스튜디오"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-transparent" />
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
    <section id="director" className="py-20 sm:py-28">
      <div className="container">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              src="/images/fish.jpg"
              alt="이인경 대표원장"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-background/30 via-transparent to-transparent" />
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
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground whitespace-pre-line md:whitespace-normal">
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
  const rows = ["r1", "r2", "r3", "r4", "r5"] as const;

  return (
    <section className="py-20 sm:py-28">
      <div className="container">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          {t("title")}
        </h2>
        <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-lg border border-border/50">
          <div className="grid grid-cols-2 bg-card/80 text-center text-sm font-semibold">
            <div className="border-r border-border/50 p-4 text-muted-foreground">
              {t("headers.general")}
            </div>
            <div className="p-4 text-primary">{t("headers.eltango")}</div>
          </div>
          {rows.map((key) => (
            <div
              key={key}
              className="grid grid-cols-2 border-t border-border/50 text-center text-sm"
            >
              <div className="border-r border-border/50 p-4 text-muted-foreground">
                {t(`rows.${key}.general`)}
              </div>
              <div className="p-4 text-foreground">
                {t(`rows.${key}.eltango`)}
              </div>
            </div>
          ))}
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
    <section id="beginner" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: image */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              src="/images/beginner-feet.png"
              alt="왕초급반"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/40" />
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
            <div className="mt-8 space-y-4">
              {points.map(({ key, icon }) => (
                <div key={key} className="flex items-start gap-3">
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
    <section id="milonga" className="py-20 sm:py-28">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/images/community.png"
              alt="밀롱가 우나베스"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-transparent" />
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
  const items = [
    { key: "t1", img: "/images/avatar-1.png" },
    { key: "t2", img: "/images/avatar-2.png" },
    { key: "t3", img: "/images/avatar-3.png" },
  ] as const;

  return (
    <section id="reviews" className="py-20 sm:py-28">
      <div className="container">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          {t("title")}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {items.map(({ key, img }) => (
            <div
              key={key}
              className="rounded-lg border border-border/50 bg-card p-6"
            >
              <div className="flex items-start gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt=""
                  className="h-12 w-12 flex-shrink-0 rounded-full border border-primary/30"
                />
                <div>
                  <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line md:whitespace-normal">
                    {t(`${key}.text`)}
                  </p>
                  <p className="mt-3 text-xs font-medium text-primary">
                    {t(`${key}.author`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
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
    <section id="audience" className="py-20 sm:py-28">
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
    <section id="faq" className="py-20 sm:py-28">
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
      </div>
    </section>
  );
}

/* ─── Contact / Register ─── */
export function Contact() {
  const t = useTranslations("contact");
  return (
    <section id="register" className="py-20 sm:py-28">
      <div className="container">
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{t("title")}</h2>
          <p className="mt-3 text-sm text-muted-foreground whitespace-pre-line md:whitespace-normal">
            {t("description")}
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-md rounded-xl border border-border/60 bg-card p-6 shadow-xl shadow-black/10">
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
    <footer id="location" className="border-t border-border/50 py-12">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-serif text-xl font-bold text-primary">
              {t("brand")}
            </p>
            <p className="text-xs text-muted-foreground">{t("brandSub")}</p>
            <p className="mt-4 whitespace-pre-line md:whitespace-normal text-sm text-muted-foreground">
              {t("tagline")}
            </p>
            {/* Social icons */}
            <div className="mt-4 flex gap-3">
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground" aria-label="Instagram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground" aria-label="YouTube">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground" aria-label="KakaoTalk">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-5.523 0-10 3.582-10 8 0 2.844 1.888 5.34 4.727 6.756-.18.654-.652 2.37-.747 2.735-.12.46.168.454.354.33.146-.097 2.321-1.576 3.263-2.217A11.4 11.4 0 0012 19c5.523 0 10-3.582 10-8s-4.477-8-10-8z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">Contact</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> {t("phone")}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> {t("email")}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="whitespace-pre-line md:whitespace-normal">{t("address")}</span>
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">Location</p>
            <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border/50 bg-muted">
              <NaverMap />
            </div>
            <a
              href="https://naver.me/xdp3zeag"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <MapPin className="h-3 w-3" />
              {t("mapCta")}
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 text-xs text-muted-foreground sm:flex-row">
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
