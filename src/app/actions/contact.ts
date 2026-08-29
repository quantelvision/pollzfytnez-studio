"use server";

import type { ContactState } from "@/app/actions/contact-state";
import { validateEnquiry } from "@/lib/contact-validation";
import { isMailConfigured, sendEnquiry } from "@/lib/mail";

function value(data: FormData, key: string): string {
  const raw = data.get(key);
  return typeof raw === "string" ? raw.trim() : "";
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

  if (!isMailConfigured()) {
    return {
      status: "error",
      message: "The contact form is not connected yet. Please message us on WhatsApp instead.",
      errors: {},
    };
  }

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
