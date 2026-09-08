import { SitePage } from "@/components/SitePage";
import { getActiveTheme } from "@/config/themes";
import { buildSiteJsonLd } from "@/lib/jsonld";

// Rebuilt hourly so media uploaded to Cloudinary appears without a deploy.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      {/* One connected graph: the site, the business, both gyms, the trainer */}
      {/* and the questions, pointing at each other by @id. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSiteJsonLd()) }}
      />
      <SitePage theme={getActiveTheme()} />
    </>
  );
}
