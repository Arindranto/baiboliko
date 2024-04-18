import Database from 'better-sqlite3'
import path from 'path'
import { existsSync, readFileSync, mkdirSync } from 'fs'

class DbConnection {
	#connection
     static getDirName() {
          return path.join(process.cwd(), 'db')
     }
     static getInitPath() {
          return path.join(DbConnection.getDirName(), 'init.sql')
     }
     static getDbPath() {
          return path.join(DbConnection.getDirName(), process.env.DB_NAME)
     }
	static createDatabase() {
		let create = false
		const dbDir = DbConnection.getDirName()
		if (!existsSync(dbDir)) {
			mkdirSync(dbDir)
		}
		const dbPath = DbConnection.getDbPath()
		if (!existsSync(dbPath)) {
			create = true
		}
		const db = new Database(dbPath)
		if (create) {
			const initScriptPath = DbConnection.getInitPath()
			const queries = readFileSync(initScriptPath, { encoding: 'utf8' })
               const createTransaction = db.transaction((lines) => {
                    for (const line of lines) db.prepare(line).run()
               })
               createTransaction(...queries)
		}
		db.close(err => {
			if (err) console.log(err.message)
		})
	}

     #doQuery(query, ops, ret = true, ...values) {
          let connection = this.openConnection()
          let ret = null
          if (values.length > 0) {
               ret = connection.prepare(query)[ops]?.(...values)
          }
          else {
               ret = connection.prepare(query)[ops]()
          }
          this.closeConnection()
          if (ret)
               return true
     }

     run(query, ...values) {
          this.#doQuery(query, 'run', false, ...values)
     }

     get(query, ...values) {
          return this.#doQuery(query, 'get', true, ...values)
     }

     all(query, ...values) {
          return this.#doQuery(query, 'all', true, ...values)
     }

     openConnection() {
          if (!this.#connection)
               this.#connection = new Database(DbConnection.getDbPath())
          return this.#connection
     }
     startTransaction() {
          this.#connection = this.openConnection()
          this.#connection.run('BEGIN TRANSACTION')
     }
     commitTransaction() {
          this.#connection = this.openConnection()
          this.#connection.run('COMMIT TRANSACTION')
     }
     closeConnection() {
          if (this.#connection) {
               this.#connection.close()
               this.#connection = undefined
          }
     }
}

export default DbConnection
