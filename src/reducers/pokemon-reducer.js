// 👇 You can extract these actions to a separate file
export const ACTION_ADD_POKEMON = 'ADD_POKEMON';
export const ACTION_REMOVE_POKEMON = 'REMOVE_POKEMON';

// 👇 You can extract this to a separate file
export const INITIAL_STATE = {
  capturedPokemons: [],
};

// A reducer callback will receive the state, the action that dispatch
function pokemonReducer(state, action) {
  // You can use a normal if...else statement
  // But normally we can use switch...case statement
  switch (action.type) {
    case 'ADD_POKEMON': // 👈 Normally you can use this, but a better way is to extract them to avoid misspelled
    case ACTION_ADD_POKEMON:
      return {
        ...state, // 👈 Remember spread operator? To merge objects and arrays
        capturedPokemons: [...state.capturedPokemons, action.payload],
        // The payload property will be part of dispatch
      };
    // You can make improvements when adding like check if payload is already in the capturedPokemons
    // You can also use Map or Set or make you own class, but object is simplier 👌

    case ACTION_REMOVE_POKEMON:
      state.capturedPokemons.splice(action.payload.index, 1); // 👈 You can also use the .findIndex here
      // const index = state.capturedPokemons.findIndex(
      //   (pokemon) => pokemon === action.payload
      // );
      // if (index !== -1) {
      //   state.capturedPokemons.splice(index);
      // }

      return {
        ...state, // 👈 Just make sure to always return the state
      };

    default:
      return state;
  }
}

// 🔑 to remember: Reducer only evaluates the state nothing else
// DO NOT fetch data when adding pokemon
export default pokemonReducer;
