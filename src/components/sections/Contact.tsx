"use client";

import { useActionState, useId, useState } from "react";
import { submitEnquiry } from "@/app/actions/contact";
import { initialContactState, type ContactState } from "@/app/actions/contact-state";
import { Select } from "@/components/ui/Select";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";
import { validateEnquiry, type EnquiryFields } from "@/lib/contact-validation";

const EMPTY: EnquiryFields = { name: "", phone: "", email: "", program: "", message: "" };

function fieldClass(invalid: boolean): string {
  return [
    "w-full rounded-input border bg-surface-raised px-4 py-3 type-body text-ink transition-[border-color] ease-brand placeholder:text-ink-muted",
    invalid ? "border-secondary" : "border-border hover:border-border-strong focus:border-accent",
  ].join(" ");
}

// WhatsApp stays the fast path and is offered first. The form is for people who
// would rather write. Validation is our own rather than the browser's default
// bubbles, and runs once a field has been left so it corrects rather than nags.
export function Contact() {
  const [state, action, pending] = useActionState<ContactState, FormData>(
    submitEnquiry,
    initialContactState,
  );
  const [fields, setFields] = useState<EnquiryFields>(EMPTY);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const id = useId();

  const liveErrors = validateEnquiry(fields);
  const errorFor = (key: keyof EnquiryFields): string | undefined =>
    touched[key] ? liveErrors[key] : state.errors[key];

  const set = (key: keyof EnquiryFields) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((current) => ({ ...current, [key]: event.target.value }));
  const blur = (key: keyof EnquiryFields) => () =>
    setTouched((current) => ({ ...current, [key]: true }));

  const field = (key: keyof EnquiryFields, label: string, type = "text", autoComplete?: string) => {
    const error = errorFor(key);
    return (
      <div>
        <label htmlFor={`${id}-${key}`} className="block type-small text-ink">
          {label}
        </label>
        <input
          id={`${id}-${key}`}
          name={key}
          type={type}
          autoComplete={autoComplete}
          value={fields[key]}
          onChange={set(key)}
          onBlur={blur(key)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-${key}-error` : undefined}
          className={`mt-2 ${fieldClass(Boolean(error))}`}
        />
        {error ? (
          <p id={`${id}-${key}-error`} className="mt-2 type-small text-secondary">
            {error}
          </p>
        ) : null}
      </div>
    );
  };

  const messageError = errorFor("message");

  return (
    <Section id="contact">
      <div className="lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="type-eyebrow text-accent">Contact</p>
          <h2 className="mt-4 type-h2 text-ink">Ask us anything</h2>
          <p className="mt-6 max-w-sm type-body text-ink-muted">
            Leave your details and we will get back to you. Tell us which branch suits you and what
            you are training for.
          </p>
        </div>

        <form action={action} noValidate className="mt-12 lg:col-span-7 lg:mt-0">
          <div className="grid gap-5 sm:grid-cols-2">
            {field("name", "Your name", "text", "name")}
            {field("phone", "Phone number", "tel", "tel")}
            {field("email", "Email address", "email", "email")}

            <div>
              <span id={`${id}-program-label`} className="block type-small text-ink">
                Interested in
              </span>
              <div className="mt-2">
                <Select
                  name="program"
                  labelledBy={`${id}-program-label`}
                  defaultValue=""
                  options={[
                    { value: "", label: "Not sure yet" },
                    ...site.programs.map((program) => ({
                      value: program.name,
                      label: program.name,
                    })),
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor={`${id}-message`} className="block type-small text-ink">
              What would you like to know?
            </label>
            <textarea
              id={`${id}-message`}
              name="message"
              rows={4}
              value={fields.message}
              onChange={set("message")}
              onBlur={blur("message")}
              aria-invalid={Boolean(messageError)}
              aria-describedby={messageError ? `${id}-message-error` : undefined}
              className={`mt-2 resize-none ${fieldClass(Boolean(messageError))}`}
            />
            {messageError ? (
              <p id={`${id}-message-error`} className="mt-2 type-small text-secondary">
                {messageError}
              </p>
            ) : null}
          </div>

          <div aria-hidden="true" className="absolute left-[-9999px]">
            <label htmlFor={`${id}-company`}>Company</label>
            <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={pending}
              className="btn-ring inline-flex items-center justify-center rounded-button bg-accent px-6 py-3 type-button text-on-accent transition-[background-color,box-shadow,transform] ease-brand hover:bg-accent-hover active:scale-(--t-press-scale) disabled:bg-border-strong"
            >
              {pending ? "Sending" : "Send enquiry"}
            </button>
          </div>

          <p
            aria-live="polite"
            className={`mt-4 type-small ${state.status === "sent" ? "text-accent" : "text-secondary"}`}
          >
            {state.message}
          </p>
        </form>
      </div>
    </Section>
  );
}
