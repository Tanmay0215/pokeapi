let i = 0;
let pokemons = [];
while (i < 120) {
    const data = fetch('https://pokeapi.co/api/v2/pokemon-form/' + i)
    .then(response => response.json())
    .then(data => {
        console.log(pokemons.toString());
        pokemons.push(data.pokemon.name);
    }).catch(err => {
        console.log(err);
    });
    i+=1;
}
