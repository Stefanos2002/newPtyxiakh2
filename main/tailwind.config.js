/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'open-sans': ['Open Sans','sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'custom': '1px 3px 2px rgba(0, 0, 0, 0.25)',
        'changeTheme': '0 8px 40px rgba(0, 0, 0, 0.2)'
      },
      scale: {
        '110': '1.1'
      }
    },
  },
  plugins: [],
}