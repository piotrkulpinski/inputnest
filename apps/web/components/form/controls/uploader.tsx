import { getErrorMessage } from "@curiousleaf/utils"
import { TrashIcon } from "lucide-react"
import type { ChangeEvent, HTMLAttributes, MouseEventHandler } from "react"
import { useRef, useState } from "react"
import { useFormContext } from "react-hook-form"

import { FormControl } from "~/components/form/control"
import { Button } from "~/components/interface/button"
import { ButtonGroup } from "~/components/interface/button-group"
import { useFormField } from "~/providers/field-provider"
import { cn } from "~/utils/helpers"
import { uploadImage } from "~/utils/images"

export type FormUploaderProps = HTMLAttributes<HTMLDivElement> & {
  folder: string
  accept?: string[]
  fileSizeLimit: number
}

export const FormUploader = ({
  children,
  className,
  folder,
  accept = ["image/*"],
  fileSizeLimit,
  ...props
}: FormUploaderProps) => {
  const uploadRef = useRef<HTMLInputElement | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const { setValue, setError, clearErrors, watch } = useFormContext()
  const { field } = useFormField()
  const value = watch(field.name)

  const onUpload = async (file: File) => {
    clearErrors(field.name)
    setLoading(true)

    await uploadImage({ file, folder, fileSizeLimit })
      // Set the image
      .then((image) => setValue(field.name, image.public_id))
      // Set the error
      .catch((error) => setError(field.name, { type: "custom", message: getErrorMessage(error) }))
      // Set loading to false
      .finally(() => setLoading(false))
  }

  const onDelete = () => {
    setValue(field.name, "")
  }

  const onClick: MouseEventHandler<HTMLButtonElement> = () => {
    uploadRef.current?.click()
  }

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files?.length && (await onUpload(e.target.files[0]!))

    // Reset input value
    e.target.value = ""
  }

  return (
    <div className={cn("flex w-full items-center gap-x-4 gap-y-3", className)} {...props}>
      <FormControl>
        <input type="hidden" {...field} />
      </FormControl>

      <input
        type="file"
        ref={uploadRef}
        onChange={onInputChange}
        accept={accept.join(",")}
        className="hidden"
      />

      {children}

      <ButtonGroup className="shrink-0">
        <Button type="button" theme="secondary" onClick={onClick} isLoading={isLoading}>
          {value ? "Change" : "Upload"}
        </Button>

        {!!value && (
          <Button type="button" theme="secondary" prefix={<TrashIcon />} onClick={onDelete} />
        )}
      </ButtonGroup>
    </div>
  )
}
