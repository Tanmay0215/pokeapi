import { MongoClient } from 'mongodb'

const uri = "mongodb://localhost:27017/" // Replace with your MongoDB connection string
const client = new MongoClient(uri)

const fetchPokemons = async () => {
    try {
        await client.connect()
        const db = client.db('pokedex')
        const pokemonsCollection = db.collection('pokemons')

        let allPokemons = []
        for (let i = 1; i <= 1000; i++) {
            if (i % 10 == 0) console.log(`Fetched ${i} pokemons`)
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                const data = await response.json()
                const pokemon = {
                    id: data.id,
                    name: data.name,
                    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
                    types: data.types.map((type) => type.type.name),
                }
                allPokemons.push(pokemon)
                await pokemonsCollection.insertOne(pokemon)
                console.log(`Inserted pokemon ${pokemon.name} to MongoDB`)
            } catch (err) {
                console.log(`Failed to fetch data for Pokémon ID ${i}:`, err)
            }
        }
        console.log('Pokémon data has been saved to MongoDB')
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

fetchPokemons()