import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, Clock, Heart, MapPin, Music2, Star, Users } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Background visual (subtle) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-0 hidden h-[120%] w-[70%] rotate-3 opacity-10 blur-sm md:block">
          <Image
            src="/images/fish.jpg"
            alt="Instructor portrait background"
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
            alt="Instructor portrait background"
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 50vw, 0px"
            draggable={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto max-w-3xl text-center">
        <Badge className="mb-4 bg-accent">Buenos Aires Style</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          탱고의 본질을, 엘땅고에서
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          부에노스아이레스 스타일 탱고. 음악과 연결, 파트너와 교감, 바닥과의 대화까지—
          기본부터 깊이 있게, 제대로 배워요.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button size="lg" asChild>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdqxyTy_5SwYwzzmRQC3-nyWK0kmvQr8ue6MVLbYXeUdp57vQ/viewform?usp=send_form"
              target="_blank"
              rel="noreferrer"
            >
              수강신청하기
            </a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href="#features">커리큘럼 보기</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  const items = [
    { icon: <Users className="h-6 w-6" />, title: "소수정예", desc: "최대 8명 소수로 집중 케어" },
    { icon: <Music2 className="h-6 w-6" />, title: "음악성 중심", desc: "리듬과 멜로디로 리드 & 팔로우" },
    { icon: <Clock className="h-6 w-6" />, title: "탄탄한 기초", desc: "걷기, 축, 밸런스부터 차근히" },
    { icon: <Star className="h-6 w-6" />, title: "현지 스타일", desc: "BA 현지 메소드 기반 수업" },
  ];
  return (
    <section id="features" className="container py-12 sm:py-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <Card key={it.title}>
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                {it.icon}
              </div>
              <CardTitle>{it.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">{it.desc}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function Schedule() {
  return (
    <section id="schedule" className="container py-12 sm:py-16">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight">수업 시간표</h2>
        <p className="mt-2 text-muted-foreground">체계적인 커리큘럼으로 레벨업</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>초급 A</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">매주 화/목 19:30 - 20:40</p>
            <p className="text-muted-foreground">걷기, 홀드, 기본 리듬</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>초중급</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">매주 화/목 20:50 - 22:00</p>
            <p className="text-muted-foreground">축, 피봇, 오초/히로</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>쁘락띠카</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">매주 토 15:00 - 17:00</p>
            <p className="text-muted-foreground">자율 연습 & 피드백</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function Instructors() {
  return (
    <section id="instructors" className="container py-12 sm:py-16">
      <div className="mb-8 text-center lg:mb-12">
        <h2 className="text-3xl font-bold tracking-tight">강사진</h2>
        <p className="mt-3 text-muted-foreground">
          부에노스아이레스 현지 메소드와 음악성을 바탕으로 지도합니다. 테크닉을 넘어 연결과 음악성을 중심으로 가르칩니다.
        </p>
        <ul className="mx-auto mt-4 flex max-w-xl flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:justify-center">
          <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> 10+년 티칭 & 공연 경력</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> 현지 마에스트로 사사</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary"/> 개인 피드백 제공</li>
        </ul>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-lg">
              <Image
                src="/images/fish.jpg"
                alt="Instructor portrait"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>
            <div className="p-6">
              <CardTitle className="text-xl">피쉬</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Tango Instructor • Musicality & Technique</p>
              <p className="mt-3 text-sm text-muted-foreground">음악성과 연결 중심의 지도로 기본기부터 서서히 레벨업을 이끕니다.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-lg">
              <Image
                src="/images/taebong.jpg"
                alt="Instructor portrait"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="p-6">
              <CardTitle className="text-xl">태봉</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Tango Instructor • Connection & Balance</p>
              <p className="mt-3 text-sm text-muted-foreground">탄탄한 기본기와 균형을 바탕으로 실전 지향의 레슨을 제공합니다.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-lg">
              <Image
                src="/images/nenia.png"
                alt="Instructor portrait"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="p-6">
              <CardTitle className="text-xl">네니아</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Tango Instructor • Nuevo Specialist</p>
              <p className="mt-3 text-sm text-muted-foreground">다이내믹한 라인과 컨트롤, 누에보의 디테일을 바탕으로 창의적인 무브먼트를 탐구합니다.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="container py-12 sm:py-16">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight">수강료</h2>
        <p className="mt-2 text-muted-foreground">쉽게 시작하고, 꾸준히 성장하세요</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>체험 클래스</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₩0</p>
            <p className="mt-2 text-sm text-muted-foreground">첫 방문 1회 무료</p>
          </CardContent>
        </Card>
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>정규반 (월)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₩160,000</p>
            <p className="mt-2 text-sm text-muted-foreground">주 2회 / 4주</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>개인 레슨</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">문의</p>
            <p className="mt-2 text-sm text-muted-foreground">맞춤 커리큘럼</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function FAQ() {
  const faqs = [
    {
      q: "완전 초보도 가능한가요?",
      a: "네. 걷기와 음악 듣기부터 차근차근 진행합니다.",
    },
    { q: "파트너가 꼭 필요하나요?", a: "아니요. 수업 중 파트너 체인지가 있습니다." },
    { q: "복장은 어떻게 하나요?", a: "움직임이 편한 복장과 실내화면 충분합니다." },
  ];
  return (
    <section id="faq" className="container py-12 sm:py-16">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight">자주 묻는 질문</h2>
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
  return (
    <section id="register" className="container py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">지금 시작해요</h2>
        <p className="mt-2 text-muted-foreground">
          체험 수업 예약이나 수강 문의를 남겨주세요. 바로 안내드립니다.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdqxyTy_5SwYwzzmRQC3-nyWK0kmvQr8ue6MVLbYXeUdp57vQ/viewform?usp=send_form"
              target="_blank"
              rel="noreferrer"
            >
              수강신청하기
            </a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href="mailto:info@eltango.kr?subject=%5B%EC%97%98%EB%95%85%EA%B3%A0%5D%20%EC%88%98%EA%B0%95%20%EB%AC%B8%EC%9D%98">이메일 문의</a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href="https://naver.me/xdp3zeag" target="_blank" rel="noreferrer">
              <MapPin className="mr-2 h-4 w-4" /> 오시는 길
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="container flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2"><Heart className="h-4 w-4 text-primary"/> 탱고와 함께 성장해요</div>
        <div>© {new Date().getFullYear()} 엘땅고. All rights reserved.</div>
      </div>
    </footer>
  );
}
