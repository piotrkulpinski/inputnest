import { PopoverClose } from "@radix-ui/react-popover"
import { AsteriskIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"

import { Button } from "~/components/interface/button"
import { Popover } from "~/components/interface/popover"
import { useFormField } from "~/providers/field-provider"

export type FormVariablesProps = {
  variables: string[]
}

const FormVariablesList = ({ variables }: FormVariablesProps) => {
  const { setValue } = useFormContext()
  const { field } = useFormField()

  const onVariableClick = (variable: string) => {
    setValue(field.name, `${field.value}{{${variable}}}`)
  }

  return (
    <div className="flex flex-col items-end gap-1 text-xs">
      <strong className="mb-1 font-medium">Dynamic variables:</strong>

      {variables.map((variable, index) => (
        <PopoverClose
          key={index}
          onClick={() => onVariableClick(variable)}
          className="text-2xs text-blue-700/75 hover:enabled:text-black whitespace-nowrap font-mono"
        >
          {`{{${variable}}}`}
        </PopoverClose>
      ))}
    </div>
  )
}

export const FormVariables = ({ variables }: FormVariablesProps) => {
  if (!variables.length) {
    return null
  }

  return (
    <Popover
      content={<FormVariablesList variables={variables} />}
      sideOffset={-2}
      side="bottom"
      align="end"
    >
      <Button size="xs" theme="secondary" suffix={<AsteriskIcon />} />
    </Popover>
  )
}
