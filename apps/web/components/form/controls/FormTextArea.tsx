import { TextAreaElement, TextAreaProps, TextArea } from "@curiousleaf/design"
import { forwardRef } from "react"
import { FormControl } from "~/components/form/FormControl"

import { useFieldContext } from "~/providers/FieldProvider"

export const FormTextArea = forwardRef<TextAreaElement, TextAreaProps>((props, _) => {
  const { field, fieldState } = useFieldContext()

  return (
    <FormControl>
      <TextArea error={!!fieldState.error} {...field} {...props} />
    </FormControl>
  )
})
