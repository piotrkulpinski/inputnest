import { Select, SelectElement, SelectProps } from "@curiousleaf/design"
import { forwardRef } from "react"
import { FormControl } from "~/components/form/FormControl"

import { useFieldContext } from "~/providers/FieldProvider"

export const FormSelect = forwardRef<SelectElement, SelectProps>((props, _) => {
  const { field, fieldState } = useFieldContext()

  return (
    <FormControl>
      <Select error={!!fieldState.error} {...field} {...props} />
    </FormControl>
  )
})
