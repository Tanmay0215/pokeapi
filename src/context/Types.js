const types = []

fetch('https://pokeapi.co/api/v2/type/')
  .then((response) => response.json())
  .then((data) => {
    // pokemons.push(data.pokemon.name)
    data.results.map((type) => types.push(type.name))
    console.log(types)
  })
  .catch((err) => {
    console.log(err)
    return
  })

const TypeColor = {
  normal: 'bg-gray-300',
  fighting: 'bg-red-300',
  flying: 'bg-blue-300',
  poison: 'bg-violet-300',
  ground: 'bg-yellow-300',
  rock: 'bg-gray-500',
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
  stellar: 'bg-yellow-400',
  unknown: 'bg-gray-600',
}

export const TypeColors = TypeColor
