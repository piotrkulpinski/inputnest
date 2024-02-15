import type { ButtonProps } from "@curiousleaf/design"
import { Button } from "@curiousleaf/design"
import { forwardRef } from "react"
import { useFormContext } from "react-hook-form"

export const FormButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { formState } = useFormContext()
  const { isSubmitting, isSubmitted, isValid } = formState

  return (
    <Button
      ref={ref}
      loading={isSubmitting}
      disabled={isSubmitting || (isSubmitted && !isValid)}
      {...props}
    />
  )
})

FormButton.defaultProps = {
  className: "min-w-[8rem]",
  type: "submit",
  theme: "secondary",
  children: "Save Changes",
}
