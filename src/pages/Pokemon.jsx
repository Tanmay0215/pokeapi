import React from 'react'
import { useParams } from 'react-router-dom'
import { TypeColor } from '../context/Types'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Pokemon = () => {
  const { id } = useParams()

  const pokemons = JSON.parse(localStorage.getItem('allPokemons')) || []
  const poke = pokemons.find((pokemon) => pokemon.id === parseInt(id))

  return (
    <div>
      <Navbar />
      <div className="text-center flex justify-center items-center p-5">
        <div
          className={`flex flex-col items-center rounded-md ${
            TypeColor[poke.types && poke.types[0]]
          } p-5 bg-opacity-75 max-w-lg`}
        >
          <img src={poke.sprite} alt={poke.name} className="h-52" />
          <h1 className="capitalize text-2xl -mt-5 p-5 font-medium">
            {poke.name}
          </h1>
          <div className="flex gap-2">
            {poke.types &&
              poke.types.map((type, index) => (
                <div
                  key={index}
                  className={`px-3 py-2 rounded-lg text-sm shadow-md bg-opacity-40 capitalize ${TypeColor[type]}`}
                >
                  {type}
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
