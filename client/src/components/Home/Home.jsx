import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import {
  filterByType,
  getAllPokemons,
  getAllTypes,
  orderByName,
  orderByStrenght,
  filterByCreation,
} from "../../redux/actions";
import logo from "../../images/log.png";
import s from "./Home.module.css";
import LoadingPage from "../LoadingPage/LoadingPage";
import NotFound from "../NotFound/NotFound";
import FilterBar from "../FilterBar/FilterBar";
import logoGitHub from '../../images/github.jpg'
import logoLinkedIn from "../../images/linkedin.png"

export default function Home() {
  //estados globales
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.copyPokemons);
  const allTypes = useSelector((state) => state.types);
  const loading = useSelector((state) => state.loading);

  //estado local para ordenamiento alfabetico
  const [order, setOrder] = useState("");

  //estados locales para paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const indexOfLastPost = currentPage * pokemonsPerPage;//1*12=12    3*12=36
  const indexOfFirstPost = indexOfLastPost - pokemonsPerPage;//12-12=0    36-12=24
  const currentPokemons = allPokemons.slice(indexOfFirstPost, indexOfLastPost);/*toma desde el indice
  0 to 12..... o cuando se modifique el setCurrentPage ej 3 desde 24 a 36*/

  function paginado(pageNumber) {
    setCurrentPage(pageNumber);
  }

  //dispatch para carga de pokemons y tipos
  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getAllTypes());
  }, [dispatch]);

  //funciones de ordenamiento y filtrado
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`); /*necesario para que el renderizado ocurra, estado local que
     inicia vacio y se completa al ejecutar la funcion*/
  }

  function handleOrderByStr(e) {
    e.preventDefault();
    dispatch(orderByStrenght(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleFilterType(e) {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
  }

  function handleCreation(e) {
    e.preventDefault();
    dispatch(filterByCreation(e.target.value));
  }

  return (
    <div className={s.container}>
      <header className={s.header}>
        <div className={s.title}>
          <img src={logo} alt="Pokemon logo" className={s.logo} />
          <div>
            <Link to="/create" className={s.link}>
              Create Pokemon
            </Link>
          </div>
        </div>
        <div className={s.functional}>
          <div className={s.filters}>
            <FilterBar
              allTypes={allTypes}
              handleSort={handleSort}
              handleOrderByStr={handleOrderByStr}
              handleFilterType={handleFilterType}
              handleCreation={handleCreation}
            />
          </div>

          <div className={s.search}>
            <SearchBar />
          </div>
        </div>
      </header>

      <main className={s.main}>
        <div className={s.cards}>
          {loading ? (
            <LoadingPage />
          ) : currentPokemons.length > 0 ? (
            currentPokemons.map((p) => (
              <Card
                name={p.name}
                types={p.types}
                img={p.img}
                key={p.id}
                id={p.id}
                createdInDb={p.createdInDb}
              />
            ))
          ) : (
            <NotFound />
          )}
        </div>
        <div className={s.paginado}>
          <Paginado
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons}
            paginado={paginado}
          />
        </div>
      </main>

      <footer className={s.footer}>
      <span>
      <a href='https://github.com/SebaDAlessandro'>
        <img
          src={logoGitHub}
          alt="GitHub logo"
          width="40"
          height="30"
        />
      </a>
      </span>
      <span>
      <a href='https://www.linkedin.com/in/sebadalessandro/'>
        <img
          src={logoLinkedIn}
          alt="LinkedIn logo"
          width="35"
          height="30"
        />
      </a>
      </span>
      <div>
      By Sebastian DAlessandro
      </div>
      </footer>
      {/* si hay tiempo armar un componente footer!!! */}
    </div>
  );
}