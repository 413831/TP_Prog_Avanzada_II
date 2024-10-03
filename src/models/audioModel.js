const { pool } = require('../config/conn')

const getAll = async () => {
    try {
        const {rows} = await pool.query('SELECT * FROM audios;')

        return rows 
    } catch (error) {
        return error
    }
}

const getByID = async (id) => {
    try {
        const {rows} = await pool.query(`SELECT * FROM audios WHERE id = ${id};`)

        return rows 
    } catch (error) {
        return error
    }
}

const create = async (data) => {
    try {
        const audio = data

        console.log(audio)

        const {rows} = await pool.query(`INSERT INTO audios(id, uuid, filename, titulo, duracion)
	                VALUES (
                    ${audio.id}, 
                    '${audio.uuid}', 
                    '${audio.filename}', 
                    '${audio.titulo}', 
                    ${audio.duracion}
                    );`)

        return rows 
    } catch (error) {
        return error
    }
}


module.exports = {
  getAll,
  getByID,
  create
}