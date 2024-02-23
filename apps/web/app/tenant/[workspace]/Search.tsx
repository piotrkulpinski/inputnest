import { Action, Affix, Input, cx } from "@curiousleaf/design"
import { SearchIcon, XIcon } from "lucide-react"
import { useQueryState } from "nuqs"
import { HTMLAttributes, useState } from "react"

export const Search = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const [query, setQuery] = useQueryState("query", { throttleMs: 350 })
  const [isActive, setIsActive] = useState(false)

  const onClear = () => {
    setIsActive(false)
    setQuery(null)
  }

  return (
    <div className={cx("relative", className)} {...props}>
      <Affix prefix={<SearchIcon className="ml-0" />}>
        <Input
          type="text"
          name="query"
          placeholder="Search"
          value={query || ""}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setIsActive(true)}
          onBlur={() => !query && setIsActive(false)}
          className={cx("py-2.5 border-b w-20 -mb-px transition-[width]", isActive && "w-64 pr-6")}
          plain
        />
      </Affix>

      <Action
        onClick={onClear}
        className={cx("absolute top-1/2 right-0 -translate-y-1/2 hidden", isActive && "block")}
      >
        <XIcon />
      </Action>
    </div>
  )
}
