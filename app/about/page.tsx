import { Container } from "@/components/Container";
import { site } from "@/lib/site";

export default function AboutPage() {
  return (
    <Container as="section" className="py-12 md:py-20 max-w-3xl">
      <p className="text-sm uppercase tracking-[0.2em] text-signal-500 font-semibold">
        About
      </p>
      <h1 className="mt-2 text-4xl md:text-5xl font-serif font-semibold text-ink-900">
        {site.name}
      </h1>
      <p className="mt-4 text-xl text-ink-600">{site.tagline}</p>

      <div className="prose prose-lg mt-10 max-w-none text-ink-800 leading-relaxed">
        <p>{site.description}</p>
        <p>
          Style Signal covers the four corners of US fashion trend intelligence:
          runway trends, celebrity style, affordable interpretations, and
          seasonal trend reports. Every article is written to be useful, not
          just informative — we tell you what to wear, what to skip, and where
          the trend is actually going.
        </p>
        <h2>Editorial principles</h2>
        <ul>
          <li>
            <strong>Source-backed.</strong> Designer and brand attributions link
            to primary sources.
          </li>
          <li>
            <strong>Practical.</strong> Every trend report ends with a wardrobe
            recommendation.
          </li>
          <li>
            <strong>Independent.</strong> No paid placements, no affiliate
            roundups.
          </li>
        </ul>
        <h2>Contact</h2>
        <p>
          Editorial inquiries:{" "}
          <a href={`mailto:${site.editorEmail}`}>{site.editorEmail}</a>
        </p>
      </div>
    </Container>
  );
}
