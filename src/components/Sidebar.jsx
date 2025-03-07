import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Menu({ open, setOpen }) {

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  if (open)
    return (
      <div className="fixed right-0 top-0 h-screen w-64 p-5 space-y-10 text-center bg-gray-100 shadow-lg z-50">
        <div className="flex items-center">
          <button className="font-bold" onClick={() => setOpen(false)}>
            {'X'}
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">Menu</h1>
          </div>
        </div>
        <div className="flex flex-col text-lg">
          <Link to="/" className='p-2 border-spacing-2 border-b-2'>Home</Link>
          <Link to="/random" className='p-2 border-spacing-2 border-b-2'>Random</Link>
          <Link to="/my-pokemons" className='p-2 border-spacing-2 border-b-2'>My Pokemons</Link>
        </div>
      </div>
    )
}

export default Menu
