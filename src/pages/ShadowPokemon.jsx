import { useState, useEffect } from 'react'

const ShadowPokemon = () => {
  const [shadowPokemon, setShadowPokemon] = useState(null)
  const [guess, setGuess] = useState('')
  const [brightness, setBrightness] = useState('0%')

  const checkGuess = () => {
    if (guess.toLowerCase() === shadowPokemon.name.toLowerCase()) {
      setBrightness('100%')
      setTimeout(() => {
        alert('Correct!')
        setGuess('')
        loadNewPokemon()
      }, 500) // Delay the alert and loading of the next Pokémon
    } else {
      alert('Incorrect!')
    }
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

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Who's that Shadow Pokémon?</h1>
      <img
        src={shadowPokemon.sprite}
        alt={shadowPokemon.name}
        draggable="false"
        className={`mb-4 brightness-${brightness}`}
      />
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        placeholder="Enter Pokémon name"
      />
      <button
        onClick={checkGuess}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Check
      </button>
    </div>
  )
}

export default ShadowPokemon
