import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import Navbar from '../components/Navbar'

function Home() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState('all')

  const types = ['All', 'Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Steel', 'Fairy'];
  useEffect(() => {
    let i = 1
    const fetchPokemons = async () => {
      let fetchedPokemons = []
      while (i < 300) {
        try {
          const response = await fetch(
            'https://pokeapi.co/api/v2/pokemon-form/' + i
          )
          const data = await response.json()
          fetchedPokemons.push(data)
        } catch (err) {
          console.log(err)
        }
        i += 1
      }
      setPokemons(fetchedPokemons)
      setLoading(false)
    }

    fetchPokemons()
  }, [])

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <img
          src="https://assets-v2.lottiefiles.com/a/d12e3930-1177-11ee-b96d-0be88c37ea6a/tt039ohVD2.gif"
          alt=""
          className="h-32 w-32"
        />
      </div>
    )
  }

  const filteredPokemons =
    selectedType === 'all'
      ? pokemons
      : pokemons.filter((pokemon) =>
          pokemon.types.some((type) => type.type.name === selectedType)
        )

  return (
    <div className="min-h-screen bg-zinc-100">
      <Navbar />
      <div className="flex p-5">
        <div className="flex flex-wrap gap-2 md:gap-2">
          {types.map((type, index) => {
            return (
              <button
                key={index}
                onClick={() => setSelectedType(type.toLowerCase())}
                className="p-2 rounded-lg shadow-md"
              >
                {type}
              </button>
            )
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 p-5 md:grid-cols-6 gap-4">
        {filteredPokemons.map((pokemon, index) => {
          return (
            <div
              key={index}
              className="p-4 rounded-lg flex flex-col items-center shadow-md transform transition duration-500 hover:scale-105"
            >
              <img
                src={pokemon.sprites.front_default}
                alt=""
                className="w-20 h-20"
              />
              <div className="text-md p-2 uppercase font-mono">
                {pokemon.name}
              </div>
              <div className="flex flex-wrap justify-center">
                {pokemon.types.map((type, index) => {
                  if (type.type.name === 'fire')
                    return (
                      <span
                        key={index}
                        className="bg-red-300 px-3 py-1 m-1 rounded-full text-xs"
                      >
                        {type.type.name}
                      </span>
                    )
                  else if (type.type.name === 'bug')
                    return (
                      <span
                        key={index}
                        className="bg-green-300 px-3 py-1 m-1 rounded-full text-xs"
                      >
                        {type.type.name}
                      </span>
                    )
                  else if (type.type.name === 'poison')
                    return (
                      <span
                        key={index}
                        className="bg-violet-300 px-3 py-1 m-1 rounded-full text-xs"
                      >
                        {type.type.name}
                      </span>
                    )
                  else if (type.type.name === 'psychic')
                    return (
                      <span
                        key={index}
                        className="bg-purple-600 px-3 py-1 m-1 rounded-full text-xs"
                      >
                        {type.type.name}
                      </span>
                    )
                  else if (type.type.name === 'grass')
                    return (
                      <span
                        key={index}
                        className="bg-green-500 px-3 py-1 m-1 rounded-full text-xs"
                      >
                        {type.type.name}
                      </span>
                    )
                  else if (type.type.name === 'electric')
                    return (
                      <span
                        key={index}
                        className="bg-yellow-300 px-3 py-1 m-1 rounded-full text-xs"
                      >
                        {type.type.name}
                      </span>
                    )
                  else if (type.type.name === 'fairy')
                    return (
                      <span
                        key={index}
                        className="bg-pink-300 px-3 py-1 m-1 rounded-full text-xs"
                      >
                        {type.type.name}
                      </span>
                    )
                  else if (type.type.name === 'water')
                    return (
                      <span
                        key={index}
                        className="bg-blue-300 px-3 py-1 m-1 rounded-full text-xs"
                      >
                        {type.type.name}
                      </span>
                    )
                  else if (type.type.name === 'dark')
                    return (
                      <span
                        key={index}
                        className="bg-gray-500 px-3 py-1 m-1 rounded-full text-xs"
                      >
                        {type.type.name}
                      </span>
                    )
                  else
                    return (
                      <span
                        key={index}
                        className="bg-gray-300 px-3 py-1 m-1 rounded-full text-xs"
                      >
                        {type.type.name}
                      </span>
                    )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <footer className="text-center p-4 text-sm">
        This project was developer using{' '}
        <Link to="https://pokeapi.co/">PokeAPI</Link>
        {/* <img src="https://pokeapi.co/static/pokeapi_256.3fa72200.png" alt="pokeapi" /> */}
      </footer>
    </div>
  )
}

export default Home
