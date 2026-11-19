import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * 칼럼 본문 렌더러 (AEO v5)
 *
 * 기존 페이지는 h2/h3/p/ul/ol/strong 만 지원해서
 * 표·인용·이미지 캡션·구분선이 글자로만 나왔습니다. 아래를 추가합니다.
 *  - 표(GFM)               : remark-gfm 필요  →  npm i remark-gfm
 *  - 인용(blockquote)      : 수강생 질문 인용에 사용
 *  - 이미지 + 캡션          : ![설명](경로 "캡션") → <figure><figcaption>
 *  - 외부 링크             : 새 창 + rel="noopener"
 *  - 구분선(hr), 인라인 코드
 *
 * 사용법은 README 의 4번(칼럼 본문) 참고.
 */
const components: Components = {
  h2: ({ children }) => (
    <h2 className="mb-4 mt-10 border-t border-border/30 pt-6 text-2xl font-bold leading-snug text-foreground first:mt-0 first:border-0 first:pt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">{children}</h3>
  ),
  p: ({ children }) => <p className="my-4 leading-relaxed">{children}</p>,
  ul: ({ children }) => <ul className="my-4 list-disc space-y-2 pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="my-4 list-decimal space-y-2 pl-6">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-foreground/80">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 rounded-r-xl border-l-2 border-primary/60 bg-primary/5 px-5 py-4 text-[0.98em] font-medium text-primary [&>p]:my-0">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-border/40" />,
  a: ({ href, children }) => {
    const external = typeof href === "string" && /^https?:\/\//.test(href);
    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-primary/40 underline-offset-2 transition-colors hover:text-primary"
      >
        {children}
      </a>
    ) : (
      <a
        href={href}
        className="underline decoration-primary/40 underline-offset-2 transition-colors hover:text-primary"
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt, title }) => (
    <figure className="my-7">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={typeof src === "string" ? src : ""}
        alt={alt ?? ""}
        loading="lazy"
        className="w-full rounded-xl border border-border/30"
      />
      {(title || alt) && (
        <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {title ?? alt}
        </figcaption>
      )}
    </figure>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border/30">
      <table className="w-full min-w-[520px] border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-primary/90 text-primary-foreground">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr className="border-t border-border/30">{children}</tr>,
  th: ({ children }) => (
    <th className="px-3.5 py-2.5 text-left text-xs font-semibold sm:text-sm">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-3.5 py-2.5 align-top text-sm leading-relaxed">{children}</td>
  ),
  code: ({ children }) => (
    <code className="rounded bg-foreground/5 px-1.5 py-0.5 text-[0.9em]">{children}</code>
  ),
};

export function BlogMarkdown({ content }: { content: string }) {
  return (
    <div className="space-y-1 text-sm leading-relaxed text-foreground/90 sm:text-base">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </Markdown>
    </div>
  );
}
