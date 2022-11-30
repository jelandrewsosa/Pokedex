import { useReducer } from 'react';
import PokemonContext from '../../contexts/PokemonContext';
// We import `default` and `named` export
//              👇             👇
import pokemonReducer, { INITIAL_STATE } from '@/reducers/pokemon-reducer';
//                                             👆 WTF is that?!
// Your create-uplift-project can handle that, check your vite.config.js file

function PokemonContextComponent({ children }) {
  const [state, dispatch] = useReducer(pokemonReducer, INITIAL_STATE);

  return (

    // You can improve these by giving them concrete data and a specific function
    // instead of passing the state and dispatch from useReducer
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
}

export default PokemonContextComponent;
