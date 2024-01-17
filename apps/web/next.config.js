/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/database"],
  experimental: {
    optimizePackageImports: ["@tabler/icons-react", "@curiousleaf/design"],
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
