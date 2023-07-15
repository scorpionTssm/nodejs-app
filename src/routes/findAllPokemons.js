const pokemons = require("../db/mock-pokemon");
const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize");
//const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    const limit = parseInt(req.query.limit) || 5;

    if (req.query.name) {
      const name = req.query.name;
      if (name.length < 3) {
        const message =
          "le term de recherche doit contenir au minimum 3 caractere";
        return res.status(400).json({ message });
      }
      return Pokemon.findAndCountAll({
        where: {
          name: { [Op.like]: `%${name}%` },
        },
        order: ["name"],

        limit: limit,
      }).then(({ count, rows }) => {
        const message = `il y'a ${count} qui correspond au term de recherche ${name}`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({ order: ["name"] })
        .then((pokemons) => {
          const message = "La liste des pokémons a bien été récupérée.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message = `la liste des pokemon n'a pas pus etre recuperer réesseyer plutard`;
          res.status(500).json({ message, data: error });
        });
    }
  });
};
