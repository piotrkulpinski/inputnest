import { Field, Error } from "@curiousleaf/design"
import { useId, type ComponentPropsWithoutRef } from "react"
import { useController, type ControllerProps, type FieldValues } from "react-hook-form"

import { FieldProvider } from "~/providers/FieldProvider"

type FormFieldProps<T extends FieldValues> = ComponentPropsWithoutRef<typeof Field> &
  Omit<ControllerProps<T>, "render"> & {
    hideError?: boolean
  }

export const FormField = <T extends FieldValues>(props: FormFieldProps<T>) => {
  const { children, control, name, hideError, ...rest } = props

  const id = useId()
  const controller = useController({ control, name })
  const { error } = controller.fieldState

  // TODO: pass id to the label as well
  return (
    <FieldProvider<T> id={id} controller={controller}>
      <Field id={id} {...rest}>
        {children}
        {error && !hideError && <Error>{error.message}</Error>}
      </Field>
    </FieldProvider>
  )
}
