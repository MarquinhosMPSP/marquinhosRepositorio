const puppeteer = require('puppeteer');

(async () => {

    let testUrl = "https://www.imdb.com/";

    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    await page.goto(testUrl, { waitUntil: 'networkidle2' });

    let data = await page.evaluate(() => {

        // let teste = document.querySelector('span[class="oneline"] > a > h3').innerHTML;

        // return teste;

        return 'x';
    });

    console.log('Teste: ', data);

    debugger;

    await browser.close();

})();