/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14a0d1",
        hover: "#00a82d",
      },
      fontFamily: {
        lora: ["Lora", "serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
