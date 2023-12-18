"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import type { PostSchema } from "@repo/database"
import { postSchema } from "@repo/database"
import { IconArrowLeft } from "@tabler/icons-react"
import Link from "next/link"
import { useEffect, type HTMLAttributes } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { FormSelect } from "~/components/form/controls/select"
import { FormField } from "~/components/form/field"
import { FormFieldset } from "~/components/form/fieldset"
import { Button } from "~/components/interface/button"
import { CardPanel } from "~/components/interface/card"
import { Copy } from "~/components/interface/copy"
import { Field } from "~/components/interface/field"
import { Status } from "~/components/interface/status"
import { VotesList } from "~/components/votes/list"
import { VotesSkeleton } from "~/components/votes/skeleton"
import { useMutationHandler } from "~/hooks/use-mutation-handler"
import { useCompany } from "~/providers/company-provider"
import { usePost } from "~/providers/post-provider"
import { api } from "~/services/trpc"
import { cn } from "~/utils/helpers"

export const PostItemSidebar = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const apiUtils = api.useUtils()
  const { handleError } = useMutationHandler()
  const { post } = usePost()
  const { id: companyId } = useCompany()

  const [boards, statuses, votes] = api.useQueries((t) => [
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

    onError: (error) => handleError({ error, form }),
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
      <CardPanel
        theme="white"
        flex="column"
        className={cn("border-outline max-md:border-t md:w-72 md:shrink-0 md:border-l", className)}
        {...props}
      >
        <FormFieldset className="sticky top-16" disabled={isLoading}>
          <FormField control={form.control} name="boardId" label="Board">
            <FormSelect
              options={boards.data?.map(({ name, id }) => ({
                label: name,
                value: id,
              }))}
            />
          </FormField>

          <FormField control={form.control} name="statusId" label="Status">
            <FormSelect
              options={statuses.data?.map(({ name, id, color }) => ({
                label: <Status color={color}>{name}</Status>,
                value: id,
              }))}
            />
          </FormField>

          <Field label={`Voters (${votes.data?.length ?? "0"})`}>
            {votes.isLoading && <VotesSkeleton />}
            {votes.isSuccess && !votes.data?.length && <Copy>No votes yet.</Copy>}
            {votes.isSuccess && !!votes.data?.length && <VotesList votes={votes.data} />}
          </Field>
        </FormFieldset>

        <div className="flex grow flex-col items-start justify-end">
          <Button
            type="button"
            theme="clean"
            size="sm"
            prefix={<IconArrowLeft />}
            className="sticky bottom-4 text-zinc-500"
            asChild
          >
            <Link href="..">Back to all posts</Link>
          </Button>
        </div>
      </CardPanel>
    </FormProvider>
  )
}
