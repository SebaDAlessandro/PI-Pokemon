import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import s from "./Detail.module.css";
import other from "../../images/default.jpg";
import LoadingPage from "../LoadingPage/LoadingPage";
import NotFound from "../NotFound/NotFound";

export default function Detail() {
  const dispatch = useDispatch();
  const params = useParams();
  const pokemon = useSelector((state) => state.detail);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(getPokemonById(params.id));//props.match.params.id
  }, [dispatch, params.id]);

  return (
    <div className={s.container}>
      <header className={s.header}>
        <div className={s.funcional}>
          <Link to="/home" className={s.link}>
            Back Home
          </Link>
        </div>
      </header>
      <main className={s.main}>
        {loading ? (
          <LoadingPage />
        ) : pokemon.length > 0 ? (
          pokemon.map((p) => (
            <div className={s.cardContainer} key={p}>
              <div className={s.card}>
                <div className={s.imageCont}>
                  <h1 className={s.title}>{p.name}</h1>
                  <img
                    src={p.img ? p.img : other}
                    alt="Pokemon frontal pic"
                    className={s.img}
                  />
                </div>
                <div className={s.col}>
                  <div className={s.info}>
                    <h2 className= {s.titleInfo}>Pokemon Info</h2>
                    <p>
                      <strong>Id: </strong> {p.id}
                    </p>
                    <p>
                      <strong>Type: </strong>
                      {!p.createdInDb
                        ? p.types + " "
                        : p.types.map((e) => e.name + " ")}
                    </p>
                    <p>
                      <strong>Hp: </strong> {p.hp}
                    </p>
                    <p>
                      <strong>Strength: </strong> {p.attack}
                    </p>
                    <p>
                      <strong>Deffense: </strong> {p.defense}
                    </p>
                    <p>
                      <strong>Speed: </strong> {p.speed}
                    </p>
                    <p>
                      <strong>Height: </strong> {p.height}
                    </p>
                    <p>
                      <strong>Weight: </strong> {p.weight}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NotFound />
        )}
      </main>
      <footer className={s.footer}>By Sebastian DAlessandro</footer>
    </div>
  );
}