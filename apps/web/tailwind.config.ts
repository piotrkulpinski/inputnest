import type { Config } from "tailwindcss"
import colors from "tailwindcss/colors"
import plugin from "tailwindcss/plugin"

export default {
  content: [
    "./pages/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./app/**/*.{ts,tsx,mdx}",
  ],

  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        black: colors.zinc["900"],
        outline: colors.zinc["200"],
      },
      fontFamily: {
        // mono: ["var(--font-geist-mono)", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        xxxs: ["0.625rem", { lineHeight: "0.875rem" }],
        xxs: ["0.75rem", { lineHeight: "1rem" }],
        xs: ["0.8125rem", { lineHeight: "1.125rem" }],
        "5xl": ["2.8rem", { lineHeight: "1.2" }],
        "6xl": ["3.2rem", { lineHeight: "1.15" }],
        "7xl": ["3.6rem", { lineHeight: "1.1" }],
      },
      width: {
        "1em": "1em",
        icon: "1.4285em",
      },
      height: {
        "1em": "1em",
        icon: "1.4285em",
      },
      gridColumns: {
        DEFAULT: "16rem",
        xxs: "10rem",
        xs: "12rem",
        sm: "14rem",
        md: "16rem",
        lg: "18rem",
        xl: "20rem",
      },
      keyframes: {
        pulsate: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { left: "-90%" },
          "100%": { left: "90%" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        pulsate: "pulsate 1s cubic-bezier(0.25, 1, 0.5, 1) alternate infinite",
        shimmer: "shimmer 1.25s cubic-bezier(0.5, 0.25, 0.25, 0.5) infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    require("tailwindcss-animate"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "grid-auto-fill": (value) => ({
            gridTemplateColumns: `repeat(auto-fill, minmax(${value}, 1fr))`,
          }),
          "grid-auto-fit": (value) => ({
            gridTemplateColumns: `repeat(auto-fit, minmax(${value}, 1fr))`,
          }),
        },
        { values: theme("gridColumns") },
      )
    }),
  ],
} satisfies Config
