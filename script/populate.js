const puppeteer = require('puppeteer');
const sqlite = require('sqlite3')
const path = require('path')
require('dotenv').config()

async function populate() {
     // const db = new sqlite.Database
	let book = process.argv[2]
	if (!book) {
		console.error('Book not given')
		process.exit()
	}
	book = book.toLowerCase()
     console.log(path.join(__dirname, 'db', 'baiboliko.db'))
     // return
	console.log('Opening the page')
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto(process.env.BAIBOLY_URL)

	// Set screen size
	await page.setViewport({ width: 1080, height: 1024 })

	// Type into search box
	// await page.type('.devsite-search-field', 'automate beyond recorder');

	// Wait and click on first result
	// const searchResultSelector = '.Livre';
	// await page.waitForSelector(searchResultSelector);
	// await page.click(searchResultSelector);
	console.log('Getting the pages')
	await page.waitForSelector('.col-6')
	const [taloha, vaovao] = await page.$$eval('.col-6', cols =>
		cols.slice(0, 2).map(c => {
			let links = {}
			c.querySelectorAll('a').forEach(l => (links[l.innerText.toLowerCase()] = l.href))
			return links
		})
	)
	
	console.log(taloha)
	if (!taloha[book]) {
		if (!vaovao[book]) {
			console.error('Book not found')
			process.exit()
			return
		}
		console.log('New Testament Book: ' + book)
		await page.goto(vaovao[book])
		await page.waitForSelector('.Livre')
	}
	else {
		console.log('Old Testament Book: ' + book)
		await page.goto(taloha[book])
	}

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
					let content = span.textContent
					if (content.startsWith('[')) {
						content = content.substring(1, content.length -1).trim()
						let type = 'note'
						if (!content.startsWith('*')
							/*i == 0 &&
							verset.innerHTML.indexOf('<span') ==
								verset.textContent.indexOf(' ') + 1*/
						)
							type = 'titre'
						// console.log(content)
						let key = `${type == 'titre'? type: content.match(/^\*+/)}-${numVerset}`
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
				if (count == 5) break
			}
		}
		return versets
	})
	console.log(versets)
	/*for (const link of taloha) {
		const textePage = await browser.newPage()
		await browser.newPage()
		await textePage.goto(link)
		const bokyHTML = await textePage.waitForSelector('.Livre')
		const boky = await bokyHTML?.evaluate(l => l.textContent)
		console.log(boky)
		await textePage.close()
		console.log(link)
	}*/
	/*for (const link of testTaloha) {
		link.click()
	}*/
	// console.log(mainText)
	// Print the full title
	// res.status(200).json({ taloha, vaovao })

	await browser.close()
}

populate().then(() => {
	console.log('Done')
})
