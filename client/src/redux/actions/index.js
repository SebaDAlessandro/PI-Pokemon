const axios = require("axios");

export function getAllPokemons() {
  return async function (dispatch) {
    dispatch({
      type: "LOADING",
    });
    try {
      const json = await axios.get("http://localhost:3001/pokemons");
      return dispatch({
        type: "GET_ALL_POKEMONS",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getPokemonById(id) {
  return async function (dispatch) {
    dispatch({
      type: "LOADING",
    });
    try {
      const json = await axios.get("http://localhost:3001/pokemons/" + id);
      return dispatch({
        type: "GET_POKEMON_BY_ID",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getPokemonByName(name) {
  return async function (dispatch) {
    dispatch({
      type: "LOADING",
    });
    try {
      let json = await axios.get("http://localhost:3001/pokemons?name=" + name);
      return dispatch({
        type: "GET_POKEMON_BY_NAME",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
      alert(`Sorry the name ${name} was not found. Please try again`);
    }
  };
}

export function getAllTypes() {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: "GET_ALL_TYPES",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function filterByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}

export function filterByCreation(payload) {
  return {
    type: "FILTER_BY_CREATION",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByStrenght(payload) {
  return {
    type: "ORDER_BY_STRENGTH",
    payload,
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.post(
        "http://localhost:3001/pokemons",
        payload
      );
      return dispatch({
        type: "POST_POKEMON",
        payload: response,
      });
    } catch (e) {
      console.log(e);
    }
  };
}