"use client"

import { Button, Card, Field, Prose, cx } from "@curiousleaf/design"
import { zodResolver } from "@hookform/resolvers/zod"
import type { PostSchema } from "@repo/database"
import { postSchema } from "@repo/database"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, type HTMLAttributes } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Form } from "~/components/form/Form"

import { Status } from "~/components/interface/status"
import { VotesList } from "~/components/votes/list"
import { VotesSkeleton } from "~/components/votes/skeleton"
import { useMutationHandler } from "~/hooks/useMutationHandler"
import { useCompany } from "~/providers/company-provider"
import { usePost } from "~/providers/post-provider"
import { api } from "~/services/trpc"

export const PostItemSidebar = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const apiUtils = api.useUtils()
  const { handleError } = useMutationHandler()
  const { post } = usePost()
  const { id: companyId } = useCompany()

  const [boards, statuses, votes] = api.useQueries(t => [
    t.boards.getAll({ companyId }),
    t.statuses.getAll({ companyId }),
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
  }, [form.watch])

  return (
    <FormProvider {...form}>
      <Card.Panel
        theme="white"
        flex="column"
        className={cx("border max-md:border-t md:w-72 md:shrink-0 md:border-l", className)}
        {...props}
      >
        <Form.Fieldset className="sticky top-16" disabled={isLoading}>
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
            {votes.isSuccess && !votes.data?.length && <Prose>No votes yet.</Prose>}
            {votes.isSuccess && !!votes.data?.length && <VotesList votes={votes.data} />}
          </Field>
        </Form.Fieldset>

        <div className="flex grow flex-col items-start justify-end">
          <Button
            size="sm"
            theme="secondary"
            variant="ghost"
            prefix={<ArrowLeftIcon />}
            className="sticky bottom-4 text-gray-500"
            asChild
          >
            <Link href="..">Back to all posts</Link>
          </Button>
        </div>
      </Card.Panel>
    </FormProvider>
  )
}
