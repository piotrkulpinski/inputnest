import { PostItem } from "~/components/posts/item/PostItem"

export default function CompanyPostItemPage({ params }: { params: { id: string } }) {
  return <PostItem id={params.id} />
}
