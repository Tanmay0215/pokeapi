import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import Random from './pages/Random.jsx'
import Type from './pages/Type.jsx'
import NotFound from './pages/NotFound.jsx'
import MyPokemons from './pages/MyPokemons.jsx'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className="min-h-screen font-manrope bg-zinc-100">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Layout />}>
          <Route path="/random" element={<Random />} />
          <Route path="/type/:id" element={<Type />} />
          <Route path="/my-pokemons" element={<MyPokemons />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
