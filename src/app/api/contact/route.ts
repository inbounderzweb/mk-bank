import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, phone, branch, service, message } = await req.json();

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Name and phone number are required." },
      { status: 400 }
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    console.error("Missing SMTP environment configuration");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"MKSC Bank Website" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: SMTP_USER,
      subject: `New Website Inquiry — ${service}`,
      text: `Name: ${name}\nPhone: ${phone}\nPreferred Branch: ${branch}\nService: ${service}\n\nMessage:\n${message || "(none)"}`,
      html: buildInquiryEmailHtml({ name, phone, branch, service, message }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { error: "Failed to send your inquiry. Please try again later." },
      { status: 500 }
    );
  }
}

function buildInquiryEmailHtml({
  name,
  phone,
  branch,
  service,
  message,
}: {
  name: string;
  phone: string;
  branch: string;
  service: string;
  message: string;
}) {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding: 14px 0; border-bottom: 1px solid #eef0f2;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td width="150" style="font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #64748b; vertical-align: top; padding-right: 16px;">
              ${label}
            </td>
            <td style="font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; font-size: 15px; font-weight: 600; color: #0f172a; vertical-align: top;">
              ${escapeHtml(value)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;

  return `
<!DOCTYPE html>
<html>
  <body style="margin: 0; padding: 0; background-color: #f1f5f4; font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f1f5f4; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(15, 23, 42, 0.08);">

            <!-- Header -->
            <tr>
              <td style="background-color: #0f172a; padding: 28px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td>
                      <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #2DBA4E; margin-bottom: 4px;">
                        MK Bank &middot; Website
                      </div>
                      <div style="font-size: 20px; font-weight: 800; color: #ffffff;">
                        New Member Inquiry
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Accent bar -->
            <tr>
              <td style="height: 4px; background-color: #ED1C24; line-height: 0; font-size: 0;">&nbsp;</td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 32px;">
                <p style="margin: 0 0 20px; font-size: 14px; color: #475569; line-height: 1.6;">
                  A new inquiry was submitted through the MK Bank website contact form. Details below.
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  ${row("Full Name", name)}
                  ${row("Phone Number", phone)}
                  ${row("Preferred Branch", branch)}
                  ${row("Service Category", service)}
                </table>

                <div style="margin-top: 24px;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #64748b; margin-bottom: 8px;">
                    Message
                  </div>
                  <div style="background-color: #f8fafc; border: 1px solid #eef0f2; border-radius: 12px; padding: 16px; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">
                    ${escapeHtml(message || "No additional message provided.")}
                  </div>
                </div>

                <div style="margin-top: 28px; text-align: center;">
                  <a href="tel:${escapeHtml(phone)}" style="display: inline-block; background-color: #2DBA4E; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 28px; border-radius: 999px;">
                    Call ${escapeHtml(name.split(" ")[0] || "Member")}
                  </a>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #eef0f2;">
                <p style="margin: 0; font-size: 12px; color: #94a3b8; text-align: center; line-height: 1.6;">
                  Sent automatically from the Contact form on morazhakalliasseribank.vercel.app<br />
                  Morazha Kalliasseri Service Co-operative Bank Ltd. No. 4220
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
