fetch('https://pokeapi.co/api/v2/pokemon/')
  .then((response) => response.json())
  .then((data) => {
    // pokemons.push(data.pokemon.name)
    console.log(data.results.map(type => type.name))
  })
  .catch((err) => {
    console.log(err)
    return // ignore errors for non-existent pokemon forms (404)
  })
