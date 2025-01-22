import { useState, useEffect } from 'react'

function RandomPokemon() {
  const [pokemon, setPokemon] = useState({})

  useEffect(() => {
    let i = Math.floor(Math.random() * 200) + 1
    console.log(i)
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon-form/' + i
        )
        const data = await response.json()
        // console.log(data.pokemon.name, data.sprites.front_default)
        setPokemon({ name: data.pokemon.name, sprite: data.sprites.front_default })
      } catch (err) {
        console.log(err)
      }
    }
    fetchPokemon()
  }, [])

  return (
    <div className='flex flex-col items-center'>
      <img src={pokemon.sprite} alt={pokemon.name} className='h-52' />
      <h1 className='capitalize text-2xl -mt-5'>{pokemon.name}</h1>
    </div>
  )
}

export default RandomPokemon
