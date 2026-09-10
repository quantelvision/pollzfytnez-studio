import { site } from "@/config/site";
import { findBrandLogo } from "@/lib/brand";

// One connected graph rather than a pile of separate records. The nodes point
// at each other by @id, so a search engine reads the two gyms as branches of
// one business, the trainer as someone who works for it, and the questions as
// part of the same site.
//
// Every value comes from src/config/site.ts, including the origin, so nothing
// here can drift from what the page says and a domain change is one env var.

const LOCALE = "en-IN";

// Stable fragment ids, so the same node keeps the same name across builds
const websiteId = () => `${site.url}/#website`;
const organizationId = () => `${site.url}/#organization`;
const personId = (name: string) =>
  `${site.url}/#${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

function organization() {
  const logo = findBrandLogo();
  return {
    "@type": "Organization",
    "@id": organizationId(),
    name: site.name,
    url: `${site.url}/`,
    slogan: site.tagline,
    description: site.description,
    // the real logo file when the client has supplied one, and the generated
    // social card either way, since Google wants an image it can crop
    ...(logo ? { logo: `${site.url}${logo}` } : {}),
    image: `${site.url}/opengraph-image`,
    telephone: site.phones.map((phone) => phone.tel),
    ...(site.email ? { email: site.email } : {}),
    // the profiles the gym actually runs, which is how a search engine ties
    // this record to accounts it already knows
    sameAs: site.socials.map((social) => social.url),
    areaServed: { "@type": "City", name: "Chennai" },
  };
}

// Each branch is its own gym, because they keep different hours and sit at
// different addresses, and both belong to the one organization. A day a branch
// is shut is simply absent from its specification, which is how schema.org
// expresses closure.
function gyms() {
  return site.branches
    .filter((branch) => branch.address !== null)
    .map((branch) => {
      const address = branch.address!;
      return {
        "@type": "ExerciseGym",
        "@id": `${site.url}/#${branch.id}`,
        name: branch.name,
        description: branch.description,
        url: `${site.url}/`,
        parentOrganization: { "@id": organizationId() },
        // both numbers reach the gym; which one belongs to which branch has
        // not been confirmed, so neither is claimed for one
        telephone: site.phones.map((phone) => phone.tel),
        ...(site.email ? { email: site.email } : {}),
        image: `${site.url}/opengraph-image`,
        address: {
          "@type": "PostalAddress",
          streetAddress: address.street,
          addressLocality: address.locality,
          addressRegion: address.region,
          postalCode: address.postalCode,
          addressCountry: address.country,
        },
        // omitted while the pin is only the locality: publishing a coordinate
        // the client never gave is worse than publishing none
        ...(branch.geo && !branch.geo.approximate
          ? {
              geo: {
                "@type": "GeoCoordinates",
                latitude: branch.geo.lat,
                longitude: branch.geo.lng,
              },
            }
          : {}),
        openingHoursSpecification: branch.hours
          .filter((slot) => !slot.closed)
          .map((slot) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: slot.schemaDays,
            opens: slot.closed ? undefined : slot.opens24,
            closes: slot.closed ? undefined : slot.closes24,
          })),
        priceRange: `${site.pricing.lowest.display} to ${site.pricing.highest.display} per year`,
        currenciesAccepted: site.pricing.currency,
      };
    });
}

function trainer() {
  const { name, role, awards } = site.trainer;
  return {
    "@type": "Person",
    "@id": personId(name),
    name,
    jobTitle: role,
    worksFor: { "@id": organizationId() },
    award: awards,
  };
}

// Questions and answers come from the same source the page renders, so the two
// can never drift apart.
function faq() {
  return {
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    isPartOf: { "@id": websiteId() },
    mainEntity: site.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function buildSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId(),
        url: `${site.url}/`,
        name: site.name,
        description: site.description,
        inLanguage: LOCALE,
        publisher: { "@id": organizationId() },
      },
      organization(),
      ...gyms(),
      trainer(),
      faq(),
    ],
  };
}
