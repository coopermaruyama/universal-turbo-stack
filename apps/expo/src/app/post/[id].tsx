import { useQuery } from "@tanstack/react-query";
import { Stack, useGlobalSearchParams } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

import { trpc } from "~/lib/api";

export default function Post() {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const { data } = useQuery(trpc.post.byId.queryOptions({ id }));

  if (!data) return null;

  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: data.title }} />
      <View className="h-full w-full p-4">
        <Text className="text-primary py-2 text-3xl font-bold">
          {data.title}
        </Text>
        <Text className="text-foreground py-4">{data.content}</Text>
      </View>
    </SafeAreaView>
  );
}
