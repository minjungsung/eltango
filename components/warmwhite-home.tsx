import Image from "next/image";

/** 확정된 링크·연락처 (2026-11-17 기준) */
const BOOK_ONEDAY = "https://m.booking.naver.com/booking/6/bizes/1663050/items/8200234";
const BOOK_BEGINNER = "https://m.booking.naver.com/booking/6/bizes/1663050/items/7711384";
const KAKAO = "https://open.kakao.com/o/sVeY3gPi";
const TEL = "tel:0507-1404-9899";
const MAP = "https://m.place.naver.com/place/20526245";
const INSTAGRAM = "https://www.instagram.com/gangnamtango";
const YOUTUBE = "https://www.youtube.com/@seoultango";
const BLOG = "https://blog.naver.com/tangotraveler";

const STEPS = [
  {
    no: "01",
    title: "걷기",
    body: "음악에 맞춰 앞으로 걷습니다. 탱고의 절반은 걷기예요.",
    src: "/images/warmwhite/step-01.jpg",
    alt: "밤 골목에서 걷는 탱고 스텝",
  },
  {
    no: "02",
    title: "멈추기",
    body: "걷다가 멈추는 법을 익힙니다. 멈출 줄 알면 마음이 편해져요.",
    src: "/images/warmwhite/step-02.jpg",
    alt: "노을 바닷가에서 멈춰 서는 두 사람",
  },
  {
    no: "03",
    title: "방향 바꾸기",
    body: "돌고, 감고, 다시 걷기. 첫날은 여기까지 하면 충분합니다.",
    src: "/images/warmwhite/step-03.jpg",
    alt: "샹들리에 아래에서 방향을 바꾸는 커플",
  },
];

const CLASSES: { name: string; time: string; time2?: string; for: string }[] = [
  {
    name: "평일직장인반",
    time: "수 19:00 – 20:30",
    for: "퇴근하고 오시는 분들이 가장 많은 반입니다.",
  },
  {
    name: "주말반",
    time: "일 17:00 – 18:30",
    for: "주말에 한 번, 제대로 배우고 싶은 분께.",
  },
  {
    name: "낮반",
    time: "월 10:30 – 11:30",
    time2: "수 11:30 – 12:30",
    for: "낮 시간이 편하신 분, 은퇴 후 시작하시는 분.",
  },
];

const RECORD = [
  { k: "2009", v: "강남에서 개원, 같은 자리에서 17년" },
  { k: "9,000+", v: "지금까지 엘땅고를 다녀간 수강생" },
  { k: "2023", v: "로마 FARABUTE Tango Fest 부부 챔피언" },
  { k: "24년차", v: "전 KBS 방송작가 · 부에노스아이레스 유학 10회" },
];

