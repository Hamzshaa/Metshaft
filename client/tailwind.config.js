/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "logo-bg": "url('./src/assets/logo_bg.jpg')",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
