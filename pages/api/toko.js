import { clearPreviewData } from 'next/dist/server/api-utils'
import puppeteer from 'puppeteer'

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

	// Locate the full title with a unique string
	const link = await page.waitForSelector('a::-p-text(Joda)')
     link.click()
     const textSelector = await page.waitForSelector('.Livre')
	const fullTitle = await textSelector?.evaluate(el => el.textContent)
     // console.log(fullTitle)
     const versets = await page.evaluate(() => {
          let versets = {}
          const versetsElement = document.querySelectorAll(".Usuel")
          let count = 0
          for (let verset of versetsElement) {
               if (verset.textContent && verset.innerHTML != "&nbsp;") {
                    count++
                    const numVerset = verset.textContent.match(/^\d+/)
                    let spans = verset.querySelectorAll('span')
                    // Titre et note
                    for (let i = 0; i < spans.length; i++) {
                         let span = spans[i]
                         const content = span.textContent
                         if (content.startsWith('[')) {
                              let type = 'note'
                              if (i == 0 && verset.innerHTML.indexOf("<span") == verset.textContent.indexOf(" ") + 1)
                                   type = 'titre'
                              versets[`${type}-${numVerset}`] = content.substring(content.lastIndexOf('*') + 1, content.lastIndexOf(']')).trim
                         }
                    }
                    // Verset
                    versets[numVerset] = verset.innerHTML.substring(numVerset? (numVerset?.length + 1): 0).replaceAll(/<span[^>]*>\[[^<]*\]<\/span>/g, '').replaceAll(/<span[^>]*>([^<]*)<\/span>/g, '[$1]').trim()
                    if (count == 5)
                         break
               }
          }
          return versets
     })
     // console.log(mainText)
	// Print the full title
	res.status(200).json({ livre: fullTitle, versets })

	await browser.close()
}
