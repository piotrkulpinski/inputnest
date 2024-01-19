"use client"

import { Button } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"

import { DialogConfirm } from "~/components/dialogs/confirm"
import { Box, BoxFooter, BoxHeader } from "~/components/interface/box"
import { useMutationHandler } from "~/hooks/use-mutation-handler"
import { useCompany } from "~/providers/company-provider"
import { api } from "~/services/trpc"

export const CompanySettingsDeleteForm = (props: HTMLAttributes<HTMLElement>) => {
  const { handleSuccess } = useMutationHandler()
  const apiUtils = api.useUtils()
  const { id, slug } = useCompany()

  const { mutate: deleteCompany, isLoading } = api.companies.delete.useMutation({
    onSuccess: async () => {
      // Invalidate the company list
      await apiUtils.companies.getAll.invalidate()

      // Redirect with success message
      handleSuccess({
        redirect: "/",
        success: "Company deleted successfully",
      })
    },
  })

  return (
    <Box className="border-red-200" {...props}>
      <BoxHeader
        title="Delete Company"
        description="The company will be permanently deleted, including its content and domains. This action is irreversible and can not be undone."
      />

      <BoxFooter className="border-red-200 bg-red-50">
        <DialogConfirm
          title="Delete your company?"
          label="Delete Company"
          onConfirm={() => deleteCompany({ id })}
          confirmText={slug}
        >
          <Button loading={isLoading} theme="red">
            Delete
          </Button>
        </DialogConfirm>
      </BoxFooter>
    </Box>
  )
}
