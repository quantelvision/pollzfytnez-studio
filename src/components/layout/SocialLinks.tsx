import { SiFacebook, SiInstagram, SiWhatsapp, SiYoutube } from "react-icons/si";
import type { IconType } from "react-icons";
import { site } from "@/config/site";

// Brand marks come from Simple Icons through react-icons. Lucide is the icon
// set everywhere else but dropped its brand glyphs, and a hand-drawn logo is
// both a trademark risk and worse than the official mark.
const brandIcons: Record<string, IconType> = {
  whatsapp: SiWhatsapp,
  instagram: SiInstagram,
  facebook: SiFacebook,
  youtube: SiYoutube,
};

// Only profiles with a real url are rendered, so nothing links to a guess.
export function SocialLinks({ className }: { className?: string }) {
  const links = site.socials.filter((social) => social.url !== null);
  if (links.length === 0) {
    return null;
  }

  return (
    <ul className={["flex flex-wrap items-center gap-5", className].filter(Boolean).join(" ")}>
      {links.map((social) => {
        const Icon = brandIcons[social.id];
        return (
          <li key={social.id}>
            <a
              href={social.url as string}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-button text-surface/70 transition-colors ease-brand hover:text-surface"
            >
              <Icon aria-hidden="true" className="size-5" />
              <span className="sr-only">{social.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
