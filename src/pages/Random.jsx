import { useState, useEffect } from 'react'
import { TypeColor } from '../context/Types'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PokemonCard from '../components/PokemonCard'

function RandomPokemon() {
  const [pokemon, setPokemon] = useState({})
  const [generate, setgenerate] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchPokemon = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('allPokemons'))
      let i = Math.floor(Math.random() * data.length) + 1
      setPokemon({
        name: data[i].name,
        sprite: data[i].sprite,
        types: data[i].types,
        stats: data[i].stats,
      })
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPokemon()
  }, [generate])

  if (loading) {
    return (
      <div className="text-center bg-white flex flex-col gap-10 justify-center items-center h-screen p-5">
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="text-center flex flex-col justify-center items-center p-5">
      <PokemonCard
        pokemon={pokemon}
      />
        <button
          onClick={() => setgenerate(!generate)}
          className="mt-5 bg-white bg-opacity-20 text-sm rounded-lg py-2 px-5"
        >
          Generate New
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default RandomPokemon
