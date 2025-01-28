import React from 'react'
import { TypeColor } from '../context/Types'

function MyPokemons() {
  let myPokemons = JSON.parse(localStorage.getItem('pokemons'))
  return (
    <div className="p-5 text-center">
      <h1 className="text-3xl p-4">My Pokemon Collection</h1>
      <div className="grid grid-cols-2 md:grid-cols-6 md:gap-3 gap-5">
        {myPokemons.map((pokemon, index) => (
          <div
            key={index}
            className={`flex flex-col items-center rounded-md p-5 bg-opacity-50 max-w-lg ${
              TypeColor[pokemon.types[0]]
            }`}
          >
            {pokemon.id}
            {pokemon.name}
            <div>
              <img src={pokemon.sprite} alt="" />
            </div>
            <div className="flex gap-1 md:gap-2">
              {pokemon.types.map((type, index) => (
                <div
                  key={index}
                  className={`px-3 py-2 rounded-xl text-sm capitalize bg-opacity-40 ${TypeColor[type]}`}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyPokemons
