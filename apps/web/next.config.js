const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  transpilePackages: ["@repo/database"],
  experimental: {
    optimizePackageImports: ["@curiousleaf/design"],
  },

  /** Custom redirects */
  redirects: async () => [
    {
      source: "/:path*/settings",
      destination: "/:path*/settings/general",
      permanent: true,
    },
  ],
})
