import "server-only";
import { Resend } from "resend";
import { site } from "@/config/site";
import { getActiveTheme } from "@/config/themes";

interface MailConfig {
  apiKey: string;
  from: string;
  to: string;
}

// Resend needs all three or it cannot send, so they are read together and the
// result narrows: nothing downstream has to assert that an env var is present.
function mailConfig(): MailConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    return null;
  }
  return { apiKey, from, to };
}

// When delivery is not configured the contact form says so plainly instead of
// pretending a message was sent.
export function isMailConfigured(): boolean {
  return mailConfig() !== null;
}

export interface Enquiry {
  name: string;
  phone: string;
  email: string;
  program: string;
  message: string;
}

// Everything below goes into an HTML document that a stranger's words are
// interpolated into, so every one of those words is escaped first. Without this
// a name containing a bracket breaks the layout, and a message containing a tag
// is markup rather than text.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Mail clients do not collapse newlines the way a browser does not, so the
// message keeps the shape it was typed in.
function toParagraphs(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

// Colours come from the active theme, so the enquiry looks like the site that
// produced it and follows it if the palette ever changes. Everything is an
// inline style and a table, because that is what mail clients render reliably:
// Gmail strips a style block, and Outlook lays out tables rather than flex.
function enquiryHtml(enquiry: Enquiry): string {
  const { colors } = getActiveTheme();

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid ${colors.border}; color: ${colors.inkMuted}; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; width: 130px; vertical-align: top;">${escapeHtml(label)}</td>
      <td style="padding: 10px 0; border-bottom: 1px solid ${colors.border}; color: ${colors.ink}; font-size: 16px; vertical-align: top;">${value}</td>
    </tr>`;

  const phoneDigits = enquiry.phone.replace(/[^\d+]/g, "");
  const rows = [
    row("Name", escapeHtml(enquiry.name)),
    row(
      "Phone",
      `<a href="tel:${escapeHtml(phoneDigits)}" style="color: ${colors.accent}; text-decoration: none;">${escapeHtml(enquiry.phone)}</a>`,
    ),
    enquiry.email
      ? row(
          "Email",
          `<a href="mailto:${escapeHtml(enquiry.email)}" style="color: ${colors.accent}; text-decoration: none;">${escapeHtml(enquiry.email)}</a>`,
        )
      : "",
    enquiry.program ? row("Interested in", escapeHtml(enquiry.program)) : "",
  ].join("");

  return `<!doctype html>
<html lang="en">
<body style="margin: 0; padding: 24px 12px; background-color: ${colors.surface}; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 560px; margin: 0 auto; background-color: ${colors.surfaceRaised}; border: 1px solid ${colors.border}; border-radius: 12px; overflow: hidden;">
    <tr>
      <td style="background-color: ${colors.accent}; padding: 20px 28px;">
        <div style="color: ${colors.onAccent}; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">New website enquiry</div>
        <div style="color: ${colors.onAccent}; font-size: 22px; font-weight: 700; padding-top: 4px;">${escapeHtml(site.name)}</div>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px 28px 4px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${rows}</table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 28px 8px;">
        <div style="color: ${colors.inkMuted}; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; padding-bottom: 8px;">Message</div>
        <div style="background-color: ${colors.accentTint}; border-radius: 10px; padding: 16px 18px; color: ${colors.ink}; font-size: 16px; line-height: 1.6;">${toParagraphs(enquiry.message)}</div>
      </td>
    </tr>
    <tr>
      <td style="padding: 16px 28px 24px;">
        <a href="tel:${escapeHtml(phoneDigits)}" style="display: inline-block; background-color: ${colors.accent}; color: ${colors.onAccent}; font-size: 15px; font-weight: 700; text-decoration: none; padding: 12px 22px; border-radius: 999px;">Call ${escapeHtml(enquiry.name)}</a>
      </td>
    </tr>
    <tr>
      <td style="border-top: 1px solid ${colors.border}; padding: 14px 28px; color: ${colors.inkMuted}; font-size: 12px;">
        Sent from the contact form on ${escapeHtml(site.url.replace(/^https?:\/\//, ""))}${enquiry.email ? ". Replying to this email goes straight to the sender." : ". No email address was given, so reply by phone."}
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// The plain text alternative. Not a fallback nobody sees: some clients prefer
// it, and a message with no text part scores worse with spam filters.
function enquiryText(enquiry: Enquiry): string {
  return [
    `New website enquiry for ${site.name}`,
    "",
    `Name: ${enquiry.name}`,
    `Phone: ${enquiry.phone}`,
    enquiry.email ? `Email: ${enquiry.email}` : null,
    enquiry.program ? `Interested in: ${enquiry.program}` : null,
    "",
    "Message:",
    enquiry.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export async function sendEnquiry(enquiry: Enquiry): Promise<void> {
  const config = mailConfig();
  if (!config) {
    throw new Error("Resend is not configured");
  }

  const { error } = await new Resend(config.apiKey).emails.send({
    from: config.from,
    to: config.to,
    // The email address is optional now, so a reply-to is set only when given.
    ...(enquiry.email ? { replyTo: enquiry.email } : {}),
    subject: `Enquiry from ${enquiry.name}${enquiry.program ? ` about ${enquiry.program}` : ""}`,
    html: enquiryHtml(enquiry),
    text: enquiryText(enquiry),
  });

  // Resend reports a refused send in the response body rather than by throwing,
  // so it has to be raised here. Without this the form would report a success
  // for a message that never left.
  if (error) {
    throw new Error(`Resend refused the message: ${error.message}`);
  }
}
