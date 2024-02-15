// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
export default {
  root: true,
  ignorePatterns: ["apps/**", "packages/**", "shared/**"],
  extends: ["@repo/eslint-config/base.js"],
  parser: "@typescript-eslint/parser",
}
