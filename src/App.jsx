import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Random from './pages/Random.jsx'
import Type from './pages/Type.jsx'
import NotFound from './pages/NotFound.jsx'
import MyPokemons from './pages/MyPokemons.jsx'
import Pokemon from './pages/Pokemon.jsx'
import FindPokemon from './pages/FindPokemon.jsx'
import ShadowPokemon from './pages/ShadowPokemon.jsx'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className="min-h-screen font-manrope bg-zinc-100">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/random" element={<Random />} />
        <Route path="/type/:id" element={<Type />} />
        <Route path="/my-pokemons" element={<MyPokemons />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
        <Route path="/scan" element={<FindPokemon />} />
        <Route path="/shadow" element={<ShadowPokemon />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
