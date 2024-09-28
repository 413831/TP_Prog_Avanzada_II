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

module.exports = {
 client,
 pool
}