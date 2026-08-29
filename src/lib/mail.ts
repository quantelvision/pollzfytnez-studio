import "server-only";
import nodemailer from "nodemailer";

// SMTP settings come from the environment. When they are absent the contact
// form says so plainly instead of pretending a message was sent.
export function isMailConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD &&
      process.env.CONTACT_TO_EMAIL,
  );
}

export interface Enquiry {
  name: string;
  phone: string;
  email: string;
  program: string;
  message: string;
}

export async function sendEnquiry(enquiry: Enquiry): Promise<void> {
  const port = Number(process.env.SMTP_PORT);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    // port 465 is implicit TLS, everything else upgrades with STARTTLS
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  });

  const lines = [
    `Name: ${enquiry.name}`,
    `Phone: ${enquiry.phone}`,
    enquiry.email ? `Email: ${enquiry.email}` : null,
    enquiry.program ? `Interested in: ${enquiry.program}` : null,
    "",
    enquiry.message,
  ].filter((line) => line !== null);

  await transport.sendMail({
    from: process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_USER,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: enquiry.email || undefined,
    subject: `Website enquiry from ${enquiry.name}`,
    text: lines.join("\n"),
  });
}
