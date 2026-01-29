import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, Clock, Heart, MapPin, Music2, Star, Users, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CopyButton } from "@/components/ui/copy-button";

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
          <Button size="lg" variant="outline" asChild>
            <Link href="#gallery">갤러리</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function StudioIntro() {
  return (
    <section id="studio" className="container py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">엘땅고 강남본점</h2>
        <p className="mt-4 text-muted-foreground">
          강남에서 16년째 운영 중인 아르헨티나 탱고 전문 학원, 엘땅고_서울탱고아카데미 강남본점입니다.
          24년차 탱고강사 이인경 대표가 직접 강의하며, 누적 수강생 1만명, 현재 월 평균 수강생 100명과 함께하고 있습니다.
          정통 탱고를 체계적으로 배울 수 있는 탱고 명가로, 수준별 커리큘럼을 운영합니다.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>수준별 커리큘럼</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            성인 초급, 초중급, 중급, 상급 레슨부터 트레이닝 과정, 소그룹레슨, 전문가과정까지 단계적으로 구성되어 있습니다.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>정통 탱고 메소드</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            2023 로마탱고대회 챔피언 직강 수업으로 음악성과 연결을 중심으로 탄탄하게 배우는 정통 메소드입니다.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>강남 라이프스타일</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            특히 강남 직장인(30·40대)을 위한 퇴근 후 취미, 새로운 커뮤니티, 성인 탱고 레슨으로 많은 사랑을 받고 있습니다.
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 mx-auto max-w-3xl text-center text-sm text-muted-foreground">
        강남 탱고, 강남 탱고학원, 성인 탱고 레슨을 찾고 계시다면 엘땅고에서 제대로 시작해보세요.
        오셔서 레벨 상담을 받고, 쾌적한 시설도 확인하세요!
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Badge variant="secondary">탱고학원</Badge>
        <Badge variant="secondary">아르헨티나탱고</Badge>
        <Badge variant="secondary">탱고배우기</Badge>
        <Badge variant="secondary">강남탱고</Badge>
        <Badge variant="secondary">직장인취미</Badge>
      </div>

      <div className="mt-6 flex justify-center">
        <Button asChild>
          <a href="#register">상담 신청</a>
        </Button>
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

export function Gallery() {
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
        <h2 className="text-3xl font-bold tracking-tight">갤러리</h2>
        <p className="mt-2 text-muted-foreground">엘땅고의 순간들을 미리 느껴보세요</p>
      </div>
      <div className="overflow-x-auto">
        <div className="flex snap-x snap-mandatory gap-4">
          {slides.map((src) => (
            <div key={src} className="relative h-[260px] w-[360px] flex-shrink-0 snap-start overflow-hidden rounded-lg border">
              <Image src={src} alt="엘땅고 갤러리" fill className="object-cover" sizes="360px" />
            </div>
          ))}
        </div>
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

      <Card className="mb-8">
        <CardContent className="p-6">
          <CardTitle className="text-xl">이인경 대표 소개</CardTitle>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            <li>2003 로마탱고대회 1위 챔피언(Farabute)</li>
            <li>2017, 2019 아르헨티나 세계탱고대회 준결승 진출</li>
            <li>2015 메트로폴리탄 탱고 대회 심사위원</li>
            <li>아르헨티나 탱고 지도자 자격증 교재 공동저자</li>
            <li>대전탱고페스티발, 서울탱고챔피언쉽 오거나이저</li>
            <li>전) 한국 아르헨티나탱고 협회 이사장</li>
            <li>전) 국민대학교 평생교육원 초빙교수</li>
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            방송/영화/연극 안무지도: SBS 여인의 향기, MBC 우리결혼했어요, 드라마 W·동네의영웅·내사랑치유기·가족끼리왜이래, 영화 패션왕, 연극 아브라소 등
          </p>
        </CardContent>
      </Card>

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
        <h2 className="text-3xl font-bold tracking-tight">수강 정보</h2>
        <p className="mt-2 text-muted-foreground">퇴근 후 취미부터 레벨업 과정까지, 딱 맞게 선택하세요</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>2040 직장인 퇴근후 취미 초급반</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₩100,000</p>
            <p className="mt-2 text-sm text-muted-foreground">퇴근 후 바로 시작하는 성인 초급 과정</p>
          </CardContent>
        </Card>
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>아름다운 바디라인 만들기 트레이닝반</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₩100,000</p>
            <p className="mt-2 text-sm text-muted-foreground">라인/컨트롤/체형 개선을 위한 트레이닝</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>고수로 가는 레벨업클랴스_중상급과정</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₩120,000</p>
            <p className="mt-2 text-sm text-muted-foreground">중상급 테크닉과 음악성 심화</p>
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
            <a href="tel:01024150563">전화 문의</a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href="https://map.naver.com/p/entry/place/20526245?placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202601292225&locale=ko&svcName=map_pcv5&c=15.00,0,0,0,dh" target="_blank" rel="noreferrer">
              <MapPin className="mr-2 h-4 w-4" /> 오시는 길
            </a>
          </Button>
        </div>
        <div className="mt-6 text-sm text-muted-foreground">
          <div>주소: 서울 서초구 반포동 741번지 2층</div>
          <div>Address: Banpo-dong 741, 2F, Seoul, Korea 137-903</div>
          <div>지하철: 신논현역 1번출구, 강남역 10번출구 도보</div>
        </div>

        {/* Contact channels */}
        <div className="mt-10 mx-auto grid max-w-5xl items-stretch gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-[#ff5ea8] p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/20">
                <Phone className="h-5 w-5" />
              </div>
              <div className="text-lg font-semibold tracking-wide">(82) 1024150563</div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button asChild variant="secondary" className="w-full">
                <a href="tel:+821024150563">전화하기</a>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <a href="sms:+821024150563">문자 보내기</a>
              </Button>
            </div>
            <div className="mt-2 text-xs opacity-90">표기: 010-2415-0563</div>
          </div>

          <div className="rounded-xl border bg-neutral-900 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#fee500]">
                <MessageCircle className="h-5 w-5 text-black" />
              </div>
              <div className="text-lg font-semibold tracking-wide">KakaoTalk ID : @fishlove0</div>
            </div>
            <div className="mt-4">
              <CopyButton text="@fishlove0" label="ID 복사" className="w-full" variant="outline" />
            </div>
            <div className="mt-2 text-xs opacity-70">카카오채널/오픈채팅 링크가 있다면 버튼으로 연결 가능합니다.</div>
          </div>
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
