import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  shared: {
    PORT: z.coerce.number().default(8000),
    VERCEL_URL: z
      .string()
      .optional()
      .transform(v => (v ? `https://${v}` : undefined)),
  },

  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app isn't
   * built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    NEXTAUTH_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    S3_BUCKET: z.string().min(1),
    S3_REGION: z.string().min(1),
    S3_ACCESS_KEY: z.string().min(1),
    S3_SECRET_ACCESS_KEY: z.string().min(1),
    SMTP_SERVER: z.string().min(1),
    SMTP_FROM: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    CLOUDINARY_API_KEY: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),
    INNGEST_SIGNING_KEY: z.string().min(1),
    INNGEST_EVENT_KEY: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    KNOCK_API_KEY: z.string().min(1),
    LOGSNAG_TOKEN: z.string().min(1),
    // VERCEL_PROJECT_ID: z.string().min(1),
    // VERCEL_TEAM_ID: z.string().min(1),
    // VERCEL_API_TOKEN: z.string().min(1),
  },

  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_URL: z.string().min(1).url(),
    NEXT_PUBLIC_TENANT_URL: z.string().min(1).url(),
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1),
    NEXT_PUBLIC_CRISP_WEBSITE_ID: z.string().min(1),
    NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY: z.string().min(1),
    NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  },

  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {
    PORT: process.env.PORT,
    VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_TENANT_URL: process.env.NEXT_PUBLIC_TENANT_URL,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CRISP_WEBSITE_ID: process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID,
    NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY,
    NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID: process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})

export const isDev = process.env.NODE_ENV === "development"
export const isProd = process.env.NODE_ENV === "production"
