import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import NotFoundView from './components/NotFoundView';
import PokemonDetailView from './components/PokemonDetailView';
import PokemonContextComponent from './components/PokemonContextComponent';
import MyPokemons from './components/MyPokemons';
import NavBar from './components/NavBar';
import Home from './components/Home';

// import PokemonsTypeView from './components/PokemonsTypeView';
const PokemonsTypeView = lazy(() => import('./components/PokemonsTypeView'));
//                         👆
// You can lazy-load your component, this is recommended when a component has many operations before loading the actual component
// @see {@link https://beta.reactjs.org/apis/react/lazy#lazy-loading-components-with-suspense-suspense-for-code-splitting}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PokemonContextComponent>
      <BrowserRouter>
        <Routes>
          <Route path="/Pokedex" element={<App />} />
          <Route path="/home" element={<Home />}/>
          <Route path="/navbar" element={<NavBar />}/>
          <Route path="/*" element={<NotFoundView />} />
          <Route
            path="/type/:typeId"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PokemonsTypeView />
              </Suspense>
            }
          />
          <Route path="/pokemon/:name" element={<PokemonDetailView />} />
          <Route path="/mypokemons" element={<MyPokemons />} />
        </Routes>
      </BrowserRouter>
    </PokemonContextComponent>
  </React.StrictMode>
);
