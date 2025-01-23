import RandomPokemon from '../components/RandomPokemon'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Random() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-100">
      <Navbar />
      <div className='flex gap-3 justify-center items-center h-full'>
        <RandomPokemon />
      </div>
      <Footer />
    </div>
  )
}

export default Random
