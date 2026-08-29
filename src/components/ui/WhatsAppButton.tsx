import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { Button } from "./Button";

// The site's one conversion action. Every call to action passes the message it
// should arrive with, so the studio knows what the enquiry is about.
export function WhatsAppButton({
  message = whatsappMessages.general,
  children = "Message us on WhatsApp",
  variant,
  className,
}: {
  message?: string;
  children?: ReactNode;
  variant?: "primary" | "quiet" | "onMedia" | "onAccent";
  className?: string;
}) {
  return (
    <Button href={whatsappLink(message)} external variant={variant} className={className}>
      <MessageCircle aria-hidden="true" className="size-5" />
      {children}
    </Button>
  );
}
