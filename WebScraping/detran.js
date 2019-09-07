const puppeteer = require('puppeteer');

(async () => {
    let url = "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/detran/login.html";
    const browser = await puppeteer.launch({
        headless: false
    });


    let page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle2'});


    await page.focus('input[class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all campoObrigatorio ui-state-focus"]');
    await page.keyboard.type('nome do usuario', {delay: 10});
    await page.focus('input[class="ui-inputfield ui-password ui-widget ui-state-default ui-corner-all campoObrigatorio"]');
    await page.keyboard.type('senha1234', {delay: 10});

    await page.click('button[class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only botao"]')

    await Promise.all([
        page.waitForNavigation(),
        page.waitForSelector('#navigation_li_M_18'),
        page.hover('#navigation_li_M_18'),
        page.click('#navigation_a_F_18')
    ]);


    debugger;
    await browser.close();
})();