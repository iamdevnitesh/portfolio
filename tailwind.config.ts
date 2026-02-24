import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#070b16",
        panel: "#0e1427",
        accent: "#6ea8ff"
      },
      fontSize: {
        fluidH1: "clamp(2.1rem, 5vw, 4.8rem)",
        fluidH2: "clamp(1.5rem, 3vw, 2.8rem)"
      }
    }
  },
  plugins: []
};

export default config;
