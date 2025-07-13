import { Suspense } from "react";
import { Pressable } from "react-native";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CreatePostForm, PostCardSkeleton, PostList } from "@/components/posts";
import { HydrateClient, prefetch, trpc } from "@/lib/trpc/server";
import { Button } from "@/ui/button";

import { Button as UIButton } from "@acme/ui/button";
import { Text } from "@acme/ui/text";

import { auth, getSession, signOut } from "~/lib/auth/server";

async function serverAction() {
  "use server";
  const session = await getSession();
  if (!session) {
    return redirect("/auth/login");
  }
  if (session) {
    const res = await signOut();
    if (res.success) {
      redirect("/");
    } else {
      throw new Error("Failed to sign out");
    }
  }
}
export default async function HomePage() {
  const session = await getSession();

  return (
    <HydrateClient>
      <main className="container h-screen py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="text-purple-700">Universal</span> Expo Next
          </h1>
          <form method="POST" action={serverAction}>
            <Button size="default">
              {session?.user ? "Sign Out" : "Sign In"}
            </Button>
          </form>
          <Link href="/ui-test">
            <UIButton role="link" size="default">
              <Text>Kitchen Sink</Text>
            </UIButton>
          </Link>
        </div>
      </main>
    </HydrateClient>
  );
}
