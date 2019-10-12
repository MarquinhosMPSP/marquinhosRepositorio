const censec = async browser => {
  console.log("entrou censec");

  let url =
    "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/censec/login.html";

  let page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    await Promise.all([page.waitForNavigation(), page.click("#EntrarButton")]);

    await Promise.all([
      page.waitForNavigation(),
      await page.hover("#ctl00_CentraisLi"),
      await page.waitForSelector("#ctl00_CESDILi > a"),
      await page.hover("#ctl00_CESDILi > a"),
      await page.waitForSelector("#ctl00_CESDIConsultaAtoHyperLink"),
      await page.click("#ctl00_CESDIConsultaAtoHyperLink")
    ]);

    await Promise.all([
      page.waitForNavigation(),
      await page.focus("#ctl00_ContentPlaceHolder1_DocumentoTextBox"),
      await page.keyboard.type("19.811.201/0001-05", { delay: 10 }),
      await page.click("#ctl00_ContentPlaceHolder1_BuscarButton")
    ]);

    await Promise.all([
      page.waitForNavigation(),
      await page.focus(
        "#ctl00_ContentPlaceHolder1_ResultadoBuscaGeralPanel > div.AreaFormulario > div.Listview > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > input[type=radio]"
      ),
      await page.click(
        "#ctl00_ContentPlaceHolder1_ResultadoBuscaGeralPanel > div.AreaFormulario > div.Listview > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > input[type=radio]"
      ),
      await page.click("#ctl00_ContentPlaceHolder1_VisualizarButton")
    ]);

    let data = await page.evaluate(() => {
      let carga = document.querySelector(
        "#ctl00_ContentPlaceHolder1_CodigoTextBox"
      ).value;
      let mes = document.querySelector(
        "#ctl00_ContentPlaceHolder1_MesReferenciaDropDownList"
      ).innerText;
      let ano = document.querySelector(
        "#ctl00_ContentPlaceHolder1_AnoReferenciaDropDownList"
      ).innerText;
      let ato = document.querySelector(
        "#ctl00_ContentPlaceHolder1_TipoAtoDropDownList"
      ).innerText;
      let diaDoAto = document.querySelector(
        "#ctl00_ContentPlaceHolder1_DiaAtoTextBox"
      ).value;
      let mesDoAto = document.querySelector(
        "#ctl00_ContentPlaceHolder1_MesAtoTextBox"
      ).value;
      let anoDoAto = document.querySelector(
        "#ctl00_ContentPlaceHolder1_AnoAtoTextBox"
      ).value;
      let livro = document.querySelector(
        "#ctl00_ContentPlaceHolder1_LivroTextBox"
      ).value;
      let complementoLivro = document.querySelector(
        "#ctl00_ContentPlaceHolder1_LivroComplementoTextBox"
      ).value;
      let folha = document.querySelector(
        "#ctl00_ContentPlaceHolder1_FolhaTextBox"
      ).value;
      let complementoFolha = document.querySelector(
        "#ctl00_ContentPlaceHolder1_FolhaComplementoTextBox"
      ).value;
      let uf = document.querySelector(
        "#ctl00_ContentPlaceHolder1_DadosCartorio_CartorioUFTextBox"
      ).value;
      let municipio = document.querySelector(
        "#ctl00_ContentPlaceHolder1_DadosCartorio_CartorioMunicipioTextBox"
      ).value;
      let cartorio = document.querySelector(
        "#ctl00_ContentPlaceHolder1_DadosCartorio_CartorioNomeTextBox"
      ).value;
      let nomes = Array.from(
        document.querySelectorAll(
          '#ctl00_ContentPlaceHolder1_PartesUpdatePanel table tbody tr td[style = "width:540px"]'
        )
      ).map((item, index) => ({ index, nome: item.innerText }));

      let cpfs = Array.from(
        document.querySelectorAll(
          '#ctl00_ContentPlaceHolder1_PartesUpdatePanel table tbody tr td[style = "width:110px"]'
        )
      ).map((item, index) => ({ index, cpf: item.innerText }));

      let qualidades = Array.from(
        document.querySelectorAll(
          "#ctl00_ContentPlaceHolder1_PartesUpdatePanel table tbody tr td:last-child"
        )
      ).map((item, index) => ({ index, qualidade: item.innerText }));

      let arrayGeral = nomes.concat(cpfs, qualidades);

      let pessoas = [];

      for (i = 0; i < nomes.length; i++) {
        pessoas.push(
          Object.assign({}, ...arrayGeral.filter(item => item.index == i))
        );
      }

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
        cartorio,
        pessoas
      };
    });

    await page.close();

    return data;
  } catch (error) {
    await page.close();
    return { errorCensec: "Ocorreu um erro" };
  }
};

module.exports = censec;
