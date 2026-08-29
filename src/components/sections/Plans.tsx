import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PillTag } from "@/components/ui/PillTag";
import { site } from "@/config/site";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { Section } from "@/components/ui/Section";

// One plan leads. The annual plan is the only confirmed price, so it gets the
// weight and the clay figure; the other two are quieter rows priced on enquiry.
// What every membership includes is stated once underneath rather than repeated
// as three identical bullet lists.
export function Plans() {
  const { featured, others } = site.plans;
  const offers = [site.offer.freeTrial, site.offer.noHiddenFees, site.offer.support];

  return (
    <Section id="plans">
      <div className="max-w-2xl">
        <p className="type-eyebrow text-accent">Plans</p>
        <h2 className="mt-4 type-h2 text-ink">What it costs</h2>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-12">
        <Card className="flex flex-col p-8 lg:col-span-7 lg:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="type-h3 text-ink">{featured.name}</h3>
              <p className="mt-1 type-small text-ink-muted">{featured.term}</p>
            </div>
            <PillTag variant="result">{site.offer.freeTrial}</PillTag>
          </div>

          <div className="mt-8 flex flex-wrap items-end gap-x-4 gap-y-2">
            <p className="type-display whitespace-nowrap text-secondary">{featured.price}</p>
            <p className="pb-3 type-body text-ink-muted">{featured.cadence}</p>
          </div>

          <p className="mt-6 max-w-md type-body text-ink-muted">{featured.summary}</p>

          <div className="mt-8 lg:mt-auto lg:pt-8">
            <Button href={whatsappLink(whatsappMessages.annualPlan)} external>
              Message us about the annual plan
            </Button>
          </div>
        </Card>

        <div className="grid gap-6 lg:col-span-5">
          {others.map((plan) => (
            <Card key={plan.id} className="flex flex-col p-8">
              <h3 className="type-h3 text-ink">{plan.name}</h3>
              <p className="mt-1 type-small text-ink-muted">{plan.term}</p>
              <p className="mt-4 type-body text-ink-muted">{plan.summary}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button
                  href={whatsappLink(
                    plan.id === "personal-training"
                      ? whatsappMessages.personalTraining
                      : whatsappMessages.semiAnnualPlan,
                  )}
                  external
                  variant="quiet"
                >
                  Ask for pricing
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-border-strong pt-8">
        <h3 className="type-eyebrow text-ink-muted">Every membership includes</h3>
        <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
          {offers.map((offer) => (
            <li key={offer} className="flex items-center gap-2 type-body text-ink">
              <Check aria-hidden="true" className="size-5 text-accent" />
              {offer}
            </li>
          ))}
          <li className="flex items-center gap-2 type-body text-ink">
            <Check aria-hidden="true" className="size-5 text-accent" />
            Access to the studio programs listed above
          </li>
        </ul>
      </div>
    </Section>
  );
}
