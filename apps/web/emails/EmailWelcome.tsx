import { Link, Text } from "@react-email/components"
import { config } from "~/config"

import type { EmailProps } from "~/emails/components/EmailLayout"
import { EmailLayout } from "~/emails/components/EmailLayout"

export const EmailWelcome = (props: EmailProps) => {
  return (
    <EmailLayout {...props}>
      <Text className="leading-6 text-black">
        Thanks for signing up! My name is Piotr, and I'm the founder of ${config.title} - the best
        no-code platform for building online directories! I'm excited to have you on board!
      </Text>
      <Text className="leading-6 text-black">Here are a few things you can do:</Text>
      <Text className="ml-1 leading-4 text-black">
        ◆ Create a{" "}
        <Link
          href="https://app.userpledge.co/links"
          className="font-medium text-blue-600 no-underline"
        >
          UserPledge.sh short link
        </Link>
      </Text>
      <Text className="ml-1 leading-4 text-black">
        ◆ Create a{" "}
        <Link href="https://app.userpledge.co" className="font-medium text-blue-600 no-underline">
          new project
        </Link>{" "}
        and add your custom domain
      </Text>
      <Text className="ml-1 leading-4 text-black">
        ◆ Follow us on{" "}
        <Link
          href="https://twitter.com/userpledgeco"
          className="font-medium text-blue-600 no-underline"
        >
          Twitter
        </Link>
      </Text>
      <Text className="leading-6 text-black">
        Let me know if you have any questions or feedback. I'm always happy to help!
      </Text>
      <Text className="font-light leading-6 text-zinc-500">Piotr from ${config.title}</Text>
    </EmailLayout>
  )
}
