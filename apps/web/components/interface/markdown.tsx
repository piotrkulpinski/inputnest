import { Prose } from "@curiousleaf/design"
import type { MarkdownToJSX } from "markdown-to-jsx"
import MarkdownParser from "markdown-to-jsx"
import type { ComponentPropsWithoutRef } from "react"
import { forwardRef } from "react"

type MarkdownProps = Omit<ComponentPropsWithoutRef<typeof Prose>, "children"> & {
  content: string
  parseOptions?: MarkdownToJSX.Options
}

export const Markdown = forwardRef<HTMLElement, MarkdownProps>((props, ref) => {
  const { content, parseOptions = { wrapper: Prose, forceWrapper: true }, ...rest } = props

  return (
    <MarkdownParser ref={ref} options={parseOptions} {...rest}>
      {content}
    </MarkdownParser>
  )
})
