const { Pokemon } = require("../db/sequelize");
const { ValidationError } = require("sequelize");

module.exports = (app) => {
  app.put("/api/pokemons/:id", (req, res) => {
    const id = req.params.id;

    Pokemon.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        return Pokemon.findByPk(id).then((pokemon) => {
          if (pokemon === null) {
            const message = `le pokemon demander n'existe pas réesseyer plutard`;
            res.status(500).json({ message, data: error });
          }
          if (error instanceof UniqueConstraintError) {
            return res
              .status(400)
              .json({ message: error.message, data: error });
          }
          const message = `Le pokémon ${pokemon.name} a bien été modifié.`;
          res.json({ message, data: pokemon });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `le pokemon n'a pas pus etre modifié réesseyer plutard`;
        res.status(500).json({ message, data: error });
      });
  });
};
