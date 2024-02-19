import { v2 as cloudinary } from "cloudinary"

import { env } from "~/env"

cloudinary.config({
  cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
})

export { cloudinary }
