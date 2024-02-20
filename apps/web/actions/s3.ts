"use server"

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { formatBytes, getRandomString } from "@curiousleaf/utils"
import { config } from "~/config"
import { env } from "~/env"

import { auth } from "~/services/auth"

const s3 = new S3Client({
  region: env.S3_REGION,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
})

type GetS3SignedUrlProps = {
  folder: string
  checksum: string
  name: string
  type: string
  size: number
}

export const getS3SignedUrl = async (props: GetS3SignedUrlProps) => {
  const { folder, checksum, name, type, size } = props
  const session = await auth()

  // Ensure the user is authenticated
  if (!session?.user) {
    throw new Error("Unauthorized user.")
  }

  // Ensure the file type is allowed
  if (!config.imageAllowedTypes.includes(type)) {
    throw new Error("File type is not allowed.")
  }

  // Ensure the file size is within the limit
  if (config.imageFileLimit < size) {
    throw new Error(`Maximum file size is ${formatBytes(config.imageFileLimit)}.`)
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: `${folder}/${name}-${getRandomString()}`,
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: { userId: session.user.id ?? "" },
  })

  return await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  })
}
