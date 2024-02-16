import { Uploader, UploaderElement, UploaderProps } from "@curiousleaf/design"
import { getErrorMessage } from "@curiousleaf/utils"
import { forwardRef, useState } from "react"
import { useFormContext } from "react-hook-form"

import { useFieldContext } from "~/providers/FieldProvider"
import { uploadImage } from "~/utils/images"

export type FormUploaderProps = Omit<UploaderProps, "label" | "onChange" | "onClear"> & {
  folder: string
  accept?: string[]
  fileSizeLimit: number
}

export const FormUploader = forwardRef<UploaderElement, FormUploaderProps>((props, ref) => {
  const { folder, fileSizeLimit, ...rest } = props

  const [loading, setLoading] = useState<boolean>(false)
  const { setError, clearErrors, watch } = useFormContext()
  const { field } = useFieldContext()
  const value = watch(field.name)

  const onChange = async (file: File) => {
    clearErrors(field.name)
    setLoading(true)

    await uploadImage({ file, folder, fileSizeLimit })
      // Set the image
      .then(image => field.onChange(image.public_id))
      // Set the error
      .catch(error => setError(field.name, { type: "custom", message: getErrorMessage(error) }))
      // Set loading to false
      .finally(() => setLoading(false))
  }

  const onClear = () => {
    field.onChange("")
  }

  return (
    <Uploader
      ref={ref}
      loading={loading}
      onChange={onChange}
      onClear={value && onClear}
      {...rest}
    />
  )
})
