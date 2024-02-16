"use client"

import { Dialog } from "@curiousleaf/design"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import type { HTMLAttributes } from "react"

import { env } from "~/env"
import { useCheckoutStore } from "~/store/checkout"

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export const Checkout = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { clientSecret, setClientSecret } = useCheckoutStore()

  return (
    <Dialog open={!!clientSecret} onOpenChange={open => !open && setClientSecret(null)}>
      <Dialog.Content className="!w-[66rem] !bg-gray-50" fixed={false} {...props}>
        <Dialog.Close className="absolute right-3 top-3" />

        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </Dialog.Content>
    </Dialog>
  )
}
