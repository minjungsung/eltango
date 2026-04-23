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
import {
  CheckCircle2,
  Heart,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CopyButton } from "@/components/ui/copy-button";
import { RegisterForm } from "@/components/register-form";

// Split i18n text on newlines and render each line as its own <p>. The parent
// container controls size + color + max-width; this component only decides
// where the paragraph breaks go so a short tail like "입니다." never ends up
// orphaned on its own line mid-sentence — each sentence wraps inside its own
// block instead of sharing a wrap context with siblings.
function Prose({ text, className = "" }: { text: string; className?: string }) {
  const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  return (
    <div className={`space-y-3 ${className}`}>
      {lines.map((line, i) => (
        <p key={i} className="text-pretty">
          {line}
        </p>
      ))}
    </div>
  );
}

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
        <Badge className="mb-5 bg-accent">{t("badge")}</Badge>
        <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-balance sm:text-5xl md:text-6xl">
          {t("title")}
        </h1>
        <Prose
          text={t("subtitle")}
          className="mx-auto mt-5 max-w-2xl text-[15px] leading-[1.7] text-muted-foreground sm:text-base md:text-[17px]"
        />
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
    <section id="studio" className="container py-16 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-[26px] font-bold leading-[1.2] tracking-[-0.025em] text-balance sm:text-3xl md:text-[34px]">{t("title")}</h2>
        <Prose
          text={t("description")}
          className="mx-auto mt-4 max-w-3xl text-[15px] leading-[1.7] text-muted-foreground sm:text-base md:text-[17px]"
        />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
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

      <Prose
        text={t("tagline")}
        className="mx-auto mt-10 max-w-3xl text-center text-[14px] leading-[1.7] text-muted-foreground sm:text-[15px]"
      />

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
    <section id="schedule" className="container py-16 sm:py-24">
      <div className="mb-8 text-center">
        <h2 className="text-[26px] font-bold leading-[1.2] tracking-[-0.025em] text-balance sm:text-3xl md:text-[34px]">{t("title")}</h2>
        <p className="mt-4 text-pretty text-[15px] leading-[1.7] text-muted-foreground sm:text-base md:text-[17px]">
          {t("subtitle")}
        </p>
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
    <section id="gallery" className="container py-16 sm:py-24">
      <div className="mb-8 text-center">
        <h2 className="text-[26px] font-bold leading-[1.2] tracking-[-0.025em] text-balance sm:text-3xl md:text-[34px]">{t("title")}</h2>
        <p className="mt-4 text-pretty text-[15px] leading-[1.7] text-muted-foreground sm:text-base md:text-[17px]">
          {t("subtitle")}
        </p>
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
    <section id="instructors" className="container py-16 sm:py-24">
      <div className="mb-10 text-center lg:mb-14">
        <h2 className="text-[26px] font-bold leading-[1.2] tracking-[-0.025em] text-balance sm:text-3xl md:text-[34px]">{t("title")}</h2>
        <Prose
          text={t("description")}
          className="mx-auto mt-4 max-w-3xl text-[15px] leading-[1.7] text-muted-foreground sm:text-base md:text-[17px]"
        />
        <ul className="mx-auto mt-6 flex max-w-xl flex-col items-center gap-2 text-[14px] text-muted-foreground sm:text-[15px]">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
            <span>{t("bullets.b1")}</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
            <span>{t("bullets.b2")}</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
            <span>{t("bullets.b3")}</span>
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
    <section id="pricing" className="container py-16 sm:py-24">
      <div className="mb-8 text-center">
        <h2 className="text-[26px] font-bold leading-[1.2] tracking-[-0.025em] text-balance sm:text-3xl md:text-[34px]">{t("title")}</h2>
        <p className="mt-4 text-pretty text-[15px] leading-[1.7] text-muted-foreground sm:text-base md:text-[17px]">
          {t("subtitle")}
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t("p1.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("p1.price")}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{t("p1.body")}</p>
          </CardContent>
        </Card>
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>{t("p2.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("p2.price")}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{t("p2.body")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("p3.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("p3.price")}
            </p>
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
    <section id="faq" className="container py-16 sm:py-24">
      <div className="mb-8 text-center">
        <h2 className="text-[26px] font-bold leading-[1.2] tracking-[-0.025em] text-balance sm:text-3xl md:text-[34px]">{t("title")}</h2>
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
  const naverMapUrl =
    "https://map.naver.com/p/entry/place/20526245?placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202601292225&locale=ko&svcName=map_pcv5&c=15.00,0,0,0,dh";

  return (
    <section id="register" className="container py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Badge className="mb-4 bg-accent">{t("badge")}</Badge>
        <h2 className="text-[26px] font-bold leading-[1.2] tracking-[-0.025em] text-balance sm:text-3xl md:text-[34px]">
          {t("title")}
        </h2>
        <Prose
          text={t("description")}
          className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.7] text-muted-foreground sm:text-base md:text-[17px]"
        />
      </div>

      <div className="mx-auto mt-8 max-w-md rounded-2xl border border-border/60 bg-card/80 p-5 shadow-xl shadow-black/5 backdrop-blur-sm sm:p-7">
        <RegisterForm source="contact" />
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <div className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-border/70" />
          <span>{t("otherWays")}</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-border/70" />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <ContactTile
            index="01"
            accent="coral"
            icon={<Phone className="h-5 w-5" />}
            eyebrow={t("tiles.phone.eyebrow")}
            value={t("tiles.phone.value")}
            description={t("tiles.phone.description")}
          >
            <Button asChild className="w-full">
              <a href="tel:+821024150563">{t("tiles.phone.callCta")}</a>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <a href="sms:+821024150563">{t("tiles.phone.smsCta")}</a>
            </Button>
          </ContactTile>

          <ContactTile
            index="02"
            accent="kakao"
            icon={<MessageCircle className="h-5 w-5" />}
            eyebrow={t("tiles.kakao.eyebrow")}
            value="@fishlove0"
            description={t("tiles.kakao.description")}
          >
            <CopyButton text="@fishlove0" className="w-full" variant="outline" />
          </ContactTile>

          <ContactTile
            index="03"
            accent="amber"
            icon={<MapPin className="h-5 w-5" />}
            eyebrow={t("tiles.directions.eyebrow")}
            value={t("tiles.directions.value")}
            description={t("tiles.directions.description")}
          >
            <Button asChild variant="outline" className="w-full">
              <a href={naverMapUrl} target="_blank" rel="noreferrer">
                {t("tiles.directions.cta")}
              </a>
            </Button>
          </ContactTile>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-xs text-muted-foreground">
          <span>{t("address1")}</span>
          <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
          <span>{t("subway")}</span>
          <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
          <a
            href="mailto:info@eltango.kr"
            className="inline-flex items-center gap-1 text-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
          >
            <Mail className="h-3 w-3" /> info@eltango.kr
          </a>
        </div>
      </div>
    </section>
  );
}

