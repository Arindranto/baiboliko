import { clearPreviewData } from 'next/dist/server/api-utils'
import puppeteer from 'puppeteer'
import { insertBook } from '../../db/utils/DbPopulate'

export default async function handler(req, res) {
	// Launch the browser and open a new blank page
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	// Navigate the page to a URL
	await page.goto(process.env.BAIBOLY_URL)

	// Set screen size
	await page.setViewport({ width: 1080, height: 1024 })

	// Type into search box
	// await page.type('.devsite-search-field', 'automate beyond recorder');

	// Wait and click on first result
	// const searchResultSelector = '.Livre';
	// await page.waitForSelector(searchResultSelector);
	// await page.click(searchResultSelector);
	await page.waitForSelector('.col-6')
	const [taloha, vaovao] = await page.$$eval('.col-6', cols => cols.slice(0, 2).map(c => {
          let links = []
          c.querySelectorAll('a').forEach(l => links.push([l.innerText, l.href]))
          return links
     }))

     for (const [title, link] of taloha) {
          console.log(title)
		// await page.goTo(link)

     }
	/*for (const link of testTaloha) {
		link.click()
	}*/
	// console.log(mainText)
	// Print the full title
	res.status(200).json({ taloha, vaovao })

	await browser.close()
}
