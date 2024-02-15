import type { PropsWithChildren } from "react"
import type { FieldValues, Path, UseControllerReturn } from "react-hook-form"

import { createSimpleContext } from "~/utils/providers"

type FormFieldContext = UseControllerReturn<any, any> & {
  controlId: string
  descriptionId: string
  messageId: string
}

const FieldContext = createSimpleContext<FormFieldContext>("Field")

type FieldProviderProps<T extends FieldValues> = PropsWithChildren<{
  id: string
  controller: UseControllerReturn<T, Path<T>>
}>

export const FieldProvider = <T extends FieldValues>(props: FieldProviderProps<T>) => {
  const { id, controller, ...rest } = props

  const context = {
    controlId: id,
    descriptionId: `${id}-description`,
    messageId: `${id}-message`,
    ...controller,
  }

  return <FieldContext.Provider value={context} {...rest} />
}

export const useFieldContext = FieldContext.useValue
