import type { RefObject } from "react"

type UseMarkdownTextareaProps = {
  textareaRef: RefObject<HTMLTextAreaElement>
  value: string
  onValueChange: (value: string) => void
}

export const useMarkdownTextarea = ({
  textareaRef,
  value,
  onValueChange,
}: UseMarkdownTextareaProps) => {
  const textarea = textareaRef.current

  if (!textarea) {
    return {}
  }

  const getSelectedText = () => {
    const { selectionStart, selectionEnd } = textarea
    return value.substring(selectionStart, selectionEnd)
  }

  const replaceSelectedText = (text: string) => {
    const { selectionStart, selectionEnd } = textarea

    replaceText({
      text,
      from: selectionStart,
      to: selectionEnd,
    })
  }

  const select = ({ from, to, length }: { from: number; to?: number; length?: number }) => {
    // Timeout is needed to make sure the selection is applied after the text is inserted
    setTimeout(() => textarea.setSelectionRange(from, to ?? from + (length ?? 0)), 0)
  }

  const putCursorTo = (location: number) => {
    textarea.selectionEnd = location || 0
  }

  const replaceText = ({ text, from, to }: { text: string; from: number; to: number }) => {
    const textPrefix = value.substring(0, from)
    const textSuffix = value.substring(to)

    onValueChange(`${textPrefix}${text}${textSuffix}`)
    putCursorTo(from + text.length)
  }

  const toggleMarker = ({
    prefix,
    suffix,
    defaultText,
  }: {
    prefix: string
    suffix: string
    defaultText: string
  }) => {
    textarea.focus()

    const text = getSelectedText() || defaultText
    const { selectionStart, selectionEnd } = textarea
    const startIdx = selectionStart - prefix.length
    const endIdx = selectionEnd + suffix.length
    const isActive =
      value.slice(startIdx, startIdx + prefix.length) === prefix &&
      value.slice(selectionEnd, selectionEnd + suffix.length) === suffix

    if (isActive) {
      replaceText({
        from: startIdx,
        text: text === defaultText ? "" : text,
        to: endIdx,
      })

      if (text !== defaultText) {
        select({
          from: startIdx,
          length: text.length,
        })
      }
    } else {
      replaceSelectedText(`${prefix}${text}${suffix}`)
      select({
        from: selectionStart + prefix.length,
        length: text.length,
      })
    }
  }

  return { toggleMarker }
}
