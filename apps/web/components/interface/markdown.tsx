import type { MarkdownToJSX } from "markdown-to-jsx"
import MarkdownParser from "markdown-to-jsx"
import type { ComponentPropsWithoutRef } from "react"
import { forwardRef } from "react"

import { Copy } from "~/components/interface/copy"

type MarkdownProps = Omit<ComponentPropsWithoutRef<typeof Copy>, "children"> & {
  content: string
  parseOptions?: MarkdownToJSX.Options
}

export const Markdown = forwardRef<HTMLElement, MarkdownProps>((props, ref) => {
  const { content, parseOptions = { wrapper: Copy, forceWrapper: true }, ...rest } = props

  return (
    <MarkdownParser ref={ref} options={parseOptions} {...rest}>
      {content}
    </MarkdownParser>
  )
})
