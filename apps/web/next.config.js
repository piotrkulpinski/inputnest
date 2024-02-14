/** @type {import('next').NextConfig} */
export default {
  transpilePackages: ["@repo/database", "@curiousleaf/design", "@curiousleaf/utils"],

  // experimental: {
  //   optimizePackageImports: ["@curiousleaf/design"],
  // },

  /** Custom redirects */
  redirects: async () => [
    {
      source: "/:path*/settings",
      destination: "/:path*/settings/general",
      permanent: true,
    },
  ],
}