type TileAccent = "coral" | "kakao" | "amber";

const TILE_ACCENTS: Record<
  TileAccent,
  { icon: string; glow: string; line: string; index: string }
> = {
  coral: {
    icon: "bg-primary/10 text-primary ring-1 ring-inset ring-primary/30",
    glow: "bg-[radial-gradient(120%_80%_at_50%_0%,hsl(var(--primary)/0.18),transparent_70%)]",
    line: "bg-gradient-to-r from-transparent via-primary/70 to-transparent",
    index: "text-primary/40",
  },
  kakao: {
    icon: "bg-[#fee500] text-black ring-1 ring-inset ring-[#fee500]/60",
    glow: "bg-[radial-gradient(120%_80%_at_50%_0%,rgba(254,229,0,0.14),transparent_70%)]",
    line: "bg-gradient-to-r from-transparent via-[#fee500]/70 to-transparent",
    index: "text-[#fee500]/40",
  },
  amber: {
    icon: "bg-amber-400/10 text-amber-300 ring-1 ring-inset ring-amber-400/30",
    glow: "bg-[radial-gradient(120%_80%_at_50%_0%,rgba(251,191,36,0.14),transparent_70%)]",
    line: "bg-gradient-to-r from-transparent via-amber-400/70 to-transparent",
    index: "text-amber-300/40",
  },
};

function ContactTile({
  index,
  accent,
  icon,
  eyebrow,
  value,
  description,
  children,
}: {
  index: string;
  accent: TileAccent;
  icon: React.ReactNode;
  eyebrow: string;
  value: string;
  description: string;
  children: React.ReactNode;
}) {
  const a = TILE_ACCENTS[accent];
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card/80 to-card/30 p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-2xl hover:shadow-black/40">
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100 ${a.glow}`}
      />
      <div aria-hidden className={`absolute inset-x-0 top-0 h-px ${a.line}`} />

      <div
        className={`pointer-events-none absolute right-5 top-5 font-mono text-xs tracking-wider ${a.index}`}
      >
        {index}
      </div>

      <div className="relative">
        <div
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${a.icon}`}
        >
          {icon}
        </div>

        <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </div>
        <div className="mt-2 text-[17px] font-semibold tracking-tight text-foreground sm:text-lg">
          {value}
        </div>
        <p className="mt-2 text-[13px] leading-[1.65] text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="relative mt-6 flex-1" />
      <div aria-hidden className="relative my-4 h-px bg-border/50" />
      <div className="relative grid gap-2">{children}</div>
    </div>
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
