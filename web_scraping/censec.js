const censec = async (browser) => {

    console.log('entrou censec');

    let url = "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/censec/login.html";

    let page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });


    await Promise.all([
        page.waitForNavigation(),
        page.click('#EntrarButton')
    ]);

    await Promise.all([
        page.waitForNavigation(),
        await page.hover('#ctl00_CentraisLi'),
        await page.waitForSelector('#ctl00_CESDILi > a'),
        await page.hover('#ctl00_CESDILi > a'),
        await page.waitForSelector('#ctl00_CESDIConsultaAtoHyperLink'),
        await page.click('#ctl00_CESDIConsultaAtoHyperLink')
    ]);

    await Promise.all([
        page.waitForNavigation(),
        await page.focus('#ctl00_ContentPlaceHolder1_DocumentoTextBox'),
        await page.keyboard.type('19.811.201/0001-05', { delay: 10 }),
        await page.click('#ctl00_ContentPlaceHolder1_BuscarButton')
    ]);

    await Promise.all([
        page.waitForNavigation(),
        await page.focus('#ctl00_ContentPlaceHolder1_ResultadoBuscaGeralPanel > div.AreaFormulario > div.Listview > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > input[type=radio]'),
        await page.click('#ctl00_ContentPlaceHolder1_ResultadoBuscaGeralPanel > div.AreaFormulario > div.Listview > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > input[type=radio]'),
        await page.click('#ctl00_ContentPlaceHolder1_VisualizarButton')
    ]);

    
    let data = await page.evaluate(() => {
        let carga = document.querySelector('#ctl00_ContentPlaceHolder1_CodigoTextBox').value;
        let mes = document.querySelector('#ctl00_ContentPlaceHolder1_MesReferenciaDropDownList').innerText;
        let ano = document.querySelector('#ctl00_ContentPlaceHolder1_AnoReferenciaDropDownList').innerText;
        let ato = document.querySelector('#ctl00_ContentPlaceHolder1_TipoAtoDropDownList').innerText;
        let diaDoAto = document.querySelector('#ctl00_ContentPlaceHolder1_DiaAtoTextBox').value;
        let mesDoAto = document.querySelector('#ctl00_ContentPlaceHolder1_MesAtoTextBox').value;
        let anoDoAto = document.querySelector('#ctl00_ContentPlaceHolder1_AnoAtoTextBox').value;
        let livro = document.querySelector('#ctl00_ContentPlaceHolder1_LivroTextBox').value;
        let complementoLivro = document.querySelector('#ctl00_ContentPlaceHolder1_LivroComplementoTextBox').value;
        let folha = document.querySelector('#ctl00_ContentPlaceHolder1_FolhaTextBox').value;
        let complementoFolha = document.querySelector('#ctl00_ContentPlaceHolder1_FolhaComplementoTextBox').value;
        let uf = document.querySelector('#ctl00_ContentPlaceHolder1_DadosCartorio_CartorioUFTextBox').value;
        let municipio = document.querySelector('#ctl00_ContentPlaceHolder1_DadosCartorio_CartorioMunicipioTextBox').value;
        let cartorio = document.querySelector('#ctl00_ContentPlaceHolder1_DadosCartorio_CartorioNomeTextBox').value;
        let nomeParte = Array.from(document.querySelectorAll('#ctl00_ContentPlaceHolder1_PartesUpdatePanel table tbody tr td[style = "width:540px"]'))
        let cpfParte = Array.from(document.querySelectorAll('#ctl00_ContentPlaceHolder1_PartesUpdatePanel table tbody tr td[style = "width:110px"]'))
        let qualidadeParte = Array.from(document.querySelectorAll('#ctl00_ContentPlaceHolder1_PartesUpdatePanel table tbody tr td:last-child'))
        let arraynome = nomeParte.map(td => td.innerText);
        let arraycpf = cpfParte.map(td => td.innerText);
        let arrayqualidade = qualidadeParte.map(td => td.innerText); 

        return {
            carga,
            mes,
            ano,
            ato,
            diaDoAto,
            mesDoAto,
            anoDoAto,
            livro,
            complementoLivro,
            folha,
            complementoFolha,
            uf,
            municipio,
            cartorio
            ,
            arraynome,
            arraycpf,
            arrayqualidade
        }

    });

    await page.close()

    return data;
};

module.exports = censec