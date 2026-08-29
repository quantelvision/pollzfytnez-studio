import { site } from "@/config/site";

// Builds a WhatsApp deep link with the message already written, so the
// enquiry arrives with the context of whichever button was pressed.
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// The message each call to action sends. Kept together so the wording stays
// consistent and reads as something a person would actually type.
export const whatsappMessages = {
  freeTrial: "Hi, I would like to book my free trial day at Pollz Fytnez Studio.",
  general: "Hi, I have a question about training at Pollz Fytnez Studio.",
  annualPlan: "Hi, I would like to know more about the annual plan at Pollz Fytnez Studio.",
  semiAnnualPlan: "Hi, could you tell me the price of the semi-annual plan?",
  personalTraining: "Hi, could you tell me the price of personal training?",
  trainer: "Hi, I would like to train with Banu S. Could you tell me how to start?",
  directions: (branch: string) => `Hi, could you send me the directions to the ${branch}?`,
  program: (program: string) => `Hi, I am interested in ${program}. Could you tell me more?`,
} as const;
