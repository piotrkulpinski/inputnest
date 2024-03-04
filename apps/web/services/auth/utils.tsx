import { NodemailerConfig } from "@auth/core/providers/nodemailer"
import { render } from "@react-email/components"
import nodemailer from "nodemailer"
import { config } from "~/config"
import { EmailLoginLink } from "~/emails/EmailLoginLink"

type Params = Parameters<NodemailerConfig["sendVerificationRequest"]>[0]

export const sendVerificationRequest = async ({ identifier, url, provider }: Params) => {
  const { server, from } = provider
  const to = identifier
  const subject = `Your ${config.title} Login Link`
  const transport = nodemailer.createTransport(server)
  const html = render(<EmailLoginLink to={to} subject={subject} url={url} />)

  try {
    await transport.sendMail({ to, from, subject, html })
  } catch (error) {
    throw new Error("Failed to send the verification Email.")
  }
}
