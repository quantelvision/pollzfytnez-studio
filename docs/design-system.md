# Design system: "Home Ground"

The direction the client chose from six mockups, narrowed over two rounds. Locked decisions may not change without asking the client's side first; everything else is open to better judgement.

## Locked

- The colour palette below and the green-versus-clay rule.
- Typeface pairing: Baloo 2 for display, Mukta for body. Both by Ek Type, chosen over a condensed alternative for open readability.
- A warm cream light surface. Not white, not dark.
- Soft, generously rounded shapes. Pill buttons. The softness is load-bearing.
- Type set noticeably large and open. The client's one explicit note was bigger and easier to read.
- A full-bleed video hero with a transparent nav over the footage.
- Hero video keeps its natural, vibrant colour. Darkening for legibility comes only from a scrim on top, never from dimming or desaturating the footage. Washed out reads as a spa; this must read as a gym.

## Tokens (home-ground values)

Defined in src/config/themes/home-ground.ts. Names are the vocabulary; use them, not the hexes.

| Token | Value | Job |
| --- | --- | --- |
| surface | #FAF9F3 | page background |
| surfaceRaised | #FFFFFF | cards, inputs |
| ink | #232820 | body text |
| inkMuted | #59614E | secondary text |
| accent | #2E6B46 | the only interactive colour |
| accentHover | #245B39 | hover fills |
| accentPress | #1C4A2E | pressed fills |
| accentTint | #E7EFE6 | icon chips, pill tags |
| onAccent | #FFFFFF | text on accent or secondary fills |
| secondary | #A84D2E | clay, results only |
| border | #E4E1D3 | hairlines |
| borderStrong | #C7C3AF | emphasised borders |
| mediaBg | #EDEAE0 | behind loading media |
| shade | rgba(35,40,32,0.68) | scrim floor over hero video |
| focus | #2E6B46 | focus rings |
| selectionBg | #CDE0CE | text selection highlight |
| selectionInk | #1C4A2E | text colour inside a selection |
| scrollbarTrack | #EFEDE3 | scrollbar groove |
| scrollbarThumb | #B6C4B2 | scrollbar handle |
| scrollbarThumbHover | #2E6B46 | scrollbar handle on hover |

## The rule that matters

Green owns everything interactive: every button, link, icon and focus ring, including inside the hero. Clay is reserved for moments that read as a result rather than an action: the price, the free-trial badge, a stat worth landing on. If unsure, ask whether the user acts on it (green) or the site is showing it off (clay).

Do not add a second clay variant: one hex covers clay as text on cream (5.3:1) and as a fill under white text (5.6:1). Do not introduce any colour a component "seems to need"; ask first.

All pairings for both registered themes were verified programmatically on 2026-08-27; every text pairing clears WCAG AA 4.5:1.

## Typography

- Display: Baloo 2 (variable, 400-800). Body: Mukta (400/500; add a weight only when a role needs it). Self-hosted, see src/fonts/README.md.
- The scale lives in src/config/themes/type-scales.ts: 18px body, roughly 1.25 ratio, fluid display sizes, tracking tightens as size grows and opens on small uppercase.
- Roles: display, h2, h3, lead, body, small, eyebrow, button. Use them via the type-* utilities (type-display, type-body, ...). Never set a raw font size, weight combination outside a role.

## Shape and motion

- Radii: pill buttons (999px), card 1.5rem, media 1.25rem, input 0.875rem. Media uses plain rounded frames, no masks.
- Motion tokens: one brand ease (cubic-bezier 0.32, 0.72, 0, 1), durations 140/240/480ms, press scale 0.97, ring width 3px.
- Buttons do not lift and never take a shadow. On hover the fill deepens and a flat ring is drawn just outside the pill; on press the button compresses to the press scale. The ring is a hard box-shadow with no blur, so it reads as an outline rather than elevation.
- Shadows mean elevation and almost nothing is elevated: the system currently uses none (Tailwind's shadow scale is cleared).

## The hero specification

- Full bleed, min-h-svh, video from Cloudinary at natural colour, mediaBg behind it while loading.
- The theme's scrim gradient (transparent at top to shade at bottom) carries all darkening.
- Transparent nav over the footage; solid surface bar once scrolled.
- Content bottom-aligned (theme.hero.contentAlign). One h1. Primary CTA is WhatsApp, secondary is a phone call. The free-trial pill was removed from the hero on the client's review (2026-08-29); the offer is still carried by the plans section and the closing call to action.
- Entrance: CSS-only rise on the CTA row and trust card. The h1 is static so the LCP element is never delayed.

## The motif

A set of ten unique hand-drawn marks from the studio's world, in src/components/motif/Motif.tsx. Per the client's direction (2026-08-27) the marks are all different rather than one repeated mark, but placement stays deliberate: each mark has exactly one sanctioned home, recorded in the theme's motif map. Do not scatter them as decoration.

| Mark | Home |
| --- | --- |
| chalk-tally | beside the members-trained stat (hero, placed) |
| ring-scribble | circling the 4.9 rating (hero, placed) |
| underline-stroke | under one key word in the hero heading (placed) |
| barbell-line | programs section heading (placed) |
| clock-five | the opening hours section (placed) |
| chalk-smudge | trainer section accent (placed) |
| plate-outline | withdrawn, the client did not want it on the annual plan |
| knurl-ticks | withdrawn, the client did not want it in the why section |
| rope-loop | withdrawn, the client did not want it on online classes |
| curved-arrow | withdrawn, the step arrows read as awkward and the steps now use a connecting rule |

Four marks were pulled on the client's review (2026-08-29). They stay in the component for later use, but nothing renders them today. Do not reinstate one without asking.

The paths are deliberately irregular. Do not straighten, center or "fix" them; a perfect shape in a rough style looks worse than an honestly plain one. On dark grounds the marks read as chalk (cream), on light grounds they take green for neutral anchoring or clay when marking a result.

## Rejected directions, do not revisit

- Yellow and gold as an accent. Tried twice, removed entirely both times, not to be retuned.
- A kolam floor-art motif. Wrong register for a gym.
- A doorway-arch mask on media. Same reason; media uses plain rounded frames.
- A condensed display face for text-adjacent roles. Conflicts with bigger-and-easier-to-read.
- The full list of banned template tells is in docs/coding-standards.md.
