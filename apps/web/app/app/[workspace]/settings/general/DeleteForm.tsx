"use client"

import { Button, Card, Header } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"

import { DialogConfirm } from "~/components/dialogs/DialogConfirm"
import { useMutationHandler } from "~/hooks/useMutationHandler"
import { useWorkspace } from "~/providers/WorkspaceProvider"
import { api } from "~/services/trpc/client"

export const DeleteForm = (props: HTMLAttributes<HTMLElement>) => {
  const { handleSuccess } = useMutationHandler()
  const apiUtils = api.useUtils()
  const { id, slug } = useWorkspace()

  const { mutate: deleteWorkspace, isPending } = api.workspaces.delete.useMutation({
    onSuccess: async () => {
      handleSuccess({
        redirect: "/app",
        success: "Workspace deleted successfully",
      })

      // Invalidate the workspace list
      await apiUtils.workspaces.getAll.invalidate()
    },
  })

  return (
    <Card className="border-red-light" {...props}>
      <Card.Panel asChild>
        <Header
          title="Delete Workspace"
          description="The workspace will be permanently deleted, including its content and domains. This action is irreversible and can not be undone."
        />
      </Card.Panel>

      <Card.Row direction="rowReverse" className="border-red-light bg-red-lighter">
        <DialogConfirm
          title="Delete your workspace?"
          label="Delete Workspace"
          onConfirm={() => deleteWorkspace({ id })}
          confirmText={slug}
        >
          <Button isPending={isPending} theme="negative" className="min-w-[8rem]">
            Delete
          </Button>
        </DialogConfirm>
      </Card.Row>
    </Card>
  )
}
