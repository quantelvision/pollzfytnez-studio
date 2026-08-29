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

  if (!fields.email.trim()) {
    errors.email = "Please add an email address.";
  } else if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(fields.email.trim())) {
    errors.email = "That email address does not look right.";
  }

  const message = fields.message.trim();
  if (message.length < 10) {
    errors.message = "Tell us a little more, at least ten characters.";
  } else if (message.length > 1000) {
    errors.message = "Please keep this under 1000 characters.";
  }

  return errors;
}
