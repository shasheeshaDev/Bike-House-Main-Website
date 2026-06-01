"use server";

import { Resend } from "resend";
import { render } from "@react-email/render";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEnquiryEmailParams {
  subject: string;
  data: Record<string, string | boolean | string[] | File[] | undefined>;
  toEmail: string;
  ccEmails?: string[];
  bccEmails?: string[];
  fromName?: string;
  replyTo?: string;
}

export async function sendEnquiryEmail({ 
  subject, 
  data, 
  toEmail, 
  ccEmails, 
  bccEmails,
  fromName,
  replyTo
}: SendEnquiryEmailParams): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing Resend API key");
      return false;
    }
    if (!process.env.NEXT_RESEND_FROM_EMAIL) {
      console.error("Missing email configuration");
      return false;
    }

    // Convert data to HTML table
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; max-width: 600px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h2>${subject}</h2>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(data)
                .map(
                  ([key, value]) => {
                    let displayValue: string;
                    if (typeof value === "boolean") {
                      displayValue = value ? "Yes" : "No";
                    } else if (Array.isArray(value)) {
                      displayValue = value.length > 0 ? value.join(", ") : "N/A";
                    } else {
                      displayValue = value || "N/A";
                    }

                    return `
                <tr>
                  <td><strong>${key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</strong></td>
                  <td>${displayValue}</td>
                </tr>
              `;
                  }
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const senderName = fromName || subject || "Website Form";
    // Best Practice: Always send FROM the verified domain to ensure deliverability.
    // Use the fromName (Display Name) to provide context.
    const senderEmail = process.env.NEXT_RESEND_FROM_EMAIL;

    await resend.emails.send({
      from: `${senderName} <${senderEmail}>`,
      to: toEmail,
      replyTo: replyTo,
      cc: ccEmails,
      bcc: bccEmails,
      subject: subject,
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error("Error sending enquiry email:", error);
    return false;
  }
}
