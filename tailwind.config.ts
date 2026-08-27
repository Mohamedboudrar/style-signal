import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Editorial palette — neutral ink + warm accent.
        ink: {
          50: "#faf8f4",
          100: "#f0ece4",
          200: "#e1d9cb",
          300: "#c5baa8",
          400: "#8a8175",
          500: "#5a5247",
          600: "#3a352e",
          700: "#2a2620",
          800: "#1f1c18",
          900: "#13110e",
        },
        signal: {
          // Saturated "trend" accent — oxblood, named for the publication.
          50: "#fbf2f1",
          100: "#f3d9d5",
          500: "#8a2a25",
          600: "#6e201c",
          700: "#561815",
        },
      },
      fontFamily: {
        // Loaded via next/font in app/layout.tsx; CSS variables referenced here.
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      letterSpacing: {
        editorial: "-0.02em",
      },
      maxWidth: {
        prose: "44rem", // 704px
        editorial: "40rem", // 640px
        wide: "64rem", // 1024px
      },
      typography: () => ({
        // Editorial base — sans-serif body, comfortable line-height.
        // Component overrides live in Prose.tsx for tighter control.
        DEFAULT: {
          css: {
            maxWidth: "44rem",
            color: "var(--tw-prose-body)",
            lineHeight: "1.75",
            p: { marginTop: "1.25em", marginBottom: "1.25em" },
            h2: { marginTop: "2.5em", marginBottom: "0.75em" },
            h3: { marginTop: "2em", marginBottom: "0.5em" },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
