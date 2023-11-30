import { toSlugCase } from "@curiousleaf/utils"
import { useEffect } from "react"
import type { FieldPath, FieldValues, useForm } from "react-hook-form"

type UseFormSlugProps<T extends FieldValues> = {
  form: ReturnType<typeof useForm<T>>
  invokerField: FieldPath<T>
  targetField: FieldPath<T>
  enabled?: boolean
}

export const useFormSlug = <T extends FieldValues>({
  form,
  invokerField,
  targetField,
  enabled = true,
}: UseFormSlugProps<T>) => {
  const name = form.watch(invokerField)
  const state = form.getFieldState(targetField)

  useEffect(() => {
    if (enabled && !state.isTouched) {
      form.setValue(targetField, toSlugCase(name) as any, {
        shouldValidate: form.formState.isSubmitted,
        shouldDirty: form.formState.isDirty,
      })
    }
  }, [name])
}
