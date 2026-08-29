import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { Branches } from "@/components/sections/Branches";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HowToStart } from "@/components/sections/HowToStart";
import { OpenHours } from "@/components/sections/OpenHours";
import { Plans } from "@/components/sections/Plans";
import { Programs } from "@/components/sections/Programs";
import { Trainer } from "@/components/sections/Trainer";
import { WhyHere } from "@/components/sections/WhyHere";
import type { Theme } from "@/config/themes/types";
import { findBrandLogo } from "@/lib/brand";

// The real page composition, rendered by the home route and by every theme
// preview so variations are judged on the actual site.
export function SitePage({ theme, previewLabel }: { theme: Theme; previewLabel?: string }) {
  const logoSrc = findBrandLogo();

  return (
    <>
      <SkipLink />
      <Header logoSrc={logoSrc} />
      <main id="main" tabIndex={-1}>
        <Hero theme={theme} />
        <Programs />
        <WhyHere />
        <Trainer />
        <HowToStart />
        <Plans />
        <OpenHours />
        <Branches />
        <Faq />
        <Contact />
        <ClosingCta />
      </main>
      <Footer logoSrc={logoSrc} />
      {previewLabel ? (
        <p className="fixed bottom-4 left-4 z-50 rounded-button bg-ink px-4 py-2 type-small text-surface">
          {previewLabel}
        </p>
      ) : null}
    </>
  );
}
