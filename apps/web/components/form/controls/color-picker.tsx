import { isLightColor } from "@curiousleaf/utils"
import type { PopoverContent } from "@radix-ui/react-popover"
import { IconX } from "@tabler/icons-react"
import Sketch from "@uiw/react-color-sketch"
import { cva } from "class-variance-authority"
import type { ComponentPropsWithoutRef, MouseEventHandler } from "react"
import { useFormContext } from "react-hook-form"

import { formInputVariants } from "~/components/form/controls/input"
import { IconCheckerboard } from "~/components/interface/icons/checkerboard"
import { Popover } from "~/components/interface/popover"
import { config } from "~/config"
import { useFormField } from "~/providers/field-provider"

const clearerVariants = cva(
  [
    "absolute left-3 top-1/2 grid -translate-y-1/2 place-items-center opacity-0 transition-opacity",
    "hover:!opacity-100 group-hover/picker:opacity-75",
  ],
  {
    variants: {
      light: {
        true: "text-black",
        false: "text-white",
      },
    },
  },
)

export type FormColorPickerProps = Omit<ComponentPropsWithoutRef<typeof PopoverContent>, "content">

export const FormColorPicker = ({ className, ...props }: FormColorPickerProps) => {
  const { setValue, clearErrors, watch } = useFormContext()
  const { field, fieldState, required } = useFormField()
  const color = watch(field.name)

  const buttonClass = formInputVariants({
    hasError: !!fieldState.error,
    hoverable: true,
    fullWidth: false,
    className,
  })

  const handleColorChange = ({ hex }: { hex: string }) => {
    clearErrors(field.name)
    setValue(field.name, hex.toLocaleUpperCase())
  }

  const handleClear: MouseEventHandler = (e) => {
    e.preventDefault()
    setValue(field.name, "")
  }

  return (
    <div className="group/picker relative">
      <Popover
        content={
          <Sketch
            color={color}
            onChange={handleColorChange}
            presetColors={config.presetColors}
            className="!shadow-none"
            disableAlpha
          />
        }
        className="!p-0"
        {...props}
      >
        <button className={buttonClass}>
          <div className="relative -ml-1 mr-1 h-5 w-5 overflow-hidden rounded border">
            <IconCheckerboard className="h-full w-full opacity-25" />

            {!!color && <div className="absolute inset-0" style={{ backgroundColor: color }} />}
          </div>

          <div className="flex-1 truncate">
            {color ? (
              <span className="font-mono leading-4">{color}</span>
            ) : (
              <span className="opacity-75">Pick color</span>
            )}
          </div>
        </button>
      </Popover>

      {!required && !!color && (
        <button
          type="button"
          className={clearerVariants({ light: !!color && isLightColor(color) })}
          onClick={handleClear}
        >
          <IconX className="pointer-events-none !h-3.5 !w-3.5" />
        </button>
      )}
    </div>
  )
}
