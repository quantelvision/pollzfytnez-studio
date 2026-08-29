# Self-hosted fonts

No font is loaded from a CDN at runtime. Files here are committed and served through next/font/local via src/fonts/index.ts.

## Files

| File | Face | Weights | Subset | Source |
| --- | --- | --- | --- | --- |
| baloo2/Baloo2-latin-wght.woff2 | Baloo 2 (variable) | 400-800 | latin | Google Fonts API (fonts.gstatic.com/s/baloo2/v23) |
| mukta/Mukta-latin-400.woff2 | Mukta | 400 | latin | Google Fonts API (fonts.gstatic.com/s/mukta/v17) |
| baloo2/Baloo2-og-700.ttf | Baloo 2 static 700 | 700 | latin | Google Fonts API, used only by the Open Graph image renderer (satori cannot read woff2 or variable fonts) |

## Licence

Both families are by Ek Type and released under the SIL Open Font License 1.1.
The licence text is committed next to each family: baloo2/OFL.txt and mukta/OFL.txt.

## Rules

- Latin subset only, and only the weights a registered theme actually uses.
- Fallback metrics are handled by adjustFontFallback in index.ts so the swap does not shift layout.
- Adding a face for a new theme: download the subset woff2, commit it with its licence, add a localFont call and a fontRegistry entry in index.ts.
