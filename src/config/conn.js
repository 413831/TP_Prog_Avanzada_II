const { Pool, Client } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tp_prog_av',
    password: 'tripl3_',
    port: 5432,
})


const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'tp_prog_av',
    password: 'tripl3_',
    port: 5432,
})

const dbconfig = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "tripl3_",
    DB: "tp_prog_av",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

module.exports = {
 client,
 pool,
 dbconfig
}