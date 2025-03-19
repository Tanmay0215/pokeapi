import { useNavigate, useParams } from 'react-router-dom'
import { TypeColor } from '../context/Types'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} from '../utils/Wishlist'

const Pokemon = () => {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [inWishlist, setInWishlist] = useState(false)

  const fetchPokemon = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const data = await response.json()
      setPokemon({
        id: data.id,
        name: data.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        types: data.types.map((type) => type.type.name),
        weight: data.weight,
        height: data.height,
        abilities: data.abilities.map((ability) => ability.ability.name),
        stats: data.stats.map((stat) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
        // voice: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${data.id}.ogg`
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPokemon()
  }, [id])

  useEffect(() => {
    setInWishlist(isInWishlist(id))
  }, [id])

  const handleWishlistClick = () => {
    if (inWishlist) {
      removeFromWishlist(id)
      setInWishlist(false)
    } else {
      addToWishlist(pokemon)
      setInWishlist(true)
    }
  }

  if (loading) {
    return (
      <div className="bg-white flex justify-center items-center h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      {/* <audio src={pokemon.voice} autoPlay /> */}
      <div className="flex flex-col md:flex-row md:gap-10 items-center justify-center rounded-md text-gray-700">
        <div className="flex flex-col justify-center">
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className="h-64 md:h-80"
          />
          <button
            onClick={handleWishlistClick}
            className={`${
              inWishlist ? 'bg-red-500' : 'bg-green-400'
            } text-gray-100 font-semibold px-4 py-2 rounded-md mt-4`}
          >
            {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
        <div>
          <h1 className="capitalize text-4xl py-3 font-bold text-gray-800 justify-start">
            {pokemon.name}
          </h1>
          <div className="flex flex-wrap gap-1 justify-start">
            {pokemon.types &&
              pokemon.types.map((type, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/type/${type}`)}
                  className={`px-3 py-1 rounded-full text-sm shadow-sm bg-opacity-50 capitalize ${TypeColor[type]} text-white`}
                >
                  {type}
                </div>
              ))}
          </div>
          <p className="mt-2">Weight: {pokemon.weight / 10} kg</p>
          <p>Height: {pokemon.height / 10} m</p>
          <div className="mt-2">
            <h3 className="text-lg font-semibold text-gray-800">Abilities:</h3>
            <ul className="list-disc list-inside">
              {pokemon.abilities &&
                pokemon.abilities.map((ability, index) => (
                  <li key={index} className="capitalize">
                    {ability.replace('-', ' ')}
                  </li>
                ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Stats:</h3>
            {pokemon.stats &&
              pokemon.stats.map((stat) => (
                <div
                  key={stat.name}
                  className="flex justify-between capitalize"
                >
                  <span>{stat.name.replace('-', ' ')}:</span>
                  <span>{stat.value}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Pokemon
