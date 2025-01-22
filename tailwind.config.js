/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pokemonSolid: ['PokemonSolid', 'sans-serif'],
        pokemonHollow: ['PokemonHollow', 'sans-serif'],
      }
    },
  },
  plugins: [],
}