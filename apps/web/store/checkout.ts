import { create } from "zustand"

export type CheckoutStore = {
  clientSecret: string | null
  setClientSecret: (clientSecret: string | null) => void
}

export const useCheckoutStore = create<CheckoutStore>(set => ({
  clientSecret: null,
  setClientSecret: clientSecret => set(() => ({ clientSecret })),
}))
