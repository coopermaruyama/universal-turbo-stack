import AuthForm from "@/components/auth-form";
import { HydrateClient } from "@/lib/trpc/server";

export default function LoginPage() {
  return (
    <HydrateClient>
      <AuthForm />
    </HydrateClient>
  );
}
