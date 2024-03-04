import { removeHttp } from "@curiousleaf/utils"
import { Link, Section, Text } from "@react-email/components"
import { config } from "~/config"

import { EmailLayout, EmailProps } from "~/emails/components/EmailLayout"

export const EmailLoginLink = ({ url, ...props }: { url: string } & EmailProps) => {
  return (
    <EmailLayout {...props}>
      <Text className="leading-6">Welcome to {config.title}!</Text>

      <Text className="leading-6">
        Please click the magic link below to sign in to your account.
      </Text>

      <Section className="my-8">
        <Link
          className="rounded-md bg-black px-6 py-3 text-center text-base font-semibold text-white no-underline"
          href={url}
        >
          Sign in to {config.title}
        </Link>
      </Section>

      <Text className="leading-6">or copy and paste this URL into your browser:</Text>

      <Text className="max-w-sm flex-wrap break-words font-medium text-purple-600 no-underline">
        {removeHttp(url)}
      </Text>
    </EmailLayout>
  )
}
