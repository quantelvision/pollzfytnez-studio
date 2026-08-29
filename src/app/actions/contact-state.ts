// Plain module: a "use server" file may only export async functions, so the
// shared shape and its initial value live here for the form to import.
export interface ContactState {
  status: "idle" | "sent" | "error";
  message: string;
  // field name -> problem, so each input can show its own message
  errors: Record<string, string>;
}

export const initialContactState: ContactState = { status: "idle", message: "", errors: {} };
