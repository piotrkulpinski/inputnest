import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import type { HTMLAttributes } from "react"

import { AlertClose, AlertContent, AlertRoot } from "~/components/interface/alert"
import { env } from "~/env"
import { useCheckoutStore } from "~/store/checkout"

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export const Checkout = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { clientSecret, setClientSecret } = useCheckoutStore()

  return (
    <AlertRoot open={!!clientSecret} onOpenChange={(open) => !open && setClientSecret(null)}>
      <AlertContent className="!w-[66rem] !bg-gray-50" fixed={false} {...props}>
        <AlertClose className="absolute right-3 top-3" />

        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </AlertContent>
    </AlertRoot>
  )
}
