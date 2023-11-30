import type { VariantProps } from "class-variance-authority"
import { forwardRef } from "react"
import type { TextareaAutosizeProps } from "react-textarea-autosize"
import TextareaAutosize from "react-textarea-autosize"

import { useAffix } from "~/components/form/affix"
import { FormControl } from "~/components/form/control"
import { formInputVariants } from "~/components/form/controls/input"
import { useFormField } from "~/providers/field-provider"

type FormTextareaProps = TextareaAutosizeProps & VariantProps<typeof formInputVariants>

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>((props, ref) => {
  const { className, mono, ...rest } = props
  const { field, fieldState } = useFormField()
  const { prefixWidth, suffixWidth } = useAffix()

  return (
    <FormControl>
      <TextareaAutosize
        className={formInputVariants({ hasError: !!fieldState.error, mono, className })}
        style={{ paddingLeft: prefixWidth, paddingRight: suffixWidth }}
        rows={rest.rows ?? rest.minRows}
        {...field}
        {...rest}
        ref={ref}
      />
    </FormControl>
  )
})
