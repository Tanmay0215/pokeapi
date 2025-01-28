import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { TypeColor } from '../context/Types'
import Loader from '../components/Loader'

function Home() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState('all')
  
  const types = ['All', 'Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Steel', 'Fairy']

  useEffect(() => {
    const fetchPokemons = async () => {
      let fetchedPokemons = []
      for (let i = 1; i <= 40; i++) {
      try {
          const response = await fetch(
            'https://pokeapi.co/api/v2/pokemon/' + i
          )
          const data = await response.json()
          fetchedPokemons.push({
            id: data.id,
            name: data.name,
            sprite: data.sprites.front_default,
            types: data.types.map(type => type.type.name)
          })
          localStorage.setItem('pokemons', JSON.stringify(fetchedPokemons))
        } catch (err) {
          console.log(err)
        }
      }
      setPokemons(fetchedPokemons)
      setLoading(false)
    }

    fetchPokemons()
  }, [])

  if (loading) {
    return (
      <>
      <Loader />
      <div>Please wait will we catch all your pokemons!!</div>
      </>
    )
  }

  const filteredPokemons =
    selectedType === 'all'
      ? pokemons
      : pokemons.filter((pokemon) =>
          pokemon.types.some((type) => type.type.name === selectedType)
        )

  return (
    <div>
      <Navbar />
      <div className="flex p-5">
        <div className="flex flex-wrap gap-2">
          {types.map((type, index) => {
            return (
              <button
                key={index}
                onClick={() => setSelectedType(type.toLowerCase())}
                className="p-2 rounded-lg text-sm shadow-md"
              >
                {type}
              </button>
            )
          })}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-6 md:gap-4">
        {filteredPokemons.map((pokemon, index) => {
          return (
            <div
              key={index}
              className={`${TypeColor[pokemon.types[0]]} bg-opacity-40 p-4 rounded-lg flex flex-col items-center shadow-md transform transition duration-500 hover:scale-105`}
            >
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
              />
              <div className="text-md p-2 uppercase font-semibold">
                {pokemon.name}
              </div>
              <div className="flex flex-wrap justify-center capitalize">
                {pokemon.types.map((type, index) => {
                    return (
                      <span
                        key={index}
                        className={`${TypeColor[type]} px-3 py-1 m-1 rounded-full text-xs bg-opacity-40`}
                      >
                        {type}
                      </span>
                    )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <Footer />
    </div>
  )
}

export default Home
