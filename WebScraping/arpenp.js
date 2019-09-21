const arpenp = async (browser) => {

    console.log('entrou arpenp');

    let url = "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/arpensp/login.html";

    let page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });


    await Promise.all([
        page.click('#main > div.container > div:nth-child(2) > div:nth-child(2) > div > a'),
        page.waitForNavigation(),
    ]);
    await Promise.all([
        page.waitForNavigation(),
        await page.click('li.item3 > a '),
        await page.waitForSelector('li.subitem1 > a'),
        await page.hover('#wrapper > ul > li.item3 > ul > li:nth-child(1) > a'),
        await page.click('#wrapper > ul > li.item3 > ul > li:nth-child(1) > a')
    ]);


    await page.waitForSelector('#principal > div > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type="text"]')
    await page.focus('#principal > div > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type="text"]')
    await page.keyboard.type('nprocesso', { delay: 10 })
    await page.click('#btn_pesquisar')

    await page.waitForSelector('#principal > div > form > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(2)')
    let data = await page.evaluate(() => {
        let cartregistro = document.querySelector('#principal > div > form > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(2)').innerText;


        let cns = document.querySelector('#principal > div > form > table:nth-child(3) > tbody > tr:nth-child(2) > td:nth-child(2) > b').innerText;
        let uf = document.querySelector('#principal > div > form > table:nth-child(3) > tbody > tr:nth-child(3) > td:nth-child(2) > b').innerText;
        let nome1 = document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(2) > td:nth-child(2)').innerText;
        let nvnome1 = document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(3) > td:nth-child(2)').innerText;
        let nome2 = document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(4) > td:nth-child(2)').innerText;
        let nvnome2 = document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(5) > td:nth-child(2)').innerText;
        let dataCasamento = document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(6) > td:nth-child(2)').innerText;
        let matricula = document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(8) > td:nth-child(2) > b').innerText;
        let dataEntrada = document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(9) > td:nth-child(2) > b').innerText;
        let dataRegistro = document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(10) > td:nth-child(2)').innerText;
        let acervo = document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(11) > td:nth-child(2)').innerText;
        let nlivro = document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(12) > td:nth-child(2)').innerText;
        let nfolha = document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(13) > td:nth-child(2)').innerText;
        let nregistro = document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(14) > td:nth-child(2)').innerText;
        let tipolivro = document.querySelector('#principal > div > form > table:nth-child(15) > tbody > tr:nth-child(15) > td:nth-child(2) > b').innerText;

        return {
            cartregistro,
            cns,
            uf,
            nome1,
            nvnome1,
            nome2,
            nvnome2,
            dataCasamento,
            matricula,
            dataEntrada,
            dataRegistro,
            acervo,
            nlivro,
            nfolha,
            nregistro,
            tipolivro
        }
    });
    
    await page.close()

    return data;
};

module.exports = arpenp