# The theme system

The client has locked the "Home Ground" direction provisionally and is not fully convinced by the palette. More variations will be built and shown side by side. Every design decision is therefore data in one place, and a variation is one file.

## How it works

- A Theme object (src/config/themes/types.ts) holds everything: colours, fonts, the full type scale, radii, spacing, motion tokens, hero treatment, and the motif map.
- One file per theme in src/config/themes/, registered in src/config/themes/index.ts.
- `activeThemeId` in that index is the one value that decides which theme styles the site. Changing it restyles everything.
- themeToCssVars() (css-vars.ts) flattens the active theme into --t-* custom properties, applied server-side as inline styles on the html element in src/app/layout.tsx. No flash, no client JS.
- Tailwind v4 reads those same variables: src/app/globals.css clears Tailwind's default palettes inside `@theme inline` and maps utility tokens onto the --t-* variables. `bg-accent`, `rounded-card`, `type-display` and hand-written CSS all resolve to the same source.
- Client components that need tokens in JavaScript (for Motion) read the theme object from ThemeContext (src/components/theme/ThemeContext.tsx), so previews animate with their own tokens.
- Fonts are theme data: a theme names its faces by FontKey. Every referenced face is self-hosted (src/fonts/) and its CSS variable is registered in src/fonts/registry.ts. registry.ts deliberately has no next/font import so theme code stays usable from metadata routes.

## Enforcement

scripts/check-theme-purity.mjs fails `pnpm lint` and `pnpm build` when a raw hex, colour function, font-family, Tailwind default palette class, or raw duration appears in src/ outside src/config/themes and src/fonts. Do not weaken it; extend it when a new leak pattern shows up.

## Adding a variation

1. Copy an existing theme file in src/config/themes/, give it a new id, name, `status: "draft"` and a one-sentence `argument` saying what case it makes.
2. Register it: one entry in the map in src/config/themes/index.ts.
3. If it uses a new typeface: add the subset woff2 and licence under src/fonts/, a localFont call in src/fonts/index.ts, and its variable name in src/fonts/registry.ts.
4. Run `node <scratch>/contrast check` style verification for its pairings (see docs/decisions.md 2026-08-27 entry) or eyeball with devtools; every text pairing must clear 4.5:1.
5. Nothing else. No component changes, ever. If a variation seems to need a component change, the missing decision belongs in the Theme interface instead.

## The preview route

/preview/[themeId] renders the real site, not a swatch page, under any registered theme. One shareable link per variation:

- /preview/home-ground
- /preview/red-earth

Unknown ids 404 (dynamicParams is false). The route is noindexed via metadata and disallowed in robots.txt, and it is not in the sitemap. A small fixed badge names the previewed theme and its status.

To flip the whole site to a variation after the client picks one: change `activeThemeId` in src/config/themes/index.ts.

## Registered themes

- home-ground (locked): the chosen direction. Green leads interaction, clay marks results, warm cream surface.
- red-earth (draft): flips the two colour roles and changes nothing else. Terracotta leads, deep green marks results, surface warms toward sand. It exists to isolate one question when shown beside home-ground: which colour should lead.
