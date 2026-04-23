import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Heart, MapPin, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CopyButton } from "@/components/ui/copy-button";
import { RegisterForm } from "@/components/register-form";

export function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-0 hidden h-[120%] w-[70%] rotate-3 opacity-10 blur-sm md:block">
          <Image
            src="/images/fish.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="(min-width: 1024px) 70vw, 0px"
            draggable={false}
          />
        </div>
        <div className="absolute -left-24 bottom-0 hidden h-[120%] w-[50%] -rotate-2 opacity-10 blur-sm lg:block">
          <Image
            src="/images/taebong.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 50vw, 0px"
            draggable={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto max-w-3xl text-center">
        <Badge className="mb-4 bg-accent">{t("badge")}</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-8 grid w-full grid-cols-1 gap-2 sm:mx-auto sm:max-w-none sm:grid-cols-3 sm:gap-3">
          <Button asChild className="w-full sm:w-auto">
            <a href="#register">
              <MessageCircle className="mr-2 h-4 w-4" />
              {t("ctaPrimary")}
            </a>
          </Button>
          <Button variant="secondary" asChild className="w-full sm:w-auto">
            <a href="#schedule">{t("ctaSecondary")}</a>
          </Button>
          <Button variant="outline" asChild className="hidden sm:inline-flex">
            <Link href="#gallery">{t("ctaTertiary")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function StudioIntro() {
  const t = useTranslations("studio");
  return (
    <section id="studio" className="container py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 text-muted-foreground">{t("description")}</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t("cards.curriculum.title")}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {t("cards.curriculum.body")}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("cards.method.title")}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {t("cards.method.body")}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("cards.lifestyle.title")}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {t("cards.lifestyle.body")}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 mx-auto max-w-3xl text-center text-sm text-muted-foreground">
        {t("tagline")}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Badge variant="secondary">{t("badges.t1")}</Badge>
        <Badge variant="secondary">{t("badges.t2")}</Badge>
        <Badge variant="secondary">{t("badges.t3")}</Badge>
        <Badge variant="secondary">{t("badges.t4")}</Badge>
        <Badge variant="secondary">{t("badges.t5")}</Badge>
      </div>

      <div className="mt-6 flex justify-center">
        <Button asChild>
          <a href="#register">{t("cta")}</a>
        </Button>
      </div>
    </section>
  );
}

