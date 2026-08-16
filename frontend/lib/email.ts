import { Resend } from "resend";
import { site } from "./site";

/**
 * Email delivery via Resend. Configure with:
 *   RESEND_API_KEY     — from resend.com/api-keys
 *   CONTACT_TO_EMAIL   — inbox that receives form submissions
 *                        (defaults to the workshop address in lib/site)
 *   RESEND_FROM_EMAIL  — verified sender, e.g. "Bike House
 *                        <website@bikehouse.lk>". Until a domain is verified,
 *                        Resend only allows "onboarding@resend.dev" delivering
 *                        to the account owner's address.
 */

const apiKey = process.env.RESEND_API_KEY;
export const emailConfigured = Boolean(apiKey);

const resend = apiKey ? new Resend(apiKey) : null;

const TO = process.env.CONTACT_TO_EMAIL ?? site.email;
const FROM = process.env.RESEND_FROM_EMAIL ?? "Bike House <onboarding@resend.dev>";

export interface SendArgs {
  subject: string;
  html: string;
  text: string;
  /** Reply-To the sender so the workshop can respond directly. */
  replyTo?: string;
}

export type SendResult = { ok: true } | { ok: false; error: string };

export async function sendEmail({ subject, html, text, replyTo }: SendArgs): Promise<SendResult> {
  if (!resend) {
    return {
      ok: false,
      error: "Email isn't configured yet. Please call the workshop instead.",
    };
  }
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      subject,
      html,
      text,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) {
      console.error("Resend error:", error);
      return { ok: false, error: "We couldn't send that. Please try again or call the workshop." };
    }
    return { ok: true };
  } catch (err) {
    console.error("Resend threw:", err);
    return { ok: false, error: "We couldn't send that. Please try again or call the workshop." };
  }
}

/** Minimal, safe HTML escaping for values interpolated into email markup. */
export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Wraps rows of {label, value} in a simple, email-client-safe table. */
export function emailShell(heading: string, intro: string, rows: [string, string][]): string {
  const cells = rows
    .filter(([, v]) => v && v.trim().length > 0)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 16px 10px 0;vertical-align:top;font:600 11px/1.4 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#7E7E7A;text-transform:uppercase;letter-spacing:.14em;white-space:nowrap;">${esc(label)}</td>
        <td style="padding:10px 0;vertical-align:top;font:400 15px/1.6 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#F4F4F2;border-bottom:1px solid #1F2024;">${esc(value).replace(/\n/g, "<br/>")}</td>
      </tr>`,
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#0A0A0B;padding:32px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#16171A;border:1px solid #2A2B30;">
      <tr><td style="background:#0A0A0B;padding:24px 32px;border-bottom:1px solid #2A2B30;">
        <div style="font:700 22px/1 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#F4F4F2;letter-spacing:.06em;">BIKE HOUSE</div>
        <div style="font:400 10px/1 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#E10600;letter-spacing:.25em;margin-top:6px;text-transform:uppercase;">Piliyandala · Est 2014</div>
        <div style="font:400 20px/1.3 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#F4F4F2;margin-top:16px;">${esc(heading)}</div>
      </td></tr>
      <tr><td style="padding:28px 32px;">
        <p style="font:400 15px/1.6 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#B7B7B3;margin:0 0 20px;">${esc(intro)}</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${cells}</table>
      </td></tr>
      <tr><td style="padding:16px 32px;border-top:1px solid #2A2B30;font:400 12px/1.5 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#7E7E7A;">
        Sent from the Bike House website.
      </td></tr>
    </table>
  </body></html>`;
}

/** Plain-text fallback from the same rows. */
export function emailText(heading: string, rows: [string, string][]): string {
  return (
    `${heading}\n\n` +
    rows
      .filter(([, v]) => v && v.trim().length > 0)
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n")
  );
}
