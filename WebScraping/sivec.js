const puppeteer = require('puppeteer');

(async () => {
    let url = "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/sivec/login.html";
    const browser = await puppeteer.launch({
        headless: false
    });

    let page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle2'});
    await page.focus('#nomeusuario');
    await page.keyboard.type('Nome do usuario', {delay: 100});
    await page.focus('#senhausuario');
    await page.keyboard.type('senha1234', {delay: 100});

    await Promise.all([
        page.waitForNavigation(),
        page.click('#Acessar')
    ]);  

    await browser.close();
})();