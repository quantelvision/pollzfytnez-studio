"use server";

import { headers } from "next/headers";
import type { ContactState } from "@/app/actions/contact-state";
import { validateEnquiry } from "@/lib/contact-validation";
import { isMailConfigured, sendEnquiry } from "@/lib/mail";
import { checkRateLimit, recordAttempt } from "@/lib/rate-limit";

function value(data: FormData, key: string): string {
  const raw = data.get(key);
  return typeof raw === "string" ? raw.trim() : "";
}

// Vercel sets x-forwarded-for, whose first entry is the client. Anything we
// cannot identify shares one bucket rather than skipping the limit, so an
// unknown origin is throttled rather than trusted.
async function clientKey(): Promise<string> {
  const list = await headers();
  const forwarded = list.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || list.get("x-real-ip") || "unknown";
}

export async function submitEnquiry(
  _previous: ContactState,
  data: FormData,
): Promise<ContactState> {
  // Hidden field that only a bot fills in. Report success so it does not retry.
  if (value(data, "company")) {
    return { status: "sent", message: "Thanks, we will be in touch.", errors: {} };
  }

  const enquiry = {
    name: value(data, "name"),
    phone: value(data, "phone"),
    email: value(data, "email"),
    program: value(data, "program"),
    message: value(data, "message"),
  };

  const errors = validateEnquiry(enquiry);

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Check the highlighted fields.", errors };
  }

  // Checked after validation, so a form that never went anywhere does not count
  // against someone fixing a typo.
  const key = await clientKey();
  const limit = checkRateLimit(key);
  if (!limit.allowed) {
    return {
      status: "error",
      message: `That is three enquiries in the last hour. Please try again in about ${limit.retryAfterMinutes} minutes, or message us on WhatsApp and we will reply there.`,
      errors: {},
    };
  }

  if (!isMailConfigured()) {
    return {
      status: "error",
      message: "The contact form is not connected yet. Please message us on WhatsApp instead.",
      errors: {},
    };
  }

  recordAttempt(key);

  try {
    await sendEnquiry(enquiry);
    return {
      status: "sent",
      message: "Thanks, we have your enquiry and will call you back.",
      errors: {},
    };
  } catch {
    return {
      status: "error",
      message: "That did not send. Please message us on WhatsApp instead.",
      errors: {},
    };
  }
}
