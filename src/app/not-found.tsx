import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { site } from "@/config/site";
import { whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

// A real 404 rather than the framework default, so a bad link still offers the
// two things anyone arriving here wants: the way back, and the way to ask.
export default function NotFound() {
  return (
    <main id="main" className="flex min-h-svh items-center px-gutter py-section">
      <div className="mx-auto max-w-page">
        <p className="type-eyebrow text-accent">404</p>
        <h1 className="mt-4 max-w-2xl type-h2 text-ink">
          That page is not here
        </h1>
        <p className="mt-6 max-w-xl type-lead text-ink-muted">
          The link may be old, or it may have been mistyped. Everything about
          {" "}
          {site.name} is on the front page, and we answer on WhatsApp either way.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Button href="/">Go to the front page</Button>
          <WhatsAppButton message={whatsappMessages.general} variant="quiet">
            Message us on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </main>
  );
}
