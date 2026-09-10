// Fails the build when a raw colour, font family, or duration appears in src/
// outside the theme directory. Every visual value must resolve through the theme.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const srcDir = join(root, "src");

// Theme data and infrastructure that must hold literal values
const allowedPrefixes = [
  join("src", "config", "themes"),
  join("src", "fonts"),
];
// Two files render something that is not the site, in a renderer that cannot
// resolve a CSS custom property, so each has to name a font outright.
// Both still take every colour from the active theme, which is the part of the
// rule that actually matters, and neither is an excuse to hard code a palette.
//   opengraph-image.tsx: draws a share image through satori.
//   lib/mail.ts: builds the enquiry email. A mail client has no access to the
//   site's variables or its self hosted faces, so the stack is a literal.
const allowedFiles = [
  join("src", "app", "opengraph-image.tsx"),
  join("src", "lib", "mail.ts"),
];

const extensions = [".ts", ".tsx", ".css", ".mjs"];

const rules = [
  { name: "raw hex colour", regex: /#[0-9a-fA-F]{3,8}\b/ },
  { name: "raw colour function", regex: /\b(?:rgba?|hsla?|oklch|oklab|color-mix)\(/ },
  { name: "font-family not resolved from theme", regex: /font-family\s*:(?!\s*var\()/ },
  {
    name: "Tailwind default palette class",
    regex:
      /(?:^|[\s"'`])(?:bg|text|border|from|via|to|fill|stroke|ring|outline|decoration|shadow|accent|caret)-(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-\d{2,3}\b/,
  },
  { name: "raw duration utility class", regex: /\bduration-\d+\b/ },
  { name: "Tailwind default easing class", regex: /\bease-(?:linear|in|out|in-out)\b/ },
  { name: "raw transition duration", regex: /transition(?:-duration)?\s*:[^;{}]*\b\d+m?s\b/ },
];

function isAllowed(relPath) {
  if (allowedFiles.includes(relPath)) {
    return true;
  }
  return allowedPrefixes.some((prefix) => relPath === prefix || relPath.startsWith(prefix + sep));
}

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, files);
    } else if (extensions.some((ext) => entry.endsWith(ext))) {
      files.push(full);
    }
  }
  return files;
}

const violations = [];

for (const file of walk(srcDir)) {
  const relPath = relative(root, file);
  if (isAllowed(relPath)) {
    continue;
  }
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    for (const rule of rules) {
      if (rule.regex.test(line)) {
        violations.push(`${relPath}:${index + 1} [${rule.name}] ${line.trim()}`);
      }
    }
  });
}

if (violations.length > 0) {
  console.error("Theme purity check failed. Resolve these through theme tokens:");
  for (const violation of violations) {
    console.error(`  ${violation}`);
  }
  process.exit(1);
}

console.log("Theme purity check passed: no raw colours, fonts or durations outside the theme.");
