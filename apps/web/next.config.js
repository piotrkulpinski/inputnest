/** @type {import('next').NextConfig} */
export default {
  transpilePackages: ["@repo/database", "@curiousleaf/design", "@curiousleaf/utils"],

  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com`,
        port: "",
      },
    ],
  },

  /** Custom redirects */
  redirects: async () => [
    {
      source: "/:path*/settings",
      destination: "/:path*/settings/general",
      permanent: true,
    },
  ],
}
