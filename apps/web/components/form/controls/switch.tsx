import { forwardRef } from "react"
import type { ElementRef, ComponentProps, ReactNode } from "react"

import { FormBox } from "~/components/form/box"
import { FormControl } from "~/components/form/control"
import { Switch } from "~/components/interface/switch"
import { useFormField } from "~/providers/field-provider"

type FormSwitchProps = ComponentProps<typeof Switch> & {
  onLabel?: ReactNode
  offLabel?: ReactNode
}

export const FormSwitch = forwardRef<ElementRef<typeof FormBox>, FormSwitchProps>((props, ref) => {
  const { onLabel = "On", offLabel = "Off", ...rest } = props
  const { field, fieldState } = useFormField()

  return (
    <FormBox ref={ref} label={field.value ? onLabel : offLabel} className="@md:min-w-[10.25ch]">
      <FormControl>
        <Switch
          hasError={!!fieldState.error}
          checked={field.value}
          onCheckedChange={field.onChange}
          {...rest}
          {...field}
        />
      </FormControl>
    </FormBox>
  )
})
