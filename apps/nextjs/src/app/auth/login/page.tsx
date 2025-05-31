import { Suspense } from "react";
import AuthForm from "@/components/auth-form";
import { CreatePostForm, PostCardSkeleton, PostList } from "@/components/posts";
import { HydrateClient, prefetch, trpc } from "@/lib/trpc/server";

export default function LoginPage() {
  return (
    <HydrateClient>
      <AuthForm />
    </HydrateClient>
  );
}
