import fs from 'fs'
import { argv } from 'process'

const fetchPokemons = async () => {
  const pokemonId = argv[2]
  let pokemon
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    )
    const data = await response.json()
    pokemon = { ...data }
  } catch (err) {
    console.log(`Failed to fetch data for Pokémon ID ${pokemonId}:`, err)
  }
  fs.writeFileSync(
    `../data/pokemon/${pokemon.name}.json`,
    JSON.stringify(pokemon, null, 2)
  )
  console.log(`Pokémon data has been saved to ${pokemon.name}.json`)
}

fetchPokemons()
