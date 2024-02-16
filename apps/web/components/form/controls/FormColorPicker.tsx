import { ColorPicker, ColorPickerElement, ColorPickerProps } from "@curiousleaf/design"
import { forwardRef } from "react"
import { useFormContext } from "react-hook-form"
import { config } from "~/config"

import { useFieldContext } from "~/providers/FieldProvider"

export type FormColorPickerProps = Omit<ColorPickerProps, "onChange" | "onClear">

export const FormColorPicker = forwardRef<ColorPickerElement, FormColorPickerProps>(
  (props, ref) => {
    const { watch } = useFormContext()
    const { field } = useFieldContext()
    const color = watch(field.name)

    const onChange = (value: string) => {
      field.onChange(value)
    }

    const onClear = () => {
      field.onChange("")
    }

    return (
      <ColorPicker
        ref={ref}
        color={color}
        presetColors={config.presetColors}
        onChange={onChange}
        onClear={color && onClear}
        {...props}
      />
    )
  },
)
