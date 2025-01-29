import { Link } from 'react-router-dom'
import { types } from '../context/Types'

function Menu({ open, setOpen }) {
  if (open)
    return (
      <div className="fixed right-0 top-0 h-screen w-64 p-5 space-y-10 text-center backdrop-blur-2xl shadow-lg z-50">
        <div className="flex items-center">
          <button className="font-bold" onClick={() => setOpen(false)}>
            {'X'}
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">Menu</h1>
          </div>
        </div>
        <div className="flex flex-col space-y-3 text-lg">
          <Link to="/">Home</Link>
          <Link to="/random">Random</Link>
          <Link to="/my-pokemons">My Pokemons</Link>
          <Link>Type Stats</Link>
          <div className="grid grid-cols-2 gap-2">
            {types.map((type) => (
              <Link key={type} to={`/type/${type}`} className="capitalize">{type}</Link>
            ))}
          </div>
        </div>
      </div>
    )
}

export default Menu
