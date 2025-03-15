import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PokemonCard from '../components/PokemonCard'

const MyPokemons = () => {
  const myPokemons = JSON.parse(localStorage.getItem('myPokemons')) || []

  return (
    <div>
      <Navbar />
      <h1 className="text-4xl p-6 md:p-10 font-semibold text-center tracking-tighter text-red-500">
        My Pokemon Collection
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 md:gap-5 gap-2 px-5">
        {myPokemons.map((pokemon, index) => (
          <PokemonCard
          key={index}
          pokemon={pokemon}
        />
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default MyPokemons
