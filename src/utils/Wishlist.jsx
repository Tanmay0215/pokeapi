import { toast } from 'react-toastify'

const getWishlist = () => {
  try {
    const wishlist = localStorage.getItem('myPokemons')
    return wishlist ? JSON.parse(wishlist) : []
  } catch (error) {
    console.error('Error getting wishlist from localStorage:', error)
    return []
  }
}

const saveWishlist = (wishlist) => {
  try {
    localStorage.setItem('myPokemons', JSON.stringify(wishlist))
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error)
  }
}

export const addToWishlist = (pokemon) => {
  let myPokemons = getWishlist()

  if (myPokemons.some((p) => p.id === pokemon.id)) {
    toast.info('Pokemon already in your wishlist')
    return false
  }

  myPokemons.push(pokemon)
  saveWishlist(myPokemons)
  toast.success('Pokemon added to your wishlist')
  return true
}

export const removeFromWishlist = (pokemonId) => {
  let myPokemons = getWishlist()
  myPokemons = myPokemons.filter((pokemon) => pokemon.id !== pokemonId)
  saveWishlist(myPokemons)
  toast.success('Pokemon removed from your wishlist')
}

export const isInWishlist = (pokemonId) => {
  const myPokemons = getWishlist()
  return myPokemons.some((pokemon) => pokemon.id === pokemonId)
}
