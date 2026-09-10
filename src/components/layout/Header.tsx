"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme/ThemeContext";
import { navLinks } from "@/config/nav";
import { site } from "@/config/site";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { BrandLogo } from "./BrandLogo";
import { MobileMenu } from "./MobileMenu";

// Sits transparent over the hero footage and becomes a solid surface bar once
// the page scrolls. Only the bar itself changes: the logo keeps one size and
// no plate, so the header never changes height and nothing reflows mid scroll.
export function Header({ logoSrc }: { logoSrc: string | null }) {
  const theme = useTheme();
  const startsTransparent = theme.hero.navStyle === "transparent";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = startsTransparent && !scrolled;
  const shell = transparent ? "bg-transparent" : "border-b border-border bg-surface";
  const linkTone = transparent
    ? "text-surface hover:text-on-accent"
    : "text-ink-muted hover:text-accent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] ease-brand ${shell}`}
      {...(transparent ? { "data-on-dark": "" } : {})}
    >
      <div className="mx-auto flex max-w-page items-center justify-between gap-6 px-gutter py-3">
        <Link href="/" className="rounded-button" aria-label={`${site.name}, home`}>
          <BrandLogo logoSrc={logoSrc} onDark={transparent} size="md" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`rounded-button type-small transition-colors ease-brand ${linkTone}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink(whatsappMessages.freeTrial)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center rounded-button bg-accent px-5 py-2.5 type-button text-on-accent btn-ring transition-[background-color,box-shadow,transform] ease-brand hover:bg-accent-hover active:scale-(--t-press-scale) active:bg-accent-press sm:inline-flex"
          >
            Book Free Trial
          </a>
          <MobileMenu onDark={transparent} logoSrc={logoSrc} />
        </div>
      </div>
    </header>
  );
}
