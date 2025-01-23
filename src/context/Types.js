export const types = []

fetch('https://pokeapi.co/api/v2/type/')
  .then((response) => response.json())
  .then((data) => {
    data.results.map((type) => types.push(type.name))
    types.pop(); // Remove 'unknown'
    types.pop(); // Remove 'stellar'
  })
  .catch((err) => {
    console.log(err)
    return
  })

export const TypeColor = {
  normal: 'bg-gray-500',
  fighting: 'bg-red-500',
  flying: 'bg-blue-300',
  poison: 'bg-violet-300',
  ground: 'bg-yellow-400',
  rock: 'bg-yellow-800',
  bug: 'bg-emerald-400',
  ghost: 'bg-indigo-300',
  fire: 'bg-red-500',
  water: 'bg-blue-400',
  grass: 'bg-green-500',
  electric: 'bg-yellow-500',
  psychic: 'bg-purple-600',
  ice: 'bg-blue-300',
  dragon: 'bg-red-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-400',
  fairy: 'bg-pink-500',
}
