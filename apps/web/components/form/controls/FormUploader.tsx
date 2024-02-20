import { Uploader, UploaderElement, UploaderProps } from "@curiousleaf/design"
import { getErrorMessage } from "@curiousleaf/utils"
import { forwardRef, useState } from "react"
import { useFormContext } from "react-hook-form"

import { useFieldContext } from "~/providers/FieldProvider"
import { UploadImageProps, uploadImage } from "~/utils/images"

export type FormUploaderProps = Omit<UploaderProps, "label" | "onChange" | "onClear"> &
  Omit<UploadImageProps, "file">

export const FormUploader = forwardRef<UploaderElement, FormUploaderProps>((props, ref) => {
  const { folder, ...rest } = props

  const [loading, setLoading] = useState<boolean>(false)
  const { setError, clearErrors, watch } = useFormContext()
  const { field } = useFieldContext()
  const value = watch(field.name)

  const onChange = async (file: File) => {
    clearErrors(field.name)
    setLoading(true)

    try {
      await uploadImage({ file, folder }).then(({ url }) => {
        field.onChange(url.split("?")[0])
      })
    } catch (e) {
      console.error(e)

      // Set the error
      setError(field.name, { type: "custom", message: getErrorMessage(e) })
    } finally {
      // Set loading to false
      setLoading(false)
    }
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
