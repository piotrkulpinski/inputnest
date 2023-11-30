import type { VariantProps } from "class-variance-authority"
import type { ComponentPropsWithoutRef } from "react"

import type { formBoxGroupVariants } from "~/components/form/box"
import { FormBox, FormBoxGroup } from "~/components/form/box"
import { FormControl } from "~/components/form/control"
import { RadioGroup, RadioGroupItem } from "~/components/interface/radio-group"
import { useFormField } from "~/providers/field-provider"

type FormRadioProps = ComponentPropsWithoutRef<typeof RadioGroup> &
  VariantProps<typeof formBoxGroupVariants> & {
    options?: {
      label?: string
      value: string
    }[]
  }

export const FormRadio = ({ options, ...props }: FormRadioProps) => {
  const { field, fieldState } = useFormField()

  return (
    <FormControl>
      <RadioGroup asChild {...props} onValueChange={field.onChange} {...field}>
        <FormBoxGroup>
          {options?.map(({ label, value }, index) => (
            <FormBox key={`${value}-${index}`} label={label ?? value}>
              <RadioGroupItem value={value} hasError={!!fieldState.error} />
            </FormBox>
          ))}
        </FormBoxGroup>
      </RadioGroup>
    </FormControl>
  )
}
