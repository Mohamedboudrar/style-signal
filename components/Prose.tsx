import type { ReactNode } from "react";

interface ProseProps {
  children: ReactNode;
  className?: string;
}

// <Prose> wraps rendered MDX content with editorial typography.
//
// Design notes:
// - Body in sans-serif (Inter) at 18px / 1.75 line-height.
// - Major editorial elements (h2, h3) in serif (Fraunces) with restrained
//   weight. Avoids the heavy/old-fashioned feel of the previous Source Serif
//   implementation by using opsz 144 and weight 500.
// - Prose column is capped at 44rem (~704px) for comfortable reading.
// - "How to wear it" lines render as a styled <p> with an oxblood vertical
//   rule — handled in globals.css via .prose-styling.
export function Prose({ children, className = "" }: ProseProps) {
  return (
    <div
      className={`prose prose-base max-w-prose mx-auto
        prose-headings:font-serif prose-headings:font-medium
        prose-headings:tracking-editorial prose-headings:text-ink-900
        prose-h1:hidden
        prose-h2:text-3xl prose-h2:md:text-4xl
        prose-h2:leading-tight prose-h2:mt-16 prose-h2:mb-6
        prose-h3:text-lg prose-h3:md:text-xl
        prose-h3:leading-snug prose-h3:mt-10 prose-h3:mb-3
        prose-p:text-ink-700 prose-p:leading-[1.75]
        prose-p:text-[1.0625rem] prose-p:md:text-[1.125rem]
        prose-a:text-signal-500 prose-a:font-medium
        prose-a:no-underline prose-a:underline-offset-4
        hover:prose-a:underline
        prose-strong:text-ink-900 prose-strong:font-semibold
        prose-blockquote:border-l-2 prose-blockquote:border-signal-500
        prose-blockquote:pl-6 prose-blockquote:py-1
        prose-blockquote:font-normal prose-blockquote:not-italic
        prose-blockquote:text-ink-700
        prose-code:bg-ink-100 prose-code:px-1.5 prose-code:py-0.5
        prose-code:rounded prose-code:font-medium
        prose-code:before:hidden prose-code:after:hidden
        prose-li:marker:text-signal-500
        prose-figure:my-10 prose-figure:mx-auto
        prose-img:rounded-md
        prose-hr:border-ink-200
        ${className}`}
    >
      {children}
    </div>
  );
}
