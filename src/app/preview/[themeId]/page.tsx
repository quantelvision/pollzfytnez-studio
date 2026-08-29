import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePage } from "@/components/SitePage";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { getTheme, themes, themeStyle } from "@/config/themes";

// Renders the real site under any registered theme so variations can be shared
// with the client as links. Not indexed and not in the sitemap.

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
    <div style={themeStyle(theme)} className="min-h-svh bg-surface text-ink">
      <ThemeProvider theme={theme}>
        <SitePage theme={theme} previewLabel={`Theme preview: ${theme.name} (${theme.status})`} />
      </ThemeProvider>
    </div>
  );
}
