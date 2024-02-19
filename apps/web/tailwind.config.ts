import designConfig from "@curiousleaf/design/tailwind.config"
import type { Config } from "tailwindcss"

export default {
  presets: [designConfig],

  content: [
    "./utils/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",

    // Design components inside @curiousleaf scope
    "../../node_modules/@curiousleaf/design/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: designConfig.theme.colors.blue,
      },

      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
} satisfies Config
