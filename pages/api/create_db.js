import DbConnection from "../../db/utils/DbConnection"

export default async function handler(req, res) {
	try {
		console.log("Creating the database")
		DbConnection.createDatabase()
		console.log("Created Successfully")
		res.status(200).send('Created successfully')
	} catch (err) {
		res.status(400).send(err.message)
	}
}
