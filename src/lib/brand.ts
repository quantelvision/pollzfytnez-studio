import { existsSync } from "node:fs";
import { join } from "node:path";

// The client places the logo file in /public/brand after the scaffold.
// Until it exists, components render a text wordmark instead of a broken image.
export function findBrandLogo(): string | null {
  const candidates = ["logo.svg", "logo.png", "logo.webp"];
  for (const file of candidates) {
    if (existsSync(join(process.cwd(), "public", "brand", file))) {
      return `/brand/${file}`;
    }
  }
  return null;
}
