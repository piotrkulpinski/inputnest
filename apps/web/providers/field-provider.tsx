import type { PropsWithChildren } from "react"
import { useId } from "react"
import type { UseControllerReturn } from "react-hook-form"
import { useController } from "react-hook-form"

import { createSimpleContext } from "~/utils/providers"

type FormFieldContext = UseControllerReturn & {
  controlId: string
  descriptionId: string
  messageId: string
  required?: boolean
}

const FieldContext = createSimpleContext<FormFieldContext>("Field")

type FieldProviderProps = PropsWithChildren<{
  name: string
  required?: boolean
}>

export const FieldProvider = ({ children, name, required }: FieldProviderProps) => {
  const id = useId()
  const controller = useController({ name, defaultValue: "" })

  return (
    <FieldContext.Provider
      value={{
        controlId: id,
        descriptionId: `${id}-description`,
        messageId: `${id}-message`,
        required,
        ...controller,
      }}
    >
      {children}
    </FieldContext.Provider>
  )
}

export const useFormField = FieldContext.useValue
