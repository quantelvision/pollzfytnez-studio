import { ArrowUp } from "lucide-react";
import { site } from "@/config/site";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { BrandLogo } from "./BrandLogo";
import { SocialLinks } from "./SocialLinks";

// Three columns of real links, then a short sign off set large across the
// bottom as a sign-off. The wordmark is decorative and clipped by the section,
// so it is hidden from screen readers, which already have the name above.
export function Footer({ logoSrc }: { logoSrc: string | null }) {
  // The unisex gym is the address the footer carries, confirmed 2026-09-11.
  // Named by kind rather than taken as whichever branch happens to have an
  // address first, so adding a branch cannot quietly move the contact block.
  const branch = site.branches.find((entry) => entry.kind === "unisex" && entry.address !== null);

  return (
    // The footer clips the oversized sign off, which makes it a scroll
    // container, so everything inside borrows the timeline it names.
    <footer className="timeline-group overflow-hidden bg-ink text-surface" data-on-dark="">
      <div className="mx-auto max-w-page px-gutter pt-20 pb-10">
        <div className="stagger grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="reveal in-group">
            <BrandLogo logoSrc={logoSrc} onDark size="lg" />
          </div>

          <nav aria-labelledby="footer-programs" className="reveal in-group">
            <h2 id="footer-programs" className="type-h3 text-surface">
              Programs
            </h2>
            <ul className="mt-6 space-y-3">
              {site.programs.slice(0, 5).map((program) => (
                <li key={program.id}>
                  <a
                    href={whatsappLink(whatsappMessages.program(program.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-button type-body text-surface/70 underline-offset-4 transition-colors ease-brand hover:text-surface hover:underline"
                  >
                    {program.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="reveal in-group">
            <h2 className="type-h3 text-surface">Contacts</h2>
            <ul className="mt-6 space-y-3">
              {branch?.address ? (
                <li>
                  <address className="type-body text-surface/70 not-italic">
                    {branch.address.street},
                    <br />
                    {branch.address.locality}, {branch.address.city}, {branch.address.region}{" "}
                    {branch.address.postalCode}
                  </address>
                </li>
              ) : null}
              {site.phones.map((phone) => (
                <li key={phone.tel}>
                  <a
                    href={`tel:${phone.tel}`}
                    className="rounded-button type-body text-surface/70 underline-offset-4 transition-colors ease-brand hover:text-surface hover:underline"
                  >
                    {phone.display}
                  </a>
                </li>
              ))}
              {site.email ? (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="rounded-button type-body text-surface/70 underline-offset-4 transition-colors ease-brand hover:text-surface hover:underline"
                  >
                    {site.email}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div className="reveal in-group">
            <h2 className="type-h3 text-surface">In socials</h2>
            <SocialLinks className="mt-6" />
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-small text-surface/50">
            Copyright {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          {/* A plain anchor, so it works before hydration and needs no client */}
          {/* boundary. Lenis eases it, and reduced motion jumps straight there. */}
          <a
            href="#main"
            className="btn-ring inline-flex items-center gap-2 rounded-button border border-surface/25 px-5 py-2.5 type-button text-surface transition-[background-color,border-color,box-shadow,color] ease-brand hover:border-surface hover:bg-surface hover:text-ink"
          >
            <ArrowUp aria-hidden="true" className="size-4" />
            Back to top
          </a>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="footer-wordmark reveal-signoff in-group text-surface/12 select-none"
      >
        {site.signOff}
      </p>
    </footer>
  );
}
