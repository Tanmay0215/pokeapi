import { Link } from 'react-router-dom'
import { types } from '../context/Types'

function Menu() {
  return (
    <div className="fixed right-0 top-0 h-screen w-64 p-5 space-y-10 text-center backdrop-blur-2xl shadow-lg z-50">
      <div className='flex items-center'>
        <button className='font-bold'>X</button>
        <div className='flex-1'>
          <h1 className="text-2xl font-semibold">Menu</h1>
        </div>
      </div>
      <div>
        <ul className='space-y-3 text-lg font-semibold'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/random">Random</Link></li>
          <li>Type
            <ol className='grid grid-cols-2 gap-2 p-5'>
              {types.map((type) => (
                <li key={type} className='capitalize font-medium'>
                  <Link to={`/type/${type}`}>{type}</Link>
                </li>
              ))}
            </ol>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Menu
