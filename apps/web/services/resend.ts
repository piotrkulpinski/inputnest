import { Resend } from "resend"

import { env } from "~/env"

export const resend = new Resend(env.RESEND_API_KEY)

export const resendPromoEmail = "Piotr from InputNest <piotr@transactional.inputnest.com>"
export const resendEmail = "InputNest <system@transactional.inputnest.com>"
