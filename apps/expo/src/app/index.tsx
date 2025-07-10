import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack, useRouter } from "expo-router";
import { push } from "expo-router/build/global-state/routing";
import { LegendList } from "@legendapp/list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { TestShadcnComponents } from "@acme/tamagui";
import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";
import { Text } from "@acme/ui/text";

import type { RouterOutputs } from "~/lib/api";
import { ThemeToggle } from "~/components/theme-toggle";
import { trpc } from "~/lib/api";
import { authClient } from "~/utils/auth";

function PostCard(props: {
  post: RouterOutputs["post"]["all"][number];
  onDelete: () => void;
}) {
  return (
    <View className="flex flex-row rounded-lg bg-muted p-4">
      <View className="flex-grow">
        <Link
          asChild
          href={{
            pathname: "/post/[id]",
            params: { id: props.post.id },
          }}
        >
          <Pressable className="">
            <Text className="text-xl font-semibold text-primary">
              {props.post.title}
            </Text>
            <Text className="mt-2 text-foreground">{props.post.content}</Text>
          </Pressable>
        </Link>
      </View>
      <Pressable onPress={props.onDelete}>
        <Text className="font-bold uppercase text-primary">Delete</Text>
      </Pressable>
    </View>
  );
}

function CreatePost() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate, error } = useMutation(
    trpc.post.create.mutationOptions({
      async onSuccess() {
        setTitle("");
        setContent("");
        await queryClient.invalidateQueries(trpc.post.all.queryFilter());
      },
    }),
  );

  return (
    <View className="mb-4 mt-4 flex flex-col gap-4 rounded-lg border border-muted p-4">
      <Text className="mb-2 text-center text-xl font-bold text-foreground">
        Create Post
      </Text>
      <Input value={title} onChangeText={setTitle} placeholder="Title" />
      {error?.data?.zodError?.fieldErrors.title && (
        <Text className="mb-2 text-destructive">
          {error.data.zodError.fieldErrors.title}
        </Text>
      )}
      <Input
        className="items-center rounded-md border border-input bg-background px-3 text-lg leading-[1.25] text-foreground"
        value={content}
        onChangeText={setContent}
        placeholder="Content"
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <Text className="mb-2 text-destructive">
          {error.data.zodError.fieldErrors.content}
        </Text>
      )}
      <Button
        className="w-full"
        onPress={() => {
          mutate({
            title,
            content,
          });
        }}
      >
        <Text>Create</Text>
      </Button>

      {error?.data?.code === "UNAUTHORIZED" && (
        <Text className="mt-2 text-destructive">
          You need to be logged in to create a post
        </Text>
      )}
    </View>
  );
}

function MobileAuth() {
  const { data: session } = authClient.useSession();
  return (
    <>
      <Text className="my-2 text-center text-base font-semibold">
        {session?.user
          ? `Signed in as ${session.user.email || "user"}`
          : "Not logged in"}
      </Text>
      <Button
        className="mt-2"
        onPress={async () =>
          session ? await authClient.signOut() : push("/login")
        }
      >
        <Text>{session ? "Sign Out" : "Sign In"}</Text>
      </Button>
    </>
  );
}

export default function Index() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const postQuery = useQuery(trpc.post.all.queryOptions());

  const deletePostMutation = useMutation(
    trpc.post.delete.mutationOptions({
      onSettled: () =>
        queryClient.invalidateQueries(trpc.post.all.queryFilter()),
    }),
  );

  return (
    <SafeAreaView className="grow bg-background">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full bg-background p-4">
        <Text className="pb-2 text-center text-2xl font-bold text-foreground">
          Universal <Text className="text-xl text-secondary">Turbo</Text>
        </Text>

        <MobileAuth />

        <View className="py-2">
          <Text className="font-semibold italic text-primary">
            Press on a post
          </Text>
        </View>
        {!!postQuery.error && (
          <Text className="pb-2 text-center text-red-500">
            Error loading posts: {postQuery.error.message}
          </Text>
        )}
        <View className="gap-2 px-2">
          <Button onPress={() => router.navigate("/storybook")}>
            <Text>Storybook</Text>
          </Button>
          <Button onPress={() => router.navigate("/tamagui-test")}>
            <Text>Tamagui Test</Text>
          </Button>
          <Button onPress={() => router.navigate("/ui-test")}>
            <Text>UI Test</Text>
          </Button>
        </View>
        <LegendList
          data={postQuery.data ?? []}
          estimatedItemSize={20}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(p) => (
            <PostCard
              post={p.item}
              onDelete={() => deletePostMutation.mutate(p.item.id)}
            />
          )}
        />

        <CreatePost />
      </View>
    </SafeAreaView>
  );
}
