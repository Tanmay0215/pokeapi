import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TypeColors } from '../context/Types'

function Type() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const type = useParams().id
  const types = [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy',
    'stellar',
    'unknown',
  ]

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
      <div className="flex justify-center items-center">
        <img src="../assets/loader.gif" alt="" />
      </div>
    )
  }

  const moves = data.moves.map((move) => move.name)
  return (
    <div>
      <h1 className={`text-center text-4xl font-bold p-10 uppercase ${TypeColors.type}`}>
        {type}
      </h1>
      <h2 className="text-center text-3xl p-5 font-semibold">Attacks</h2>
      <div className="flex flex-wrap justify-center gap-2">
        {moves.map((move) => (
          <div key={move} className="px-3 py-1 bg-red-300 rounded-full">
            {move}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Type
