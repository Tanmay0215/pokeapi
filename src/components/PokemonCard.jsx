import { TypeColor } from '../context/Types'
import { useNavigate } from 'react-router-dom'

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate()
  return (
    <div
      className={`${
        TypeColor[pokemon.types[0]]
      } bg-opacity-50 p-4 rounded-lg flex flex-col items-center shadow-md transform transition duration-500 md:hover:scale-105`}
    >
      <img src={pokemon.sprite} alt={pokemon.name} className="h-32" onClick={()=>navigate(`/pokemon/${pokemon.id}`)} />
      <div className="text-md p-2 uppercase font-semibold">{pokemon.name}</div>
      <div className="flex flex-wrap capitalize gap-1">
        {pokemon.types.map((type, index) => {
          return (
            <div
              key={index}
              onClick={()=>navigate(`/type/${type}`)}
              className={`${TypeColor[type]} px-3 py-1 rounded-full text-xs bg-opacity-40 cursor-pointer`}
            >
              {type}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PokemonCard
