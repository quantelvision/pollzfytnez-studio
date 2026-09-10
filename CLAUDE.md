# Pollz Fytnez Studio site

Production rebuild of pollzfytnezstudio.in for a two-branch neighbourhood gym in Kolathur, Chennai. Next.js 16 App Router, TypeScript strict, Tailwind v4, pnpm.

The project's knowledge lives in /docs. Read the relevant file before working:

- docs/business.md: the client, real content, audience constraint, WhatsApp conversion rule, logo constraint, pending TODOs.
- docs/design-system.md: the locked "Home Ground" direction, tokens, the green-versus-clay rule, hero spec, motif rules, rejected directions.
- docs/theming.md: how the theme system works, adding a variation, the /preview/[themeId] route.
- docs/coding-standards.md: hard rules, including no raw colours/fonts/radii/durations outside the theme (build-enforced), character and copy rules, icon rules.
- docs/media.md: Cloudinary setup, naming, metadata caption fields, video rules.
- docs/contact.md: the contact form. Resend delivery, moving off the test sender, the enquiry email, rate limiting, validation.
- docs/decisions.md: the running decision log and proposed next-pass IA. Update it when a decision is made.
- docs/git.md: commit message conventions. No Co-Authored-By or tool credit trailers, ever.

Quick facts: business data lives only in src/config/site.ts; themes in src/config/themes (activeThemeId switches the site); `pnpm lint` and `pnpm build` must pass with zero env vars.
