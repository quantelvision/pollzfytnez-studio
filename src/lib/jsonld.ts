import { site } from "@/config/site";

// LocalBusiness structured data. The two branches keep different hours, so each
// is emitted as its own ExerciseGym with its own opening hours rather than one
// record speaking for both. A day a branch is shut is simply absent from its
// specification, which is how schema.org expresses closure.
export function buildGymJsonLd() {
  const branches = site.branches.filter((entry) => entry.address !== null);
  if (branches.length === 0) {
    return null;
  }

  const graph = branches.map((branch) => {
    const address = branch.address!;
    return {
      "@type": "ExerciseGym",
      "@id": `${site.url}#${branch.id}`,
      // the branch names already carry the brand, so they are not prefixed
      name: branch.name,
      slogan: site.tagline,
      url: site.url,
      telephone: site.phones.map((phone) => phone.tel),
      ...(site.email ? { email: site.email } : {}),
      image: `${site.url}/opengraph-image`,
      // the studio's real profiles, which is how a search engine ties this
      // record to the accounts it already knows about
      sameAs: site.socials.map((social) => social.url),
      address: {
        "@type": "PostalAddress",
        streetAddress: address.street,
        addressLocality: `${address.locality}, ${address.city}`,
        addressRegion: address.region,
        postalCode: address.postalCode,
        addressCountry: address.country,
      },
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

  return { "@context": "https://schema.org", "@graph": graph };
}

// FAQ structured data. Questions and answers come from the same source the
// page renders, so the two can never drift apart.
export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
