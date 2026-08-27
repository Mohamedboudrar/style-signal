import type { ReactNode } from "react";

interface KeyTakeawaysProps {
  // Pass MDX content as children (typically an ordered/unordered list of
  // short bullets). Renders as a styled callout.
  children: ReactNode;
  label?: string;
}

// Editorial callout. Single oxblood rule on the left, generous padding,
// the label rendered as an uppercase eyebrow with a thin horizontal rule
// beside it. No card chrome, no background fill.
export function KeyTakeaways({
  children,
  label = "Key Takeaways",
}: KeyTakeawaysProps) {
  return (
    <aside
      className="my-12 max-w-prose mx-auto pl-6 border-l border-signal-500"
      aria-label={label}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-signal-500">
          {label}
        </span>
        <span aria-hidden className="flex-1 h-px bg-ink-200" />
      </div>
      <div className="prose prose-sm max-w-none
        prose-ul:my-0 prose-ul:pl-0
        prose-li:my-2 prose-li:leading-relaxed
        prose-li:text-ink-700 prose-li:text-[1rem]">
        {children}
      </div>
    </aside>
  );
}
