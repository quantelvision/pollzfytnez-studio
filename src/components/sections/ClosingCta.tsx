import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { whatsappMessages } from "@/lib/whatsapp";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";

// The last thing on the page before the footer, and the boldest colour on it.
export function ClosingCta() {
  const phone = site.phones[0];

  return (
    <Section id="join" onDark className="bg-accent" innerClassName="max-w-3xl text-center">
      <h2 className="type-h2 text-on-accent">Book your free trial day</h2>
      <p className="mx-auto mt-5 max-w-xl type-lead text-on-accent/85">
        Message us and tell us which branch suits you. We will find a slot and see you on the
        floor.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
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
