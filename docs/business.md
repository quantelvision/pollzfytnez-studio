# The business

All facts here are real and are the only facts the site may state. They live in code at src/config/site.ts; this file records them with their context. There is no placeholder or invented content in this project, with one sanctioned exception noted below.

## Identity

- Name: Pollz Fytnez Studio
- Tagline: "Train like a Star". Printed on the logo itself, so it is kept verbatim, including its capitalisation.
- A neighbourhood gym business in Kolathur, Chennai. The previous site is at https://pollzfytnezstudio.in and survives only as a screenshot.

## Two branches

The business runs two gyms:

1. Women's studio at 8A, Sivananda Nagar, 100 Feet Road, Kolathur, Chennai 600099. This is the branch the old site was built for, which is why that site read as women-only.
2. A unisex gym. Its address is not yet supplied by the client. TODO: get the address and add it to src/config/site.ts and to the JSON-LD.

The new site positions the business as unisex overall, and must showcase both branches with their locations and Google Maps links (a locations section, next pass). TODO: Google Maps share links for both branches are pending from the client.

The one sanctioned placeholder: the unisex branch renders "Address coming soon" until the client supplies it.

Second branch address: the address currently in src/config/site.ts for the unisex gym is a PLACEHOLDER added at the client's request so the map could be tested. It is not real. TODO: replace it with the real address before launch.

Social profiles: no profile URLs have been supplied. src/config/site.ts lists the platforms with a null url and the footer renders only the ones that have a link, so nothing points at a guessed handle. TODO: add the real Instagram, Facebook and YouTube links.

Public email: none confirmed. The footer hides the email line until site.email is set. TODO.

Map pins: no exact coordinates have been supplied. The women's studio pin currently uses the Kolathur locality centroid from OpenStreetMap and is flagged in the UI as an approximate location. TODO: get the exact pin for both branches and set `geo.approximate` to false. The unisex branch has no pin at all until its address arrives, so it does not appear on the map.

## Contact and conversion

- Phones: +91 75500 02947 and +91 75500 02957. Both are shown; both confirmed by the client on 2026-08-27.
- WhatsApp: https://wa.me/917550002947. This is the studio's real sales mechanism. Every primary call to action on the site is a WhatsApp message, never a contact form.

## Hours

Same at both branches, confirmed by the client:

- Monday to Saturday: 5:00 AM to 9:30 PM
- Sunday: 6:00 AM to 1:00 PM

The 5 AM open is a genuine differentiator and is used in copy.

## Numbers and claims

- Over 500 members trained. Used once, properly, not repeated with a plus sign everywhere.
- Rated 4.9 out of 5 by members.
- Annual plan: Rs 9,999. The old site also listed a semi-annual plan and personal training with contact-for-pricing; carry those into the plans section next pass.
- Offer: 1 day free trial, no hidden fees, 365 days of support.

## Programs (8)

Strength training, personal training, body conditioning, body toning, weight loss, weight gain, CrossFit, online classes.

## Head trainer

Banu S.

- 3rd place, National Powerlifting Championship 2023, Bengaluru
- Five state golds, Coimbatore
- 3rd place, National Powerlifting Championship 2020, New Delhi

## The audience, and it constrains the design

The room is genuinely mixed: a 40 year old woman, a teenage boy, and a retiree doing mobility work train at the same time. The site cannot read as a women's studio and cannot read as an aggressive men's gym. The price point is accessible, so nothing may signal luxury. Most visitors are on a mid-range Android phone on mobile data.

## The logo constraint

The logo is fixed and cannot be redesigned. "POLLZ" is drawn as a white outline with no fill, so on a light background the word disappears. Any placement on a light surface needs a dark plate behind it; on a dark background or over dimmed video it works as-is. This is settled and verified, do not re-litigate it.

The client places the file in /public/brand as logo.svg, logo.png or logo.webp. Until then components render a text wordmark (src/lib/brand.ts handles detection).
