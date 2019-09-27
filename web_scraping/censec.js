const censec = async (browser) => {

  console.log('entrou censec...');

  let url = 'http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/censec/login.html'

  let page = await browser.newPage();

  try {
    await page.goto(url)

    await Promise.all([
      page.waitForNavigation(),
      await page.focus('#LoginTextBox'),
      await page.keyboard.type('login'),
      await page.focus('#SenhaTextBox'),
      await page.keyboard.type('senha'),
      page.click('#EntrarButton'),
    ])

    await Promise.all([
      page.waitForNavigation(),
      await page.hover('#ctl00_CentraisLi'),
      await page.waitForSelector('#ctl00_CESDILi > a'),
      await page.hover('#ctl00_CESDILi > a'),
      await page.waitForSelector('#ctl00_CESDIConsultaAtoHyperLink'),
      await page.click('#ctl00_CESDIConsultaAtoHyperLink'),
    ]);

    await Promise.all([
      page.waitForNavigation(),
      await page.focus('#ctl00_ContentPlaceHolder1_DocumentoTextBox'),
      await page.type('1234567890'),
      await page.click('#ctl00_ContentPlaceHolder1_BuscarButton'),
    ])

    await Promise.all([
      await page.waitForSelector('#ctl00_ContentPlaceHolder1_ResultadoBuscaGeralPanel > div.AreaFormulario > div.Listview > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > input[type=radio]'),
      await page.click('#ctl00_ContentPlaceHolder1_ResultadoBuscaGeralPanel > div.AreaFormulario > div.Listview > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > input[type=radio]'),
      await page.click('#ctl00_ContentPlaceHolder1_VisualizarButton')
    ])

    await page.waitForNavigation()
    const data = await page.evaluate(() => {
      let carga = document.querySelector('#ctl00_ContentPlaceHolder1_CodigoTextBox').value
      let mes = document.querySelector('#ctl00_ContentPlaceHolder1_MesReferenciaDropDownList').value
      let ano = document.querySelector('#ctl00_ContentPlaceHolder1_AnoReferenciaDropDownList').value
      let tipoAto = document.querySelector('#ctl00_ContentPlaceHolder1_TipoAtoDropDownList').value
      let diaAto = document.querySelector('#ctl00_ContentPlaceHolder1_DiaAtoTextBox').value
      let mesAto = document.querySelector('#ctl00_ContentPlaceHolder1_MesAtoTextBox').value
      let anoAto = document.querySelector('#ctl00_ContentPlaceHolder1_AnoAtoTextBox').value
      let livro = document.querySelector('#ctl00_ContentPlaceHolder1_LivroTextBox').value
      let livroComplemento = document.querySelector('#ctl00_ContentPlaceHolder1_LivroComplementoTextBox').value
      let folha = document.querySelector('#ctl00_ContentPlaceHolder1_FolhaTextBox').value
      let folhaComplemento = document.querySelector('#ctl00_ContentPlaceHolder1_FolhaComplementoTextBox').value

      return {
        carga,
        mes,
        ano,
        tipoAto,
        diaAto,
        mesAto,
        anoAto,
        livro,
        livroComplemento,
        folha,
        folhaComplemento
      }
    });

    await page.close();
    return data
  } catch (error) {
    await page.close();
    return 'Ocorreu um erro'
  }


};

module.exports = censec