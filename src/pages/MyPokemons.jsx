import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { TypeColor } from '../context/Types'
import { useNavigate } from 'react-router-dom'

function MyPokemons() {
  const myPokemons = JSON.parse(localStorage.getItem('myPokemons')) || []
  const navigate = useNavigate()

  return (
    <div>
      <Navbar />
      <h1 className="text-4xl p-6 md:p-10 font-semibold text-center tracking-tighter text-red-500">
        My Pokemon Collection
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 md:gap-5 gap-2 px-5">
        {myPokemons.map((pokemon, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-3 rounded-lg p-5 bg-opacity-50 max-w-lg ${
              TypeColor[pokemon.types[0]]
            }`}
          >
            <div>
              <img src={pokemon.sprite} alt="" onClick={()=>navigate(`/pokemon/${pokemon.id}`)}/>
            </div>
            <div className="uppercase font-semibold">{pokemon.name}</div>
            <div className="flex gap-1 md:gap-2">
              {pokemon.types.map((type, index) => (
                <div
                  key={index}
                  className={`px-3 py-1 rounded-xl text-xs capitalize bg-opacity-40 ${TypeColor[type]}`}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default MyPokemons
