const arisp = async (browser) => {

    console.log('entrou arisp');

    let url = "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/arisp/login.html";

    let page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2' });

   
        await Promise.all([
            page.click('#btnCallLogin'),   
        ])
    
        await Promise.all([
            page.waitForNavigation(),
            page.click('#btnAutenticar')
        ])
    
        await Promise.all([
            page.waitForNavigation(),
            page.hover('#liInstituicoes > a'),
            await page.waitForSelector('#liInstituicoes > div > ul > li:nth-child(3) > a'),
            page.click('#liInstituicoes > div > ul > li:nth-child(3) > a')
        ])
        
    
        await Promise.all([
            page.waitForNavigation(),
            page.click('#Prosseguir')
    
        ])
    

        await page.waitForSelector('#main > div.form-default > div.contentEditor.consulta-bdlight-holder.grid-12 > div.list-wrap > div > div.selectorAll > div > input[type=checkbox]')
        page.click('#main > div.form-default > div.contentEditor.consulta-bdlight-holder.grid-12 > div.list-wrap > div > div.selectorAll > div > input[type=checkbox]'),
        await page.waitForSelector('#chkHabilitar')
        page.click('#chkHabilitar')
        page.click('#Prosseguir')
        
    
        await page.waitForNavigation()
        await page.focus('#filterDocumento'),
        await page.keyboard.type('000000000001', { delay: 10 }),
        await page.waitForSelector('#btnPesquisar')
        await page.click('#btnPesquisar')
    
        
        
        Promise.all([
            await page.waitForSelector('#chk339'),
            await page.click('#chk339'),
            await page.click('#chk7'),
            await page.click('#chk10'),
            await page.click('#btnProsseguir')
    
        ])
        
        
        
        const newPagePromise1 = new Promise(x => browser.once('targetcreated', target => x(target.page())));
        await page.waitForSelector('#panelMatriculas > tr:nth-child(2) > td:nth-child(4) > a')
        await page.click('#panelMatriculas > tr:nth-child(2) > td:nth-child(4) > a');
        const newPage1 = await newPagePromise1;
        let data1 = newPage1.url();
    
        console.log(data1)
        
        await newPage1.click('body > a > img')

        let file = `./PDFsAndImages/PDFs/46618865859_${moment().format('DD-MM-YYYY_HH-mm-ss')}_arisp.pdf`
         await page.emulateMedia('screen');
         await page.pdf({path: file, format: 'A4', printBackground: true});
        

        await page.close()
    
            
    } catch (error) {
        console.log(error)
        await page.close()
    }
    
};

module.exports = arisp