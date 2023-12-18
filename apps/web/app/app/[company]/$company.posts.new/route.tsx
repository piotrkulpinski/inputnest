import { DialogContent, DialogLoading, DialogRoot } from "~/components/interface/dialog"
import { useRouteDialog } from "~/hooks/use-route-dialog"
import { useCompany } from "~/providers/company-provider"
import { PostForm } from "~/routes/$company.posts.new/form"
import { api } from "~/services/trpc"

export const loader = () => null

const CompanyPostsForm = () => {
  const { isOpen, onOpenChange } = useRouteDialog()
  const { id: companyId } = useCompany()

  const [boards, statuses] = api.useQueries((t) => [
    t.boards.getAll({ companyId }),
    t.statuses.getAll({ companyId }),
  ])

  const isFetching = boards.isFetching || statuses.isFetching
  const isSuccess = boards.isSuccess && statuses.isSuccess

  if (isFetching) {
    return (
      <DialogRoot open={isOpen}>
        <DialogLoading />
      </DialogRoot>
    )
  }

  if (!isSuccess) return null

  return (
    <DialogRoot open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent size="md">
        <PostForm boards={boards.data} statuses={statuses.data} />
      </DialogContent>
    </DialogRoot>
  )
}

export default CompanyPostsForm
