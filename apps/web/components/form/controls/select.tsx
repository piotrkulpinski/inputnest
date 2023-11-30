import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { FormControl } from "~/components/form/control"
import { useFormField } from "~/providers/field-provider"

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "../../interface/select"

type FormSelectProps = ComponentPropsWithoutRef<typeof SelectRoot> &
  ComponentPropsWithoutRef<typeof SelectTrigger> & {
    options?: (ComponentPropsWithoutRef<typeof SelectItem> & {
      label?: ReactNode
      value: string
    })[]
  }

export const FormSelect = ({ options, placeholder, ...props }: FormSelectProps) => {
  const { field, fieldState } = useFormField()
  const { ref, ...fieldObject } = field

  return (
    <FormControl>
      <SelectRoot {...props} onValueChange={field.onChange} {...fieldObject}>
        <SelectTrigger ref={ref} hasError={!!fieldState.error}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options?.map(({ label, value, ...option }, index) => (
            <SelectItem key={index} value={value} {...option}>
              {label ?? value}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </FormControl>
  )
}
