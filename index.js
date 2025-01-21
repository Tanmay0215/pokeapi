let i = 1
let pokemons = []
while (i < 120) {
  fetch('https://pokeapi.co/api/v2/pokemon-form/' + i)
    .then((response) => response.json())
    .then((data) => {
      pokemons.push(data.pokemon.name)
      console.log(data.pokemon.name)
    })
    .catch((err) => {
      console.log(err)
      return // ignore errors for non-existent pokemon forms (404)
    })
  i += 1
}
// pokemons.forEach(pokemon => console.log(pokemon.name));
console.log(pokemons.name)
