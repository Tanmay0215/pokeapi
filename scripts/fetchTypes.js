import fs from 'fs'

const fetchTypes = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/type/')
    const data = await response.json()
    const types = data.results.map((type) => type.name)
    types.pop() // Remove 'unknown'
    types.pop() // Remove 'shadow'
    fs.writeFileSync('../data/types.json', JSON.stringify(types, null, 2))
    console.log('Types data has been saved to types.json')
  } catch (err) {
    console.log('Failed to fetch types:', err)
  }
}

fetchTypes()
