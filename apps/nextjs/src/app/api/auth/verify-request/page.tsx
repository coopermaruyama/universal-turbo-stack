import type { Theme } from "@auth/core/types";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

import { auth } from "@acme/auth";

import { EXPO_COOKIE_NAME } from "../[...nextauth]/route";
import VeryifyRequestForm from "./_components/form";

const AUTH_EMAIL_COOKIE_NAME = "__auth-email";

interface VerifyRequestPageProps {
  url: URL;
  theme?: Theme;
}

export default async function VerifyRequestPage(props: VerifyRequestPageProps) {
  const { url, theme } = props;
  const c = await cookies();
  const expocallback = c.get(EXPO_COOKIE_NAME)?.value || "";
  const _callbackUrl = c.get("authjs.callback-url")?.value || "";
  // const callbackUrl = expocallback || _callbackUrl || url.searchParams.get('callbackUrl') || ''
  const callbackUrl = _callbackUrl || url.searchParams.get("callbackUrl") || "";
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;
  const email = c.get(AUTH_EMAIL_COOKIE_NAME)?.value || "";
  if (isLoggedIn) {
    return redirect(decodeURIComponent(callbackUrl), RedirectType.replace);
  }
  return (
    <div className="verify-request">
      {theme?.brandColor && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `,
          }}
        />
      )}
      <VeryifyRequestForm
        logo={theme?.logo}
        email={decodeURIComponent(email)}
        callbackUrl={decodeURIComponent(callbackUrl)}
      />
    </div>
  );
}
