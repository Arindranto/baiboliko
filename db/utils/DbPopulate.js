import DbConnection from './DbConnection'
import sqlite3 from 'sqlite3'
export async function insertBook(page) {
     let db = (new DbConnection()).openConnection()

     let sqlite = new sqlite3.Database('')

     let bokySQL = 'INSERT INTO boky(anarana) VALUES (?)'

	const textSelector = await page.waitForSelector('.Livre')
	const fullTitle = await textSelector?.evaluate(el => el.textContent)
     // console.log(fullTitle)
	// console.log(fullTitle)

	const versets = await page.evaluate(() => {
		let versets = {}
		const versetsElement = document.querySelectorAll('.Usuel')
		let count = 0
		for (let verset of versetsElement) {
			if (verset.textContent && verset.innerHTML != '&nbsp;') {
				count++
				const numVerset = verset.textContent.match(/^\d+/)
				let spans = verset.querySelectorAll('span[style="color:green"]')
				// Titre et note
				for (let i = 0; i < spans.length; i++) {
					let span = spans[i]
					const content = span.textContent
					if (content.startsWith('[')) {
						let type = 'note'
						if (
							i == 0 &&
							verset.innerHTML.indexOf('<span') ==
								verset.textContent.indexOf(' ') + 1
						)
							type = 'titre'
						versets[`${type}-${numVerset}`] = content.substring(
							content.lastIndexOf('*') + 1,
							content.lastIndexOf(']')
						).trim
					}
				}
				// Verset
				versets[numVerset] = verset.innerHTML
					.substring(numVerset ? numVerset?.length + 1 : 0)
					.replaceAll(/<span[^>]*>\[[^<]*\]<\/span>/g, '')
					.replaceAll(/<span[^>]*>([^<]*)<\/span>/g, '[$1]')
					.trim()
				if (count == 5) break
			}
		}
	})
}
