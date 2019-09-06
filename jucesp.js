const puppeteer = require('puppeteer');

(async () => {
    let url = "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/jucesp/pagina4-dados.html";
    const browser = await puppeteer.launch({
        headless: false
    });

    let page = await browser.newPage();
    
    await page.goto(url, {waitUntil: 'networkidle2'});
    let data = await page.evaluate(() =>{
        
        let tipoDeEmpresa = document.querySelector('span[id="ctl00_cphContent_frmPreVisualiza_lblDetalhes"]').innerText;
        let dataDaConstituicao = document.querySelector('span[id="ctl00_cphContent_frmPreVisualiza_lblConstituicao"]').innerText;
        let inicioDaAtividade = document.querySelector('span[id="ctl00_cphContent_frmPreVisualiza_lblAtividade"]').innerText;
        let cnpj = document.querySelector('span[id="ctl00_cphContent_frmPreVisualiza_lblCnpj"]').innerText;
        let capital = document.querySelector('span[id="ctl00_cphContent_frmPreVisualiza_lblCapital"]').innerText;
        let logradouro = document.querySelector('span[id="ctl00_cphContent_frmPreVisualiza_lblLogradouro"]').innerText;
        let bairro = document.querySelector('span[id="ctl00_cphContent_frmPreVisualiza_lblBairro"]').innerText;
        let municipio = document.querySelector('span[id="ctl00_cphContent_frmPreVisualiza_lblMunicipio"]').innerText;
        let numero = document.querySelector('span[id="ctl00_cphContent_frmPreVisualiza_lblNumero"]').innerText;
        let complemento = document.querySelector('span[id="ctl00_cphContent_frmPreVisualiza_lblComplemento"]').innerText;
        let cep = document.querySelector('span[id="ctl00_cphContent_frmPreVisualiza_lblCep"]').innerText;
        let uf = document.querySelector('span[id="ctl00_cphContent_frmPreVisualiza_lblUf"]').innerText;
        

        //let texto = document.querySelector('span[id="ctl00_cphContent_frmPreVisualiza_lblDetalhes"]').getAttribute("value");
        return {
            tipoDeEmpresa,
            dataDaConstituicao,
            inicioDaAtividade,
            cnpj,
            capital,
            logradouro,
            bairro,
            municipio,
            numero,
            complemento,
            cep,
            uf
            }
    });

    console.log(data);

    debugger;
    await browser.close();


})();