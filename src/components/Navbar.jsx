import { useState } from 'react'
import { Link } from 'react-router-dom'
import { types } from '../context/Types'
import Menu from './Menu'
import menu from '../assets/menu.svg'

function Navbar() {
  return (
    <div className="p-4 flex justify-between items-center">
      <span className="font-pokemonSolid text-2xl font-bold">
        <Link to="/">Pokémon Gallery</Link>
      </span>
      <div className="hidden md:block">
        <div className="flex gap-5 text-md font-semibold flex-wrap capitalize">
          <Link to="/">Home</Link>
          <Link to="/random">Random</Link>
          <Link to="/notFound">Not Found</Link>
        </div>
        <div className="flex gap-3 text-sm font-semibold flex-wrap capitalize">
          {types.map((type) => (
            <Link key={type} to={`/type/${type}`}>
              {type}
            </Link>
          ))}
        </div>
      </div>
      {open ? <img src={menu} alt="hamburger menu" className="h-6 block md:hidden" /> : <Menu />}
    </div>
  )
}

export default Navbar
