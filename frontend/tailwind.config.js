/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ember: "#ff6b35",
        nexus: "#7c5cff",
      },
    },
  },
  plugins: [],
};
