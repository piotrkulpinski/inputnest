import { Box, RadioGroup } from "@curiousleaf/design"
import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"

import { useFieldContext } from "~/providers/FieldProvider"
import { FormControl } from "~/components/form/FormControl"

type FormRadioGroupProps = ComponentPropsWithoutRef<typeof RadioGroup> & {
  options?: {
    label?: string
    value: string
  }[]
}

export const FormRadioGroup = forwardRef<ElementRef<typeof RadioGroup>, FormRadioGroupProps>(
  (props, _) => {
    const { options, ...rest } = props
    const { field, fieldState } = useFieldContext()

    return (
      <FormControl>
        <RadioGroup id={field.name} onValueChange={field.onChange} asChild {...field} {...rest}>
          <Box.Group>
            {options?.map(({ label, value }, i) => (
              <Box key={`${value}-${i}`} label={label ?? value}>
                <RadioGroup.Item value={value} error={!!fieldState.error} />
              </Box>
            ))}
          </Box.Group>
        </RadioGroup>
      </FormControl>
    )
  },
)
