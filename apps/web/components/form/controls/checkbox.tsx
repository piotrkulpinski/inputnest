import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"

import { Checkbox } from "~/components/interface/checkbox"
import { useFormField } from "~/providers/field-provider"

export const FormCheckbox = forwardRef<
  ElementRef<typeof Checkbox>,
  ComponentPropsWithoutRef<typeof Checkbox>
>((props, ref) => {
  const { field, fieldState } = useFormField()

  return (
    <Checkbox
      hasError={!!fieldState.error}
      checked={field.value}
      onCheckedChange={field.onChange}
      {...props}
      {...field}
    />
  )
})
