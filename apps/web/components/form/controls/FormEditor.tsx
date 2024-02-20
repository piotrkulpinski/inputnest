import {
  Button,
  ButtonGroup,
  TextArea,
  TextAreaElement,
  TextAreaProps,
  Tooltip,
  cx,
} from "@curiousleaf/design"
import { BoldIcon, CodeIcon, ItalicIcon, LinkIcon, StrikethroughIcon } from "lucide-react"
import { forwardRef, useRef } from "react"
import type { RefObject } from "react"
import { FormControl } from "~/components/form/FormControl"

import { useMarkdownTextarea } from "~/hooks/useMarkdownTextarea"
import { useFieldContext } from "~/providers/FieldProvider"

export const FormEditor = forwardRef<TextAreaElement, TextAreaProps>((props, _) => {
  const { className, ...rest } = props
  const { field, fieldState } = useFieldContext()
  const { ref, ...fieldProps } = field
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const assignRef = (e: HTMLTextAreaElement | null) => {
    ref(e)
    textareaRef.current = e
  }

  return (
    <div className="relative">
      <FormControl>
        <TextArea
          ref={assignRef}
          error={!!fieldState.error}
          className={cx("pb-14", className)}
          {...fieldProps}
          {...rest}
        />
      </FormControl>

      <EditorToolbar textareaRef={textareaRef} />
    </div>
  )
})

const EditorToolbar = ({ textareaRef }: { textareaRef: RefObject<HTMLTextAreaElement> }) => {
  const { field } = useFieldContext()

  const { toggleMarker } = useMarkdownTextarea({
    textareaRef,
    value: field.value,
    onValueChange: value => field.onChange(value),
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
