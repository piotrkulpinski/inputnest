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
        primary: {
          lighter: `var(--color-primary-lighter, ${designConfig.theme.colors.blue.lighter})`,
          light: `var(--color-primary-light, ${designConfig.theme.colors.blue.light})`,
          DEFAULT: `var(--color-primary, ${designConfig.theme.colors.blue.DEFAULT})`,
          dark: `var(--color-primary-dark, ${designConfig.theme.colors.blue.dark})`,
          darker: `var(--color-primary-darker, ${designConfig.theme.colors.blue.darker})`,
        },
      },

      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
      },

      backgroundImage: {
        pattern: "url('/images/pattern.svg')",
      },
    },
  },
} satisfies Config
