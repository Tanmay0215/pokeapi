import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="p-4 flex justify-between items-center">
      <span className="font-pokemonSolid text-2xl font-bold ">Pokémon Gallery</span>
      <div className="flex gap-4 text-md font-semibold">
        <Link to="/type/fire">Fire</Link>
        <Link to="/type/water">Water</Link>
        <Link to="/type/dark">Dark</Link>
        <Link to="/not">NotFound</Link>
      </div>
    </div>
  )
}

export default Navbar
