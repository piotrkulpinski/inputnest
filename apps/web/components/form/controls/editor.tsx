import { IconBold, IconCode, IconItalic, IconLink, IconStrikethrough } from "@tabler/icons-react"
import { useRef } from "react"
import type { RefObject, ComponentPropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"

import { FormTextarea } from "~/components/form/controls/textarea"
import { ButtonGroup } from "~/components/interface/button-group"
import { TooltipButton } from "~/components/interface/tooltip"
import { useMarkdownTextarea } from "~/hooks/use-markdown-textarea"
import { useFormField } from "~/providers/field-provider"
import { cn } from "~/utils/helpers"

export const FormEditor = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof FormTextarea>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <div className="relative">
      <FormTextarea className={cn("pb-14", className)} ref={textareaRef} {...props} />
      <EditorToolbar textareaRef={textareaRef} />
    </div>
  )
}

const EditorToolbar = ({ textareaRef }: { textareaRef: RefObject<HTMLTextAreaElement> }) => {
  const { setValue, getValues } = useFormContext()
  const { field } = useFormField()

  const { toggleMarker } = useMarkdownTextarea({
    textareaRef,
    value: getValues(field.name),
    onValueChange: (value) => setValue(field.name, value),
  })

  return (
    <ButtonGroup className="absolute inset-x-px bottom-px h-12 rounded-b-md border-t border-outline bg-white p-2.5">
      <TooltipButton
        tooltip="Bold"
        type="button"
        theme="secondary"
        size="xs"
        tabIndex={-1}
        prefix={<IconBold />}
        onClick={() => toggleMarker?.({ prefix: "**", suffix: "**", defaultText: "bold" })}
      />

      <TooltipButton
        tooltip="Italic"
        type="button"
        theme="secondary"
        size="xs"
        tabIndex={-1}
        prefix={<IconItalic />}
        onClick={() => toggleMarker?.({ prefix: "_", suffix: "_", defaultText: "italic" })}
      />

      <TooltipButton
        tooltip="Strikethrough"
        type="button"
        theme="secondary"
        size="xs"
        tabIndex={-1}
        prefix={<IconStrikethrough />}
        onClick={() => toggleMarker?.({ prefix: "~~", suffix: "~~", defaultText: "strikethrough" })}
      />

      <TooltipButton
        tooltip="Code"
        type="button"
        theme="secondary"
        size="xs"
        tabIndex={-1}
        prefix={<IconCode />}
        onClick={() => toggleMarker?.({ prefix: "`", suffix: "`", defaultText: "code" })}
      />

      <TooltipButton
        tooltip="Link"
        type="button"
        theme="secondary"
        size="xs"
        tabIndex={-1}
        prefix={<IconLink />}
        onClick={() => toggleMarker?.({ prefix: "[", suffix: "](url)", defaultText: "text" })}
      />
    </ButtonGroup>
  )
}
