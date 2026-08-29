import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";

// A dark band to break the run of cream, kept deliberately quiet: no cards,
// no icons, just four concrete facts set as text with a rule above each.
export function WhyHere() {
  return (
    <Section
      id="why"
      onDark
      className="bg-ink"
      innerClassName="lg:grid lg:grid-cols-12 lg:gap-16"
    >
      <div className="lg:col-span-5">
        <p className="type-eyebrow text-surface/60">Why here</p>
        <h2 className="mt-4 type-h2 text-surface">Why people keep training here</h2>
      </div>

      <dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:mt-0">
        {site.whyPoints.map((point) => (
          <div key={point.id} className="border-t border-surface/20 pt-6">
            <dt className="type-h3 text-surface">{point.title}</dt>
            <dd className="mt-2 type-body text-surface/75">{point.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
