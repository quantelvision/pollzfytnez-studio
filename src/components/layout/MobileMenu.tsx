"use client";

import { AnimatePresence, m } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme/ThemeContext";
import { navLinks } from "@/config/nav";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

// Disclosure menu for narrow screens. Motion handles the exit animation, which
// plain CSS cannot do once the node is removed. Focus moves into the panel on
// open, is trapped while it is open, and returns to the trigger on close.
export function MobileMenu({ onDark }: { onDark: boolean }) {
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
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const triggerTone = onDark && !open ? "text-surface" : "text-ink";

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex items-center justify-center rounded-button p-2.5 transition-colors ease-brand ${triggerTone}`}
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: theme.motion.durationBase / 1000, ease: theme.motion.ease }}
            className="absolute inset-x-0 top-full border-b border-border bg-surface px-gutter pb-6"
          >
            <nav aria-label="Sections">
              <ul>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-border py-4 type-h3 text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href={whatsappLink(whatsappMessages.freeTrial)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex w-full items-center justify-center rounded-button bg-accent px-5 py-3 type-button text-on-accent"
            >
              Book Free Trial
            </a>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
