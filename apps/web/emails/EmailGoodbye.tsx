import { Text } from "@react-email/components"
import { config } from "~/config"

import type { EmailProps } from "~/emails/components/EmailLayout"
import { EmailLayout } from "~/emails/components/EmailLayout"

export const EmailGoodbye = (props: EmailProps) => {
  return (
    <EmailLayout {...props}>
      <Text className="leading-6 text-black">
        Just wanted to confirm that your account has just been deleted. I'm sad to see you go, but I
        respect your decision.
      </Text>
      <Text className="leading-6 text-black">
        As per your request, all your data and settings have been erased from ${config.title}.
        Regrettably, this means that any saved preferences, content, and history associated with
        your account are no longer accessible.
      </Text>
      <Text className="leading-6 text-black">
        If you have any questions or require further assistance in the future, please don't hesitate
        to reach out to me. I'll be more than happy to assist you!
      </Text>
      <Text className="leading-6 text-black">
        Thank you for being a part of ${config.title}. I value the time you spent with us and wish
        you the best in your future endeavors.
      </Text>
      <Text className="font-light leading-6 text-zinc-500">Piotr from ${config.title}</Text>
    </EmailLayout>
  )
}
