import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PokemonCard from '../PokemonCard';
import style from './style.module.css';

// Possible improvements
// - Make a back button by using the `useNavigate()` hook of `react-router-dom`
// - Make a search bar or filter by using `.filter()`
function PokemonsTypeView() {
  const [pokemons, setPokemons] = useState([]);
  const navigate = useNavigate();

  // This hook will get our route segment
  //                    👇
  const { typeId } = useParams();

  const fetchPokemons = async (url) => {
    const response = await fetch(url).then((res) => res.json());

    // You can use the .map() for better data structure of response
    setPokemons(response.pokemon);
  };

  const goBack = () => {
    // We go back 1 step
    //       👇
    navigate(-1);
  };

  useEffect(() => {
    // You can just pass the type ID, and let the `fetchPokemons` make the url
    fetchPokemons(`https://pokeapi.co/api/v2/type/${typeId}`);
  }, [typeId]);

  // console.log(typeId)

  return (

    <>
      <button type="button" className={style.goBackButton} onClick={goBack}>
        ← Back
      </button>
      <h1 className={style.header + (typeId ? ` ${style[typeId]}` : "")}>{(typeId)}</h1>
      <div className={style.container}>
      {pokemons.map(({ pokemon }, index) => (
        <PokemonCard key={`${pokemon.name}-${index}`} name={pokemon.name} type={typeId}/>
      ))}
    </div>
    </>

  );
}

export default PokemonsTypeView;
