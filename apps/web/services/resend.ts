import { Resend } from "resend"

import { env } from "~/env"

export const resend = new Resend(env.RESEND_API_KEY)

export const resendPromoEmail = "Piotr from UserPledge <piotr@transactional.userpledge.co>"
export const resendEmail = "UserPledge <system@transactional.userpledge.co>"
