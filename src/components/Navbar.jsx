import { useState } from 'react'
import { Link } from 'react-router-dom'
import { types } from '../context/Types'
import Sidebar from './Sidebar'
import menu from '../assets/menu.svg'

function Navbar() {
  const [openSidebar, setOpenSidebar] = useState(false)
  return (
    <div className="p-4 flex justify-between items-center">
      <span className="font-pokemonHollow -tracking-tighter text-red-400 text-3xl font-bold">
        <Link to="/">Pokémon Gallery</Link>
      </span>
      <div className="hidden md:block">
        <div className="flex gap-5 text-md font-semibold flex-wrap capitalize">
          <Link to="/">Home</Link>
          <Link to="/random">Random</Link>
          <Link to="/notFound">Not Found</Link>
          <Link to="/my-pokemons">My Pokemons</Link>
        </div>
        <div className="flex gap-3 text-sm font-semibold flex-wrap capitalize">
          {types.map((type) => (
            <Link key={type} to={`/type/${type}`}>
              {type}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex md:hidden">
        <img src={menu} alt="" className="h-6" onClick={() => setOpenSidebar(true)} />
        <Sidebar open={openSidebar} setOpen={setOpenSidebar}/>
      </div>
    </div>
  )
}

export default Navbar
