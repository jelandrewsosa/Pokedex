import { useContext, useEffect, useState } from "react";
import style from "./style.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
//        👆
// You can wrap the card into this
import PokeBall from "../PokeBall";
import PokemonContext from "@/contexts/PokemonContext";
import { ACTION_ADD_POKEMON } from "@/reducers/pokemon-reducer";

// Possible features:
// - Add more details like stats, base_experience, abilities, etc
// - Make it look like an actual Card
function PokemonDetailView() {
  const [artwork, setArtwork] = useState("");
  const [description, setDescription] = useState("");
  const [firstSkill, setFirstSkill] = useState("");
  const [secondSkill, setSecondSkill] = useState("");
  const [type, setType] = useState("");
  const { name } = useParams();
  // Hook to navigate without using Link component
  const navigate = useNavigate();
  const { dispatch } = useContext(PokemonContext);

  const fetchPokemons = async (url) => {
    const response = await fetch(url).then((res) => res.json());
    // You can handle `null` value of response, like adding a default artwork
    setArtwork(response.sprites.other["official-artwork"].front_default);
    setFirstSkill(response.abilities[0].ability.name);
    if(response.abilities.length > 1) {
      setSecondSkill(response.abilities[1].ability.name);
    }
    setType(response.types[0].type.name);
  };

  const fetchPokemonSpecies = async (url) => {
    const descriptionResponse = await fetch(url).then((res) => res.json());
    setDescription(descriptionResponse.flavor_text_entries[0].flavor_text);
  };

  const goBack = () => {
    // We go back 1 step
    //       👇
    navigate(-1);
  };

  const onCapture = () => {
    dispatch({
      type: ACTION_ADD_POKEMON,
      payload: name,
    });
    // We passed type and payload as an object, because we are only allowed to pass one (1) argument
    // So object is the best way to group them
  };

  useEffect(() => {
    // You can just pass the type ID, and let the `fetchPokemons` make the url
    fetchPokemons(`https://pokeapi.co/api/v2/pokemon/${name}`);
    fetchPokemonSpecies(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
  }, [name, type]);

  // You can replace the div into Link and link it into a detail view
  return (

    <div className={style.container}>
      <button type="button" className={style.goBackButton} onClick={goBack}>
        ← Back
      </button>
      <Link className={style.myPokemon} to="/mypokemons">
        Go to My Pokemons
      </Link>
      <h1>{name}</h1>
      <img src={artwork} alt="art work" />
      <div className={style.ability}>
        <span className={firstSkill && ` ${style[type]}`}>{firstSkill}</span>
        <span className={secondSkill && ` ${style[type]}`}>{secondSkill}</span>
      </div>
      <div className={style.pokeBallContainer}>
        <PokeBall onClick={onCapture} />
      </div>
      <p>{description}</p>
    </div>
  );
}

export default PokemonDetailView;
