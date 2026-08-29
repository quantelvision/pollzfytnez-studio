import { site } from "@/config/site";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { BrandLogo } from "./BrandLogo";
import { SocialLinks } from "./SocialLinks";

// Three columns of real links, then the studio name set large across the
// bottom as a sign-off. The wordmark is decorative and clipped by the section,
// so it is hidden from screen readers, which already have the name above.
export function Footer({ logoSrc }: { logoSrc: string | null }) {
  const branch = site.branches.find((entry) => entry.address !== null);

  return (
    <footer className="overflow-hidden bg-ink text-surface" data-on-dark="">
      <div className="mx-auto max-w-page px-gutter pt-20 pb-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandLogo logoSrc={logoSrc} onDark />
            <p className="mt-4 max-w-xs type-body text-surface/70">{site.tagline}</p>
          </div>

          <nav aria-labelledby="footer-programs">
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

          <div>
            <h2 className="type-h3 text-surface">Contacts</h2>
            <ul className="mt-6 space-y-3">
              {branch?.address ? (
                <li>
                  <address className="type-body text-surface/70 not-italic">
                    {branch.address.street},
                    <br />
                    {branch.address.locality}, {branch.address.city} {branch.address.postalCode}
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

          <div>
            <h2 className="type-h3 text-surface">In socials</h2>
            <SocialLinks className="mt-6" />
          </div>
        </div>

        <p className="mt-16 type-small text-surface/50">
          Copyright {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>

      <p aria-hidden="true" className="footer-wordmark text-surface/12 select-none">
        {site.name}
      </p>
    </footer>
  );
}
