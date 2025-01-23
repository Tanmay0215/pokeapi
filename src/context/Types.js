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
  fighting: 'bg-red-300',
  flying: 'bg-blue-300',
  poison: 'bg-violet-300',
  ground: 'bg-yellow-300',
  rock: 'bg-orange-800',
  bug: 'bg-green-300',
  ghost: 'bg-indigo-300',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-500',
  psychic: 'bg-purple-600',
  ice: 'bg-blue-200',
  dragon: 'bg-red-800',
  dark: 'bg-gray-800',
  steel: 'bg-gray-400',
  fairy: 'bg-pink-300',
}
