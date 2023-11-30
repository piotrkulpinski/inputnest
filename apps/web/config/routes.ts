import { env } from "~/env"

export const routesConfig = {
  routes: {
    dashboard: env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    onboarding: env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
    signIn: env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    signUp: env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  },
}
