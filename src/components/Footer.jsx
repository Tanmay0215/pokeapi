import { Link } from "react-router-dom"

function Footer() {
  return (
        <div className="text-center p-5 text-sm">
        This project was developer using{' '}
        <Link to="https://pokeapi.co/" className="text-blue-600 font-medium">PokeAPI</Link>
        {/* <img src="https://pokeapi.co/static/pokeapi_256.3fa72200.png" alt="pokeapi" /> */}
    </div>
  )
}

export default Footer
