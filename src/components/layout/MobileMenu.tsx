"use client";

import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { useTheme } from "@/components/theme/ThemeContext";
import { navLinks } from "@/config/nav";
import { site } from "@/config/site";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

// Full screen menu for narrow screens. It covers the page rather than hanging
// under the header, so a thumb has the whole screen to aim at and the page
// behind cannot be half read through it. Motion handles the exit animation,
// which plain CSS cannot do once the node is removed. Focus moves into the
// panel on open, is trapped while it is open, and returns to the trigger on
// close, and the page behind is locked from scrolling.
export function MobileMenu({ onDark, logoSrc }: { onDark: boolean; logoSrc: string | null }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panel) {
        return;
      }
      const focusable = panel.querySelectorAll<HTMLElement>("a[href], button");
      if (focusable.length === 0) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const close = () => setOpen(false);
  // the trigger sits above the panel, so once open it is always on the surface
  const triggerTone = onDark && !open ? "text-surface" : "text-ink";

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className={`relative z-50 inline-flex cursor-pointer items-center justify-center rounded-button p-2.5 transition-colors ease-brand ${triggerTone}`}
      >
        {open ? (
          <X aria-hidden="true" className="size-6" />
        ) : (
          <Menu aria-hidden="true" className="size-6" />
        )}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: theme.motion.durationBase / 1000, ease: theme.motion.ease }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-surface px-gutter pt-5 pb-10"
          >
            {/* The trigger sits top right, so the brand takes the corner */}
            {/* opposite it and the sheet reads as the site rather than a list. */}
            <Link
              href="/"
              onClick={close}
              aria-label={`${site.name}, home`}
              className="mb-10 self-start rounded-button"
            >
              <BrandLogo logoSrc={logoSrc} onDark={false} size="md" />
            </Link>

            <nav aria-label="Sections">
              <ul>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={close}
                      className="block border-b border-border py-4 type-h3 text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto pt-10">
              <a
                href={whatsappLink(whatsappMessages.freeTrial)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="inline-flex w-full items-center justify-center rounded-button bg-accent px-5 py-4 type-button text-on-accent"
              >
                Book your free trial
              </a>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
