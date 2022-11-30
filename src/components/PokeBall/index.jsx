import style from './style.module.css';

// You can improve this by adding animation when clicked
function PokeBall({ onClick }) {
  return (

    <div className={style.pokeBall} onClick={onClick}>
      <button type="button" className={style.button}></button>
    </div>
  );
}

export default PokeBall;
