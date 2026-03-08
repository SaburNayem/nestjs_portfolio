/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#04131D',
        cyan: '#21D4FD',
        mint: '#B7F8DB',
        ember: '#FF8A65',
      },
      boxShadow: {
        neon: '0 0 30px rgba(33, 212, 253, 0.25)',
      },
      animation: {
        drift: 'drift 9s ease-in-out infinite',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
