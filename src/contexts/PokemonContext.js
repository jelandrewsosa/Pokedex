import { createContext } from 'react';

const PokemonContext = createContext({
  capturedPokemons: [], // 👈 Always add a default value
});

// You have more ways to improve this context
// like adding all fetched pokemons, so the next time we visit the same type, we already have their records on the state
export default PokemonContext;
