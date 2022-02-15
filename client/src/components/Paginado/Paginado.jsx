import React from "react";
import s from "./Paginado.module.css";

//ver video: https://www.youtube.com/watch?v=221WbTLZZXQ

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
                                  //       12           [...]   funcion paginado (modifica el estado current)
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
    //La función Math.ceil() devuelve el entero mayor o igual más próximo a un número dado
    //=> 3.33 => 4 paginas
    pageNumbers.push(i);
  }

  return (
    <div className={s.containerPag}>
      <ul className={s.listPag}>
        {pageNumbers &&
          pageNumbers.map((p) => (
            <li key={p} className={s.item}>
              <a onClick={() => paginado(p)} href="#" className={s.link}>
                {p}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}