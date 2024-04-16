import sqlite3, { Database } from 'sqlite3'
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
		const db = new sqlite3.Database(dbPath)
		if (create) {
			const initScriptPath = DbConnection.getInitPath()
			const queries = readFileSync(initScriptPath, { encoding: 'utf8' })
               db.serialize(
                    () => {
                         for (let query of queries.split(';')) {
                              db.exec(query)
                         }
                    }
               )
		}
		db.close(err => {
			if (err) console.log(err.message)
		})
	}

     openConnection() {
          if (!this.#connection)
               this.#connection = new sqlite3.Database(DbConnection.getDbPath())
          return this.#connection
     }
     startTransaction() {
          this.#connection = this.openConnection()
          this.#connection.run('BEGIN')
     }
     commitTransaction() {
          this.#connection = this.openConnection()
          this.#connection.run('COMMIT')
     }
     closeConnection() {
          if (this.#connection) {
               this.#connection.close()
               this.#connection = undefined
          }
     }
}

export default DbConnection
