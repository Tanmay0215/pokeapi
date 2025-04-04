import { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'

const ShadowPokemon = () => {
  const [shadowPokemon, setShadowPokemon] = useState(null)
  const [guess, setGuess] = useState('')
  const [brightness, setBrightness] = useState('0%')

  const checkGuess = () => {
    if (guess.toLowerCase() === shadowPokemon.name) {
      setBrightness('100%')
      setTimeout(() => {
        alert('Correct!')
        setGuess('')
        loadNewPokemon()
      }, 500)
    } else {
      alert('Incorrect!')
    }
  }

  const revealAnswer = () => {
    alert(`The answer is ${shadowPokemon.name}`)
    setGuess('')
    setBrightness('100%')
    // loadNewPokemon()
  }

  const loadNewPokemon = () => {
    const allPokemon = JSON.parse(localStorage.getItem('allPokemons')) || []

    if (allPokemon.length > 0) {
      const randomIndex = Math.floor(Math.random() * allPokemon.length)
      console.log(allPokemon[randomIndex])
      setShadowPokemon(allPokemon[randomIndex])
      setBrightness('0%')
    }
  }

  useEffect(() => {
    loadNewPokemon()
  }, [])

  if (!shadowPokemon) {
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Who's that Pokémon?</h1>
        <img
          src={shadowPokemon.sprite}
          draggable="false"
          className="size-40"
          style={{ filter: `brightness(${brightness})` }}
        />
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="rounded py-2 px-3 text-gray-700"
          placeholder="Enter Pokémon name"
        />
        <button
          onClick={checkGuess}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Check
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
          onClick={revealAnswer}
        >
          RevealAnswer
        </button>
      </div>
    </div>
  )
}

export default ShadowPokemon
