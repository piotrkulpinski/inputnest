import { Box, BoxElement, BoxProps, SwitchProps } from "@curiousleaf/design"
import { forwardRef } from "react"
import type { ReactNode } from "react"
import { FormControl } from "~/components/form/FormControl"

import { Switch } from "~/components/interface/switch"
import { useFieldContext } from "~/providers/FieldProvider"

type FormSwitchProps = SwitchProps &
  BoxProps & {
    onLabel?: ReactNode
    offLabel?: ReactNode
  }

export const FormSwitch = forwardRef<BoxElement, FormSwitchProps>((props, ref) => {
  const { label, onLabel = "On", offLabel = "Off", ...rest } = props
  const { field, fieldState } = useFieldContext()

  return (
    <Box
      ref={ref}
      label={label || field.value ? onLabel : offLabel}
      className="@md/set:min-w-[10.25ch]"
    >
      <FormControl>
        <Switch
          hasError={!!fieldState.error}
          checked={field.value}
          onCheckedChange={field.onChange}
          {...rest}
          {...field}
        />
      </FormControl>
    </Box>
  )
})
