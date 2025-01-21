import { useState, useEffect } from 'react';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedType, setSelectedType] = useState('all'); // Add state for selected type

  useEffect(() => {
    let i = 1;
    const fetchPokemons = async () => {
      let fetchedPokemons = [];
      while (i < 200) {
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
      setLoading(false); // Set loading to false after fetching
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
    <div>
      <div className="flex justify-center my-4">
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="p-2 border rounded">
          <option value="all">All</option>
          <option value="fire">Fire</option>
          <option value="bug">Bug</option>
          <option value="poison">Poison</option>
          <option value="psychic">Psychic</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="fairy">Fairy</option>
          <option value="water">Water</option>
          <option value="dark">Dark</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 p-2">
        {filteredPokemons.map((pokemon, index) => {
          return (
            <div key={index} className='bg-gray-200 p-4 m-2 md:m-4 rounded-lg flex flex-col items-center'>
              <img src={pokemon.sprites.front_default} alt="" />
              <div className="text-md p-2 uppercase font-mono">{pokemon.name}</div>
              <div>{pokemon.types.map((type, index) => {
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
              })}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
