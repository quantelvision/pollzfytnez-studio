# Pollz Fytnez Studio

Website for Pollz Fytnez Studio, a two-branch gym in Kolathur, Chennai. Next.js 16 (App Router, TypeScript strict), Tailwind CSS v4, Motion, Lenis, Cloudinary, self-hosted fonts.

## Commands

```
pnpm install
pnpm dev          # develop on http://localhost:3000
pnpm build        # theme purity check + production build
pnpm start        # serve the production build
pnpm lint         # eslint + theme purity check
pnpm check:tokens # theme purity check alone
```

The site builds and runs with no environment variables; media shows labelled placeholders until Cloudinary is configured. Copy .env.example to .env.local to configure.

## Where things are

- /docs: project memory. Start with CLAUDE.md at the root, which indexes it.
- src/config/site.ts: every business fact.
- src/config/themes: the theme system; /preview/[themeId] previews any registered theme on the real site.
- src/fonts: self-hosted fonts and licences.
- /public/brand: the only local media (logo, pending from the client).
