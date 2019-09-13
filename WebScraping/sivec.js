const sivec = async (browser) => {

    console.log('entrou sivec');

    let url = "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/sivec/login.html";

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

    await page.close()
    
    return true

};

module.exports = sivec