import RandomPokemon from '../components/RandomPokemon'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Random() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div>
        <RandomPokemon />
      </div>
      <Footer />
    </div>
  )
}

export default Random
