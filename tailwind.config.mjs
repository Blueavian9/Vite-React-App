/** @type {import('tailwindcss').Config} */
// tailwind.config.mjs
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";autoprefixer

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [tailwindcss(), autoprefixer()],
};


