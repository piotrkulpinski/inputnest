import { useParams } from "@remix-run/react"

import { DialogRoot, DialogLoading, DialogContent } from "~/components/interface/dialog"
import { QueryCell } from "~/components/utils/query-cell"
import { useRouteDialog } from "~/hooks/use-route-dialog"
import { useCompany } from "~/providers/company-provider"
import { PostForm } from "~/routes/$company.posts_.$id.edit/form"
import { api } from "~/services/trpc"

export const loader = () => null

const CompanyPostsEdit = () => {
  const { isOpen, onOpenChange } = useRouteDialog()
  const { id } = useParams() as { id: string }
  const { id: companyId } = useCompany()

  const postQuery = api.posts.get.useQuery({ id, companyId })

  return (
    <QueryCell
      query={postQuery}
      loading={() => (
        <DialogRoot open={isOpen} onOpenChange={onOpenChange}>
          <DialogLoading />
        </DialogRoot>
      )}
      success={({ data }) => (
        <DialogRoot open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent size="md">
            <PostForm post={data} />
          </DialogContent>
        </DialogRoot>
      )}
    />
  )
}

export default CompanyPostsEdit
