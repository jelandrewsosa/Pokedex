import * as React from 'react';
import { useState, useContext } from 'react';
import PokemonContext from '@/contexts/PokemonContext';
import style from './style.module.css';
import PokemonCard from '../PokemonCard';
import { useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function MyPokemons() {
  const { state } = useContext(PokemonContext);
  const { capturedPokemons } = state;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState();
  
  const goBack = () => {
    // We go back 1 step
    //       👇
    navigate(-1);
  };

  const {dispatch} = useContext(PokemonContext);

  const handleRemovePokemonClick = (event) => {
    event.preventDefault();
    const id = event.target.id;
    const index = id.replace('releasebtn-',"");
    console.log("asdasd");
    dispatch({
      type: 'REMOVE_POKEMON',
      payload: {index},
    });
    setOpen(false);
  }

  const handleClickOpen = (event) => {
    const id = event.target.id;
    const index = id.replace('release-',"");
    setClickedIndex(index)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <>
      <button type="button" className={style.goBackButton} onClick={goBack}>
        ← Back
      </button>
      <div className={style.container}>
        {capturedPokemons.map((pokemon, index) => (
          <>
            <PokemonCard key={`${pokemon}-${index}`} name={pokemon} />
            <Button variant="outlined" onClick={handleClickOpen} type="button" className={style.button} id={`release-${index}`} key={`release-${index}`}>Release</Button>
          </>
        ))}
      </div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to release this pokemon?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Releasing this pokemon will permanently delete it from your storage. Do you still want to continue?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleRemovePokemonClick} id={`releasebtn-${clickedIndex}`} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MyPokemons;
