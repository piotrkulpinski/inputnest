import { Input, InputElement, InputProps } from "@curiousleaf/design"
import { forwardRef } from "react"

import { FormControl } from "~/components/form/FormControl"
import { useFieldContext } from "~/providers/FieldProvider"

export const FormInput = forwardRef<InputElement, InputProps>((props, _) => {
  const { field, fieldState } = useFieldContext()

  return (
    <FormControl>
      <Input error={!!fieldState.error} {...field} {...props} />
    </FormControl>
  )
})
