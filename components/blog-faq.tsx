/**
 * 칼럼 FAQ 아코디언 (AEO v5)
 *
 * 기존에는 <div><h3>질문</h3><p>답</p></div> 라서 9개 질문이 전부 펼쳐진 채로 길게 나왔습니다.
 * <details>/<summary> 로 접어도 **HTML 안에 답변 전문이 남아** 크롤러·AI는 그대로 읽습니다.
 * 화면 문장 = FAQPage 스키마 문장이 되도록 **가공 없이** 그대로 출력합니다.
 * (t("question", {text}) 같은 접두어를 붙이면 스키마와 문장이 달라지므로 붙이지 않습니다.)
 */
export function BlogFaq({
  items,
  title,
}: {
  items: { question: string; answer: string }[];
  title: string;
}) {
  if (!items.length) return null;

  return (
    <section className="mb-10 mt-12" aria-labelledby="faq-title">
      <h2 id="faq-title" className="mb-6 text-xl font-bold text-foreground">
        {title}
      </h2>
      <div className="space-y-2.5">
        {items.map((faq) => (
          <details
            key={faq.question}
            className="group glass-card rounded-xl px-5 py-4 transition-colors open:border-primary/40"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm font-semibold text-primary sm:text-base [&::-webkit-details-marker]:hidden">
              <span className="leading-relaxed">{faq.question}</span>
              <span
                aria-hidden
                className="mt-0.5 shrink-0 text-lg leading-none text-primary/70 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
