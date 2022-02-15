const express = require("express");
const app = express.Router();
const axios = require("axios");
const { Type } = require("../db");

app.get("/", async (req, res) => {
  try {
    //traigo la info de la url
    const typesUrl = await axios.get("https://pokeapi.co/api/v2/type");
    //uso la data de esa url que es un obj con != props, uso results que tiene todos los types con su name
    const typesArray = await typesUrl.data.results;
    //por cada elemento creo en mi tabla una nueva instancia de Types donde el name va a ser el nombre de c/ elemento
    typesArray.forEach((t) => {
      Type.findOrCreate({
        where: {
          name: t.name,
        },
      });
    });

    const typeArray = await Type.findAll();
    res.send(typesArray);
  } catch (e) {
    console.log(e);
  }
});

module.exports = app;


/*
Sequelize - findOrCreate
El método findOrCreate creará una entrada en la tabla a menos que pueda encontrar una que cumpla con 
las opciones de consulta. En ambos casos, devolverá una instancia (ya sea la instancia encontrada o la 
instancia creada) y un valor booleano que indica si esa instancia se creó o ya existía.

La opción where se considera para encontrar la entrada y la opción defaults se usa para definir qué se 
debe crear en caso de que no se encuentre nada. Si los valores predeterminados no contienen valores para
cada columna, Sequelize tomará los valores dados en Where (si está presente).

*/