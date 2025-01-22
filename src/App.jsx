import { useState, useEffect } from 'react';
import { Link } from 'react-router';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  const types = ['All', 'Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Steel', 'Fairy'];
  // const typeColors = {
  //   normal: 'bg-gray-300',
  //   fighting: 'bg-red-300',
  //   flying: 'bg-blue-300',
  //   poison: 'bg-violet-300',
  //   ground: 'bg-yellow-300',
  //   rock: 'bg-gray-500',
  //   bug: 'bg-green-300',
  //   ghost: 'bg-indigo-300',
  //   fire: 'bg-red-500',
  //   water: 'bg-blue-500',
  //   grass: 'bg-green-500',
  //   electric: 'bg-yellow-500',
  //   psychic: 'bg-purple-600',
  //   ice: 'bg-blue-200',
  //   dragon: 'bg-red-800',
  //   dark: 'bg-gray-800',
  //   steel: 'bg-gray-400',
  //   fairy: 'bg-pink-300'
  // };

  useEffect(() => {
    let i = 1;
    const fetchPokemons = async () => {
      let fetchedPokemons = [];
      while (i < 300) {
        try {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon-form/' + i);
          const data = await response.json();
          fetchedPokemons.push(data);
        } catch (err) {
          console.log(err);
        }
        i += 1;
      }
      setPokemons(fetchedPokemons);
      setLoading(false);
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <img src="https://assets-v2.lottiefiles.com/a/d12e3930-1177-11ee-b96d-0be88c37ea6a/tt039ohVD2.gif" alt="" className='h-32 w-32'/>
      </div>
    );
  }

  const filteredPokemons = selectedType === 'all' ? pokemons : pokemons.filter(pokemon => pokemon.types.some(type => type.type.name === selectedType));

  return (
    <div className={darkMode ? "min-h-screen bg-gray-900 text-white" : "min-h-screen bg-gray-100 text-black"}>
      <header className="p-4 text-center text-2xl font-bold flex justify-between items-center">
        <span className='font-pokemonSolid'>Pokémon Gallery</span>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-gray-800 text-white rounded-full">
          {darkMode ? 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            }
        </button>
      </header>
      <div className="flex justify-center mb-4 p-5">
        <div className="flex flex-wrap gap-2 md:gap-4">
          {types.map((type, index) => {
            return (
              <button key={index} onClick={() => setSelectedType(type.toLowerCase())} className={darkMode ? 'bg-gray-800 p-2 rounded-lg shadow-md transform transition duration-500 hover:scale-105' : 'bg-white p-2 rounded-lg shadow-md transform transition duration-500 hover:scale-105'}>
                {type}
              </button>
            );
          })}
          </div>
      </div>
      <div className="grid grid-cols-1 p-5 md:grid-cols-6 gap-4">
        {filteredPokemons.map((pokemon, index) => {
          return (
            <div key={index} className={darkMode ? 'bg-gray-800 bg-opacity-50 backdrop-blur-lg p-4 rounded-lg flex flex-col items-center shadow-lg transform transition duration-500 hover:scale-105' : 'bg-white bg-opacity-50 backdrop-blur-lg p-4 rounded-lg flex flex-col items-center shadow-md transform transition duration-500 hover:scale-105'}>
              <img src={pokemon.sprites.front_default} alt="" className="w-20 h-20" />
              <div className="text-md p-2 uppercase font-mono">{pokemon.name}</div>
              <div className="flex flex-wrap justify-center">
                {pokemon.types.map((type, index) => {
                  if (type.type.name === 'fire') return <span key={index} className="bg-red-300 px-3 py-1 m-1 rounded-full text-xs">{type.type.name}</span>;
                  else if (type.type.name === 'bug') return <span key={index} className="bg-green-300 px-3 py-1 m-1 rounded-full text-xs">{type.type.name}</span>;
                  else if (type.type.name === 'poison') return <span key={index} className="bg-violet-300 px-3 py-1 m-1 rounded-full text-xs">{type.type.name}</span>;
                  else if (type.type.name === 'psychic') return <span key={index} className="bg-purple-600 px-3 py-1 m-1 rounded-full text-xs">{type.type.name}</span>;
                  else if (type.type.name === 'grass') return <span key={index} className="bg-green-500 px-3 py-1 m-1 rounded-full text-xs">{type.type.name}</span>;
                  else if (type.type.name === 'electric') return <span key={index} className="bg-yellow-300 px-3 py-1 m-1 rounded-full text-xs">{type.type.name}</span>;
                  else if (type.type.name === 'fairy') return <span key={index} className="bg-pink-300 px-3 py-1 m-1 rounded-full text-xs">{type.type.name}</span>;
                  else if (type.type.name === 'water') return <span key={index} className="bg-blue-300 px-3 py-1 m-1 rounded-full text-xs">{type.type.name}</span>;
                  else if (type.type.name === 'dark') return <span key={index} className="bg-gray-500 px-3 py-1 m-1 rounded-full text-xs">{type.type.name}</span>;
                  else return <span key={index} className="bg-gray-300 px-3 py-1 m-1 rounded-full text-xs">{type.type.name}</span>;
                })}
              </div>
            </div>
          );
        })}
      </div>
      <footer className='text-center p-4 text-sm'>
        This project was developer using <Link to='https://pokeapi.co/'>PokeAPI</Link>
        {/* <img src="https://pokeapi.co/static/pokeapi_256.3fa72200.png" alt="pokeapi" /> */}
      </footer> 
    </div>
  );
}

export default App;
