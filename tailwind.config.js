/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: "#00f3ff",
          purple: "#b026ff",
          green: "#39ff14",
          pink: "#ff00ff",
        },
        dark: {
          bg: "#050508",
          card: "#0a0a12",
          border: "#1a1a2e",
          surface: "#12121c",
        },
      },
      boxShadow: {
        "neon-cyan": "0 0 10px #00f3ff, 0 0 30px #00f3ff40",
        "neon-purple": "0 0 10px #b026ff, 0 0 30px #b026ff40",
        "neon-green": "0 0 10px #39ff14, 0 0 30px #39ff1440",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: { float: "float 4s ease-in-out infinite" },
    },
  },
};
