import { SitePage } from "@/components/SitePage";
import { getActiveTheme } from "@/config/themes";
import { buildFaqJsonLd, buildGymJsonLd } from "@/lib/jsonld";

// Rebuilt hourly so media uploaded to Cloudinary appears without a deploy.
export const revalidate = 3600;

export default function Home() {
  const gymJsonLd = buildGymJsonLd();
  const faqJsonLd = buildFaqJsonLd();

  return (
    <>
      {gymJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(gymJsonLd) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SitePage theme={getActiveTheme()} />
    </>
  );
}
