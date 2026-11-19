/**
 * 엘땅고 강남본점 — 사실관계 단일 출처(Single Source of Truth)
 *
 * llms.txt / llms-full.txt / JSON-LD / RSS 가 모두 이 파일을 읽습니다.
 * 주소·전화·시간표·가격이 바뀌면 **여기만** 고치면 전체에 반영됩니다.
 *
 * ⚠️ 원장 개인 휴대폰 번호는 절대 넣지 않습니다. 대외 표기는 안심번호만 사용합니다.
 */

export const SCHOOL = {
  name: "엘땅고 강남본점",
  alternateName: "서울탱고아카데미 · EL TANGO",
  description:
    "2009년 개원, 17년째 아르헨티나 탱고 한 장르만 가르치는 서울 서초구(강남권) 탱고학원. 대표 원장 이인경(피쉬)은 탱고 24년차이며 2023 로마 Farabute 탱고대회 부부 챔피언이다. 처음 오시는 분의 80%가 혼자, 운동화 차림으로 오시고 첫 90분은 걷기부터 시작한다.",
  telephone: "+82-507-1404-9899",
  /** 화면 표기용 */
  telephoneText: "0507-1404-9899",
  address: {
    streetAddress: "주흥길 12, 2층",
    addressLocality: "서초구",
    addressRegion: "서울특별시",
    postalCode: "06737",
    addressCountry: "KR",
  },
  /** 지도 좌표 (신논현역 1번 출구 도보 4분, GS25 건물 2층) */
  geo: { latitude: 37.5044284, longitude: 127.0206468 },
  areaServed: ["서울 강남", "서울 서초", "신논현역"],
  priceRange: "₩₩",
  /** 정규 초급반 시간표 — 화면·llms·스키마가 같은 값을 씁니다. */
  hours: [
    { day: "Monday", label: "월요일 웰니스 초급 낮반", opens: "10:30", closes: "11:30" },
    { day: "Wednesday", label: "수요일 웰니스 초급 낮반 (60+)", opens: "11:30", closes: "12:30" },
    { day: "Wednesday", label: "수요일 평일 직장인반", opens: "19:00", closes: "20:30" },
    { day: "Sunday", label: "일요일 주말반", opens: "17:00", closes: "18:30" },
  ],
  hoursText: [
    "수 19:00–20:30 평일 직장인반",
    "일 17:00–18:30 주말반",
    "월 10:30–11:30 웰니스 낮반",
    "수 11:30–12:30 웰니스 낮반(60+ 시니어)",
  ],
  offers: [
    {
      name: "원데이 체험 클래스 90분",
      description: "부부 원장이 직접 진행하는 90분 체험. 네이버 리뷰 등록 시 10,000원 환급.",
      price: "30000",
      path: "/",
    },
    {
      name: "정규 초급반 4주",
      description: "수 19:00 직장인반 · 일 17:00 주말반 · 월 10:30·수 11:30 웰니스 낮반. 4주 과정.",
      price: "100000",
      path: "/",
    },
    {
      name: "원데이 당일 등록 첫 4주",
      description: "원데이 체험 당일 정규 초급반에 등록하면 체험비 30,000원을 전액 차감한 금액.",
      price: "70000",
      path: "/",
    },
  ],
  knowsAbout: ["아르헨티나 탱고", "탱고 원데이 체험", "정규 초급반", "탱고 웰니스 낮반", "60+ 시니어 탱고", "밀롱가"],
  sameAs: [
    "https://m.place.naver.com/place/20526245",
    "https://cafe.naver.com/eltango2009",
    "https://www.instagram.com/gangnamtango/",
    "https://www.youtube.com/@seoultango",
    "https://eltango.netlify.app",
    "https://dulcenaleo.com/eltango",
  ],
} as const;
