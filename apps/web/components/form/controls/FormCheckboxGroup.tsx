import type { CheckboxElement, CheckboxProps } from "@curiousleaf/design"
import { Box, Checkbox } from "@curiousleaf/design"
import { forwardRef } from "react"
import { FormControl } from "~/components/form/FormControl"

import { useFieldContext } from "~/providers/FieldProvider"

type FormCheckboxGroupProps = CheckboxProps & {
  options?: {
    label?: string
    value: string
  }[]
}

export const FormCheckboxGroup = forwardRef<CheckboxElement, FormCheckboxGroupProps>((props, _) => {
  const { options, ...rest } = props
  const { field: f, fieldState } = useFieldContext()
  const { value, ...field } = f
  const fieldValue = (value as string[]) ?? []

  return (
    <FormControl>
      <Box.Group boxed>
        {options?.map(({ label, value }, i) => (
          <Box key={`${value}-${i}`} label={label ?? value}>
            <Checkbox
              value={value}
              error={!!fieldState.error}
              checked={fieldValue.includes(value as string)}
              onCheckedChange={checked => {
                if (checked) {
                  field.onChange([...fieldValue, value])
                } else {
                  field.onChange(fieldValue.filter((v: string) => v !== value))
                }
              }}
              {...field}
              {...rest}
            />
          </Box>
        ))}
      </Box.Group>
    </FormControl>
  )
})
