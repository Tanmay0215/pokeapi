import { useState, useEffect } from 'react'
import { TypeColor } from '../context/Types'

function RandomPokemon() {
  const [pokemon, setPokemon] = useState({})
  const [generate, setgenerate] = useState(false)

  useEffect(() => {
    let i = Math.floor(Math.random() * 200) + 1
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon-form/' + i
        )
        const data = await response.json()
        setPokemon({
          name: data.name,
          sprite: data.sprites.front_default,
          types: data.types.map((type) => type.type.name),
        })
      } catch (err) {
        console.log(err)
      }
    }
    fetchPokemon()
  }, [generate])

  return (
    <div className={`flex flex-col items-center rounded-md ${TypeColor[pokemon.types && pokemon.types[0]]} p-5 bg-opacity-75 max-w-lg`}>
      <img src={pokemon.sprite} alt={pokemon.name} className="h-52" />
      <h1 className="capitalize text-2xl -mt-5 p-5 font-medium">{pokemon.name}</h1>
      <div className="flex gap-2">
        {pokemon.types &&
          pokemon.types.map((type, index) => (
            <div
              key={index}
              className={`px-3 py-2 rounded-lg text-sm shadow-md capitalize ${TypeColor[type]}`}
            >
              {type}
            </div>
          ))}
      </div>
      <button onClick={()=>setgenerate(!generate)} className='mt-5 bg-white bg-opacity-30 backdrop:blur-xl rounded-lg py-2 px-5'>Generate New</button>
    </div>
  )
}

export default RandomPokemon
