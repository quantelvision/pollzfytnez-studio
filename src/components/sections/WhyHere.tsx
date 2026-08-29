import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";

// Two tiers rather than a grid of equal boxes: the coaching record is the
// strongest thing this studio can say, so it is set large and carries a clay
// rule, while the other three sit quieter in a narrower column beside it.
// Deliberately a different shape from the numbered roster in the programs
// section, so the page does not repeat itself.
export function WhyHere() {
  const [lead, ...rest] = site.whyPoints;

  return (
    <Section id="why" onDark className="bg-ink">
      <div className="max-w-2xl">
        <p className="type-eyebrow text-surface/60">Why here</p>
        <h2 className="mt-4 type-h2 text-surface">Why people keep training here</h2>
      </div>

      <div className="mt-14 lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <span aria-hidden="true" className="block h-1 w-20 rounded-button bg-secondary" />
          <h3 className="mt-7 type-h2 text-surface">{lead.title}</h3>
          <p className="mt-5 max-w-lg type-lead text-surface/75">{lead.body}</p>
        </div>

        <dl className="mt-12 lg:col-span-5 lg:col-start-8 lg:mt-0">
          {rest.map((point) => (
            <div key={point.id} className="border-t border-surface/20 py-6 first:pt-0 last:pb-0">
              <dt className="type-h3 text-surface">{point.title}</dt>
              <dd className="mt-2 type-body text-surface/70">{point.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
