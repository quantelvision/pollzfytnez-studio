import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PillTag } from "@/components/ui/PillTag";
import { site } from "@/config/site";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { Section } from "@/components/ui/Section";

// The section spends everything in one place: the leading rate on a dark block
// with the figure at display size, which is the only dark card on the page and
// the boldest thing in this half of it. The other two rates share one framed
// rail rather than becoming a second and third card, so the page does not turn
// into a row of equal boxes, and coaching sits under a rule of its own because
// it is priced by the month and is not a membership at all.
// The figure is cream rather than clay here: clay is the result colour, but it
// does not carry on ink, and a colour that fails to read is worse than the rule.
export function Plans() {
  const { featured, others, coaching } = site.plans;
  const offers = [site.offer.freeTrial, site.offer.noHiddenFees, site.offer.support];

  return (
    <Section id="plans">
      <div className="stagger max-w-2xl">
        <p className="reveal type-eyebrow text-accent">Plans</p>
        <h2 className="reveal mt-4 type-h2 text-ink">What it costs</h2>
        <p className="reveal mt-6 type-lead text-ink-muted">
          One price, paid once a year, for everything the studio runs.
        </p>
      </div>

      <div className="reveal mt-12 rounded-card bg-ink p-8 sm:p-10 lg:p-12" data-on-dark="">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-5">
            <PillTag variant="result">{featured.badge}</PillTag>
            <p className="reveal-land reveal-late mt-6 type-display whitespace-nowrap text-surface">
              {featured.price}
            </p>
            <p className="mt-2 type-body text-surface/70">{featured.cadence}</p>
          </div>

          <div className="mt-10 lg:col-span-7 lg:mt-0">
            <h3 className="type-h2 text-surface">{featured.name}</h3>
            <p className="mt-2 type-small text-surface/60">{featured.term}</p>
            <p className="mt-5 max-w-md type-body text-surface/75">{featured.summary}</p>
            <div className="mt-8">
              <Button href={whatsappLink(whatsappMessages.annualPlan)} external variant="onAccent">
                Message us about the annual membership
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* One framed rail split down the middle, rather than two more cards */}
      <div className="reveal mt-6 grid rounded-card border border-border-strong sm:grid-cols-2">
        {others.map((plan, index) => (
          <div
            key={plan.id}
            className={`p-8 lg:p-10 ${
              index > 0 ? "border-t border-border-strong sm:border-t-0 sm:border-l" : ""
            }`}
          >
            <h3 className="type-h3 text-ink">{plan.name}</h3>
            <p className="mt-4 type-display whitespace-nowrap text-secondary">{plan.price}</p>
            <p className="mt-2 type-small text-ink-muted">{plan.term}</p>
            <p className="mt-5 type-body text-ink-muted">{plan.summary}</p>
            <div className="mt-7">
              <Button
                href={whatsappLink(whatsappMessages.plan(plan.name.toLowerCase()))}
                external
                variant="quiet"
              >
                Ask about the {plan.name.toLowerCase()}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="reveal mt-10 border-t border-border-strong pt-8">
        <p className="type-eyebrow text-ink-muted">Coaching, priced by the month</p>
        <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="type-h3 text-ink">{coaching.name}</h3>
            <p className="mt-2 max-w-xl type-body text-ink-muted">{coaching.summary}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-4 sm:items-end">
            <p className="flex items-baseline gap-2">
              <span className="type-h2 whitespace-nowrap text-secondary">{coaching.price}</span>
              <span className="type-body text-ink-muted">{coaching.cadence}</span>
            </p>
            <Button
              href={whatsappLink(whatsappMessages.plan(coaching.name.toLowerCase()))}
              external
              variant="quiet"
            >
              Ask about coaching
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-8">
        <h3 className="reveal type-eyebrow text-ink-muted">Every membership includes</h3>
        <ul className="stagger mt-5 flex flex-wrap gap-x-8 gap-y-3">
          {offers.map((offer) => (
            <li key={offer} className="reveal flex items-center gap-2 type-body text-ink">
              <Check aria-hidden="true" className="size-5 text-accent" />
              {offer}
            </li>
          ))}
          <li className="reveal flex items-center gap-2 type-body text-ink">
            <Check aria-hidden="true" className="size-5 text-accent" />
            Access to the studio programs listed above
          </li>
        </ul>
      </div>
    </Section>
  );
}
