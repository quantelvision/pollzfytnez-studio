# Decision log

Newest entries at the bottom. When a decision is made, record it here and update the relevant doc; things not written down get accidentally revisited.

## 2026-08-27: scaffold pass

### Business facts clarified with the client

- The old site read women-only because it was built for the women-only branch. The business now runs two gyms; the new site positions it as unisex overall and must showcase both branches with maps. Unisex branch address and both Google Maps links are pending (TODO in docs/business.md).
- Both phone numbers are real: +91 75500 02947 and +91 75500 02957. Both shown.
- Hours are identical at both branches.
- Trust stat is "Over 500 members trained" per the brief, replacing the old site's women-specific claim.

### Stack, versions as installed

- next 16.3.3, react 19.2.8, typescript 5.9.3 strict, pnpm 11.24.0
- tailwindcss 4.3.3 (CSS-first, @theme inline mapped onto runtime --t-* variables)
- motion 13.1.1 (imports from motion/react), lenis 1.3.26 (lenis/react)
- next-cloudinary 6.18.8, lucide-react 1.34.0
- No GSAP: nothing in this pass needed it. Reconsider only with a written justification.

### Theme system

- Runtime CSS custom properties set server-side on the html element; Tailwind default palettes cleared so token utilities are the only vocabulary. Enforced by scripts/check-theme-purity.mjs in lint and build.
- Draft variation red-earth flips the interactive and result colour roles only, to isolate the client's palette doubt. See docs/theming.md.
- Fonts are theme data via src/fonts/registry.ts (no next/font import) so metadata routes can read themes.

### Motif

- Client direction: not one repeated mark but a set of about ten unique hand-drawn marks placed sensibly. Set of ten defined in src/components/motif/Motif.tsx, each with exactly one sanctioned home (table in docs/design-system.md). Three placed in the hero this pass.

### Scaffold-scope choices

- No mobile menu yet: the header has only brand, phone and WhatsApp, so a hamburger would be dead UI. The disclosure menu arrives with the section nav next pass.
- No Section wrapper or CldPicture component yet for the same no-dead-files reason; they land with the first contained section and the gallery.
- Metadata-driven captioning is exercised through the hero video's accessible label (alt from Cloudinary contextual metadata); images use the same helper when the gallery lands.
- Open Graph image is generated at build from theme colours and a committed Baloo 2 static TTF (satori cannot read woff2 or variable fonts). Replace with real studio photography when chosen.
- JSON-LD ships as ExerciseGym with the confirmed branch only; geo and the second branch are added when the client supplies pins and address.
- Hero entrance is CSS-only (works before hydration, LCP-safe). The scroll-linked hero drift is a CSS scroll-driven animation (zero JS, progressive: browsers without animation-timeline skip it). Motion ships as infrastructure (MotionConfig reducedMotion, LazyMotion with lazily loaded features) ready for the next pass's section animation; Lenis loads dynamically after hydration. Both choices exist to hold LCP and TBT on mid-range Android, measured with Lighthouse.
- Mukta ships at weight 400 only; the eyebrow role and heavier text use the Baloo 2 variable axis. One fewer font on the LCP critical path, and micro-labels in the display face tie the hero together.
- Logo file is pending from the client; components fall back to a text wordmark via src/lib/brand.ts.
- Contrast for both themes verified programmatically this pass; all text pairings clear 4.5:1.

### Measured results, scaffold pass (Lighthouse 13.4.1, mobile emulation, production build, placeholder media)

- Accessibility 100, Best Practices 100, SEO 100, CLS 0.
- Performance 88 (median of three runs): FCP 0.77s, simulated LCP 2.7-3.0s, TBT ~300ms. Observed (unthrottled) LCP is 205ms; the simulated number charges the framework JS payload and self-hosted fonts to the text LCP. The bundle is at the Next.js floor (react-dom is 45KB of the 165KB initial JS; app code is ~15KB) and fonts are down to two files (54KB total). The 95 target is not reachable on this page under default simulated throttling without dropping hydration or font self-hosting, both of which are locked choices. Re-measure once real Cloudinary media lands: the LCP element becomes the hero poster and the math changes.
- On Windows, run Lighthouse with --chrome-flags="--headless=new --disable-gpu"; without disable-gpu, headless GPU init inflates observed paints by about 2s.

### Proposed information architecture for the next pass (for discussion, not built)

Single page with anchored sections, in this order:

1. Hero (built)
2. Programs: the 8 programs. Not a uniform card grid; group by intent (build, condition, coach-led, online) so the section has real shape.
3. Why people train here: concrete trust points (5 AM open, mixed room, coaching record), replacing the old site's generic list.
4. Trainer: Banu S. with the three podium facts.
5. Plans: annual Rs 9,999 leading in clay, semi-annual and personal training as contact-for-pricing rows. WhatsApp CTA.
6. Gallery: stills plus online-class clips, video tiles marked per docs/media.md.
7. Locations: both branches, addresses, hours, embedded or linked Google Maps. New section the old site did not have; needed by the two-branch reality.
8. FAQ: rewrite the old site's questions in real copy.
9. Footer CTA + footer (built).

