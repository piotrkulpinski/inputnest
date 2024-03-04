import { Body, Container, Head, Html, Img, Preview, Tailwind, Text } from "@react-email/components"
import { PropsWithChildren } from "react"
import { EmailFooter } from "~/emails/components/EmailFooter"

export type EmailProps = {
  subject: string
  to: string
  name?: string | null
  isPromo?: boolean
}

export const EmailLayout = ({
  children,
  subject,
  to,
  name,
  isPromo,
}: PropsWithChildren<EmailProps>) => {
  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>

      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto max-w-[500px] px-10">
            <Img
              src="https://kulpinski.co/images/superstash.svg"
              width="86"
              height="66"
              alt="UserPledge"
              className="my-7 h-6 w-auto"
            />
            {name && <Text className="leading-6 text-black">Hi {name}!</Text>}
            {children}
            <EmailFooter to={to} isPromo={isPromo} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
