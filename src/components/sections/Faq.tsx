import { Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";

// Native details and summary: keyboard operable and findable by browser search
// with no ARIA or JavaScript. Narrow measure so this section reads as the quiet
// end of the page rather than another full width block.
export function Faq() {
  return (
    <Section id="faq" innerClassName="max-w-3xl">
      <p className="type-eyebrow text-accent">Questions</p>
      <h2 className="mt-4 type-h2 text-ink">Questions we get asked</h2>

      <div className="mt-10">
        {site.faq.map((item) => (
          <details key={item.q} className="group border-t border-border last:border-b">
            <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 type-h3 text-ink marker:content-none">
              {item.q}
              <Plus
                aria-hidden="true"
                className="mt-1 size-6 shrink-0 text-accent transition-transform ease-brand group-open:rotate-45"
              />
            </summary>
            <p className="pb-6 type-body text-ink-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
