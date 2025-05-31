import type { TRPCRouterRecord } from "@trpc/server";
import { headers } from 'next/headers';
import { auth } from '@acme/auth'
import { protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = {
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!";
  }),
  signOut: protectedProcedure.mutation(async ({ ctx }) => {
    const { success } = await auth.api.signOut({
      headers: await headers(),
    });

    return { success };
  }),
} satisfies TRPCRouterRecord;
