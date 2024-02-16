import { Button, Popover } from "@curiousleaf/design"
import { AsteriskIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"

import { useFieldContext } from "~/providers/FieldProvider"

export type FormVariablesProps = {
  variables: string[]
}

const FormVariablesList = ({ variables }: FormVariablesProps) => {
  const { setValue } = useFormContext()
  const { field } = useFieldContext()

  const onVariableClick = (variable: string) => {
    setValue(field.name, `${field.value}{{${variable}}}`)
  }

  return (
    <div className="flex flex-col items-end gap-1 text-xs">
      <strong className="mb-1 font-medium">Dynamic variables:</strong>

      {variables.map((variable, index) => (
        <Popover.Close
          key={index}
          onClick={() => onVariableClick(variable)}
          className="whitespace-nowrap font-mono text-2xs text-blue-dark/75 hover:enabled:text-black"
        >
          {`{{${variable}}}`}
        </Popover.Close>
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
      popover={<FormVariablesList variables={variables} />}
      sideOffset={-2}
      side="bottom"
      align="end"
    >
      <Button size="sm" theme="secondary" variant="outline" suffix={<AsteriskIcon />} />
    </Popover>
  )
}
