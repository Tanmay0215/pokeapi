import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { TypeColor } from '../context/Types'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import add from '../assets/add.svg'

function Home() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [myPokemons, setMyPokemons] = useState(
    JSON.parse(localStorage.getItem('myPokemons')) || []
  )
  const [selectedType, setSelectedType] = useState('all')

  const types = [
    'All',
    'Normal',
    'Fighting',
    'Flying',
    'Poison',
    'Ground',
    'Rock',
    'Bug',
    'Ghost',
    'Fire',
    'Water',
    'Grass',
    'Electric',
    'Psychic',
    'Ice',
    'Dragon',
    'Dark',
    'Steel',
    'Fairy',
  ]

  useEffect(() => {
    const fetchPokemons = async () => {
      let fetchedPokemons = []
      for (let i = 1; i <= 40; i++) {
        try {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + i)
          const data = await response.json()
          fetchedPokemons.push({
            id: data.id,
            name: data.name,
            sprite: data.sprites.front_default,
            types: data.types.map((type) => type.type.name),
          })
          localStorage.setItem('allPokemons', JSON.stringify(fetchedPokemons))
          localStorage.setItem('myPokemons', JSON.stringify(myPokemons))
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
      <div className="text-center bg-white flex flex-col gap-10 justify-center items-center h-screen p-5">
        <Loader />
        <div className="font-medium text-lg">
          Please wait while we catch all your pokemons!!
        </div>
      </div>
    )
  }

  const filteredPokemons =
    selectedType === 'all'
      ? pokemons
      : pokemons.filter((pokemon) =>
          pokemon.types.some((type) => type === selectedType)
        )

  const addToWishList = (id) => {
    try {
      let wishlistPokemon = pokemons[id]
      if (myPokemons.some((pokemon) => pokemon.id === wishlistPokemon.id)) {
        return toast.info('Pokemon already in your wishlist')
      }
      const newMyPokemons = [...myPokemons, { ...wishlistPokemon }]
      setMyPokemons(newMyPokemons)
      localStorage.setItem('myPokemons', JSON.stringify(newMyPokemons))
      toast.success('Pokemon added to your wishlist')
    } catch (err) {
      toast.error('Failed to add Pokemon to wishlist')
    }
  }

  const clearWishList = () => {
    setMyPokemons([])
    localStorage.removeItem('myPokemons')
    toast.success('Wishlist cleared')
  }

  // clearWishList()

  return (
    <div>
      <Navbar />
      <div className="mx-auto text-center">
        <select
          className="px-5 mt-5 py-2 bg-transparent rounded-lg outline-none"
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {types.map((type, index) => (
            <option
              key={index}
              value={type.toLowerCase()}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-2 rounded-lg text-sm shadow-md"
            >
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3 p-3 md:p-5 md:grid-cols-4 lg:grid-cols-6 md:gap-4">
        {filteredPokemons.map((pokemon, index) => {
          return (
            <div
              key={index}
              className={`${
                TypeColor[pokemon.types[0]]
              } bg-opacity-40 p-4 rounded-lg flex flex-col items-center shadow-md transform transition duration-500 hover:scale-105`}
            >
              <img
                src={add}
                alt="add_icon"
                onClick={() => addToWishList(pokemon.id - 1)}
                className="cursor-pointer h-5 bg-white/20 opacity-60 absolute top-0 right-0 m-2 rounded-full"
              />
              <img src={pokemon.sprite} alt={pokemon.name} />
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
