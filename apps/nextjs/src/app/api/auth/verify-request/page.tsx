import { cookies, headers } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

import { auth } from "~/auth/server";
import VeryifyRequestForm from "./_components/form";

const AUTH_EMAIL_COOKIE_NAME = "__auth-email";

interface VerifyRequestPageProps {
  url: URL;
}

export default async function VerifyRequestPage(props: VerifyRequestPageProps) {
  const { url } = props;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isLoggedIn = !!session?.user;
  const email = (await cookies()).get(AUTH_EMAIL_COOKIE_NAME)?.value || "";
  const callbackUrl = url.searchParams.get("callbackUrl") || "/";
  if (isLoggedIn) {
    // return redirect(decodeURIComponent(callbackUrl), RedirectType.replace);
    return redirect(callbackUrl, RedirectType.replace);
  }
  return (
    <div className="verify-request">
      <VeryifyRequestForm
        // logo={theme?.logo}
        email={decodeURIComponent(email)}
        callbackUrl={decodeURIComponent(callbackUrl)}
      />
    </div>
  );
}
