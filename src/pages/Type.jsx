import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TypeColor } from '../context/Types'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { types } from '../context/Types'

function Type() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const type = useParams().id

  const typeIndex = types.indexOf(type) + 1

  const fetchType = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/type/${typeIndex}`
      )
      const data = await response.json()
      setData({ ...data })
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchType()
    console.log(data)
  }, [typeIndex])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="../assets/loader.gif" alt="" />
      </div>
    )
  }

  const moves = data.moves.map((move) => move.name)

  return (
    <div>
      <Navbar />
      <h1 className={`text-center text-4xl font-bold p-8 uppercase text-zinc-200 ${TypeColor[type]}`}>{type}</h1>
        <h2 className="text-center text-3xl p-5 font-semibold">Attacks</h2>
        <div className="flex flex-wrap gap-2 p-5 justify-center">
          {moves.map((move) => (
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
          {data.pokemon.map((pokemon) => (
            <div
              key={pokemon.pokemon.name}
              className="bg-white p-2 rounded-md uppercase shadow text-sm text-center"
            >
              {pokemon.pokemon.name}
            </div>
          ))}
      </div>
      <Footer />
    </div>
  )
}

export default Type
