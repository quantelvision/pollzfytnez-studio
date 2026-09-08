import { HeroVideo } from "@/components/media/HeroVideo";
import { Motif } from "@/components/motif/Motif";
import { Card } from "@/components/ui/Card";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { site } from "@/config/site";
import type { Theme } from "@/config/themes/types";
import { whatsappMessages } from "@/lib/whatsapp";

// Full-bleed video hero. The footage keeps its natural colour; the theme's
// scrim carries all of the darkening for text legibility.
export function Hero({ theme }: { theme: Theme }) {
  const align = theme.hero.contentAlign === "bottom" ? "mt-auto" : "my-auto";

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-media-bg" data-on-dark="">
      <HeroVideo
        folder={site.media.heroFolder}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "var(--t-hero-scrim)" }} />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-36"
        style={{ background: "var(--t-hero-nav-scrim)" }}
      />

      <div className={`hero-drift relative z-10 w-full ${align}`}>
        <div className="mx-auto w-full max-w-page px-gutter pt-32 pb-12 sm:pb-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="type-display text-surface">
                Train like a{" "}
                <span className="relative inline-block">
                  Star
                  <Motif
                    id="underline-stroke"
                    className="hero-underline absolute -bottom-3 left-0 w-full text-accent"
                  />
                </span>
              </h1>
              <p className="mt-6 max-w-xl type-lead text-surface/90">
                Everyone deserves to feel strong, confident, and proud of their body. We’re here to provide the guidance, support, and motivation you need to become your strongest self.
              </p>
              <div className="hero-rise mt-8">
                <WhatsAppButton message={whatsappMessages.freeTrial}>
                  Book your free trial
                </WhatsAppButton>
              </div>
            </div>

            <Card className="hero-rise-late flex max-w-sm items-center gap-5 p-6">
              <Motif id="chalk-tally" className="w-12 shrink-0 text-accent" />
              <div>
                <p className="type-h3 text-ink">{site.stats.membersTrained}</p>
                <p className="mt-1 type-body text-ink-muted">
                  Rated{" "}
                  <span className="relative mx-1 inline-block px-1 text-ink">
                    {site.stats.rating}
                    <Motif
                      id="ring-scribble"
                      className="hero-circle absolute top-1/2 left-1/2 h-[200%] w-[165%] -translate-x-1/2 -translate-y-1/2 text-secondary"
                    />
                  </span>{" "}
                  out of {site.stats.ratingOutOf} by members
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
