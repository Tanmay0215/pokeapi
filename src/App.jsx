import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Random from './pages/Random.jsx'
import Type from './pages/Type.jsx'
import NotFound from './pages/NotFound.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className='min-h-screen font-manrope bg-zinc-100'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/random" element={<Random />} />
          <Route path="/type/:id" element={<Type />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App