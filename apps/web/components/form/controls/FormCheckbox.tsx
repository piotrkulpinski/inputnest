import { Checkbox, CheckboxElement, CheckboxProps } from "@curiousleaf/design"
import { forwardRef } from "react"
import { FormControl } from "~/components/form/FormControl"

import { useFieldContext } from "~/providers/FieldProvider"

export const FormCheckbox = forwardRef<CheckboxElement, CheckboxProps>((props, _) => {
  const { field, fieldState } = useFieldContext()

  return (
    <FormControl>
      <Checkbox
        error={!!fieldState.error}
        checked={field.value}
        onCheckedChange={field.onChange}
        {...field}
        {...props}
      />
    </FormControl>
  )
})
