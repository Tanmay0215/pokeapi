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

  const menuItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/random', label: 'Random', icon: '🎲' },
    { path: '/my-pokemons', label: 'My Pokémons', icon: '❤️' },
    { path: '/scan', label: 'Search', icon: '🔍' },
    { path: '/shadow', label: 'Guess the Pokémon', icon: '👻' },
  ]

  const handleLinkClick = () => {
    setOpen(false)
  }

  if (open)
    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setOpen(false)}
        />
        
        {/* Sidebar */}
        <div className="fixed right-0 top-0 h-screen w-80 bg-gradient-to-b from-white/95 to-gray-50/95 backdrop-blur-xl shadow-2xl z-50 animate-slide-in border-l border-white/20">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
              <h1 className="text-2xl font-bold text-gray-800">Menu</h1>
              <button 
                onClick={() => setOpen(false)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-6">
              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleLinkClick}
                    className="flex items-center gap-4 p-4 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-300 group border border-transparent hover:border-blue-200/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <span className="text-lg font-semibold group-hover:translate-x-1 transition-transform duration-300">
                      {item.label}
                    </span>
                    <svg 
                      className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200/50">
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <p className="text-sm text-gray-500 font-medium">
                  Pokémon Gallery
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Catch 'em all!
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default Menu
