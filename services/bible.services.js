import DbConnection from '../db/utils/DbConnection'

function getBoky() {
     const con = new DbConnection()
     const query = 'SELECT id_boky, anarana FROM boky ORDER BY id_boky'
     return con.all(query)
}

export {
     getBoky
}