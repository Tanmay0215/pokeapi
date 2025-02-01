import { useNavigate } from 'react-router-dom'
import { TypeColor } from '../context/Types'
import add from '../assets/add.svg'
import { Link } from 'react-router-dom'

const PokemonCard = ({ pokemon }, addToWishList) => {
  const navigate = useNavigate()
  return (
    <div
      className={`${
        TypeColor[pokemon.types[0]]
      } bg-opacity-50 p-4 rounded-lg flex flex-col items-center shadow-md transform transition duration-500 hover:scale-105`}
    >
      <img
        src={add}
        alt="add_icon"
        onClick={() => addToWishList(pokemon.id - 1)}
        className="cursor-pointer h-5 bg-white/20 opacity-60 absolute top-0 right-0 m-2 rounded-full"
      />
      <img src={pokemon.sprite} alt={pokemon.name} className="h-32"/>
      <div className="text-md p-2 uppercase font-semibold">{pokemon.name}</div>
      <div className="flex flex-wrap justify-center capitalize">
        {pokemon.types.map((type, index) => {
          return (
            <Link
              key={index}
              to={`/type/${type}`}
              className={`${TypeColor[type]} px-3 py-1 m-1 rounded-full text-xs bg-opacity-40`}
            >
              {type}
            </Link>
          )
        })}
      </div>
      <button
        onClick={() => navigate(`/pokemon/${pokemon.id}`)}
        className="bg-opacity-20 text-xs rounded-full py-2 px-5 mt-2"
      >
        View More
      </button>
    </div>
  )
}

export default PokemonCard
