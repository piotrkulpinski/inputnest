import {
  Button,
  ButtonGroup,
  TextAreaElement,
  TextAreaProps,
  Tooltip,
  cx,
} from "@curiousleaf/design"
import { ItalicIcon, StrikethroughIcon, CodeIcon, LinkIcon, BoldIcon } from "lucide-react"
import { forwardRef, useRef } from "react"
import type { RefObject } from "react"
import { useFormContext } from "react-hook-form"
import { FormTextArea } from "~/components/form/controls/FormTextArea"

import { useMarkdownTextarea } from "~/hooks/useMarkdownTextarea"
import { useFieldContext } from "~/providers/FieldProvider"

export const FormEditor = forwardRef<TextAreaElement, TextAreaProps>((props, _) => {
  const { className, ...rest } = props
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <div className="relative">
      <FormTextArea className={cx("pb-14", className)} ref={textareaRef} {...rest} />
      <EditorToolbar textareaRef={textareaRef} />
    </div>
  )
})

const EditorToolbar = ({ textareaRef }: { textareaRef: RefObject<HTMLTextAreaElement> }) => {
  const { setValue, getValues } = useFormContext()
  const { field } = useFieldContext()

  const { toggleMarker } = useMarkdownTextarea({
    textareaRef,
    value: getValues(field.name),
    onValueChange: value => setValue(field.name, value),
  })

  return (
    <ButtonGroup className="absolute inset-x-px bottom-px h-12 rounded-b-md border-t bg-white p-2.5 peer-disabled:bg-gray-50">
      <Tooltip tooltip="Bold">
        <Button
          size="sm"
          theme="secondary"
          variant="outline"
          tabIndex={-1}
          prefix={<BoldIcon />}
          onClick={() => toggleMarker?.({ prefix: "**", suffix: "**", defaultText: "bold" })}
        />
      </Tooltip>

      <Tooltip tooltip="Italic">
        <Button
          size="sm"
          theme="secondary"
          variant="outline"
          tabIndex={-1}
          prefix={<ItalicIcon />}
          onClick={() => toggleMarker?.({ prefix: "_", suffix: "_", defaultText: "italic" })}
        />
      </Tooltip>

      <Tooltip tooltip="Strikethrough">
        <Button
          size="sm"
          theme="secondary"
          variant="outline"
          tabIndex={-1}
          prefix={<StrikethroughIcon />}
          onClick={() =>
            toggleMarker?.({ prefix: "~~", suffix: "~~", defaultText: "strikethrough" })
          }
        />
      </Tooltip>

      <Tooltip tooltip="Code">
        <Button
          size="sm"
          theme="secondary"
          variant="outline"
          tabIndex={-1}
          prefix={<CodeIcon />}
          onClick={() => toggleMarker?.({ prefix: "`", suffix: "`", defaultText: "code" })}
        />
      </Tooltip>

      <Tooltip tooltip="Link">
        <Button
          size="sm"
          theme="secondary"
          variant="outline"
          tabIndex={-1}
          prefix={<LinkIcon />}
          onClick={() => toggleMarker?.({ prefix: "[", suffix: "](url)", defaultText: "text" })}
        />
      </Tooltip>
    </ButtonGroup>
  )
}
