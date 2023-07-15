const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon.js");
const UserModel = require("../models/user.js");
const pokemons = require("./mock-pokemon.js");
const bcrypt = require("bcryptjs");

const sequelize = new Sequelize("sql7632937", "sql7632937", "XrmXRmgIc5", {
  host: "sql7.freesqldatabase.com",
  dialect: "mysql",

  logging: false,
});

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then(pokemon);
    });
    bcrypt
      .hash("pikachu", 10)
      .then((hash) => {
        User.create({
          username: "pikachou",
          password: hash,
        });
      })
      .then(console.log("user saved"));

    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
