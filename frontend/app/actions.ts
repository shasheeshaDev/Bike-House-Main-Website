"use server";

import { emailShell, emailText, sendEmail, type SendResult } from "@/lib/email";

const MAX = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim().slice(0, MAX) : "";
}

export type FormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

/** Contact page — service booking / general inquiry. */
export async function sendServiceInquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  // Honeypot: real users leave this hidden field empty.
  if (clean(formData.get("company_website"))) return { status: "success" };

  const name = clean(formData.get("name"));
  const phone = clean(formData.get("phone"));
  const email = clean(formData.get("email"));
  const service = clean(formData.get("service"));
  const bike = clean(formData.get("bike"));
  const date = clean(formData.get("date"));
  const message = clean(formData.get("message"));

  if (!name) return { status: "error", message: "Please enter your name." };
  if (!phone) return { status: "error", message: "Please enter a phone number." };
  if (email && !EMAIL_RE.test(email)) {
    return { status: "error", message: "That email address doesn't look right." };
  }
  if (!bike) return { status: "error", message: "Let us know what bike you ride." };
  if (!message) return { status: "error", message: "Please include a short description." };

  const rows: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email],
    ["Service needed", service],
    ["Bike", bike],
    ["Preferred date", date],
    ["Message", message],
  ];

  const result: SendResult = await sendEmail({
    subject: `Service inquiry — ${service || "General"} — ${name}`,
    html: emailShell(
      "New service inquiry",
      `${name} submitted the booking form.`,
      rows,
    ),
    text: emailText("New service inquiry", rows),
    replyTo: email || undefined,
  });

  return result.ok ? { status: "success" } : { status: "error", message: result.error };
}

/** Journal — monthly newsletter signup. */
export async function subscribeToJournal(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (clean(formData.get("company_website"))) return { status: "success" };

  const email = clean(formData.get("email"));
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const rows: [string, string][] = [["Email", email]];
  const result = await sendEmail({
    subject: `Journal subscription — ${email}`,
    html: emailShell("New subscriber", "Someone subscribed to the monthly Journal email.", rows),
    text: emailText("New subscriber", rows),
    replyTo: email,
  });

  return result.ok ? { status: "success" } : { status: "error", message: result.error };
}
