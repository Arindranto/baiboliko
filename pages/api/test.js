export default function handler(req, res) {
     return res.status(200).send({ query: 'SELECT * FORM database WHERE id_value = ' + req.body.id_value })
}