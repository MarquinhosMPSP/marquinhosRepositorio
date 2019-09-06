const puppeteer = require('puppeteer');

(async () => {
    let url = "https://www.google.com/";
    const browser = await puppeteer.launch({
        headless: false
    });

    let page = await browser.newPage();
    
    await page.goto(url, {waitUntil: 'networkidle2'});
    let data = await page.evaluate(() =>{
        let texto = document.querySelector('input[class="gNO89b"]').getAttribute("value");
        return {texto}
    });

    console.log(data);

    debugger;
    await browser.close();


})();