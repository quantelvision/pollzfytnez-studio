export interface EnquiryFields {
  name: string;
  phone: string;
  email: string;
  program: string;
  message: string;
}

// One set of rules used by the form as you type and by the server action on
// submit, so the browser and the server can never disagree about what is valid.
export function validateEnquiry(fields: EnquiryFields): Record<string, string> {
  const errors: Record<string, string> = {};

  if (fields.name.trim().length < 2) {
    errors.name = "Please tell us your name.";
  }

  const phone = fields.phone.replace(/[\s-]/g, "");
  if (!phone) {
    errors.phone = "Please add a phone number.";
  } else if (!/^(\+91)?[6-9]\d{9}$/.test(phone)) {
    errors.phone = "Enter a 10 digit Indian mobile number.";
  }

  // Optional: a phone number is enough to answer an enquiry, and asking for an
  // email as well loses people. It is still checked when one is given, so a
  // typo does not silently make the reply-to address undeliverable.
  const email = fields.email.trim();
  if (email && !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email)) {
    errors.email = "That email address does not look right.";
  }

  // Whatever someone writes is what they wanted to say, so there is no minimum
  // and no format. The upper bound is only there to keep a paste out of the
  // inbox, not to tell anyone how to word a question.
  const message = fields.message.trim();
  if (!message) {
    errors.message = "Tell us what you would like to know.";
  } else if (message.length > 1000) {
    errors.message = "Please keep this under 1000 characters.";
  }

  return errors;
}
