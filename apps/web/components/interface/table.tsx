import type { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react"

import { baseCellClasses } from "~/utils/classes"

export const Root = ({ className = "", ...rest }: TableHTMLAttributes<HTMLTableElement>) => {
  return <table className={`w-full divide-y ${className}`} {...rest} />
}

export const Head = ({ className = "", ...rest }: HTMLAttributes<HTMLTableSectionElement>) => {
  return <thead className={`${className}`} {...rest} />
}

export const Foot = ({ className = "", ...rest }: HTMLAttributes<HTMLTableSectionElement>) => {
  return <thead className={`${className}`} {...rest} />
}

export const Body = ({ className = "", ...rest }: HTMLAttributes<HTMLTableSectionElement>) => {
  return <tbody className={`divide-y ${className}`} {...rest} />
}

export const Row = ({ className = "", ...rest }: HTMLAttributes<HTMLTableRowElement>) => {
  return <tr className={`${className}`} {...rest} />
}

export const HeadCell = ({ className = "", ...rest }: ThHTMLAttributes<HTMLTableCellElement>) => {
  return <th className={`py-3 text-gray-400 ${baseCellClasses} ${className}`} {...rest} />
}

export const Cell = ({ className = "", ...rest }: TdHTMLAttributes<HTMLTableCellElement>) => {
  return <td className={`py-3 ${baseCellClasses} ${className}`} {...rest} />
}
