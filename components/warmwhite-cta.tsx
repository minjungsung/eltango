"use client";

const BOOK_ONEDAY = "https://m.booking.naver.com/booking/6/bizes/1663050/items/8200234";
const TEL = "tel:0507-1404-9899";

/** 웜화이트 에디토리얼 모바일 하단 고정 바 (한국어 홈 전용) */
export function WarmWhiteCTA() {
  return (
    <div className="ww-bar">
      <a href={TEL} className="call">
        전화 상담
      </a>
      <a href={BOOK_ONEDAY} target="_blank" rel="noopener noreferrer" className="book">
        원데이 예약
      </a>
    </div>
  );
}
