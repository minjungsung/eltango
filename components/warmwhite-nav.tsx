"use client";

import { useState } from "react";

const BOOK_ONEDAY = "https://m.booking.naver.com/booking/6/bizes/1663050/items/8200234";

const LINKS = [
  { href: "#steps", label: "처음이라면" },
  { href: "#timetable", label: "시간표" },
  { href: "#director", label: "원장" },
  { href: "#space", label: "공간" },
  { href: "#visit", label: "오시는 길" },
  { href: "/blog", label: "칼럼" },
];

/** 웜화이트 에디토리얼 헤더 (한국어 홈 전용) */
export function WarmWhiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="ww-head">
      <div className="ww-wrap ww-head-in">
        <a href="/" className="ww-brand" aria-label="엘땅고 홈">
          <b>EL TANGO</b>
          <span>강남 탱고학원 · SINCE 2009</span>
        </a>

        <nav aria-label="주요 메뉴">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ww-head-right">
          <a className="ww-book" href={BOOK_ONEDAY} target="_blank" rel="noopener noreferrer">
            원데이 예약 ↗
          </a>
          <button
            type="button"
            className="ww-burger"
            aria-label="메뉴"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <i />
            <i />
          </button>
        </div>
      </div>

      {open && (
        <div className="ww-drawer">
          <div className="ww-wrap">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href={BOOK_ONEDAY} target="_blank" rel="noopener noreferrer">
              원데이 예약하기 ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
