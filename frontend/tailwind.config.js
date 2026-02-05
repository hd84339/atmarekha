export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#0a0a0a',
          900: '#111111',
          800: '#1a1a1a'
        }
      },
      boxShadow: {
        deep: '0 16px 40px rgba(0,0,0,0.5)'
      }
    }
  },
  plugins: []
};
