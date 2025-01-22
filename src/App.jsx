import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Random from './pages/Random.jsx'
import Type from './pages/Type.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/random" element={<Random />} />
          <Route path="/type/:id" element={<Type />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  )
}

export default App