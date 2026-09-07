import { Motif } from "@/components/motif/Motif";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

// A numbered roster rather than a card grid: the content is a list of eight
// things the studio runs, so it is set like a training log. The heading column
// stays put on wide screens while the list carries the reading.
export function Programs() {
  return (
    <Section id="programs" innerClassName="lg:grid lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-4">
        <div className="stagger lg:sticky lg:top-28">
          <p className="reveal type-eyebrow text-accent">Programs</p>
          <h2 className="reveal mt-4 type-h2 text-ink">Pick what you are training for</h2>
          <Motif id="barbell-line" className="reveal-wipe-x mt-6 w-40 text-border-strong" />
          <p className="reveal mt-6 max-w-sm type-body text-ink-muted">
            Eight programs run at the studio. Every one of them is coached, and the weight is set
            to what you can do today.
          </p>
        </div>
      </div>

      <ol className="mt-12 lg:col-span-8 lg:mt-0">
        {site.programs.map((program, index) => (
          <li
            key={program.id}
            className="reveal grid grid-cols-[2.5rem_1fr] gap-x-5 gap-y-2 border-t border-border py-7 last:border-b sm:grid-cols-[3.5rem_1fr]"
          >
            <span aria-hidden="true" className="reveal-land reveal-late type-h3 text-border-strong">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="type-h3 text-ink">
                <a
                  href={whatsappLink(whatsappMessages.program(program.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-button underline-offset-4 transition-colors ease-brand hover:text-accent hover:underline"
                >
                  {program.name}
                </a>
              </h3>
              <p className="mt-2 max-w-xl type-body text-ink-muted">{program.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
