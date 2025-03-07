import fs from 'fs'

const fetchPokemons = async () => {
  let allPokemons = []
  for (let i = 1; i <= 200; i++) {
    if (i % 10 == 0) console.log(`Fetched ${i} pokemons`)
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      const data = await response.json()
      allPokemons.push({
        id: data.id,
        name: data.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`,
        types: data.types.map((type) => type.type.name),
      })
    } catch (err) {
      console.log(`Failed to fetch data for Pokémon ID ${i}:`, err)
    }
  }
  fs.writeFileSync(
    '../data/allpokemons.json',
    JSON.stringify(allPokemons, null, 2)
  )
  console.log('Pokémon data has been saved to allpokemons.json')
}

fetchPokemons()
