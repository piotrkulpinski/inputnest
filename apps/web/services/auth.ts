import Google from "@auth/core/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@repo/database"
import NextAuth from "next-auth"

import { env } from "~/env"

export type { BuiltInProviderType } from "@auth/core/providers/index"
export type { Session } from "next-auth"

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),

  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  callbacks: {
    session: async ({ session }) => session,
  },
})