Nav gains section anchors and the mobile disclosure menu when these land. The 4-step onboarding strip from the old site folds into "Why people train here" rather than being its own section.

## 2026-08-29: client review of the first full pass

### Content and structure

- The eight programs are now named as the client words them, in sentence case. "Online fitness classes" is open to men and women, which reinforces the unisex positioning.
- Plans show all three products. Only the annual price is confirmed, so semi-annual and personal training are priced on enquiry. Judgement call to confirm: the client answered the question about plan inclusions with the list of programs, so "every membership includes" states access to the studio programs rather than enumerating a per-tier list. Personal training is deliberately not listed as included in a membership, because it is sold as its own plan. Confirm this reading.
- The why section keeps the client's four titles: Expert Personal Coaching, Improved Fitness and Energy, Empowering Community, Holistic Wellness. Note that "empower" and "holistic" are on the banned copy list in docs/coding-standards.md. The titles were given explicitly by the client, so they stand and the rule is waived for these four headings only. The body copy under each still follows the rules.
- Opening hours moved out of the why section into their own "We are open" section, drawn as a to-scale weekly chart with a live open or closed badge computed in Asia/Kolkata so a visitor abroad still sees Chennai time. The bars are decorative and the same hours are given as a screen-reader table.
- Locations became "We have two branches", sits after the hours section, and drops the opening-hours card. Branch cards are selectable and drive an interactive OpenStreetMap map through Leaflet: selecting a branch flies the map to it and opens its popup.
- "How to start" dropped the arrows between steps, which read as awkward, in favour of numbered nodes on a single connecting rule that runs horizontally on wide screens and vertically on narrow ones.
- Added a contact section with a form. It posts through a server action and sends over SMTP to CONTACT_TO_EMAIL. WhatsApp is still offered first and stays the primary conversion path, so the form never becomes the main route.
- Hero lost the free-trial pill. The header action now reads "Book Free Trial".

### Media

- next-cloudinary was removed. Its CldImage is a client component using hooks, which crashed prerendering of any page containing the trainer portrait. URLs are now built directly in src/lib/cloudinary.ts, which is server-safe, drops a dependency and avoids re-optimising an already optimised file.
- Assets resolve by Cloudinary folder (hero, trainer, gallery) rather than by hardcoded public id, so the client swaps media by uploading a file.
- Blocked: the configured CLOUDINARY_API_SECRET is 10 characters where Cloudinary issues 27, so the Admin API rejects every request with 401 and no folder can be listed. Delivery URLs are unaffected. Media falls back to labelled placeholders until a correct secret is supplied.

### Design

- Button interaction reworked. The lift on hover is gone; buttons deepen in colour, draw a flat ring outside the pill and compress on press. The motion token hoverLift was replaced by pressScale and ringWidth.
- Added themed scrollbar and text-selection tokens, configurable per theme like everything else.
- Four motif marks were withdrawn on the client's review. See the table in docs/design-system.md.

## 2026-08-29: second review pass

- Git history was rebuilt from scratch on the client's instruction. Commit conventions now live in docs/git.md; the hard rule is that no commit carries a Co-Authored-By or tool credit trailer.
- The hero plays every video in the Cloudinary hero folder in turn and loops back to the first, so the reel is controlled by what is uploaded.
- The hero call button was dropped. In its place the hero states whether the gym is open right now, with a rule showing how far through today's opening window it is. Deliberately not a coloured dot: the word carries the meaning, so it does not rely on colour alone and it tells you how long is left rather than only open or closed. The value is computed on the server and refreshed on the client so nothing shifts on load.
- Every WhatsApp link now carries a message written for the button that opened it, so an enquiry arrives with its context. Messages live in src/lib/whatsapp.ts.
- Contact form: email is now required, and validation is our own rather than browser default bubbles. One rule set in src/lib/contact-validation.ts runs both as you type and in the server action, so the two cannot disagree. The phone rule expects an Indian mobile number.
- The program dropdown is a themed listbox (src/components/ui/Select.tsx) because a native select cannot be styled to match. It keeps the native keyboard contract and mirrors its value into a hidden input so the form still posts the same field.
- The footer was rebuilt against the client's reference: programs, contacts and socials, then the copyright line and the studio name set large as a sign-off. The newsletter block from the reference was left out at the client's request.
- Social icons use Simple Icons through react-icons, since Lucide 1.x dropped brand glyphs. Only profiles with a real url render, so nothing links to a guessed handle.
- The chalk-smudge motif was removed from the trainer section, leaving five marks in use.
- A placeholder address was added for the unisex branch so the map interaction can be tested. It is not real and is flagged in docs/business.md.
