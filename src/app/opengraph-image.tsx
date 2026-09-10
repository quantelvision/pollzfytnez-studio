import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { getActiveTheme } from "@/config/themes";

// Brand-based share image. Replaced with real photography from the floor once chosen.
export const alt = `${site.name}, gym in Kolathur, Chennai`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const theme = getActiveTheme();
  // satori cannot read woff2 or variable fonts, so a static TTF is committed for this file only
  const fontData = await readFile(
    join(process.cwd(), "src", "fonts", "baloo2", "Baloo2-og-700.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: theme.colors.surface,
          color: theme.colors.ink,
          padding: 72,
          fontFamily: "Baloo 2",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            backgroundColor: theme.colors.accentTint,
            color: theme.colors.accent,
            borderRadius: 999,
            padding: "12px 28px",
            fontSize: 28,
          }}
        >
          Kolathur, Chennai
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, lineHeight: 1.05 }}>{site.name}</div>
          <div style={{ fontSize: 44, marginTop: 16, color: theme.colors.secondary }}>
            {site.tagline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.colors.accent,
            color: theme.colors.onAccent,
            borderRadius: 32,
            padding: "24px 40px",
            fontSize: 30,
          }}
        >
          <div>Open Monday to Saturday from 5 AM</div>
          <div>{site.offer.freeTrial}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Baloo 2", data: fontData, weight: 700, style: "normal" }],
    },
  );
}
