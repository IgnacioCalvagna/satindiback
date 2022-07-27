const Sequelize = require("sequelize");
const { Pool } = require("pg");
const pool = new Pool({ conectionString });

const db = new Sequelize("satindiback", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

const conectionString = process.env.DATABASE_URL 

module.exports = {db,pool};
