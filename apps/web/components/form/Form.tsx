import { Affix, Box, Error, Fieldset, Hint, Label } from "@curiousleaf/design"

import { FormCheckbox } from "./controls/FormCheckbox"
import { FormCheckboxGroup } from "~/components/form/controls/FormCheckboxGroup"
import { FormColorPicker } from "~/components/form/controls/FormColorPicker"
import { FormButton } from "~/components/form/FormButton"
import { FormInput } from "~/components/form/controls/FormInput"
import { FormField } from "~/components/form/FormField"
import { FormVariables } from "~/components/form/FormVariables"
import { FormEditor } from "~/components/form/controls/FormEditor"
import { FormRadioGroup } from "~/components/form/controls/FormRadioGroup"
import { FormSelect } from "~/components/form/controls/FormSelect"
import { FormSwitch } from "~/components/form/controls/FormSwitch"
import { FormTextArea } from "~/components/form/controls/FormTextArea"
import { FormUploader } from "~/components/form/controls/FormUploader"
import { forwardRef, HTMLAttributes } from "react"

const FormBase = forwardRef<HTMLFormElement, HTMLAttributes<HTMLFormElement>>((props, ref) => {
  return <form ref={ref} {...props} />
})

export const Form = Object.assign(FormBase, {
  Field: FormField,
  Button: FormButton,
  Input: FormInput,
  TextArea: FormTextArea,
  Editor: FormEditor,
  Checkbox: FormCheckbox,
  CheckboxGroup: FormCheckboxGroup,
  RadioGroup: FormRadioGroup,
  Switch: FormSwitch,
  Select: FormSelect,
  ColorPicker: FormColorPicker,
  Uploader: FormUploader,
  Variables: FormVariables,
  Affix,
  Box,
  Error,
  Fieldset,
  Hint,
  Label,
})
