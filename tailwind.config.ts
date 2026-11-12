import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        fts: {
          // #0EA5E9 is the FTS brand blue; use "sky-strong" where text needs 4.5:1 contrast.
          sky: "#0EA5E9",
          "sky-strong": "#0277B6",
          "sky-soft": "#E0F2FE",
          blue: "#1E40AF",
          navy: "#102342",
          mist: "#F1F7FC",
          paper: "#FFF8EE",
          red: "#E5243B",
          ink: "#475569",
          line: "#DCE6F0",
        },
        // Cafe AI colors are only used inside the Cafe AI feature inset.
        cafe: {
          cream: "#FFF5E8",
          terracotta: "#C8643C",
          "terracotta-strong": "#A84E2A",
          "terracotta-hover": "#8F4223",
        },
      },
      maxWidth: {
        page: "1292px",
      },
    },
  },
  plugins: [],
} satisfies Config;
