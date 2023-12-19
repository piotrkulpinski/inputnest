/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/database", "@repo/ui"],

  /** Custom redirects */
  redirects: async () => [
    {
      source: "/:path*/settings",
      destination: "/:path*/settings/general",
      permanent: true,
    },
  ],
}
