import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import PokemonCard from '../components/PokemonCard'

function Home() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [myPokemons, setMyPokemons] = useState(
    JSON.parse(localStorage.getItem('myPokemons')) || []
  )
  const [selectedType, setSelectedType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

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
      if (localStorage.getItem('allPokemons')) {
        fetchedPokemons = JSON.parse(localStorage.getItem('allPokemons'))
        setPokemons(fetchedPokemons)
        setLoading(false)
        return
      }

      // let TOTAL = await fetch('https://pokeapi.co/api/v2/pokemon/')
      //   .then((response) => response.json())
      //   .then((data) => data.count)
      //   .catch((err) => console.log(err))

      const TOTAL = 50
      for (let i = 1; i <= TOTAL; i++) {
        try {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + i)
          const data = await response.json()
          fetchedPokemons.push({
            id: data.id,
            name: data.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`,
            // sprite: data.sprites.front_default,
            stats: data.stats.map((stat) => ({
              name: stat.stat.name,
              value: stat.base_stat,
            })),
            types: data.types.map((type) => type.type.name),
          })
        } catch (err) {
          console.log(err)
        }
      }
      localStorage.setItem('allPokemons', JSON.stringify(fetchedPokemons))
      setPokemons(fetchedPokemons)
      setLoading(false)
    }

    fetchPokemons()
  }, [])

  if (loading) {
    return (
      <div className="text-center bg-white flex flex-col gap-10 justify-center items-center h-screen p-5">
        <Loader />
        <div className="font-medium text-lg animate-pulse">
          Please wait while we catch all your pokemons!!
        </div>
      </div>
    )
  }

  const filteredPokemons = pokemons.filter((pokemon) => {
    return (
      (selectedType === 'all' ||
        pokemon.types.some((type) => type === selectedType)) &&
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

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
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-5 mt-5 py-2 bg-transparent rounded-lg outline-none"
        />
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
            <PokemonCard
              key={index}
              pokemon={pokemon}
            />
          )
        })}
      </div>
      <Footer />
    </div>
  )
}

export default Home
