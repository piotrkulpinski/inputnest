import { Text } from "@react-email/components"
import { config } from "~/config"

import { EmailButton } from "~/emails/components/EmailButton"
import type { EmailProps } from "~/emails/components/EmailLayout"
import { EmailLayout } from "~/emails/components/EmailLayout"
import { env } from "~/env"

export const EmailActivation = (props: EmailProps) => {
  return (
    <EmailLayout {...props}>
      <Text className="leading-6 text-black">
        I noticed that you signed up for our platform, but it looks like you haven't created your
        workspace yet. I don't want you to miss out on the amazing features we offer.
      </Text>
      <Text className="leading-6 text-black">
        To get started, click the button below and create your ${config.title} company for free!
      </Text>
      <EmailButton href={env.NEXT_PUBLIC_URL}>Create your company for free!</EmailButton>
      <Text className="leading-6 text-black">
        If you have any questions or need assistance during the onboarding process, feel free to
        reach out to me.
      </Text>
      <Text className="leading-6 text-black">
        I'm thrilled to have you on board, and can't wait to see what you'll build!
      </Text>
      <Text className="font-light leading-6 text-zinc-500">Piotr from ${config.title}</Text>
    </EmailLayout>
  )
}
