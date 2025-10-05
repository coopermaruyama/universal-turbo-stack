import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        "6": "1.5rem", // Ensure spacing-6 is available
      },
    },
  },
  plugins: [],
} satisfies Config;
