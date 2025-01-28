import RandomPokemon from '../components/RandomPokemon'

function Random() {
  return (
    <div className="flex flex-col bg-zinc-100">
      <div className='flex gap-3 justify-center items-center h-full'>
        <RandomPokemon />
      </div>
    </div>
  )
}

export default Random
