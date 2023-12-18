import { PostItem } from "~/components/posts/item/item"

export default function CompanyPostItemPage({ params }: { params: { id: string } }) {
  return <PostItem id={params.id} />
}
