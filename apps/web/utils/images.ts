import { getS3SignedUrl } from "~/actions/s3"

export const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("")

  return hashHex
}

export type UploadImageProps = {
  file: File
  folder: string
}

export const uploadImage = async ({ file, folder }: UploadImageProps) => {
  const checksum = await computeSHA256(file)

  const url = await getS3SignedUrl({
    folder,
    checksum,
    name: file.name.replace(/\.[^/.]+$/, ""),
    type: file.type,
    size: file.size,
  })

  return fetch(url, { method: "PUT", body: file })
}
