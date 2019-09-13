const { of, from } = require('rxjs');
const { mergeMap, tap } = require('rxjs/operators');

// Importando arquivos e classes
const Scraper = require('./controller/scraper')
const { jucesp, siel, sivec, detran } = require('../../WebScraping')

var isLogin = false

let mainUrl = "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com"

const scraper = new Scraper({
    headless: false
});

let portaisData = [];

(async () => {
    try {
        await scraper.doCreate()

        scraper.doListen('request', login)

        await scraper.doRun(async (browser, page) => {
            await page.goto(mainUrl)
            
            const jucesp$ = from(jucesp(browser))
            const siel$ = from(siel(browser))
            const sivec$ = from(sivec(browser))

            of(jucesp$, siel$, sivec$)
                .pipe(
                    mergeMap(e => e),
                    tap(val => portaisData.push(val))
                )
                .subscribe({
                    error: err => console.log(err),
                    complete: async () => {
                        await browser.close()
                        console.log(portaisData)
                    }
                })
        })
    } catch (error) { }
    debugger;
})();

login = (request) => {
    const frame = request.frame();
    if (!isLogin && frame.url() !== "about:blank") {
        isLogin = frame.url().includes('login')
        if(isLogin) {
            scraper.doLogin()
        }
    }
}

