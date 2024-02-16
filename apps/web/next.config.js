/** @type {import('next').NextConfig} */
export default {
  transpilePackages: ["@repo/database", "@curiousleaf/design", "@curiousleaf/utils"],

  /** Custom redirects */
  redirects: async () => [
    {
      source: "/:path*/settings",
      destination: "/:path*/settings/general",
      permanent: true,
    },
  ],
}
