"use client"

import { Action, Field, Prose, Sidebar } from "@curiousleaf/design"
import { zodResolver } from "@hookform/resolvers/zod"
import type { PostSchema } from "@inputnest/database"
import { postSchema } from "@inputnest/database"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { type HTMLAttributes, useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { Form } from "~/components/form/Form"
import { Status } from "~/components/interface/Status"
import { VotesList } from "~/components/votes/VotesList"
import { VotesSkeleton } from "~/components/votes/VotesSkeleton"
import { useMutationHandler } from "~/hooks/useMutationHandler"
import { usePost } from "~/providers/PostProvider"
import { useWorkspace } from "~/providers/WorkspaceProvider"
import { api } from "~/services/trpc"

export const PostItemSidebar = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const apiUtils = api.useUtils()
  const { handleError } = useMutationHandler()
  const { post } = usePost()
  const { id: workspaceId } = useWorkspace()

  const [boards, statuses, votes] = api.useQueries(t => [
    t.boards.getAll({ workspaceId }),
    t.statuses.getAll({ workspaceId }),
    t.votes.getAll({ postId: post.id }),
  ])

  const isLoading = boards.isLoading || statuses.isLoading

  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: post,
  })

  const { mutate: updatePost } = api.posts.update.useMutation({
    onSuccess: async () => {
      // Invalidate the posts cache
      await apiUtils.posts.getAll.invalidate()
      await apiUtils.posts.get.invalidate({ id: post.id })
    },

    onError: error => handleError({ error, form }),
  })

  const onSubmit = form.handleSubmit((data: PostSchema) => {
    return updatePost({ ...data, id: post.id })
  })

  useEffect(() => {
    const subscription = form.watch(() => {
      onSubmit()
    })

    return () => subscription.unsubscribe()
  }, [form.watch, onSubmit])

  return (
    <FormProvider {...form}>
      <Sidebar size="lg" className="h-auto max-md:static max-md:w-auto">
        <Form.Fieldset className="sticky top-16 lg:top-6" disabled={isLoading}>
          <Form.Field control={form.control} name="boardId" label="Board">
            <Form.Select
              options={boards.data?.map(({ name, id }) => ({
                label: name,
                value: id,
              }))}
            />
          </Form.Field>

          <Form.Field control={form.control} name="statusId" label="Status">
            <Form.Select
              options={statuses.data?.map(({ name, id, color }) => ({
                label: <Status color={color}>{name}</Status>,
                value: id,
              }))}
            />
          </Form.Field>

          <Field label={`Voters (${votes.data?.length ?? "0"})`}>
            {votes.isLoading && <VotesSkeleton />}
            {votes.isSuccess && !votes.data?.length && <Prose size="xs">No votes yet.</Prose>}
            {votes.isSuccess && !!votes.data?.length && <VotesList votes={votes.data} />}
          </Field>
        </Form.Fieldset>

        <div className="flex grow flex-col items-start justify-end">
          <Action prefix={<ArrowLeftIcon />} className="sticky bottom-4" asChild>
            <Link href=".">Back to all posts</Link>
          </Action>
        </div>
      </Sidebar>
    </FormProvider>
  )
}