export function Schedule() {
  const t = useTranslations("schedule");
  return (
    <section id="schedule" className="container py-12 sm:py-16">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t("beginner.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">{t("beginner.time")}</p>
            <p className="text-muted-foreground">{t("beginner.body")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("upperBeginner.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">{t("upperBeginner.time")}</p>
            <p className="text-muted-foreground">{t("upperBeginner.body")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("practica.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">{t("practica.time")}</p>
            <p className="text-muted-foreground">{t("practica.body")}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function Gallery() {
  const t = useTranslations("gallery");
  const slides = [
    "/images/slides/KakaoTalk_Image_2026-01-29-22-35-32_001.png",
    "/images/slides/KakaoTalk_Image_2026-01-29-22-35-33_002.png",
    "/images/slides/KakaoTalk_Image_2026-01-29-22-35-34_003.png",
    "/images/slides/KakaoTalk_Image_2026-01-29-22-35-34_004.png",
    "/images/slides/KakaoTalk_Image_2026-01-29-22-35-34_005.png",
  ];
  return (
    <section id="gallery" className="container py-12 sm:py-16">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
      </div>
      <div className="overflow-x-auto">
        <div className="flex snap-x snap-mandatory gap-4">
          {slides.map((src) => (
            <div
              key={src}
              className="relative h-[260px] w-[360px] flex-shrink-0 snap-start overflow-hidden rounded-lg border"
            >
              <Image src={src} alt={t("alt")} fill className="object-cover" sizes="360px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Instructors() {
  const t = useTranslations("instructors");
  return (
    <section id="instructors" className="container py-12 sm:py-16">
      <div className="mb-8 text-center lg:mb-12">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-3 text-muted-foreground">{t("description")}</p>
        <ul className="mx-auto mt-4 flex max-w-xl flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:justify-center">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" /> {t("bullets.b1")}
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" /> {t("bullets.b2")}
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" /> {t("bullets.b3")}
          </li>
        </ul>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <CardTitle className="text-xl">{t("director.title")}</CardTitle>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            <li>{t("director.items.i1")}</li>
            <li>{t("director.items.i2")}</li>
            <li>{t("director.items.i3")}</li>
            <li>{t("director.items.i4")}</li>
            <li>{t("director.items.i5")}</li>
            <li>{t("director.items.i6")}</li>
            <li>{t("director.items.i7")}</li>
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">{t("director.media")}</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-lg">
              <Image
                src="/images/fish.jpg"
                alt={t("portraitAlt")}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>
            <div className="p-6">
              <CardTitle className="text-xl">{t("fish.name")}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{t("fish.role")}</p>
              <p className="mt-3 text-sm text-muted-foreground">{t("fish.bio")}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-lg">
              <Image
                src="/images/taebong.jpg"
                alt={t("portraitAlt")}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="p-6">
              <CardTitle className="text-xl">{t("taebong.name")}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{t("taebong.role")}</p>
              <p className="mt-3 text-sm text-muted-foreground">{t("taebong.bio")}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-lg">
              <Image
                src="/images/nenia.png"
                alt={t("portraitAlt")}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="p-6">
              <CardTitle className="text-xl">{t("nenia.name")}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{t("nenia.role")}</p>
              <p className="mt-3 text-sm text-muted-foreground">{t("nenia.bio")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function Pricing() {
  const t = useTranslations("pricing");
  return (
    <section id="pricing" className="container py-12 sm:py-16">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t("p1.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{t("p1.price")}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("p1.body")}</p>
          </CardContent>
        </Card>
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>{t("p2.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{t("p2.price")}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("p2.body")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("p3.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{t("p3.price")}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("p3.body")}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function FAQ() {
  const t = useTranslations("faq");
  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
  ];
  return (
    <section id="faq" className="container py-12 sm:py-16">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
      </div>
      <Accordion type="single" collapsible className="mx-auto max-w-2xl">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{f.q}</AccordionTrigger>
            <AccordionContent>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function Contact() {
  const t = useTranslations("contact");
  return (
    <section id="register" className="container py-16">
      <div className="mx-auto max-w-2xl text-center">
        <Badge className="mb-4 bg-accent">{t("badge")}</Badge>
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("description")}</p>

        <div className="mx-auto mt-8 max-w-md rounded-xl border bg-card p-6 shadow-sm">
          <RegisterForm source="contact" />
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" variant="secondary" asChild>
            <a href="mailto:info@eltango.kr?subject=%5B%EC%97%98%EB%95%85%EA%B3%A0%5D%20%EC%88%98%EA%B0%95%20%EB%AC%B8%EC%9D%98">
              {t("email")}
            </a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href="tel:01024150563">{t("phone")}</a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a
              href="https://map.naver.com/p/entry/place/20526245?placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202601292225&locale=ko&svcName=map_pcv5&c=15.00,0,0,0,dh"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin className="mr-2 h-4 w-4" /> {t("directions")}
            </a>
          </Button>
        </div>
        <div className="mt-6 text-sm text-muted-foreground">
          <div>{t("address1")}</div>
          <div>{t("address2")}</div>
          <div>{t("subway")}</div>
        </div>

        <div className="mt-10 mx-auto grid max-w-5xl items-stretch gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-[#ff5ea8] p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/20">
                <Phone className="h-5 w-5" />
              </div>
              <div className="text-lg font-semibold tracking-wide">
                {t("phoneCard.number")}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button asChild variant="secondary" className="w-full">
                <a href="tel:+821024150563">{t("phoneCard.call")}</a>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <a href="sms:+821024150563">{t("phoneCard.sms")}</a>
              </Button>
            </div>
            <div className="mt-2 text-xs opacity-90">{t("phoneCard.note")}</div>
          </div>

          <div className="rounded-xl border bg-neutral-900 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#fee500]">
                <MessageCircle className="h-5 w-5 text-black" />
              </div>
              <div className="text-lg font-semibold tracking-wide">{t("kakao.id")}</div>
            </div>
            <div className="mt-4">
              <CopyButton text="@fishlove0" className="w-full" variant="outline" />
            </div>
            <div className="mt-2 text-xs opacity-70">{t("kakao.note")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="border-t py-10">
      <div className="container flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-primary" /> {t("tagline")}
        </div>
        <div>{t("rights", { year: new Date().getFullYear() })}</div>
      </div>
    </footer>
  );
}
