const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Role extends Model {}

Role.init(
  {
    nombre: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "roles",
  }
);

module.exports = Role;
