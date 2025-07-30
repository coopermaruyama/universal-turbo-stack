import { emailOTP } from "better-auth/plugins";

export const AUTH_EMAIL_COOKIE_NAME = "__auth-email";

// Email OTP provider
// export const initEmailOTProvider = (options: Parameters<typeof sendEmail>[0]) =>
export function initEmailOTProvider(options: {
  sendgridApiKey: string;
  emailFrom: string;
  baseUrl: string;
  debug?: boolean;
}) {
  return emailOTP({
    async sendVerificationOTP(data, request) {
      return await sendEmail({
        type: "otp",
        data,
        request,
        sendgridApiKey: options.sendgridApiKey,
        emailFrom: options.emailFrom,
        baseUrl: options.baseUrl,
        debug: options.debug,
      });
    },
  });
}

export async function sendEmail(opts: {
  type: "otp" | "link";
  data: { email: string; otp?: string; link?: string };
  baseUrl?: string;
  request?: Request;
  sendgridApiKey: string;
  emailFrom: string;
  debug?: boolean;
}) {
  const { data, request } = opts;
  if (!opts.sendgridApiKey) {
    throw new Error("SENDGRID_API_KEY is not set");
  }
  if (!opts.baseUrl) {
    throw new Error("NEXT_PUBLIC_WEB_URL is not set");
  }
  const { host } = new URL(opts.baseUrl || "http://localhost:3000");
  console.debug(`sendVerificationRequest`, data, request);
  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts.sendgridApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: data.email }] }],
      from: { email: opts.emailFrom },
      subject: `Sign in to ${host}`,
      content: [
        { type: "text/plain", value: text({ host, token: data.otp }) },
        { type: "text/html", value: html({ host, token: data.otp }) },
      ],
    }),
  });
  // REVIEW: Clean up error handling
  if (!res.ok) {
    throw new Error(`Sendgrid error: ${await res.text()}`);
  }
  if (opts.debug) {
    console.log(`
        Email sent to:
        ${data.email}

        Code:
        ${data.otp}
      `);
  }
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
export function html(params: { token?: string; host: string; url?: string }) {
  const { token, host } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  const brandColor = "#346df1";

  const buttonText = "#fff";

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
      <td align="center";">
        <table border="0" cellspacing="0" cellp
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0adding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><div 
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">
                ${params.token ? token : `<a href="${params.url}" style="color: ${color.buttonText}; text-decoration: none;">Sign in</a>`}
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
export function text({
  token,
  host,
  url,
}: {
  token?: string;
  host: string;
  url?: string;
}) {
  return `Sign in to ${host}\n${url ?? token}\n\n`;
}
