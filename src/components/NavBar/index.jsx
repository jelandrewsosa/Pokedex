import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarItem from '../NavBarItem';
import style from './style.module.css';

function NavBar() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchTypes = async () => {
    // Try not to mix the usage of .then and async/await
    // For this example, this is acceptable
    const response = await fetch('https://pokeapi.co/api/v2/type').then((res) =>
      res.json()
    );

    // You can handle any errors using the try...catch
    setItems(response.results);
  };

  const goBack = () => {
    // We go back 1 step
    //       👇
    navigate(-1);
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (

    <>
      <button type="button" className={style.goBackButton} onClick={goBack}>
      ← Back
    </button>
    <h1 className={style.navBarHeader}>Types</h1>
    <div className={style.navBar}>
      {items.map((item) => (
        // Always add `key` props on lists
        <NavBarItem key={item.name} type={item.name}>
          {item.name}
        </NavBarItem>
      ))}
    </div>
    </>
  );
}

export default NavBar;
