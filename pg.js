const {Pool} = require('pg');


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    
  
})
pool.connect();
module.exports = pool
