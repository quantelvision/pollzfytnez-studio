import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePage } from "@/components/SitePage";
import { ThemeCycler } from "@/components/theme/ThemeCycler";
import { getTheme, themeList, themes } from "@/config/themes";

// Renders the real site under any registered theme so variations can be shared
// with the client as links. Not indexed and not in the sitemap. Every variation
// is reachable from any of these links by cycling, which is what the site is
// shown from in a review.

export const dynamicParams = false;

// Matches the home page so previews show the same media.
export const revalidate = 3600;

export function generateStaticParams() {
  return Object.keys(themes).map((themeId) => ({ themeId }));
}

export async function generateMetadata({
  params,
}: PageProps<"/preview/[themeId]">): Promise<Metadata> {
  const { themeId } = await params;
  const theme = getTheme(themeId);
  return {
    title: theme ? `Theme preview: ${theme.name}` : "Theme preview",
    robots: { index: false, follow: false },
  };
}

export default async function ThemePreviewPage({ params }: PageProps<"/preview/[themeId]">) {
  const { themeId } = await params;
  const theme = getTheme(themeId);
  if (!theme) {
    notFound();
  }

  return (
    <ThemeCycler themes={themeList} initialId={theme.id}>
      <SitePage theme={theme} />
    </ThemeCycler>
  );
}
