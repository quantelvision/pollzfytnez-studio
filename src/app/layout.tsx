import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { site } from "@/config/site";
import { getActiveTheme, themeStyle } from "@/config/themes";
import { fontVariableClassNames } from "@/fonts";

const theme = getActiveTheme();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, gym in Kolathur, Chennai`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name}, gym in Kolathur, Chennai`,
    description: site.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}, gym in Kolathur, Chennai`,
    description: site.description,
  },
  // Search Console ownership. Spread conditionally so the build still needs no
  // environment variables at all.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: theme.colors.surface,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${fontVariableClassNames} antialiased`} style={themeStyle(theme)}>
      <body>
        <ThemeProvider theme={theme}>
          <MotionProvider>
            <SmoothScroll />
            {children}
          </MotionProvider>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
