import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: "#77E1FD",
          blue: "#3EA8F9",
          indigo: "#4D6EE3",
          violet: "#B3A7FB",
          bg: "#070B16",
          "bg-alt": "#060814",
          text: "#EAF2FF",
          muted: "#A9B4D0",
        },
      },
      fontFamily: {
        display: ['"Outfit"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(90deg, #77E1FD 0%, #3EA8F9 35%, #4D6EE3 70%, #B3A7FB 100%)",
        "primary-gradient-v":
          "linear-gradient(180deg, #77E1FD 0%, #3EA8F9 35%, #4D6EE3 70%, #B3A7FB 100%)",
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
