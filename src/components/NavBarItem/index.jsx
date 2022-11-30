import style from './style.module.css';
import { Link } from 'react-router-dom';

function NavBarItem({ type }) {
  return (

    <div className={style.navBarItem + (type ? ` ${style[type]}` : "")}>
      <Link to={`/type/${type}`}>{type}</Link>
    </div>
  );
}

export default NavBarItem;
