const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom est déja pris",
        },
        validate: {
          notEmpty: { msg: "veuillez saisir un nom correct" },
          notNull: { msg: "les points de vie son une proprieté requise" },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "utiliser uniquement des nombres entier" },
          min: {
            args: [0],
            msg: "les points de vie doivent etre superieur ou egal à 0",
          },
          max: {
            args: [999],
            msg: "les points de vie doivent etre inferieur  ou egal à 999",
          },
          notNull: { msg: "les points de vie son une proprieté requise" },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "utiliser uniquement des nombres entier" },
          min: {
            args: [0],
            msg: "les points de dégats doivent etre superieur ou egal à 0",
          },
          max: {
            args: [99],
            msg: "les points de dégats doivent etre inferieur  ou egal à 99",
          },
          notNull: { msg: "les dégats son une proprieté requise" },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "veuillez saisir un url correct" },
          notNull: { msg: "l'image est une proprieté requise" },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypesValid(value) {
            if (!value) {
              throw new Error("un pokemon doit au moins avoir un type");
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type d'un pokemon doit appartenir a la liste suivante : ${validTypes}`
                );
              }
            });
            if (value.split(",").length > 3) {
              throw new Error("un pokemon ne peut avoir plus de 3 types");
            }
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
