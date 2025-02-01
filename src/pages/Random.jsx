import { useState, useEffect } from 'react'
import { TypeColor } from '../context/Types'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function RandomPokemon() {
  const [pokemon, setPokemon] = useState({})
  const [generate, setgenerate] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchPokemon = async () => {
    let i = Math.floor(Math.random() * 200) + 1
    try {
      const data = JSON.parse(localStorage.getItem('allPokemons'))[i]
      setPokemon({
        name: data.name,
        sprite: data.sprite,
        types: data.types,
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
      <div className="text-center flex justify-center items-center p-5">
        <div
          className={`flex flex-col items-center rounded-md ${
            TypeColor[pokemon.types && pokemon.types[0]]
          } p-5 bg-opacity-75 max-w-lg`}
        >
          <img src={pokemon.sprite} alt={pokemon.name} className="h-52" />
          <h1 className="capitalize text-2xl -mt-8 p-5 font-medium">
            {pokemon.name}
          </h1>
          <div className="flex gap-2">
            {pokemon.types &&
              pokemon.types.map((type, index) => (
                <div
                  key={index}
                  className={`px-3 py-2 rounded-lg text-sm shadow-md bg-opacity-40 capitalize ${TypeColor[type]}`}
                >
                  {type}
                </div>
              ))}
          </div>
          <button
            onClick={() => setgenerate(!generate)}
            className="mt-5 bg-white bg-opacity-20 text-sm rounded-lg py-2 px-5"
          >
            Generate New
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RandomPokemon
