"use client"

import { Button } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"

import { DialogConfirm } from "~/components/dialogs/confirm"
import { Box, BoxFooter, BoxHeader } from "~/components/interface/box"
import { useMutationHandler } from "~/hooks/useMutationHandler"
import { useCompany } from "~/providers/company-provider"
import { api } from "~/services/trpc"

export const CompanySettingsDeleteForm = (props: HTMLAttributes<HTMLElement>) => {
  const { handleSuccess } = useMutationHandler()
  const apiUtils = api.useUtils()
  const { id, slug } = useCompany()

  const { mutate: deleteCompany, isLoading } = api.companies.delete.useMutation({
    onSuccess: async () => {
      handleSuccess({
        redirect: "/",
        success: "Company deleted successfully",
      })

      // Invalidate the company list
      await apiUtils.companies.getAll.invalidate()
    },
  })

  return (
    <Box className="border-red-light" {...props}>
      <BoxHeader
        title="Delete Company"
        description="The company will be permanently deleted, including its content and domains. This action is irreversible and can not be undone."
      />

      <BoxFooter className="border-red-light bg-red-lighter">
        <DialogConfirm
          title="Delete your company?"
          label="Delete Company"
          onConfirm={() => deleteCompany({ id })}
          confirmText={slug}
        >
          <Button loading={isLoading} theme="negative" className="min-w-[8rem]">
            Delete
          </Button>
        </DialogConfirm>
      </BoxFooter>
    </Box>
  )
}
