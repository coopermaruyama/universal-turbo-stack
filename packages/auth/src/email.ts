import SendgridProvider from "next-auth/providers/sendgrid";

import { env } from "../env";

export const AUTH_EMAIL_COOKIE_NAME = "__auth-email";

export const emailProvider = SendgridProvider({
  apiKey: env.SENDGRID_API_KEY,
  from: env.EMAIL_FROM,
  async generateVerificationToken() {
    const min = 100000;
    const max = 999999;
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
  },
  async sendVerificationRequest(params) {
    const { identifier: to, provider, url, theme, token } = params;
    const { host } = new URL(url);
    console.debug(`sendVerificationRequest`, to, host, token, url);
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${provider.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: provider.from },
        subject: `Sign in to ${host}`,
        content: [
          { type: "text/plain", value: text({ host, token }) },
          { type: "text/html", value: html({ host, theme, token }) },
        ],
      }),
    });
    // REVIEW: Clean up error handling
    if (!res.ok) {
      throw new Error("Sendgrid error: " + (await res.text()));
    }
    if (env.NODE_ENV === "development") {
      console.log(`
        Email sent to:
        ${to}

        Code:
        ${token}
      `);
    }
  },
});

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
export function html(params: {
  token: string;
  host: string;
  theme: import("@auth/core").AuthConfig["theme"];
}) {
  const { token, host, theme } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  const brandColor = theme?.brandColor || "#346df1";

  const buttonText = theme?.buttonText || "#fff";

  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText,
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><div 
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">
                ${token}
                </div></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
export function text({ token, host }: { token: string; host: string }) {
  return `Sign in to ${host}\n${token}\n\n`;
}
