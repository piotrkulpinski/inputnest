import { Cloudinary } from "@cloudinary/url-gen"
import * as Resize from "@cloudinary/url-gen/actions/resize"
import { formatBytes } from "@curiousleaf/utils"
import type { UploadApiResponse } from "cloudinary"
import wretch from "wretch"

import { env } from "~/env"

export const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })
}

type UploadImage = {
  file: File
  folder: string
  fileSizeLimit: number
}

export const uploadImage = async ({ file, folder, fileSizeLimit }: UploadImage) => {
  if (file.size > fileSizeLimit) {
    throw new Error(`Maximum file size is ${formatBytes(fileSizeLimit)}`)
  }

  const image = await wretch("/api/images/upload")
    .post({ file: await toBase64(file), folder })
    .json<UploadApiResponse>()

  return image
}

type CloudinaryImage = {
  image?: string | null
  width?: string | number
  height?: string | number
  resize?:
    | "imaggaScale"
    | "imaggaCrop"
    | "crop"
    | "fill"
    | "scale"
    | "minimumPad"
    | "fit"
    | "pad"
    | "limitFit"
    | "thumbnail"
    | "limitFill"
    | "minimumFit"
    | "limitPad"
    | "fillPad"
}

export const getImage = ({ image, width, height, resize = "limitFit" }: CloudinaryImage) => {
  if (!image) {
    return ""
  }

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
    url: {
      secure: true,
      analytics: false,
    },
  })

  const cloudImage = cloudinary
    .image(image)
    .setDeliveryType(image.startsWith("http") ? "fetch" : "upload")

  if (width ?? height) {
    cloudImage.resize(Resize[resize](width, height))
  }

  return cloudImage.format("auto").quality("auto").toURL()
}

export const getOGImage = (image: CloudinaryImage["image"]) => {
  return getImage({
    image,
    width: 1200,
    height: 630,
    resize: "fill",
  })
}
