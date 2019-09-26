// const puppeteer = require('puppeteer');

const jucesp = async (browser) => {

    console.log('entrou jucesp');

    let url = "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/jucesp/index.html";

    let page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.focus('#ctl00_cphContent_frmBuscaSimples_txtPalavraChave');
        await page.keyboard.type('teste', { delay: 100 });

        await Promise.all([
            page.waitForNavigation(),
            page.click('#ctl00_cphContent_frmBuscaSimples_pnlBuscaSimples > table > tbody > tr > td.item02 > input[type=submit]')
        ]);

        await page.focus('#formBuscaAvancada > table > tbody > tr:nth-child(1) > td > div > div:nth-child(2) > label > input');
        await page.keyboard.type('pesquisar', { delay: 100 });

        await Promise.all([
            page.waitForNavigation(),
            page.click('#formBuscaAvancada > table > tbody > tr:nth-child(2) > td > input')
        ]);

        await Promise.all([
            page.waitForNavigation(),
            page.click('#ctl00_cphContent_gdvResultadoBusca_gdvContent_ctl02_lbtSelecionar')
        ]);

        let data = await page.evaluate(() => {
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

        await page.close()

        return data;
    } catch (error) {
        await page.close();
        return 'Ocorreu um erro'
    }

};

module.exports = jucesp

