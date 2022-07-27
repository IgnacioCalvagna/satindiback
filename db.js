const Sequelize = require("sequelize");
const { Pool } = require("pg");
const conectionString = process.env.DATABASE_URL 
const pool = new Pool({ conectionString });

const db = new Sequelize("satindiback", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});



module.exports = {db,pool};
