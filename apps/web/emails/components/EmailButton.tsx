import { cx } from "@curiousleaf/design"
import { Button, ButtonProps } from "@react-email/components"

export const EmailButton = ({ className, ...props }: ButtonProps) => {
  return <Button className={cx("bg-primary text-white", className)} {...props} />
}
