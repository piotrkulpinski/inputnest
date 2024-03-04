import GitHub from "@auth/core/providers/github"
import Google from "@auth/core/providers/google"
import Nodemailer from "@auth/core/providers/nodemailer"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@inputnest/database"
import NextAuth from "next-auth"
import { config } from "~/config"

import { env } from "~/env"
import { sendVerificationRequest } from "~/services/auth/utils"

export type { BuiltInProviderType } from "@auth/core/providers/index"
export type { Session } from "next-auth"

const useSecureCookies = !!env.VERCEL_URL

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),

  providers: [
    Nodemailer({
      server: env.SMTP_SERVER,
      from: env.SMTP_FROM,
      sendVerificationRequest,
    }),

    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),

    GitHub({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  pages: {
    signIn: config.routes.signIn,
    signOut: config.routes.signUp,
    error: config.routes.signIn,
    verifyRequest: config.routes.verify,
  },

  callbacks: {
    session: async ({ session }) => session,
  },

  // cookies: {
  //   sessionToken: {
  //     name: `${useSecureCookies ? "__Secure-" : ""}next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       domain: `.localhost:${env.PORT}`,
  //       secure: useSecureCookies,
  //     },
  //   },
  // },
})
