import { useEffect, useState } from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom"; // 👈 You can wrap the card into this

// Possible features:
// - Add more details like stats, base_experience, abilities, etc
// - Make it look like an actual Card
function PokemonCard({ name, type }) {
  const [artwork, setArtwork] = useState("");
  const [firstType, setFirstType] = useState("");
  const [secondType, setSecondType] = useState("");

  const fetchPokemons = async (url) => {
    const response = await fetch(url).then((res) => res.json());
    // You can handle `null` value of response, like adding a default artwork
    setArtwork(response.sprites.other["official-artwork"].front_default);
    setFirstType(response.types[0].type.name);

    if (response.types.length > 1) {
      // You can handle `null` value of response, like adding a default artwork
      setSecondType(response.types[1].type.name);
    }
  };

  useEffect(() => {
    // You can just pass the type ID, and let the `fetchPokemons` make the url
    fetchPokemons(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }, [name]);
  // You can replace the div into Link and link it into a detail view
  return (

    <Link to={`/pokemon/${name}`} className={style.container}>
      <img src={artwork} alt="art-work" className={style.image} />
      <div className={style.name}>{name}</div>
      <span
        className={
          style.typesContainer + (firstType ? ` ${style[firstType]}` : "")
        }
      >
        {firstType}
      </span>
      <span
        className={
          style.typesContainer + (secondType ? ` ${style[secondType]}` : "")
        }
      >
        {secondType}
      </span>
    </Link>
  );
}

export default PokemonCard;
