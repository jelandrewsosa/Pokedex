import { Link } from 'react-router-dom';
import style from './style.module.css';

function Home() {
  return (

    <div className='container'>
      <h1 className={style.navBarHeader}>Home</h1>
      <Link to={`/navbar`}>Types</Link>
    </div>
  );
}

export default Home;