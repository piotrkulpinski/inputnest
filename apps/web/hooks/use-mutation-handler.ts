import type { AppRouter } from "@repo/api/router"
import type { TRPCClientErrorLike } from "@trpc/client"
import { useRouter } from "next/navigation"
import type { FieldValues, useForm, FieldPath } from "react-hook-form"
import { toast } from "sonner"

export const useMutationHandler = () => {
  const router = useRouter()

  type HandleSuccess = {
    redirect?: string
    success?: string
    error?: string
  }

  const handleSuccess = ({ redirect, success, error }: HandleSuccess) => {
    // If we have a success message, show it
    success && toast.success(success)

    // If we have an error message, show it
    error && toast.error(error)

    // If we have a redirect, navigate to it
    redirect && router.push(redirect)
  }

  type HandleError<T extends FieldValues> = {
    error: TRPCClientErrorLike<AppRouter>
    form: ReturnType<typeof useForm<T>>
  }

  const handleError = <T extends FieldValues>({
    error: { data, message },
    form,
  }: HandleError<T>) => {
    if (!data?.fieldErrors || !Object.keys(data?.fieldErrors).length) {
      toast.error(message)
      return
    }

    for (const [name, message] of Object.entries(data?.fieldErrors)) {
      form.setError(name as FieldPath<T>, { message: message?.[0] }, { shouldFocus: true })
    }
  }

  return { handleSuccess, handleError }
}
