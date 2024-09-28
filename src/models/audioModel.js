const { pool } = require('../config/conn')


const getAll = async () => {
    try {
        const {rows} = await pool.query('SELECT * FROM audios;')

        console.log(rows)

        return rows 
    } catch (error) {
        console.log(error)
    }
}

const getByID = async (id) => {
    try {
        const {rows} = await pool.query(`SELECT * FROM audios WHERE id = ${id};`)

        return rows 
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
  getAll,
  getByID
}