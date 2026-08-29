import { site } from "@/config/site";

// LocalBusiness structured data for the branch whose address is confirmed.
// The unisex branch is appended here once the client supplies its address,
// and geo coordinates once the Google Maps pins arrive. See docs/business.md.
export function buildGymJsonLd() {
  const branch = site.branches.find((entry) => entry.address !== null);
  if (!branch || !branch.address) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: site.name,
    slogan: site.tagline,
    url: site.url,
    telephone: site.phones.map((phone) => phone.tel),
    image: `${site.url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address.street,
      addressLocality: `${branch.address.locality}, ${branch.address.city}`,
      addressRegion: branch.address.region,
      postalCode: branch.address.postalCode,
      addressCountry: branch.address.country,
    },
    openingHoursSpecification: site.hours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.schemaDays,
      opens: slot.opens24,
      closes: slot.closes24,
    })),
    priceRange: `${site.pricing.annual.display} per year`,
    currenciesAccepted: site.pricing.annual.currency,
  };
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
