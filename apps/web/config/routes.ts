import { env } from "~/env"

export const routesConfig = {
  routes: {
    dashboard: `${env.NEXT_PUBLIC_URL}/app/`,
    onboarding: `${env.NEXT_PUBLIC_URL}/app/onboarding`,
    signIn: `${env.NEXT_PUBLIC_URL}/auth/signin`,
    signUp: `${env.NEXT_PUBLIC_URL}/auth/signup`,
    verify: `${env.NEXT_PUBLIC_URL}/auth/verify`,
  },
}
