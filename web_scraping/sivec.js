const sivec = async browser => {
  console.log("entrou sivec");

  let url =
    "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/sivec/login.html";

  let page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.focus("#nomeusuario");
    await page.keyboard.type("Nome do usuario");
    await page.focus("#senhausuario");
    await page.keyboard.type("senha1234");
    await page.click("#Acessar");

    await page.waitForNavigation();
    await page.click("#navbar-collapse-1 > ul > li:nth-child(4)");
    await page.click(
      "#navbar-collapse-1 > ul > li:nth-child(4) > ul > li:nth-child(2)"
    );
    await page.click(
      "#navbar-collapse-1 > ul > li:nth-child(4) > ul > li:nth-child(2) > ul > li"
    );

    await page.waitForNavigation();
    await page.focus("#idValorPesq");
    await page.keyboard.type("1234");
    await page.click("#procurar");

    await page.waitForNavigation();
    await page.click(
      "#tabelaPesquisa > tbody > tr:nth-child(1) > td.textotab1.text-center.sorting_1 > a"
    );

    await page.waitForNavigation();
    const data = await page.evaluate(() => {
      let nome = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-11 > table > tbody > tr:nth-child(1) > td:nth-child(2) > span"
      ).innerText;
      let dtNscto = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-11 > table > tbody > tr:nth-child(2) > td:nth-child(2) > span"
      ).innerText;
      let nroVEC = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-11 > table > tbody > tr:nth-child(3) > td:nth-child(2)"
      ).innerText;
      let sexo = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-11 > table > tbody > tr:nth-child(1) > td:nth-child(5)"
      ).innerText;
      let rg = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-11 > table > tbody > tr:nth-child(2) > td:nth-child(5)"
      ).innerText;
      let tipoRg = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-11 > table > tbody > tr:nth-child(3) > td:nth-child(5)"
      ).innerText;
      let dtEmissaoRg = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-12.top-buffer25 > table > tbody > tr:nth-child(1) > td:nth-child(2)"
      ).innerText;
      let estadoCivil = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-12.top-buffer25 > table > tbody > tr:nth-child(2) > td:nth-child(2)"
      ).innerText;
      let naturalizado = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-12.top-buffer25 > table > tbody > tr:nth-child(3) > td:nth-child(2)"
      ).innerText;
      let grauInstrucao = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-12.top-buffer25 > table > tbody > tr:nth-child(4) > td:nth-child(2)"
      ).innerText;
      let nomePai = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-12.top-buffer25 > table > tbody > tr:nth-child(5) > td:nth-child(2)"
      ).innerText;
      let nomeMae = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-12.top-buffer25 > table > tbody > tr:nth-child(6) > td:nth-child(2)"
      ).innerText;
      let corPele = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-12.top-buffer25 > table > tbody > tr:nth-child(7) > td:nth-child(2)"
      ).innerText;
      let alcunha = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-12.top-buffer25 > table > tbody > tr:nth-child(1) > td:nth-child(5)"
      ).innerText;
      let naturalidade = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-12.top-buffer25 > table > tbody > tr:nth-child(2) > td:nth-child(5)"
      ).innerText;
      let postoIdentificacao = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-12.top-buffer25 > table > tbody > tr:nth-child(3) > td:nth-child(5)"
      ).innerText;
      let formulaFundamental = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-12.top-buffer25 > table > tbody > tr:nth-child(4) > td:nth-child(5)"
      ).innerText;
      let corOlhos = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-12.top-buffer25 > table > tbody > tr:nth-child(5) > td:nth-child(5)"
      ).innerText;
      let cabelo = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-12.top-buffer25 > table > tbody > tr:nth-child(6) > td:nth-child(5)"
      ).innerText;
      let profissao = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(5) > div.col-md-12.top-buffer25 > table > tbody > tr:nth-child(7) > td:nth-child(5)"
      ).innerText;
      let endResidencial = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(7) > div.col-md-7 > span"
      ).innerText;
      let endTrabalho = document.querySelector(
        "body > form:nth-child(13) > div > div:nth-child(8) > div.col-md-7 > span"
      ).innerText;

      return {
        nome,
        dtNscto,
        nroVEC,
        sexo,
        rg,
        tipoRg,
        dtEmissaoRg,
        estadoCivil,
        naturalizado,
        grauInstrucao,
        nomePai,
        nomeMae,
        corPele,
        alcunha,
        naturalidade,
        postoIdentificacao,
        formulaFundamental,
        corOlhos,
        cabelo,
        profissao,
        endResidencial,
        endTrabalho
      };
    });

    await page.close();

    return data;
  } catch (error) {
    await page.close();
    return { errorSivec: "Ocorreu um erro" };
  }
};

module.exports = sivec;
