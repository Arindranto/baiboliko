const puppeteer = require('puppeteer')
const Database = require('better-sqlite3')
const path = require('path')
require('dotenv').config()


function insertFanampiny(toko, and, datas, con) {
	const regexp = new RegExp(`^(\\D+)-${and}$`)
	return (err, row) => {
		if (err) {
			throw err
		}
		const id_t_a = row['id_toko_sy_andininy']
		con.serialize(() => {
			const stt = con.prepare(
				'INSERT INTO fanampiny(toko_sy_andininy, marika, soratra) VALUES(?, ?, ?)'
			)
			for (const key of Object.keys(datas).filter(k => regexp.test(k))) {
				console.log('id_andininy ' + id_t_a)
				const mark =
					regexp.exec(key)[1] == 'titre' ? null : regexp.exec(key)[1]
				stt.run(id_t_a, mark, datas[key])
			}
			try {
				con.run('COMMIT TRANSACTION')
			} catch {}
		})
	}
}

async function insertBook(url, page, con) {
	console.log('Opening ' + url)
	await page.goto(url)
	await page.waitForSelector('.Livre')
	const titreParagraph = await page.waitForSelector('.Livre')
	const livre = await titreParagraph.evaluate(e => e.textContent)

	const data = { boky: livre, toko: null }
	console.log('Book ' + livre)
	const toko = await page.evaluate(() => {
		let count = 1
		let versets = {}
		let toko = []
		const versetsElement = document.querySelectorAll('.Usuel')
		for (let verset of versetsElement) {
			if (verset.textContent && verset.innerHTML != '&nbsp;') {
				const numVerset = verset.textContent.match(/^\d+/)
				if (numVerset == 1 && Object.keys(versets).length > 0) {
					toko.push({ ...versets })
					versets = {}
					count++
				}
				let spans = verset.querySelectorAll('span[style="color:green"]')
				// Titre et note
				for (let i = 0; i < spans.length; i++) {
					let span = spans[i]
					let content = span.textContent
					if (content.startsWith('[')) {
						content = content.substring(1, content.length - 1)
						let type = 'note'
						if (
							!content.startsWith('*')
							/*i == 0 &&
							verset.innerHTML.indexOf('<span') ==
								verset.textContent.indexOf(' ') + 1*/
						)
							type = 'titre'

						// console.log(content)
						let key = `${
							type == 'titre' ? type : content.match(/^\*+/)
						}-${numVerset}`
						content = content.replace(/^\*+/, '')
						content = content.trim()
						versets[key] = content
						/*.substring(
							content.indexOf('*') + 1,
							content.lastIndexOf(']')
						).trim()*/
					}
				}
				// Verset
				versets[numVerset] = verset.innerHTML
					.substring(numVerset ? numVerset?.length + 1 : 0)
					.replaceAll(/<span[^>]*>\[[^<]*\]<\/span>/g, '')
					.replaceAll(/<span[^>]*>([^<]*)<\/span>/g, '[$1]')
					.trim()
				// if (count == 5) break
			}
		}
		// The last
		if (Object.keys(versets).length > 0) toko.push({ ...versets })
		return toko
	})

	data.toko = toko

	await page.goBack()
	console.log('Going back')

	con.serialize(() => {
		con.get(
			`INSERT INTO boky(anarana) VALUES ('${data.boky}') RETURNING id_boky`,
			(err, row) => {
				if (err) {
					throw err
				}
				const book_id = row['id_boky']
				console.log('Book Id: ', book_id)
				for (let i = 0; i < data.toko.length; i++) {
					const toko = i + 1
					console.log('Toko ' + toko)
					con.serialize(() => {
						let stt = con.prepare(
							'INSERT INTO toko_sy_andininy(boky, toko, andininy, soratra) VALUES(?, ?, ?, ?) RETURNING id_toko_sy_andininy'
						)
						for (const and of Object.keys(data.toko[i]).filter(e =>
							/^\d+$/.test(e)
						)) {
							stt.get(
								book_id,
								toko,
								and,
								data.toko[i][and],
								insertFanampiny(toko, and, data.toko[i], con)
							)
						}
						// stt = con.prepare('INSERT INTO fanampiny(toko_sy_andininy, marika, soratra) VALUES(?, ?, ?)')
					})
				}
			}
		)
	})
}

async function populate() {
	/*let book = process.argv[2]
	if (!book) {
		console.error('Book not given')
		process.exit()
	}
	book = book.toLowerCase()*/
	const classNames = {
		header: '.ChapterContent_heading__xBDcs',
		verset: '.ChapterContent_verse__57FIw',
		num_verset: '.ChapterContent_label__R2PLt',
		texte_verset: '.ChapterContent_content__RrUqA'
	}

	const dbPath = path.join(process.cwd(), 'db', 'baiboliko.db')
	console.log('Opening the database at ' + dbPath)
	//const con = new Database(dbPath)
	// return
	console.log('Opening the page')
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto('https://www.bible.com/bible/873/GEN.1.MBP')
	// Set screen size
	await page.setViewport({ width: 1080, height: 1024 })

	// Type into search box
	// await page.type('.devsite-search-field', 'automate beyond recorder');

	// Wait and click on first result
	// const searchResultSelector = '.Livre';
	// await page.waitForSelector(searchResultSelector);
	// await page.click(searchResultSelector);
	//console.log(classNames)

	let text = await getText(page)
	console.log(text)
	let limit = 1, maxLimit = 2
	let nextPage
	do {
		nextPage = await page.waitForSelector('div.\\[pointer-events\\:all\\] + div.\\[pointer-events\\:all\\]')	// Next button
		try {
			nextPage = await nextPage.$eval('a', e => e?.href)
		}
		catch {
			nextPage = null
		}
		if (nextPage) {
			console.log(nextPage);
			await page.goto(nextPage)
			let text = await getText(page)
			console.log(text)
		}
		limit++
	} while (nextPage && limit < maxLimit)

	await browser.close()
}

async function getText(page) {
	text = await page.$$eval('.ChapterContent_verse__57FIw', async el => {
		return el.map(v => {
			const notes = v.querySelectorAll('.ChapterContent_body__O3qjr span')
			let fanampiny = ""
			for (let f of notes) {
				fanampiny += f.textContent + " "
			}
			return {
				fanampiny: fanampiny?.trim(), 
				andininy: v.querySelector('.ChapterContent_label__R2PLt')?.textContent,
				soratra: v.querySelector('.ChapterContent_content__RrUqA')?.textContent
			}
		}).filter(v => v.andininy && v.soratra)
	})
	return text
} 



populate().then(() => {
	console.log('Done')
})

