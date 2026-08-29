# Coding standards

Hard rules for every file in this repository.

## Characters

- Only characters found on a standard keyboard. No em dashes, en dashes, curly quotes, ellipsis characters, arrows, middle dots, or any typographic special character. Straight quotes and plain hyphens only.
- No emojis anywhere: copy, markup, CSS, comments, docs, console output, commit messages.

## Comments

- Single-line comments only. No block comments, no banner comments, no commented-out code.
- A comment states what the code does, briefly and accurately. Do not comment the obvious.

## TypeScript

- Strict mode stays on. No `any` without a written reason beside it.
- Server Components by default. `"use client"` only where interaction genuinely requires it. Current client boundaries: ThemeContext, MotionProvider, SmoothScroll, Header (scroll state), MobileMenu, HeroVideoClient (playback control), OpenStatus (live clock), Branches and BranchMapClient (map interaction), Contact (form state).
- A `"use server"` module may only export async functions. Shared types and initial state for a server action live in a plain sibling module, as in src/app/actions/contact-state.ts.

## Theming, the most important rule

- No component may contain a raw colour, font family, radius, or duration. Everything resolves through the theme (see docs/theming.md). scripts/check-theme-purity.mjs enforces this in lint and build.
- Never use Tailwind's default palette (no blue-500, no gray-900); those scales are cleared in globals.css so the classes do not exist.
- Text styles are the type-* role utilities only.
- New token needed? Ask the client's side first; do not invent one.

## Icons

- Library: lucide-react. Chosen because its rounded caps and joins and even 2px stroke sit naturally with Baloo 2 and Mukta, it tree-shakes per icon, and it is actively maintained. Phosphor was the considered alternative; do not mix sets.
- One documented exception: brand marks. Lucide 1.x dropped its brand glyphs, so social icons come from Simple Icons through `react-icons/si`, imported one at a time. Never hand-draw a company logo: it is a trademark risk and always looks worse than the official mark. Brand icons are the only thing that set is used for.
- Import icons individually, never the whole set.
- Icons inherit colour via currentColor so they retheme.
- An icon repeating an adjacent label is aria-hidden. An icon standing alone needs an accessible label.

## Copy

- Real copy only, no lorem ipsum. Say what a thing does. Active voice, sentence case, no exclamation marks.
- Buttons say what happens when pressed: "Message us on WhatsApp", never "Get Started" or "Learn More".
- Banned words: elevate, unlock, journey, seamless, empower, transform, redefine, unleash, embark, holistic, curated, bespoke, cutting-edge, state-of-the-art, game-changer.
- One standing exception: the four why-section headings were set by the client and include "Empowering" and "Holistic". They stand as given. The rule still applies everywhere else, including the body copy beneath them.
- Banned constructions: "it is not just x, it is y"; rhetorical-question headlines; "In today's fast-paced world" openers; three-item rhythm lists ("Stronger. Faster. Better."); "whether you are x or y, we have you covered".
- Be specific. The 5 AM open, the national powerlifting medals, the 100 Feet Road address: concrete details a template cannot fake beat any benefit statement.

## Visual defaults that read as generated, never use

Purple-blue gradients, gradient text or buttons; glassmorphism and backdrop blur; floating orbs, blobs, dotted grids, wavy dividers, sparkles, confetti, isometric people; drop shadows as decoration; emoji as icons; bento grids without a content reason; infinite marquees; the same scale(1.05)-plus-shadow on every hover; plus signs padded onto every number.

## Layout judgement

- No repeated section shape down the page (centered eyebrow, heading, paragraph, three cards).
- Vary rhythm on purpose; build real hierarchy; use the column count the content has; spend boldness in one place per section.
- Before calling a section done: could it be dropped onto any other gym site unchanged? If yes, it is not finished. Then remove one element that was not carrying weight.

## Animation

- Lenis for smooth scroll, Motion for component and scroll-linked animation. GSAP only with a written justification; do not add it by default.
- prefers-reduced-motion is honoured globally in three places only: MotionConfig reducedMotion="user", the SmoothScroll gate, and CSS media queries. Reduced motion means no smooth scroll, no entrance animation, no video autoplay, fully usable site.
- Animate transform and opacity only. No animation may shift layout or delay the LCP element.
- Animation features load lazily (LazyMotion with dynamic features import); keep it that way.

## Commits

See docs/git.md. Conventional Commits, imperative subject, and never a Co-Authored-By or tool credit trailer.

## General

- No dead files, no unused dependencies, no leftover scaffolding.
- pnpm is the package manager.
- `pnpm lint` and `pnpm build` must pass with zero env vars set: Cloudinary degrades to placeholders, it never crashes a build.
