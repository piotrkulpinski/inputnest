"use client"

import { Button, Dialog, Header, Series } from "@curiousleaf/design"
import { AuthSignIn } from "~/components/auth/AuthSignIn"
import { config } from "~/config"
import { useWorkspace } from "~/providers/WorkspaceProvider"

export const NavGuest = () => {
  const { name } = useWorkspace()

  return (
    <Series size="sm">
      <Dialog>
        <Dialog.Trigger asChild>
          <Button theme="secondary" variant="outline">
            Sign in
          </Button>
        </Dialog.Trigger>

        <Dialog.Content size="sm">
          <Dialog.Panel>
            <Header
              title="Sign in to your account"
              description={`We use **${config.title}** to collect feedback from users like you. Sign up to post and vote.`}
              size="h3"
            >
              <Dialog.Close />
            </Header>
          </Dialog.Panel>

          <Dialog.Panel theme="gray" asChild>
            <AuthSignIn />
          </Dialog.Panel>
        </Dialog.Content>
      </Dialog>

      <Button theme="primary">Sign Up</Button>
    </Series>
  )
}
