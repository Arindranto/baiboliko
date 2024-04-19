import DbConnection from "../../db/utils/DbConnection"

export default function handler(req, res) {
     if (req.method === 'POST') {
          if (!req.body.id_boky) {
               return res.status(400).json({ message: "Not ID provided" })
          }
          const { id_boky } = req.body
          const query = 'SELECT DISTINCT toko FROM toko_sy_andininy WHERE boky = ? ORDER BY toko ASC'
          const con = new DbConnection()
          const toko = con.allPluck(query, id_boky)
          return res.status(200).json(toko)
     }
     return res.status(404).end()
}