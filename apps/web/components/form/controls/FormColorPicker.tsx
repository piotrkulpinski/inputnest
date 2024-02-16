import { Popover } from "@curiousleaf/design"
import { isLightColor } from "@curiousleaf/utils"
import type { PopoverContent } from "@radix-ui/react-popover"
import Sketch from "@uiw/react-color-sketch"
import { cva } from "class-variance-authority"
import { XIcon } from "lucide-react"
import type { ComponentPropsWithoutRef, MouseEventHandler } from "react"
import { useFormContext } from "react-hook-form"

import { IconCheckerboard } from "~/components/interface/icons/checkerboard"
import { config } from "~/config"
import { useFieldContext } from "~/providers/FieldProvider"

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
  const { watch } = useFormContext()
  const { field } = useFieldContext()
  const color = watch(field.name)

  // const buttonClass = formInputVariants({
  //   hasError: !!fieldState.error,
  //   hoverable: true,
  //   fullWidth: false,
  //   className,
  // })

  const handleColorChange = ({ hex }: { hex: string }) => {
    field.onChange(hex.toLocaleUpperCase())
  }

  const handleClear: MouseEventHandler = e => {
    e.preventDefault()
    field.onChange("")
  }

  return (
    <div className="group/picker relative">
      <Popover
        popover={
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
        <button className={""}>
          <div className="relative -ml-1 mr-1 size-5 overflow-hidden rounded border">
            <IconCheckerboard className="size-full opacity-25" />

            {!!color && <div className="absolute inset-0" style={{ backgroundColor: color }} />}
          </div>

          <div className="grow truncate">
            {color ? (
              <span className="font-mono leading-4">{color}</span>
            ) : (
              <span className="opacity-75">Pick color</span>
            )}
          </div>
        </button>
      </Popover>

      {!!color && (
        <button
          type="button"
          className={clearerVariants({ light: !!color && isLightColor(color) })}
          onClick={handleClear}
        >
          <XIcon className="pointer-events-none size-3.5" />
        </button>
      )}
    </div>
  )
}
