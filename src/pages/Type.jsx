import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TypeColor } from '../context/Types'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { types } from '../context/Types'
import Loader from '../components/Loader'

function Type() {
  const [loading, setLoading] = useState(true)
  const [typeData, setTypeData] = useState({})
  const type = useParams().id

  const typeIndex = types.indexOf(type) + 1

  const fetchType = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/type/${typeIndex}`
      )
      const data = await response.json()
      // setData({ ...data })
      setTypeData({
        ...data,
        moves: data.moves
          .map((move) => move.name)
          .sort()
          .slice(0, 20),
        pokemons: data.pokemon
          .map((pokemon) => pokemon.pokemon.name)
          .sort()
          .slice(0, 20),
      })
      console.log()
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchType()
  }, [typeIndex])

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
      <h1
        className={`text-center text-4xl font-bold p-8 uppercase text-zinc-200 ${TypeColor[type]}`}
      >
        {type}
      </h1>
      <h2 className="text-center text-3xl p-5 font-semibold">Attacks</h2>
      <div className="flex flex-wrap gap-2 p-5 justify-center">
        {typeData.moves.map((move) => (
          <div
            key={move}
            className={`px-3 py-1 ${TypeColor[type]} text-white rounded-full text-sm capitalize`}
          >
            {move}
          </div>
        ))}
      </div>
      <h2 className="text-3xl text-center p-5 font-semibold">Pokemons</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-5">
        {typeData.pokemons.map((pokemon) => (
          <div
            key={pokemon}
            className="bg-white p-2 rounded-md uppercase shadow text-sm text-center"
          >
            {pokemon}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default Type
