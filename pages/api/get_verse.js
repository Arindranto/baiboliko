import DbConnection from "../../db/utils/DbConnection"

export default function handler(req, res) {
     if (req.method === 'POST') {
          if (!req.body.id_boky) {
               return res.status(400).json({ message: "Not ID provided" })
          }
          if (!req.body.toko) {
               return res.status(400).json({ message: "No toko proposed" })
          }
          const { id_boky, toko, start = 0 } = req.body
          const query = 'SELECT DISTINCT andininy FROM toko_sy_andininy WHERE boky = ? AND toko = ? AND andininy >= ? ORDER BY andininy ASC'
          const con = new DbConnection()
          const andininy = con.allPluck(query, id_boky, toko, start)
          return res.status(200).json(andininy)
     }
     return res.status(404).end()
     return res.status(200).json({})
}