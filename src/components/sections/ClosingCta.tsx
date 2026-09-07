import { Button } from "@/components/ui/Button";
import { SplitWords } from "@/components/ui/SplitWords";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { whatsappMessages } from "@/lib/whatsapp";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";

// The last thing on the page before the footer, and the boldest colour on it.
export function ClosingCta() {
  const phone = site.phones[0];

  return (
    // The words are masked, and a mask clips its contents, so each one borrows
    // the timeline named on the column instead of running its own.
    <Section
      id="join"
      onDark
      className="bg-accent"
      innerClassName="timeline-group stagger max-w-3xl text-center"
    >
      <h2 className="type-h2 text-on-accent">
        <SplitWords text="Book your free trial day" />
      </h2>
            {/* Full opacity rather than softened: at 85 percent this is the pairing */}
      {/* that fails contrast first on a saturated band, and it was capping how */}
      {/* bright the accent could be. */}
      <p className="reveal mx-auto mt-5 max-w-xl type-lead text-on-accent">
        Message us and tell us which branch suits you. We will find a slot and see you on the
        floor.
      </p>
      <div className="reveal mt-9 flex flex-wrap items-center justify-center gap-4">
        <WhatsAppButton message={whatsappMessages.freeTrial} variant="onAccent">
          Book your free trial
        </WhatsAppButton>
        <Button href={`tel:${phone.tel}`} variant="onMedia">
          Call {phone.display}
        </Button>
      </div>
    </Section>
  );
}