export function WarmWhiteHome() {
  return (
    <main className="ww">
      {/* ─────────── 히어로 ─────────── */}
      <section className="ww-wrap ww-hero">
        <div className="ww-hero-photo">
          <Image
            src="/images/warmwhite/hero-hall.jpg"
            alt="엘땅고 강남본점 스튜디오 — 딥그린 벽과 원목 마루"
            fill
            priority
            sizes="(max-width: 999px) 100vw, 44vw"
          />
        </div>

        <div className="ww-hero-copy">
          <h1>
            동호회 눈치 없이,
            <br />
            세계 챔피언에게{" "}
            <br className="ww-br-pc" />
            배우는 첫 90분
          </h1>

          <p className="ww-sub">
            강남 신논현 도보 4분 · 17년 전통 탱고 전문 학원 · 첫날 체험 3만 원
          </p>

          <a className="ww-btn" href={BOOK_ONEDAY} target="_blank" rel="noopener noreferrer">
            90분 원데이 자리 잡기
          </a>

          <p className="ww-ask">
            혼자 와도 되나요?{" "}
            <a href={KAKAO} target="_blank" rel="noopener noreferrer">
              1분 카톡 문의
            </a>
          </p>

          <div className="ww-facts">
            <div className="row">
              <div className="num">17년 · 9,000+</div>
              <div className="desc">
                2009년 개원, 동호회 아닌
                <br />
                단계별 커리큘럼 전문 아카데미
              </div>
            </div>
            <div className="row">
              <div className="num">2023 로마</div>
              <div className="desc">세계대회 부부 챔피언 · 24년차 원장 직접 지도</div>
            </div>
            <div className="row">
              <div className="num">3만 원</div>
              <div className="desc">운동화로 시작 · 당일 정규 등록 시 전액 차감</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 첫 90분 ─────────── */}
      <section id="steps" className="ww-wrap ww-sec">
        <div className="ww-sec-head">
          <span className="ww-eyebrow">First 90 minutes</span>
          <h2>
            첫 90분은
            <br />
            이렇게 흘러갑니다
          </h2>
          <p className="ww-lead">
            잘 추는 사람이 되기 전에, 몸이 편해지는 시간부터. 처음 오시는 날에는 이 세 가지만
            합니다.
          </p>
        </div>

        <div className="ww-steps">
          {STEPS.map((s) => (
            <article key={s.no} className="ww-step">
              <div className="ww-step-photo">
                <Image src={s.src} alt={s.alt} fill sizes="(max-width: 999px) 100vw, 30vw" />
              </div>
              <h3>
                <i>{s.no}</i>
                {s.title}
              </h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>

        <p className="ww-note" style={{ marginTop: 16 }}>
          운동화와 편한 옷이면 됩니다. 파트너 없이 오셔도 그날 자리를 맞춰 드립니다.
        </p>
      </section>

      {/* ─────────── 시간표 ─────────── */}
      <section id="timetable" className="ww-wrap ww-sec">
        <div className="ww-sec-head">
          <span className="ww-eyebrow">Schedule</span>
          <h2>
            수요일, 일요일, 월요일.
            <br />
            편한 시간에 시작하세요
          </h2>
          <p className="ww-lead">
            초급 정규반은 처음 시작하는 분들만 모여 4주 동안 같은 순서로 나갑니다.
          </p>
        </div>

        <div className="ww-tti">
          <div>
            <div className="ww-table">
              {CLASSES.map((c) => (
                <div key={c.name} className="tr">
                  <div className="name">{c.name}</div>
                  <div className="time">
                    {c.time}
                    {c.time2 ? (
                      <>
                        <br />
                        {c.time2}
                      </>
                    ) : null}
                  </div>
                  <div className="for">{c.for}</div>
                </div>
              ))}
            </div>
            <p className="ww-fee">
              초급 정규반 <b>4주 10만 원</b> · 수강료 안내와 등록은{" "}
              <a
                href={BOOK_BEGINNER}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--ww-point)", borderBottom: "1px solid #c9d3cd" }}
              >
                네이버 예약
              </a>
              으로도 확인하실 수 있습니다.
            </p>
          </div>

          <div className="ww-oneday">
            <span className="tag">One day · 90 min</span>
            <div className="price">
              30,000원 <span>90분 체험</span>
            </div>
            <ul>
              <li>리뷰를 남겨 주시면 1만 원을 돌려드립니다.</li>
              <li>그날 정규반에 등록하시면 체험비 전액을 빼 드립니다.</li>
              <li>운동화, 편한 바지면 충분합니다.</li>
            </ul>
            <a className="ww-btn" href={BOOK_ONEDAY} target="_blank" rel="noopener noreferrer">
              원데이 예약하기
            </a>
            <p className="ww-ask">
              날짜가 고민되시면{" "}
              <a href={KAKAO} target="_blank" rel="noopener noreferrer">
                1분 카톡 문의
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ─────────── 원장 ─────────── */}
      <section id="director" className="ww-wrap ww-sec">
        <div className="ww-sec-head">
          <span className="ww-eyebrow">Director</span>
          <h2>
            24년째,
            <br />
            탱고만 가르쳤습니다
          </h2>
        </div>

        <div className="ww-director">
          <div className="ww-dir-photo">
            <Image
              src="/images/warmwhite/director-portrait.jpg"
              alt="이인경 원장 — 초록 문 앞에서"
              fill
              sizes="(max-width: 999px) 100vw, 33vw"
            />
          </div>

          <div className="ww-dir-body">
            <p>
              안녕하세요, 엘땅고 원장 <strong>이인경</strong>입니다. 2004년 부에노스아이레스에서
              탱고를 만났고, 그 뒤로 열 번을 더 다녀왔습니다. 2009년 강남에서 이 홀을 열었고,
              그때부터 지금까지 탱고 한 가지만 가르치고 있어요.
            </p>
            <p>
              동호회처럼 눈치 보며 배우는 곳이 아니라, 순서대로 쌓아 올리는 학교를 만들고
              싶었습니다. 그래서 초급반도 커리큘럼 순서대로 나갑니다. 급하게 늘지 않아도, 몇 달
              뒤에 거리에서 음악이 나오면 몸이 먼저 움직이는 그 순간을 위해요.
            </p>
            <p>
              처음 오시는 분의 첫 90분은 제가 직접 안내합니다. 잘하실 필요 없어요, 오시기만
              하세요.
            </p>

            <div className="ww-record">
              {RECORD.map((r) => (
                <div key={r.k} className="row">
                  <div className="k">{r.k}</div>
                  <div className="v">{r.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ww-award">
          <div>
            <div className="pic">
              <Image
                src="/images/warmwhite/award-farabute.jpg"
                alt="2023 로마 FARABUTE Tango Fest 부부 챔피언 트로피"
                fill
                sizes="(max-width: 999px) 100vw, 55vw"
              />
            </div>
            <p className="ww-credit">2023 로마 FARABUTE Tango Fest · 사진 © Marcelo Direnzo</p>
          </div>

          <blockquote>
            트로피보다 값진 건, 수강생이 몇 달 뒤 거리에서 음악에 맞춰 자연스럽게 걷기
            시작하는 순간입니다.
            <cite>이인경</cite>
          </blockquote>
        </div>
      </section>

      {/* ─────────── 공간 ─────────── */}
      <section id="space" className="ww-wrap ww-sec">
        <div className="ww-sec-head">
          <span className="ww-eyebrow">Studio</span>
          <h2>
            2층 문을 열면,
            <br />
            원목 마루와 딥그린 벽
          </h2>
          <p className="ww-lead">
            신논현역 1번 출구에서 4분. 골드 현판이 보이면 도착입니다. 넓은 홀과 통유리, 탈의실과
            사물함까지 처음 오신 날에도 어색하지 않게 준비해 두었습니다.
          </p>
        </div>

        <div className="ww-space">
          <figure className="wide">
            <div className="pic">
              <Image
                src="/images/warmwhite/space-hall.jpg"
                alt="엘땅고 홀 — 딥그린 벽과 원목 마루"
                fill
                sizes="(max-width: 999px) 100vw, 55vw"
              />
            </div>
            <figcaption>홀 — 수업과 밀롱가가 열리는 자리</figcaption>
          </figure>

          <figure className="half">
            <div className="pic">
              <Image
                src="/images/warmwhite/dress-room.jpg"
                alt="엘땅고 드레스룸 — 사물함과 거울"
                fill
                sizes="(max-width: 999px) 50vw, 30vw"
              />
            </div>
            <figcaption>드레스룸 — 사물함과 거울</figcaption>
          </figure>
        </div>
      </section>

      {/* ─────────── 예약 밴드 ─────────── */}
      <section className="ww-band">
        <div className="ww-wrap">
          <div>
            <h2>
              첫 90분, 운동화만
              <br />
              신고 오세요.
            </h2>
            <p>원데이 90분 3만 원 · 당일 정규 등록하시면 체험비는 전액 빼 드립니다.</p>
          </div>
          <div className="btns">
            <a className="ww-btn ww-btn-cream" href={BOOK_ONEDAY} target="_blank" rel="noopener noreferrer">
              원데이 예약하기
            </a>
            <a className="alt" href={KAKAO} target="_blank" rel="noopener noreferrer">
              카톡으로 1분 문의
            </a>
          </div>
        </div>
      </section>

      {/* ─────────── 오시는 길 ─────────── */}
      <section id="visit" className="ww-wrap ww-sec">
        <div className="ww-sec-head">
          <span className="ww-eyebrow">Visit</span>
          <h2>오시는 길</h2>
        </div>

        <div className="ww-visitgrid">
          <div className="ww-visit">
            <div className="row">
              <div className="k">주소</div>
              <div className="v">
                서울 서초구 주흥길 12 2층
                <small>
                  <a href={MAP} target="_blank" rel="noopener noreferrer">
                    네이버 지도로 보기
                  </a>
                </small>
              </div>
            </div>
            <div className="row">
              <div className="k">지하철</div>
              <div className="v">
                신논현역 1번 출구 도보 4분
                <small>9호선·신분당선</small>
              </div>
            </div>
            <div className="row">
              <div className="k">주차</div>
              <div className="v">
                언구비공영주차장 도보 1분
                <small>1시간 1,800원</small>
              </div>
            </div>
            <div className="row">
              <div className="k">전화</div>
              <div className="v">
                <a href={TEL}>0507-1404-9899</a>
                <small>수업 중에는 카톡 문의가 가장 빠릅니다</small>
              </div>
            </div>
            <div className="row">
              <div className="k">카톡</div>
              <div className="v">
                <a href={KAKAO} target="_blank" rel="noopener noreferrer">
                  혼자 와도 되나요? 1분 카톡 문의
                </a>
              </div>
            </div>
          </div>

          <div className="ww-visit-photo">
            <Image
              src="/images/warmwhite/entrance.jpg"
              alt="엘땅고 강남본점 입구 — 2층 골드 현판"
              fill
              sizes="(max-width: 999px) 100vw, 42vw"
            />
          </div>
        </div>
      </section>

      {/* ─────────── 푸터 ─────────── */}
      <footer className="ww-wrap ww-foot">
        <div>
          <div className="brand">EL TANGO</div>
          <p>
            엘땅고 · 서울탱고아카데미
            <br />
            서울 서초구 주흥길 12 2층
            <br />
            0507-1404-9899 · 아르헨티나 탱고 전문 · 2009년 개원
          </p>
          <div className="sns">
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
              인스타 @gangnamtango
            </a>
            <a href={YOUTUBE} target="_blank" rel="noopener noreferrer">
              유튜브 @seoultango
            </a>
            <a href={BLOG} target="_blank" rel="noopener noreferrer">
              블로그
            </a>
            <a href={KAKAO} target="_blank" rel="noopener noreferrer">
              카카오톡 문의
            </a>
          </div>
        </div>
        <p className="copy">© 2026 EL TANGO</p>
      </footer>
    </main>
  );
}
